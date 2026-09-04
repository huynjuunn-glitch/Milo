type ResultRow = { label: string; value: string; detail?: string };
type CalculatorResult = { headline: string; rows: ResultRow[]; plan?: string[] };

const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));

const parseSimple = (raw: string): number => {
  const cleaned = raw.trim().replaceAll(',', '').replace(/[″”]/g, '"').replace(/[′’]/g, "'");
  if (!cleaned) return Number.NaN;
  if (cleaned.includes("'")) {
    const [feetPart, inchPart = '0'] = cleaned.split("'", 2);
    const feet = Number(feetPart.trim());
    const inches = parseSimple(inchPart.replaceAll('"', '').replace(/\bin\b/gi, ''));
    return feet * 12 + inches;
  }
  const value = cleaned.replaceAll('"', '').replace(/\bin\b/gi, '').trim();
  const mixed = value.match(/^(-?\d+)\s+(\d+)\s*\/\s*(\d+)$/);
  if (mixed) {
    const whole = Number(mixed[1]);
    const fraction = Number(mixed[2]) / Number(mixed[3]);
    return whole < 0 ? whole - fraction : whole + fraction;
  }
  const fraction = value.match(/^(-?\d+)\s*\/\s*(\d+)$/);
  if (fraction) return Number(fraction[1]) / Number(fraction[2]);
  return Number(value);
};

const requireNumber = (form: HTMLFormElement, id: string): number => {
  const input = form.elements.namedItem(id) as HTMLInputElement | HTMLSelectElement | null;
  const value = parseSimple(input?.value ?? '');
  if (!Number.isFinite(value)) throw new Error(`Enter a valid value for ${input?.closest('label')?.querySelector(':scope > span')?.textContent ?? id}.`);
  return value;
};

const requirePositive = (form: HTMLFormElement, id: string, allowZero = false): number => {
  const value = requireNumber(form, id);
  if (allowZero ? value < 0 : value <= 0) throw new Error(`${id.replaceAll(/([A-Z])/g, ' $1').toLowerCase()} must be ${allowZero ? 'zero or greater' : 'greater than zero'}.`);
  return value;
};

const getValue = (form: HTMLFormElement, id: string): string => (form.elements.namedItem(id) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)?.value ?? '';

const formatNumber = (value: number, digits = 3): string => new Intl.NumberFormat('en-US', {
  maximumFractionDigits: digits,
  minimumFractionDigits: 0,
}).format(value);

const formatMoney = (value: number): string => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
}).format(value);

const toFraction = (value: number, denominator = 16): string => {
  if (!Number.isFinite(value)) return '—';
  const sign = value < 0 ? '−' : '';
  const absolute = Math.abs(value);
  let whole = Math.floor(absolute);
  let numerator = Math.round((absolute - whole) * denominator);
  if (numerator === denominator) {
    whole += 1;
    numerator = 0;
  }
  if (numerator === 0) return `${sign}${whole}`;
  const divisor = gcd(numerator, denominator);
  const fraction = `${numerator / divisor}/${denominator / divisor}`;
  return `${sign}${whole ? `${whole} ` : ''}${fraction}`;
};

const formatInches = (value: number, denominator = 16): string => `${toFraction(value, denominator)} in`;

const formatFeetInches = (value: number, denominator = 16): string => {
  const sign = value < 0 ? '−' : '';
  const absolute = Math.abs(value);
  const feet = Math.floor(absolute / 12);
  const inches = absolute - feet * 12;
  return `${sign}${feet} ft ${toFraction(inches, denominator)} in`;
};

const listMarks = (values: number[], denominator: number): string => values.map((value, index) => `${index + 1}: ${toFraction(value, denominator)} in`).join(' · ');

