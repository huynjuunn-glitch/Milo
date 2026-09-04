import assert from 'node:assert/strict';
import { tools } from '../src/data/tools.ts';
import { calculators, parseSimple, toFraction } from '../src/scripts/calculators.ts';

const fakeForm = (values) => ({
  elements: {
    namedItem: (id) => ({ value: String(values[id] ?? ''), closest: () => null }),
  },
});

const defaultsFor = (slug) => Object.fromEntries(tools.find((tool) => tool.slug === slug).inputs.map((input) => [input.id, input.value]));
const calculate = (slug, overrides = {}) => calculators[slug](fakeForm({ ...defaultsFor(slug), ...overrides }));

assert.equal(parseSimple('2 11/16'), 2.6875);
assert.equal(parseSimple("2' 6\""), 30);
assert.equal(parseSimple('-1 1/2'), -1.5);
assert.equal(toFraction(2.6875, 32), '2 11/16');
assert.equal(toFraction(1.999, 16), '2');

const expectedHeadlines = {
  'fraction-calculator': '8 13/16 in',
  'equal-spacing-calculator': '4 11/16 in clear gap',
  'cut-list-optimizer': '4 stock boards required',
  'board-foot-calculator': '32 board feet',
  'kerf-calculator': '7 finished pieces',
  'miter-angle-calculator': '45° miter setting',
  'drawer-box-calculator': '17 in × 5 in × 22 in',
  'cabinet-door-calculator': '12 7/16 in × 31 in per door',
  'shelf-spacing-calculator': '13 13/16 in clear opening',
  'plywood-sheet-estimator': '2 full sheets in this layout',
  'dowel-spacing-calculator': '6 13/32 in center-to-center',
  'arc-radius-calculator': '42 1/2 in radius',
  'decimal-fraction-converter': '2 11/16 in',
};

for (const tool of tools) {
  const result = calculate(tool.slug);
  assert.equal(result.headline, expectedHeadlines[tool.slug], `${tool.slug} default result changed`);
  assert.ok(result.rows.length >= 3, `${tool.slug} should return supporting values`);
}

const plywood = calculate('plywood-sheet-estimator');
assert.equal(plywood.layouts.length, 2);
assert.equal(plywood.layouts.reduce((sum, sheet) => sum + sheet.panels.length, 0), 14);
assert.throws(() => calculate('plywood-sheet-estimator', { panelList: '60 x 100 x 1' }), /does not fit/);
assert.throws(() => calculate('fraction-calculator', { operation: 'divide', valueB: '0' }), /cannot be zero/);
assert.throws(() => calculate('equal-spacing-calculator', { span: '4', itemWidth: '2', itemCount: '3' }), /wider than/);
assert.throws(() => calculate('miter-angle-calculator', { cornerAngle: '180' }), /less than 180/);
assert.throws(() => calculate('dowel-spacing-calculator', { dowelCount: '1' }), /at least two/);

console.log(`Calculation QA passed: ${tools.length} default workflows, 5 parser/rounding checks and 5 invalid-input checks.`);
