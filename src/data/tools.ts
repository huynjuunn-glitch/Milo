import type { ToolCategory } from './site';

export type ToolInput = {
  id: string;
  label: string;
  type?: 'text' | 'number' | 'select' | 'textarea';
  value?: string;
  placeholder?: string;
  help?: string;
  unit?: string;
  min?: number;
  max?: number;
  step?: string;
  options?: { value: string; label: string }[];
  wide?: boolean;
};

export type Tool = {
  slug: string;
  title: string;
  shortTitle: string;
  category: ToolCategory;
  description: string;
  intro: string;
  featured?: boolean;
  badge?: string;
  inputs: ToolInput[];
  resultHint: string;
  method: string[];
  formula: string;
  example: { setup: string; result: string };
  limits: string[];
  faqs: { question: string; answer: string }[];
  related: string[];
};

export const tools: Tool[] = [
  {
    slug: 'fraction-calculator',
    title: 'Woodworking Fraction Calculator',
    shortTitle: 'Fraction Calculator',
    category: 'layout',
    badge: 'Shop essential',
    featured: true,
    description: 'Add, subtract, multiply or divide fractional-inch measurements and round the answer to a shop-friendly precision.',
    intro: 'Enter whole numbers, decimals or mixed fractions such as 12 7/16. The result is shown as a reduced fraction, decimal inches and feet-and-inches so you can move from the plan to the tape measure without a second conversion.',
    inputs: [
      { id: 'valueA', label: 'First measurement', value: '12 7/16', placeholder: '12 7/16', unit: 'in', help: 'Mixed fractions and decimals are accepted.' },
      { id: 'operation', label: 'Operation', type: 'select', value: 'subtract', options: [
        { value: 'add', label: 'Add (+)' }, { value: 'subtract', label: 'Subtract (−)' },
        { value: 'multiply', label: 'Multiply (×)' }, { value: 'divide', label: 'Divide (÷)' },
      ] },
      { id: 'valueB', label: 'Second measurement', value: '3 5/8', placeholder: '3 5/8', unit: 'in' },
      { id: 'precision', label: 'Round to', type: 'select', value: '16', options: [
        { value: '8', label: 'Nearest 1/8 in' }, { value: '16', label: 'Nearest 1/16 in' },
        { value: '32', label: 'Nearest 1/32 in' }, { value: '64', label: 'Nearest 1/64 in' },
      ] },
    ],
    resultHint: 'Answers are rounded only for display; the decimal result retains the calculated value.',
    method: [
      'Convert each mixed fraction into decimal inches.',
      'Apply the selected arithmetic operation.',
      'Round the result to the selected tape-measure denominator and reduce the fraction.',
    ],
    formula: 'Mixed number = whole inches + numerator ÷ denominator',
    example: { setup: '12 7/16 in − 3 5/8 in, rounded to 1/16 in', result: '8 13/16 in' },
    limits: ['This calculator treats every entry as inches.', 'A rounded layout dimension can accumulate error when repeated many times; use the decimal result for chained calculations.'],
    faqs: [
      { question: 'Can I type 5/8 without a whole number?', answer: 'Yes. Use 5/8, 0.625 or 0 5/8 and the calculator will read the same value.' },
      { question: 'Why did the denominator change?', answer: 'The result is reduced. For example, 8/16 is displayed as 1/2 even when you select sixteenth-inch precision.' },
    ],
    related: ['equal-spacing-calculator', 'kerf-calculator', 'dowel-spacing-calculator'],
  },
  {
    slug: 'equal-spacing-calculator',
    title: 'Equal Spacing Calculator',
    shortTitle: 'Equal Spacing',
    category: 'layout',
    badge: 'Most useful',
    featured: true,
    description: 'Lay out slats, balusters, hooks or panels with equal gaps across a fixed opening.',
    intro: 'This calculator handles the two common layouts: equal gaps around every piece, or the first and last pieces held flush to the ends. Results include clear gap, center-to-center pitch and a printable mark sequence.',
    inputs: [
      { id: 'span', label: 'Available span', value: '48', unit: 'in' },
      { id: 'itemWidth', label: 'Width of each piece', value: '1 1/2', unit: 'in' },
      { id: 'itemCount', label: 'Number of pieces', type: 'number', value: '7', min: 1, max: 200, step: '1' },
      { id: 'spacingMode', label: 'Edge treatment', type: 'select', value: 'equal-edges', options: [
        { value: 'equal-edges', label: 'Equal gaps at both ends' },
        { value: 'flush-ends', label: 'First and last piece flush' },
      ] },
      { id: 'spacingPrecision', label: 'Round marks to', type: 'select', value: '16', options: [
        { value: '8', label: 'Nearest 1/8 in' }, { value: '16', label: 'Nearest 1/16 in' },
        { value: '32', label: 'Nearest 1/32 in' }, { value: '64', label: 'Nearest 1/64 in' },
      ] },
    ],
    resultHint: 'Mark positions reference the left edge of each piece from the start of the span.',
    method: ['Subtract the combined piece width from the available span.', 'Divide the remaining space by the correct number of gaps.', 'Build a cumulative left-edge mark sequence using piece width plus gap.'],
    formula: 'Equal edge gap = (span − piece width × count) ÷ (count + 1)',
    example: { setup: 'Seven 1 1/2 in slats inside a 48 in span with equal end gaps', result: '4 11/16 in gaps, approximately 6 3/16 in center-to-center' },
    limits: ['The opening must be wider than the combined width of all pieces.', 'Actual stock width should be measured; nominal 2× material is not exactly 2 inches wide.'],
    faqs: [
      { question: 'Should balusters have equal end gaps?', answer: 'Use the equal-end option when the empty space at both boundaries should match the internal gaps. Use flush ends when a piece must land against each boundary.' },
      { question: 'What is center-to-center spacing?', answer: 'It is the distance from the centerline of one piece to the next. It equals the clear gap plus one piece width.' },
    ],
    related: ['dowel-spacing-calculator', 'shelf-spacing-calculator', 'fraction-calculator'],
  },
  {
    slug: 'cut-list-optimizer',
    title: '1D Cut List Optimizer',
    shortTitle: 'Cut List Optimizer',
    category: 'materials',
    badge: 'Save material',
    featured: true,
    description: 'Arrange repeated linear parts across standard boards while accounting for saw kerf.',
    intro: 'Paste the required lengths and quantities, choose a stock length and kerf, then get a board-by-board cutting plan. The optimizer uses a first-fit decreasing layout: fast, transparent and well suited to straight linear stock.',
    inputs: [
      { id: 'stockLength', label: 'Stock board length', value: '96', unit: 'in' },
      { id: 'cutKerf', label: 'Saw kerf', value: '1/8', unit: 'in' },
      { id: 'trimAllowance', label: 'End-trim allowance per board', value: '1/4', unit: 'in', help: 'Total material reserved for squaring both ends.' },
      { id: 'cutList', label: 'Required pieces', type: 'textarea', value: '30 x 4\n22 1/2 x 4\n14 x 6', placeholder: '30 x 4\n22 1/2 x 4', help: 'One size per line: length × quantity.', wide: true },
    ],
    resultHint: 'The plan is a practical estimate, not a mathematical guarantee of the absolute minimum number of boards.',
    method: ['Expand each length by its quantity and sort pieces from longest to shortest.', 'Place each piece in the first board with enough remaining length.', 'Charge one kerf for each cut and reserve the selected end-trim allowance.'],
    formula: 'Consumed length = sum of parts + kerf × cuts + trim allowance',
    example: { setup: 'Four 30 in, four 22 1/2 in and six 14 in parts from 96 in boards', result: 'The generated plan groups compatible lengths and reports offcut on every stock board.' },
    limits: ['For rough, bowed or defect-prone lumber, add extra stock rather than trusting a zero-defect layout.', 'This is a one-dimensional optimizer; it does not rotate or nest rectangular plywood parts.'],
    faqs: [
      { question: 'Does the optimizer include blade width?', answer: 'Yes. The kerf value is charged for every listed part, which is a conservative shop-planning assumption.' },
      { question: 'Why might my shop layout use another board?', answer: 'Defects, grain direction, joinery reference faces and the need to square ends can override a purely length-based solution.' },
    ],
    related: ['kerf-calculator', 'board-foot-calculator', 'plywood-sheet-estimator'],
  },
  {
    slug: 'board-foot-calculator',
    title: 'Board Foot & Lumber Cost Calculator',
    shortTitle: 'Board Foot Calculator',
    category: 'materials',
    badge: 'Lumber yard',
    featured: true,
    description: 'Calculate board feet, total volume and lumber cost from actual or rough dimensions.',
    intro: 'Board-foot pricing can be confusing when thickness is written in quarters and project dimensions are in inches. Enter actual thickness, width, length and quantity to produce a transparent purchase estimate.',
    inputs: [
      { id: 'boardThickness', label: 'Thickness', value: '1', unit: 'in' },
      { id: 'boardWidth', label: 'Width', value: '8', unit: 'in' },
      { id: 'boardLength', label: 'Length', value: '96', unit: 'in' },
      { id: 'boardQuantity', label: 'Quantity', type: 'number', value: '6', min: 1, max: 10000, step: '1' },
      { id: 'pricePerBf', label: 'Price per board foot', type: 'number', value: '7.50', min: 0, step: '0.01', unit: '$' },
      { id: 'wastePercent', label: 'Waste allowance', type: 'number', value: '20', min: 0, max: 200, step: '1', unit: '%' },
    ],
    resultHint: 'Purchase quantity includes the selected waste allowance; raw board feet does not.',
    method: ['Multiply thickness × width × length in inches.', 'Divide by 144 to convert cubic inches into board feet.', 'Multiply by quantity, add the waste allowance and apply the price per board foot.'],
    formula: 'Board feet = thickness(in) × width(in) × length(in) ÷ 144 × quantity',
    example: { setup: 'Six boards measuring 1 × 8 × 96 in at $7.50/BF plus 20% waste', result: '32 raw BF, 38.4 purchase BF, estimated material cost $288' },
    limits: ['Some dealers price rough 4/4, 5/4 or 8/4 stock by nominal thickness rather than your finished dimension.', 'Taxes, milling fees and minimum board charges are not included.'],
    faqs: [
      { question: 'What does 4/4 lumber mean?', answer: 'Four-quarter rough lumber is nominally one inch thick before surfacing. A surfaced board is commonly thinner, so confirm how the dealer measures it.' },
      { question: 'How much waste should I add?', answer: 'Straight, clear projects may need 10–15%; furniture stock with grain matching, defects or heavy milling often needs 20–35%.' },
    ],
    related: ['cut-list-optimizer', 'plywood-sheet-estimator', 'kerf-calculator'],
  },
  {
    slug: 'kerf-calculator',
    title: 'Saw Kerf & Yield Calculator',
    shortTitle: 'Kerf Calculator',
    category: 'materials',
    description: 'Find how many repeated parts fit in a board and how much stock the blade turns into sawdust.',
    intro: 'A small kerf becomes a missing part when repeated across a board. This calculator reports maximum yield, material consumed, total kerf and leftover stock for repeat cuts.',
    inputs: [
      { id: 'kerfStock', label: 'Stock length', value: '96', unit: 'in' },
      { id: 'kerfPiece', label: 'Finished piece length', value: '11 7/8', unit: 'in' },
      { id: 'kerfWidth', label: 'Blade kerf', value: '1/8', unit: 'in' },
      { id: 'kerfEndTrim', label: 'Total end trim', value: '1/4', unit: 'in' },
    ],
    resultHint: 'Maximum yield assumes straight stock with no defects and one kerf for each finished piece.',
    method: ['Reserve the end-trim allowance from the stock.', 'Divide usable stock plus one kerf by piece length plus one kerf.', 'Round down to whole parts and report the remaining offcut.'],
    formula: 'Maximum pieces = floor(usable stock ÷ (piece length + kerf))',
    example: { setup: '96 in stock, 11 7/8 in parts, 1/8 in kerf and 1/4 in total trim', result: 'Seven finished parts fit; an eighth would consume the full 96 inches and leave no end-trim allowance.' },
    limits: ['The calculation does not reserve material for knots, checks or test cuts.', 'Measure actual blade kerf from a test cut when the layout is tight.'],
    faqs: [
      { question: 'Is kerf the same as blade thickness?', answer: 'Not always. Tooth set can make the actual cut wider than the blade plate, so a test cut is more reliable than the label.' },
      { question: 'Why count one kerf per piece?', answer: 'It is a conservative planning rule. The final factory end might eliminate one cut, but rough ends often need trimming anyway.' },
    ],
    related: ['cut-list-optimizer', 'fraction-calculator', 'board-foot-calculator'],
  },
  {
    slug: 'miter-angle-calculator',
    title: 'Miter Angle Calculator',
    shortTitle: 'Miter Angle',
    category: 'layout',
    description: 'Calculate the saw setting for two equal miter cuts that close a measured corner.',
    intro: 'Walls and assemblies are rarely a perfect 90 degrees. Enter the included corner angle and this calculator returns the equal miter setting, joint turn and a test-cut reminder.',
    inputs: [
      { id: 'cornerAngle', label: 'Included corner angle', type: 'number', value: '90', min: 0.1, max: 179.9, step: '0.1', unit: '°' },
      { id: 'miterPrecision', label: 'Display precision', type: 'select', value: '0.1', options: [
        { value: '1', label: 'Whole degree' }, { value: '0.5', label: 'Half degree' }, { value: '0.1', label: 'Tenth degree' },
      ] },
    ],
    resultHint: 'The value assumes the angle is split equally between two workpieces.',
    method: ['Subtract the included corner angle from 180 degrees.', 'Divide the direction change equally between the two pieces.', 'Set the miter gauge to the calculated angle and verify with scrap.'],
    formula: 'Miter setting = (180° − included corner angle) ÷ 2',
    example: { setup: 'A measured inside corner of 92°', result: 'Each piece receives a 44° miter setting.' },
    limits: ['This calculates a flat miter, not a compound crown-molding bevel.', 'Saw scales, fence alignment and springback can require a small test-fit adjustment.'],
    faqs: [
      { question: 'Why is a 90-degree corner cut at 45 degrees?', answer: 'The joint changes direction by 90 degrees. Splitting that direction change across two identical pieces produces two 45-degree cuts.' },
      { question: 'Can I use this for polygons?', answer: 'Yes, if you know the polygon’s interior angle. A regular hexagon has a 120-degree interior angle, producing a 30-degree miter setting.' },
    ],
    related: ['arc-radius-calculator', 'fraction-calculator', 'equal-spacing-calculator'],
  },
  {
    slug: 'drawer-box-calculator',
    title: 'Drawer Box Size Calculator',
    shortTitle: 'Drawer Box Sizing',
    category: 'cabinetry',
    badge: 'Cabinet shop',
    featured: true,
    description: 'Convert a cabinet opening and slide clearance into drawer-box dimensions and a simple butt-joint cut list.',
    intro: 'Start from the measured opening, not the cabinet label. The calculator subtracts slide and vertical clearances, limits box depth, and generates front/back, side and captured-bottom dimensions for a basic drawer box.',
    inputs: [
      { id: 'drawerOpeningWidth', label: 'Opening width', value: '18', unit: 'in' },
      { id: 'drawerOpeningHeight', label: 'Opening height', value: '6', unit: 'in' },
      { id: 'drawerOpeningDepth', label: 'Usable cabinet depth', value: '23', unit: 'in' },
      { id: 'drawerSideClearance', label: 'Total slide clearance', value: '1', unit: 'in', help: 'Combined left + right clearance.' },
      { id: 'drawerVerticalClearance', label: 'Total vertical clearance', value: '1', unit: 'in' },
      { id: 'drawerMaterial', label: 'Box material thickness', value: '1/2', unit: 'in' },
      { id: 'drawerSlideLength', label: 'Selected slide length', value: '22', unit: 'in' },
    ],
    resultHint: 'Cut list assumes front and back fit between full-length sides with square butt joints.',
    method: ['Subtract total slide clearance from the measured opening width.', 'Subtract vertical clearance from opening height.', 'Use the shorter of selected slide length and usable cabinet depth for box depth.', 'Subtract two material thicknesses to obtain front and back length.'],
    formula: 'Outside box width = opening width − total slide clearance',
    example: { setup: '18 × 6 × 23 in opening, 1 in side clearance, 1/2 in material and 22 in slides', result: '17 in outside width; front/back parts are 16 in long when placed between the sides.' },
    limits: ['Always use the slide manufacturer’s clearance and setback instructions.', 'Joinery other than a simple butt joint changes individual part lengths.', 'Bottom dimensions are reported for an applied bottom; grooves or captured panels require your groove-depth adjustment.'],
    faqs: [
      { question: 'Is one inch of side clearance universal?', answer: 'No. It is common for many side-mount ball-bearing slides, but undermount and specialty hardware use different requirements.' },
      { question: 'Should the drawer use the full cabinet depth?', answer: 'Use a standard slide length that fits behind the closed front and clears hinges, face frames, wiring and cabinet backs.' },
    ],
    related: ['cabinet-door-calculator', 'shelf-spacing-calculator', 'cut-list-optimizer'],
  },
  {
    slug: 'cabinet-door-calculator',
    title: 'Cabinet Door Size Calculator',
    shortTitle: 'Cabinet Doors',
    category: 'cabinetry',
    description: 'Size single or paired overlay and inset cabinet doors from the actual opening.',
    intro: 'Choose overlay or inset construction, enter the opening and reveal, then calculate finished door dimensions. Paired doors automatically reserve the center gap.',
    inputs: [
      { id: 'doorOpeningWidth', label: 'Opening width', value: '24', unit: 'in' },
      { id: 'doorOpeningHeight', label: 'Opening height', value: '30', unit: 'in' },
      { id: 'doorStyle', label: 'Door style', type: 'select', value: 'overlay', options: [
        { value: 'overlay', label: 'Overlay' }, { value: 'inset', label: 'Inset' },
      ] },
      { id: 'doorCount', label: 'Door count', type: 'select', value: '2', options: [
        { value: '1', label: 'Single door' }, { value: '2', label: 'Pair of doors' },
      ] },
      { id: 'doorAdjustment', label: 'Overlay / inset side reveal', value: '1/2', unit: 'in', help: 'Overlay is added per edge; inset reveal is subtracted per edge.' },
      { id: 'doorCenterGap', label: 'Center gap for a pair', value: '1/8', unit: 'in' },
    ],
    resultHint: 'Finished size is shown for each door, not the combined pair.',
    method: ['For overlay doors, add the overlay to every outside opening edge.', 'For inset doors, subtract the desired reveal from every opening edge.', 'For a pair, reserve the center gap and divide the remaining total width equally.'],
    formula: 'Paired overlay door width = (opening width + 2 × overlay − center gap) ÷ 2',
    example: { setup: '24 × 30 in opening, two doors, 1/2 in overlay and 1/8 in center gap', result: 'Each overlay door is 12 7/16 × 31 in.' },
    limits: ['Face-frame stile widths and adjacent doors can limit the available overlay.', 'Confirm hinge cup setbacks, edge profiles and finishing movement before fabrication.'],
    faqs: [
      { question: 'What is cabinet-door overlay?', answer: 'Overlay is how far the finished door extends past the opening edge onto the cabinet face or frame.' },
      { question: 'What reveal should I use for inset doors?', answer: 'A common starting point is 1/16 to 3/32 inch per edge, but door movement and hinge adjustability must be considered.' },
    ],
    related: ['drawer-box-calculator', 'shelf-spacing-calculator', 'equal-spacing-calculator'],
  },
  {
    slug: 'shelf-spacing-calculator',
    title: 'Equal Shelf Spacing Calculator',
    shortTitle: 'Shelf Spacing',
    category: 'cabinetry',
    description: 'Calculate equal clear openings and shelf-bottom marks inside a cabinet or bookcase.',
    intro: 'Enter the clear interior height, shelf thickness and number of fixed shelves. The calculator divides the remaining height into equal openings and lists the bottom-edge mark for every shelf.',
    inputs: [
      { id: 'shelfHeight', label: 'Clear interior height', value: '72', unit: 'in' },
      { id: 'shelfCount', label: 'Number of shelves', type: 'number', value: '4', min: 1, max: 100, step: '1' },
      { id: 'shelfThickness', label: 'Actual shelf thickness', value: '3/4', unit: 'in' },
      { id: 'shelfPrecision', label: 'Round marks to', type: 'select', value: '16', options: [
        { value: '8', label: 'Nearest 1/8 in' }, { value: '16', label: 'Nearest 1/16 in' },
        { value: '32', label: 'Nearest 1/32 in' },
      ] },
    ],
    resultHint: 'Marks are measured from the inside bottom to the bottom face of each shelf.',
    method: ['Subtract the combined shelf thickness from the clear interior height.', 'Divide the remaining height by the number of openings, which is one more than the shelf count.', 'Add one opening and one shelf thickness repeatedly to create the mark list.'],
    formula: 'Clear opening = (interior height − shelf count × thickness) ÷ (shelf count + 1)',
    example: { setup: '72 in interior height with four 3/4 in shelves', result: 'Five equal clear openings of 13 13/16 in.' },
    limits: ['Measure plywood thickness instead of assuming a nominal 3/4 inch.', 'This spaces shelves visually; it does not calculate structural shelf sag or load capacity.'],
    faqs: [
      { question: 'Why are there more openings than shelves?', answer: 'Four shelves divide a cabinet into five clear spaces: below the first, three between shelves and one above the last.' },
      { question: 'Do shelf pins use the same calculation?', answer: 'The result can establish starting rows, but adjustable shelf-pin holes should follow your jig’s fixed increment.' },
    ],
    related: ['equal-spacing-calculator', 'dowel-spacing-calculator', 'cabinet-door-calculator'],
  },
  {
    slug: 'plywood-sheet-estimator',
    title: 'Plywood Sheet Quantity Estimator',
    shortTitle: 'Plywood Estimator',
    category: 'materials',
    description: 'Estimate full-sheet quantity from repeated rectangular parts and a practical waste allowance.',
    intro: 'This area-based estimator is useful for early budgeting before a detailed cutting diagram exists. It compares total part area with the selected sheet size and clearly separates the theoretical minimum from the waste-adjusted purchase quantity.',
    inputs: [
      { id: 'partWidth', label: 'Part width', value: '18', unit: 'in' },
      { id: 'partLength', label: 'Part length', value: '30', unit: 'in' },
      { id: 'partQuantity', label: 'Part quantity', type: 'number', value: '10', min: 1, max: 10000, step: '1' },
      { id: 'sheetWidth', label: 'Sheet width', value: '48', unit: 'in' },
      { id: 'sheetLength', label: 'Sheet length', value: '96', unit: 'in' },
      { id: 'sheetWaste', label: 'Waste allowance', type: 'number', value: '20', min: 0, max: 200, step: '1', unit: '%' },
    ],
    resultHint: 'Area alone cannot prove that every rectangle will physically nest on the sheet.',
    method: ['Multiply part width × length × quantity for required area.', 'Divide by sheet area for the theoretical minimum.', 'Add the waste allowance and round up to full sheets.'],
    formula: 'Estimated sheets = ceil(total part area × (1 + waste %) ÷ sheet area)',
    example: { setup: 'Ten 18 × 30 in panels from 48 × 96 in sheets with 20% waste', result: '1.17 theoretical sheets; purchase estimate rounds to 2 sheets.' },
    limits: ['Grain direction, kerf and part geometry can require more sheets than an area calculation.', 'Create a full cut diagram before purchasing expensive veneered panels.'],
    faqs: [
      { question: 'Is this a plywood cut optimizer?', answer: 'No. It is an early quantity and cost-planning estimate. The one-dimensional cut-list tool is also not a substitute for rectangular nesting.' },
      { question: 'What waste factor should I use?', answer: 'Start around 15–20% for simple paint-grade rectangles and increase it for grain matching, defects, large parts or expensive veneer sequencing.' },
    ],
    related: ['cut-list-optimizer', 'board-foot-calculator', 'kerf-calculator'],
  },
  {
    slug: 'dowel-spacing-calculator',
    title: 'Dowel & Fastener Spacing Calculator',
    shortTitle: 'Dowel Spacing',
    category: 'layout',
    description: 'Place a chosen number of dowels, hooks or fasteners evenly between two end margins.',
    intro: 'Use the actual workpiece length, protect the desired end margins, and receive the center-to-center interval plus every center mark from the reference edge.',
    inputs: [
      { id: 'dowelLength', label: 'Workpiece length', value: '36', unit: 'in' },
      { id: 'dowelMargin', label: 'Margin at each end', value: '2', unit: 'in' },
      { id: 'dowelCount', label: 'Number of centers', type: 'number', value: '6', min: 2, max: 200, step: '1' },
      { id: 'dowelPrecision', label: 'Round marks to', type: 'select', value: '32', options: [
        { value: '16', label: 'Nearest 1/16 in' }, { value: '32', label: 'Nearest 1/32 in' }, { value: '64', label: 'Nearest 1/64 in' },
      ] },
    ],
    resultHint: 'All marks reference the same end of the workpiece to avoid cumulative layout error.',
    method: ['Subtract both end margins from the workpiece length.', 'Divide the usable distance by one fewer than the number of centers.', 'Add each interval to the first end-margin mark.'],
    formula: 'Center spacing = (length − 2 × end margin) ÷ (count − 1)',
    example: { setup: 'Six centers across 36 in with a 2 in margin at each end', result: '6 2/5 in center spacing; use the rounded mark sequence shown by the calculator.' },
    limits: ['The calculator does not determine dowel diameter, edge distance or structural capacity.', 'Rounded intervals can drift, so use the listed marks from one reference edge rather than stepping dividers from mark to mark.'],
    faqs: [
      { question: 'Why measure every mark from one end?', answer: 'It prevents tiny rounding and pencil-placement errors from accumulating across the workpiece.' },
      { question: 'Can I use this for coat hooks?', answer: 'Yes. It works for any repeated center point with equal end margins, including hooks, shelf pins, screws and decorative plugs.' },
    ],
    related: ['equal-spacing-calculator', 'shelf-spacing-calculator', 'fraction-calculator'],
  },
  {
    slug: 'arc-radius-calculator',
    title: 'Arc Radius Calculator',
    shortTitle: 'Arc Radius',
    category: 'layout',
    description: 'Find the radius and diameter of a circular arc from its chord width and rise.',
    intro: 'When a cabinet rail, headboard or template has a known width and crown height, this calculator finds the circle needed to reproduce that arc and the distance from the chord to the circle center.',
    inputs: [
      { id: 'arcChord', label: 'Chord width', value: '36', unit: 'in', help: 'Straight distance between arc endpoints.' },
      { id: 'arcRise', label: 'Arc rise', value: '4', unit: 'in', help: 'Height from the chord midpoint to the arc.' },
    ],
    resultHint: 'The layout assumes a true circular segment, not an ellipse or freeform curve.',
    method: ['Square the chord length and divide by eight times the rise.', 'Add half the rise to obtain the circle radius.', 'Subtract the rise from the radius to locate the center behind the chord.'],
    formula: 'Radius = chord² ÷ (8 × rise) + rise ÷ 2',
    example: { setup: 'A 36 in chord with a 4 in rise', result: 'The radius is 42.5 in and the center sits 38.5 in behind the chord.' },
    limits: ['Chord and rise must use the same unit.', 'A shallow arc creates a very large radius and may require a trammel or flexible layout method.'],
    faqs: [
      { question: 'What is the chord?', answer: 'The chord is the straight line connecting the two endpoints of the arc—the finished width of the curved opening.' },
      { question: 'What is the rise?', answer: 'The rise, also called sagitta, is the perpendicular distance from the chord midpoint to the highest point of the arc.' },
    ],
    related: ['miter-angle-calculator', 'equal-spacing-calculator', 'fraction-calculator'],
  },
  {
    slug: 'decimal-fraction-converter',
    title: 'Decimal to Fraction Inch Converter',
    shortTitle: 'Decimal ↔ Fraction',
    category: 'layout',
    description: 'Convert decimal inches to the nearest tape-measure fraction and compare rounding error.',
    intro: 'Plans, calipers and CAD files often output decimal inches while shop tools use fractions. Choose a practical denominator and see the nearest reduced fraction, metric equivalent and exact rounding difference.',
    inputs: [
      { id: 'decimalValue', label: 'Decimal inches', type: 'number', value: '2.6875', step: '0.0001', unit: 'in' },
      { id: 'decimalPrecision', label: 'Round to', type: 'select', value: '32', options: [
        { value: '8', label: 'Nearest 1/8 in' }, { value: '16', label: 'Nearest 1/16 in' },
        { value: '32', label: 'Nearest 1/32 in' }, { value: '64', label: 'Nearest 1/64 in' },
      ] },
    ],
    resultHint: 'Metric conversion uses 25.4 millimeters per inch.',
    method: ['Multiply the fractional decimal part by the selected denominator.', 'Round to the nearest numerator and reduce the resulting fraction.', 'Compare rounded inches with the original value to show the error.'],
    formula: 'Numerator = round(decimal remainder × denominator)',
    example: { setup: '2.6875 in rounded to the nearest 1/32 in', result: '2 11/16 in, exactly 68.2625 mm with zero rounding error.' },
    limits: ['Measurement accuracy cannot exceed the accuracy of the original value or tool.', 'Choose a denominator your measuring and cutting tools can reliably reproduce.'],
    faqs: [
      { question: 'Which denominator should I use?', answer: 'General carpentry often uses 1/16 inch. Furniture and machine setup may justify 1/32 or 1/64 inch when the process can hold that tolerance.' },
      { question: 'Does the converter round or truncate?', answer: 'It rounds to the nearest increment and reports the signed difference from the original decimal.' },
    ],
    related: ['fraction-calculator', 'equal-spacing-calculator', 'kerf-calculator'],
  },
];

export const getTool = (slug: string) => tools.find((tool) => tool.slug === slug);
export const getRelatedTools = (tool: Tool) => tool.related.map(getTool).filter((item): item is Tool => Boolean(item));