const calculators: Record<string, (form: HTMLFormElement) => CalculatorResult> = {
  'fraction-calculator': (form) => {
    const a = requireNumber(form, 'valueA');
    const b = requireNumber(form, 'valueB');
    const operation = getValue(form, 'operation');
    const precision = requirePositive(form, 'precision');
    if (operation === 'divide' && b === 0) throw new Error('The second measurement cannot be zero when dividing.');
    const value = operation === 'add' ? a + b : operation === 'subtract' ? a - b : operation === 'multiply' ? a * b : a / b;
    return {
      headline: formatInches(value, precision),
      rows: [
        { label: 'Decimal inches', value: `${formatNumber(value, 6)} in` },
        { label: 'Feet + inches', value: formatFeetInches(value, precision) },
        { label: 'Metric equivalent', value: `${formatNumber(value * 25.4, 3)} mm` },
      ],
    };
  },
  'equal-spacing-calculator': (form) => {
    const span = requirePositive(form, 'span');
    const width = requirePositive(form, 'itemWidth');
    const count = Math.round(requirePositive(form, 'itemCount'));
    const mode = getValue(form, 'spacingMode');
    const precision = requirePositive(form, 'spacingPrecision');
    const remaining = span - width * count;
    if (remaining < 0) throw new Error('The pieces are wider than the available span. Reduce the count or piece width.');
    if (mode === 'flush-ends' && count < 2) throw new Error('Flush-end spacing requires at least two pieces.');
    const gap = mode === 'equal-edges' ? remaining / (count + 1) : remaining / (count - 1);
    const first = mode === 'equal-edges' ? gap : 0;
    const marks = Array.from({ length: count }, (_, index) => first + index * (width + gap));
    return {
      headline: `${formatInches(gap, precision)} clear gap`,
      rows: [
        { label: 'Center-to-center pitch', value: formatInches(width + gap, precision) },
        { label: 'Space occupied by pieces', value: formatInches(width * count, precision) },
        { label: 'Available empty space', value: formatInches(remaining, precision) },
      ],
      plan: ['Left-edge marks from the start:', listMarks(marks, precision)],
    };
  },
  'cut-list-optimizer': (form) => {
    const stock = requirePositive(form, 'stockLength');
    const kerf = requirePositive(form, 'cutKerf', true);
    const trim = requirePositive(form, 'trimAllowance', true);
    const usable = stock - trim;
    if (usable <= 0) throw new Error('End-trim allowance must be shorter than the stock board.');
    const lines = getValue(form, 'cutList').split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    if (!lines.length) throw new Error('Add at least one cut-list line in the format length × quantity.');
    const pieces: number[] = [];
    for (const line of lines) {
      const match = line.match(/^(.+?)\s*[x×]\s*(\d+)$/i);
      if (!match) throw new Error(`Could not read “${line}”. Use the format 30 x 4.`);
      const length = parseSimple(match[1]);
      const quantity = Number(match[2]);
      if (!Number.isFinite(length) || length <= 0 || quantity < 1) throw new Error(`Invalid cut-list line: “${line}”.`);
      if (length + kerf > usable) throw new Error(`${toFraction(length, 64)} in is too long for the usable stock length.`);
      if (pieces.length + quantity > 2000) throw new Error('Limit the plan to 2,000 total pieces.');
      for (let index = 0; index < quantity; index += 1) pieces.push(length);
    }
    pieces.sort((a, b) => b - a);
    const boards: { pieces: number[]; remaining: number }[] = [];
    for (const piece of pieces) {
      const consumed = piece + kerf;
      let board = boards.find((candidate) => candidate.remaining + 1e-9 >= consumed);
      if (!board) {
        board = { pieces: [], remaining: usable };
        boards.push(board);
      }
      board.pieces.push(piece);
      board.remaining -= consumed;
    }
    const partLength = pieces.reduce((sum, item) => sum + item, 0);
    const waste = boards.length * stock - partLength;
    const yieldPercent = (partLength / (boards.length * stock)) * 100;
    const plan = boards.map((board, index) => `Board ${index + 1}: ${board.pieces.map((piece) => toFraction(piece, 64)).join(' + ')} in · offcut ${toFraction(Math.max(0, board.remaining), 64)} in`);
    return {
      headline: `${boards.length} stock board${boards.length === 1 ? '' : 's'} required`,
      rows: [
        { label: 'Finished part length', value: `${formatNumber(partLength)} in` },
        { label: 'Material yield', value: `${formatNumber(yieldPercent, 1)}%` },
        { label: 'Kerf + trim + offcuts', value: `${formatNumber(waste, 3)} in` },
      ],
      plan,
    };
  },
  'board-foot-calculator': (form) => {
    const thickness = requirePositive(form, 'boardThickness');
    const width = requirePositive(form, 'boardWidth');
    const length = requirePositive(form, 'boardLength');
    const quantity = Math.round(requirePositive(form, 'boardQuantity'));
    const price = requirePositive(form, 'pricePerBf', true);
    const waste = requirePositive(form, 'wastePercent', true);
    const raw = thickness * width * length * quantity / 144;
    const purchase = raw * (1 + waste / 100);
    return {
      headline: `${formatNumber(raw, 2)} board feet`,
      rows: [
        { label: 'Purchase target with waste', value: `${formatNumber(purchase, 2)} BF` },
        { label: 'Estimated lumber cost', value: formatMoney(purchase * price) },
        { label: 'Per-board volume', value: `${formatNumber(raw / quantity, 3)} BF` },
      ],
    };
  },
  'kerf-calculator': (form) => {
    const stock = requirePositive(form, 'kerfStock');
    const piece = requirePositive(form, 'kerfPiece');
    const kerf = requirePositive(form, 'kerfWidth', true);
    const trim = requirePositive(form, 'kerfEndTrim', true);
    const usable = stock - trim;
    if (usable <= 0) throw new Error('End trim must be shorter than the stock.');
    const count = Math.floor(usable / (piece + kerf));
    if (count < 1) throw new Error('One finished piece does not fit in the usable stock.');
    const used = count * piece + count * kerf;
    const offcut = Math.max(0, usable - used);
    return {
      headline: `${count} finished piece${count === 1 ? '' : 's'}`,
      rows: [
        { label: 'Finished material', value: formatInches(count * piece, 64) },
        { label: 'Material lost to kerf', value: formatInches(count * kerf, 64) },
        { label: 'Remaining offcut', value: formatInches(offcut, 64) },
      ],
    };
  },
  'miter-angle-calculator': (form) => {
    const corner = requirePositive(form, 'cornerAngle');
    if (corner >= 180) throw new Error('The included corner angle must be less than 180 degrees.');
    const precision = requirePositive(form, 'miterPrecision');
    const miter = (180 - corner) / 2;
    const round = (value: number) => Math.round(value / precision) * precision;
    return {
      headline: `${formatNumber(round(miter), 2)}° miter setting`,
      rows: [
        { label: 'Exact equal miter', value: `${formatNumber(miter, 3)}°` },
        { label: 'Direction change', value: `${formatNumber(180 - corner, 3)}°` },
        { label: 'Included corner', value: `${formatNumber(corner, 3)}°` },
      ],
    };
  },
  'drawer-box-calculator': (form) => {
    const openingWidth = requirePositive(form, 'drawerOpeningWidth');
    const openingHeight = requirePositive(form, 'drawerOpeningHeight');
    const openingDepth = requirePositive(form, 'drawerOpeningDepth');
    const sideClearance = requirePositive(form, 'drawerSideClearance', true);
    const verticalClearance = requirePositive(form, 'drawerVerticalClearance', true);
    const material = requirePositive(form, 'drawerMaterial');
    const slide = requirePositive(form, 'drawerSlideLength');
    const width = openingWidth - sideClearance;
    const height = openingHeight - verticalClearance;
    const depth = Math.min(openingDepth, slide);
    const frontBack = width - 2 * material;
    if (width <= 0 || height <= 0 || frontBack <= 0) throw new Error('The selected clearances or material thickness leave no usable drawer-box dimension.');
    return {
      headline: `${formatInches(width, 32)} × ${formatInches(height, 32)} × ${formatInches(depth, 32)}`,
      rows: [
        { label: 'Two side parts', value: `${formatInches(depth, 32)} long × ${formatInches(height, 32)} high` },
        { label: 'Front + back parts', value: `${formatInches(frontBack, 32)} long × ${formatInches(height, 32)} high` },
        { label: 'Applied bottom panel', value: `${formatInches(width, 32)} × ${formatInches(depth, 32)}` },
      ],
    };
  },
  'cabinet-door-calculator': (form) => {
    const openingWidth = requirePositive(form, 'doorOpeningWidth');
    const openingHeight = requirePositive(form, 'doorOpeningHeight');
    const style = getValue(form, 'doorStyle');
    const count = Math.round(requirePositive(form, 'doorCount'));
    const adjustment = requirePositive(form, 'doorAdjustment', true);
    const centerGap = count === 2 ? requirePositive(form, 'doorCenterGap', true) : 0;
    const totalWidth = style === 'overlay' ? openingWidth + 2 * adjustment : openingWidth - 2 * adjustment;
    const height = style === 'overlay' ? openingHeight + 2 * adjustment : openingHeight - 2 * adjustment;
    const width = (totalWidth - centerGap) / count;
    if (width <= 0 || height <= 0) throw new Error('The selected reveal leaves no usable door dimension.');
    return {
      headline: `${formatInches(width, 64)} × ${formatInches(height, 64)} per door`,
      rows: [
        { label: 'Door count', value: String(count) },
        { label: 'Combined finished coverage', value: formatInches(totalWidth, 64) },
        { label: 'Center gap', value: formatInches(centerGap, 64) },
      ],
    };
  },
  'shelf-spacing-calculator': (form) => {
    const height = requirePositive(form, 'shelfHeight');
    const count = Math.round(requirePositive(form, 'shelfCount'));
    const thickness = requirePositive(form, 'shelfThickness');
    const precision = requirePositive(form, 'shelfPrecision');
    const opening = (height - count * thickness) / (count + 1);
    if (opening <= 0) throw new Error('The shelves are too thick or numerous for this interior height.');
    const marks = Array.from({ length: count }, (_, index) => opening * (index + 1) + thickness * index);
    return {
      headline: `${formatInches(opening, precision)} clear opening`,
      rows: [
        { label: 'Number of openings', value: String(count + 1) },
        { label: 'Combined shelf thickness', value: formatInches(count * thickness, precision) },
        { label: 'Available clear space', value: formatInches(height - count * thickness, precision) },
      ],
      plan: ['Shelf-bottom marks from inside bottom:', listMarks(marks, precision)],
    };
  },
  'plywood-sheet-estimator': (form) => {
    const width = requirePositive(form, 'partWidth');
    const length = requirePositive(form, 'partLength');
    const quantity = Math.round(requirePositive(form, 'partQuantity'));
    const sheetWidth = requirePositive(form, 'sheetWidth');
    const sheetLength = requirePositive(form, 'sheetLength');
    const waste = requirePositive(form, 'sheetWaste', true);
    const area = width * length * quantity;
    const sheetArea = sheetWidth * sheetLength;
    const fitsNormally = width <= sheetWidth && length <= sheetLength;
    const fitsRotated = width <= sheetLength && length <= sheetWidth;
    if (!fitsNormally && !fitsRotated) throw new Error('A single part does not fit on the selected sheet in either orientation.');
    const theoretical = area / sheetArea;
    const adjusted = theoretical * (1 + waste / 100);
    return {
      headline: `${Math.ceil(adjusted)} full sheet${Math.ceil(adjusted) === 1 ? '' : 's'} estimated`,
      rows: [
        { label: 'Theoretical minimum by area', value: `${formatNumber(theoretical, 2)} sheets` },
        { label: 'Area with waste allowance', value: `${formatNumber(adjusted, 2)} sheets` },
        { label: 'Total finished part area', value: `${formatNumber(area / 144, 2)} sq ft` },
      ],
    };
  },
  'dowel-spacing-calculator': (form) => {
    const length = requirePositive(form, 'dowelLength');
    const margin = requirePositive(form, 'dowelMargin', true);
    const count = Math.round(requirePositive(form, 'dowelCount'));
    if (count < 2) throw new Error('Use at least two centers for an equal-spacing layout.');
    const precision = requirePositive(form, 'dowelPrecision');
    const usable = length - 2 * margin;
    if (usable <= 0) throw new Error('The two end margins must be shorter than the workpiece.');
    const spacing = usable / (count - 1);
    const marks = Array.from({ length: count }, (_, index) => margin + spacing * index);
    return {
      headline: `${formatInches(spacing, precision)} center-to-center`,
      rows: [
        { label: 'First center', value: formatInches(margin, precision) },
        { label: 'Last center', value: formatInches(length - margin, precision) },
        { label: 'Usable center span', value: formatInches(usable, precision) },
      ],
      plan: ['Center marks from the reference end:', listMarks(marks, precision)],
    };
  },
  'arc-radius-calculator': (form) => {
    const chord = requirePositive(form, 'arcChord');
    const rise = requirePositive(form, 'arcRise');
    if (rise > chord / 2) throw new Error('For this minor-arc layout, the rise cannot exceed half the chord width.');
    const radius = chord * chord / (8 * rise) + rise / 2;
    const centerOffset = Math.abs(radius - rise);
    return {
      headline: `${formatInches(radius, 64)} radius`,
      rows: [
        { label: 'Circle diameter', value: formatInches(radius * 2, 64) },
        { label: 'Center behind chord', value: formatInches(centerOffset, 64) },
        { label: 'Arc chord', value: formatInches(chord, 64) },
      ],
    };
  },
  'decimal-fraction-converter': (form) => {
    const value = requireNumber(form, 'decimalValue');
    const precision = requirePositive(form, 'decimalPrecision');
    const rounded = Math.round(value * precision) / precision;
    const error = rounded - value;
    return {
      headline: `${formatInches(rounded, precision)}`,
      rows: [
        { label: 'Metric equivalent', value: `${formatNumber(value * 25.4, 4)} mm` },
        { label: 'Rounded decimal', value: `${formatNumber(rounded, 6)} in` },
        { label: 'Rounding difference', value: `${error >= 0 ? '+' : ''}${formatNumber(error, 6)} in` },
      ],
    };
  },
};

const renderResult = (container: HTMLElement, result: CalculatorResult): string => {
  const rows = result.rows.map((row) => `<div class="result-row"><span>${row.label}</span><strong>${row.value}</strong>${row.detail ? `<small>${row.detail}</small>` : ''}</div>`).join('');
  const plan = result.plan?.length ? `<div class="result-plan">${result.plan.map((item) => `<p>${item}</p>`).join('')}</div>` : '';
  container.innerHTML = `<p class="result-label">Calculated result</p><h3>${result.headline}</h3><div class="result-grid">${rows}</div>${plan}`;
  return [result.headline, ...result.rows.map((row) => `${row.label}: ${row.value}`), ...(result.plan ?? [])].join('\n');
};

const escapeHtml = (value: string): string => value.replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character] ?? character);

document.querySelectorAll<HTMLElement>('[data-calculator]').forEach((root) => {
  const slug = root.dataset.calculator ?? '';
  const calculate = calculators[slug];
  const form = root.querySelector<HTMLFormElement>('form');
  const output = root.querySelector<HTMLElement>('.calculator__output');
  const toolbar = root.querySelector<HTMLElement>('.result-toolbar');
  const copy = root.querySelector<HTMLButtonElement>('[data-copy-result]');
  if (!form || !output || !calculate) return;
  let copyText = '';

  const run = () => {
    try {
      const result = calculate(form);
      copyText = renderResult(output, result);
      toolbar?.removeAttribute('hidden');
      root.classList.remove('calculator--error');
      try {
        const recent = JSON.parse(localStorage.getItem('dama-recent-tools') ?? '[]') as string[];
        localStorage.setItem('dama-recent-tools', JSON.stringify([slug, ...recent.filter((item) => item !== slug)].slice(0, 4)));
      } catch { /* Local storage is optional. */ }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Check the entered measurements and try again.';
      output.innerHTML = `<div class="result-error"><strong>Check your inputs</strong><p>${escapeHtml(message)}</p></div>`;
      toolbar?.setAttribute('hidden', '');
      root.classList.add('calculator--error');
    }
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    run();
  });
  form.addEventListener('reset', () => {
    window.setTimeout(() => {
      output.innerHTML = '<div class="result-empty"><span aria-hidden="true">⌁</span><p>Your result will appear here.</p></div>';
      toolbar?.setAttribute('hidden', '');
      root.classList.remove('calculator--error');
    });
  });
  copy?.addEventListener('click', async () => {
    if (!copyText) return;
    await navigator.clipboard.writeText(copyText);
    copy.textContent = 'Copied';
    window.setTimeout(() => { copy.textContent = 'Copy result'; }, 1500);
  });
  run();
});

const recentSection = document.querySelector<HTMLElement>('[data-recent-tools]');
if (recentSection) {
  try {
    const recent = JSON.parse(localStorage.getItem('dama-recent-tools') ?? '[]') as string[];
    const cards = recent.map((slug) => document.querySelector<HTMLElement>(`[data-tool-card="${CSS.escape(slug)}"]`)).filter(Boolean) as HTMLElement[];
    if (cards.length) {
      const grid = recentSection.querySelector<HTMLElement>('[data-recent-grid]');
      cards.forEach((card) => grid?.append(card.cloneNode(true)));
      recentSection.removeAttribute('hidden');
    }
  } catch { /* Local storage is optional. */ }
}
