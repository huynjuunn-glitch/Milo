import type { SourceKey } from './tools';

export type GuideSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  publishedAt: string;
  updatedAt: string;
  intro: string;
  sections: GuideSection[];
  takeaway: string;
  relatedTools: string[];
  sourceKeys: SourceKey[];
};

export const guides: Guide[] = [
  {
    slug: 'how-to-read-a-tape-measure',
    title: 'How to Read a Tape Measure Without Guessing',
    description: 'A practical system for reading fractional-inch marks, reducing mistakes and transferring measurements in the workshop.',
    category: 'Measurement',
    readTime: '7 min read',
    publishedAt: '2026-09-04',
    updatedAt: '2026-09-04',
    intro: 'A tape measure looks simple until a plan calls for 13 11/16 inches and the workpiece is upside down on the bench. Reliable measurement is less about memorizing every tick and more about using a repeatable reading and marking routine.',
    sections: [
      {
        heading: 'Understand the hierarchy of marks',
        paragraphs: [
          'On a common imperial tape, the longest numbered marks indicate whole inches. The next-longest mark splits the inch in half, the next level indicates quarters, and shorter marks divide the inch into eighths and sixteenths. Each level doubles the denominator because it doubles the number of equal spaces.',
          'Read from the largest known division toward the smallest. For 11/16, locate 1/2, move past 5/8, and land one sixteenth later. This is faster and less error-prone than counting eleven tiny marks from zero.',
        ],
        bullets: ['Whole inch: numbered line', 'Half inch: 1/2', 'Quarter inch: 1/4 and 3/4', 'Eighth inch: odd eighths between quarters', 'Sixteenth inch: shortest standard marks'],
      },
      {
        heading: 'Reduce fractions before taking them to the tape',
        paragraphs: [
          'A calculated answer such as 24/32 is mathematically correct but visually awkward. Divide numerator and denominator by their greatest common factor: 24/32 becomes 3/4. Reduced fractions match the hierarchy printed on the tape and make the target mark easier to recognize.',
          'When a decimal measurement comes from software, select a shop precision before converting. Rounding 6.683 inches to 1/16 produces 6 11/16. Rounding to 1/32 produces 6 11/16 as well, but the converter should still show the rounding error so you understand what was discarded.',
        ],
      },
      {
        heading: 'Use one reference edge',
        paragraphs: [
          'Choose a reference face and reference edge after milling, mark them, and take related measurements from those same surfaces. Switching edges silently transfers thickness variation and out-of-square errors into the layout.',
          'For repeated marks, calculate and mark every position from the same zero point. Stepping 6 13/32 inches six times allows each pencil and rounding error to accumulate. A list of cumulative marks—6 13/32, 12 13/16, 19 7/32—keeps each mark independent.',
        ],
      },
      {
        heading: 'Account for the tape hook and the pencil line',
        paragraphs: [
          'The metal hook is designed to slide by approximately its own thickness so inside and outside measurements share the same zero. A bent, clogged or loose hook beyond its intended travel changes every measurement. Compare the first few inches against a trusted rule before precision work.',
          'A thick pencil line is a range, not a coordinate. Use a knife line for joinery, or consistently keep the saw kerf on the waste side of a sharp pencil mark. Label the waste side immediately so the correct half of the line survives the cut.',
        ],
      },
    ],
    takeaway: 'Read marks by halves, reduce the fraction, work from one reference edge and keep the cutting tool on the waste side. Those four habits prevent more mistakes than memorizing a chart.',
    relatedTools: ['fraction-calculator', 'decimal-fraction-converter', 'equal-spacing-calculator'],
    sourceKeys: ['nistLength', 'nistHandbook'],
  },
  {
    slug: 'saw-kerf-explained',
    title: 'Saw Kerf Explained: The Missing Eighth Inch',
    description: 'Understand how blade kerf changes cut lists, repeated-part yield and which side of a layout line to cut.',
    category: 'Cutting',
    readTime: '6 min read',
    publishedAt: '2026-09-04',
    updatedAt: '2026-09-04',
    intro: 'Kerf is the slot removed by a cutting tool. It is small enough to ignore once and large enough to ruin the final part when ignored repeatedly. Planning with kerf connects the numbers on a cut list to the physical loss created by the blade.',
    sections: [
      {
        heading: 'Blade thickness is not always kerf width',
        paragraphs: [
          'A circular-saw or table-saw blade has a steel plate and cutting teeth. The teeth can project wider than the plate, so the slot they leave may be wider than the plate itself. Runout, tooth geometry and blade condition also influence the actual cut.',
          'For a generous rough estimate, the kerf printed by the manufacturer is adequate. For a tight repeated layout, make one clean cut in representative material and measure the slot or compare the before-and-after width with reliable calipers.',
        ],
      },
      {
        heading: 'Place the kerf on the waste side',
        paragraphs: [
          'The layout line represents the finished edge. If the blade is centered on that line, roughly half the kerf is removed from the intended part. Instead, align the edge of the tooth with the waste side so the full line remains on the keeper piece until the final pass.',
          'A stop block changes the workflow: set the distance from the stop to the correct side of the blade, make a test piece, and measure that piece before producing the batch. Do not compensate by nudging every board by eye.',
        ],
      },
      {
        heading: 'Count cuts, not gaps between finished pieces',
        paragraphs: [
          'A conservative cut-list estimate charges one kerf for every finished piece. A factory end can occasionally eliminate a final cut, but rough stock often needs squaring and the last offcut may not be usable. Conservative planning is more useful than a theoretical result that leaves no room for cleanup.',
          'For eight 11 7/8-inch parts with a 1/8-inch blade, the parts consume 95 inches and eight kerfs consume another inch. That fills a 96-inch board exactly before any end trim. A quarter-inch squaring allowance means the same list no longer fits.',
        ],
      },
      {
        heading: 'Separate budgeting from final layout',
        paragraphs: [
          'A calculator answers whether dimensions fit in ideal straight stock. The final shop layout must also respond to knots, checks, bow, grain direction, color matching and the sequence of reference cuts. Buy and rough-cut with enough margin for those decisions.',
        ],
        bullets: ['Use measured kerf for tight batches', 'Reserve stock for squaring ends', 'Mark the waste side', 'Test one finished part before cutting the run'],
      },
    ],
    takeaway: 'Kerf is a material cost and a positioning decision. Measure it, count it, and place it entirely on the waste side of the finished line.',
    relatedTools: ['kerf-calculator', 'cut-list-optimizer', 'fraction-calculator'],
    sourceKeys: ['oshaWoodworking', 'nistLength'],
  },
  {
    slug: 'board-feet-and-lumber-buying',
    title: 'Board Feet, Quarter Sawn Labels and a Real Lumber Budget',
    description: 'Translate rough-lumber dimensions and board-foot prices into a usable project purchase estimate.',
    category: 'Materials',
    readTime: '8 min read',
    publishedAt: '2026-09-04',
    updatedAt: '2026-09-04',
    intro: 'Hardwood is commonly priced by volume rather than by a simple per-board sticker. Understanding board feet lets you compare sizes, estimate a project and recognize why the final invoice differs from the neat finished dimensions on a drawing.',
    sections: [
      {
        heading: 'What one board foot represents',
        paragraphs: [
          'One board foot is 144 cubic inches: a board 1 inch thick, 12 inches wide and 12 inches long. Any combination with the same volume is also one board foot. A 2-inch-thick board that is 6 inches wide and 12 inches long has the same 144-cubic-inch volume.',
          'The working formula is thickness in inches multiplied by width in inches multiplied by length in inches, divided by 144. Multiply by quantity only after confirming whether the dimensions describe every board or an average.',
        ],
      },
      {
        heading: 'Quarter notation describes rough thickness',
        paragraphs: [
          'Rough hardwood thickness is often written in quarters: 4/4 is nominally one inch, 5/4 is one and one-quarter inches, and 8/4 is two inches before surfacing. The usable finished thickness is smaller after flattening and planing.',
          'Ask whether the dealer calculates board feet from the nominal rough thickness or the actual surfaced thickness. Also ask whether lengths are tallied exactly or rounded up to a pricing increment. The calculator can reproduce either convention only when you enter the convention the seller uses.',
        ],
      },
      {
        heading: 'Waste is not one universal percentage',
        paragraphs: [
          'A simple painted project using straight, uniform stock may need only 10–15% extra. Furniture that requires grain continuity, color matching and clear faces can require 20–35%. Wide, defect-prone or live-edge boards need decisions that a percentage cannot capture.',
          'Break the allowance into causes: milling loss, crosscut defects, rip-width combinations, grain selection and one recovery part. This turns “buy 20% extra” into a plan rather than a superstition.',
        ],
        bullets: ['Milling and squaring allowance', 'Knots, checks and sapwood exclusions', 'Grain and color matching', 'One replacement part for risky operations'],
      },
      {
        heading: 'Build the purchase estimate in two passes',
        paragraphs: [
          'First, calculate the clean finished volume from the project list. Second, convert each finished thickness and width into realistic rough stock and add the appropriate waste. Apply the supplier’s price only after this second pass.',
          'The result remains an estimate until actual boards are selected. Random-width lumber can be efficient when part widths are flexible, but it requires evaluating every board against the cut list before purchase.',
        ],
      },
    ],
    takeaway: 'Calculate clean volume, translate it into rough stock, add waste for specific reasons, and verify how the yard tallies thickness and length.',
    relatedTools: ['board-foot-calculator', 'cut-list-optimizer', 'plywood-sheet-estimator'],
    sourceKeys: ['woodHandbook'],
  },
  {
    slug: 'cut-list-planning-workflow',
    title: 'A Cut-List Workflow That Survives the Workshop',
    description: 'Turn project dimensions into a reliable milling and cutting sequence without losing reference faces or grain decisions.',
    category: 'Planning',
    readTime: '8 min read',
    publishedAt: '2026-09-04',
    updatedAt: '2026-09-04',
    intro: 'A cut list is not only a shopping list. It is a record of finished sizes, rough allowances, grain priorities and the order that parts become trustworthy. A good list reduces arithmetic while preserving the choices a computer cannot make.',
    sections: [
      {
        heading: 'Separate finished size from rough size',
        paragraphs: [
          'Keep one column for final thickness, width and length, and a second for the rough blank. If the same number serves both purposes, it becomes impossible to tell whether milling allowance has already been added.',
          'Long parts often need more length allowance than short parts because end checks and jointer snipe consume a larger absolute distance. Width and thickness allowances depend on stock condition and the flattening process, not a single rule copied to every project.',
        ],
      },
      {
        heading: 'Name identical-looking parts by role',
        paragraphs: [
          '“Rail, quantity four” is ambiguous if two rails receive grooves and two receive mortises. Give each part a stable name tied to location or operation: upper front rail, lower back rail, left stile. Labels reduce the chance of machining the correct dimension on the wrong face.',
          'Mark reference faces and edges on the physical blanks using the same abbreviations that appear on the list. The list then stays connected to the material after parts leave the milling area.',
        ],
      },
      {
        heading: 'Optimize only after grain decisions',
        paragraphs: [
          'A length optimizer can reduce offcuts, but it cannot see cathedral grain on a door rail, color transitions across a tabletop or a defect hidden under chalk. Choose show faces and matching groups before accepting the shortest theoretical layout.',
          'Reserve contiguous stock for parts that should visually relate. Run the remaining utility parts through the optimizer and keep the plan as a guide rather than a command.',
        ],
      },
      {
        heading: 'Cut one, verify, then batch',
        paragraphs: [
          'The first completed part tests the arithmetic, machine setup and measuring convention. Compare it with the drawing and mating hardware before producing the rest of the batch. A stop block provides consistency only after its position is correct.',
        ],
        bullets: ['Confirm finished size', 'Check joinery reference face', 'Test the mating part or hardware', 'Record any corrected dimension on the master list'],
      },
    ],
    takeaway: 'Use the optimizer for material allocation, but keep finished size, rough size, reference faces and grain choices under explicit human control.',
    relatedTools: ['cut-list-optimizer', 'kerf-calculator', 'board-foot-calculator'],
    sourceKeys: ['woodHandbook', 'oshaWoodworking'],
  },
  {
    slug: 'drawer-slide-clearance-guide',
    title: 'Drawer Slide Clearances: Measure First, Calculate Second',
    description: 'Plan drawer-box width and depth around the actual opening and the hardware manufacturer’s requirements.',
    category: 'Cabinetry',
    readTime: '7 min read',
    publishedAt: '2026-09-04',
    updatedAt: '2026-09-04',
    intro: 'Drawer slides fail quietly on paper: a familiar half-inch clearance is copied into a design even though the chosen hardware needs something different. The reliable workflow begins with the slide specification and the smallest measured cabinet opening.',
    sections: [
      {
        heading: 'Treat total clearance and per-side clearance differently',
        paragraphs: [
          'Many side-mount ball-bearing slides use approximately one-half inch per side, or one inch total. That familiar dimension is not universal. Undermount slides reference inside drawer dimensions, bottom recesses, notches and locking devices. Center-mount and wooden runners use other relationships.',
          'Write “total side clearance” beside the calculator input. This prevents a one-half-inch-per-side instruction from being subtracted only once, or a total dimension from being subtracted twice.',
        ],
      },
      {
        heading: 'Measure the opening at multiple positions',
        paragraphs: [
          'Measure width at the front, middle and back, then use the smallest relevant width. Check diagonals or use a square to understand whether a narrow reading comes from taper or racking. A perfectly sized rectangular drawer will not travel through a twisted opening.',
          'Face-frame cabinets may require blocking or rear brackets to place the slide members in one plane. The nominal cabinet width does not reveal that geometry, so calculate from the surfaces that will actually support the hardware.',
        ],
      },
      {
        heading: 'Choose depth from available slide lengths',
        paragraphs: [
          'Usable cabinet depth is not automatically drawer depth. Reserve space for the closed front, cabinet back, inset obstacles and the manufacturer’s rear clearance. Select a standard slide length that fits, then make the box depth suit that hardware.',
          'Check hinge intrusion on pull-out trays and drawers behind doors. A door that opens slightly past 90 degrees can still leave a hinge or door edge inside the drawer path.',
        ],
      },
      {
        heading: 'Verify one physical box before batching',
        paragraphs: [
          'Build or dry-assemble one representative box, install both slide members and confirm movement through the full travel. Finish thickness, edge banding and an out-of-square box can consume the small tolerance left by the calculation.',
        ],
        bullets: ['Use the hardware manual', 'Measure the smallest opening', 'Keep slide members parallel', 'Test one box before batch production'],
      },
    ],
    takeaway: 'The calculator converts a verified hardware requirement into dimensions; it cannot replace the slide specification or a physical test installation.',
    relatedTools: ['drawer-box-calculator', 'cabinet-door-calculator', 'shelf-spacing-calculator'],
    sourceKeys: ['blumRunners'],
  },
  {
    slug: 'cabinet-door-overlay-and-reveal',
    title: 'Cabinet Door Overlay and Reveal, Made Measurable',
    description: 'Understand overlay, inset reveal and paired-door gaps before calculating finished cabinet-door size.',
    category: 'Cabinetry',
    readTime: '7 min read',
    publishedAt: '2026-09-04',
    updatedAt: '2026-09-04',
    intro: 'Door sizing becomes straightforward when every gap is assigned to a specific edge. Problems begin when “half-inch overlay” is applied without checking adjacent doors, face-frame width or the hinge’s supported range.',
    sections: [
      {
        heading: 'Overlay belongs to an opening edge',
        paragraphs: [
          'An overlay door extends beyond the opening and covers part of the cabinet face. A one-half-inch overlay on a single opening adds one-half inch at the left, right, top and bottom. Finished width therefore grows by one inch, not one-half inch.',
          'Shared face-frame stiles can support doors from adjacent openings. Draw the complete front elevation and assign the desired reveal between finished doors before selecting overlay. The hinge must support the resulting door position.',
        ],
      },
      {
        heading: 'Inset reveal is subtracted from the opening',
        paragraphs: [
          'An inset door sits within the opening, so clearance is removed at every edge. A 1/16-inch reveal on the left and right reduces a single door’s width by 1/8 inch. Top and bottom reveals reduce height by the same combined amount.',
          'Solid-wood doors move with seasonal humidity. The reveal must remain functional across that movement, finishing thickness and any small cabinet variation. A mathematically tiny reveal is not automatically a better-looking or more durable result.',
        ],
      },
      {
        heading: 'A pair needs a separate center gap',
        paragraphs: [
          'For paired doors, first calculate the total finished coverage or inset space. Subtract the center gap once, then divide by two. Subtracting a full gap from each door accidentally doubles the intended reveal.',
          'Decide whether the pair uses an astragal, shiplap or plain meeting edges. Those details can change machining and apparent gap even when the outside dimensions remain the same.',
        ],
      },
      {
        heading: 'Test hinge geometry before committing',
        paragraphs: [
          'Use the hinge manufacturer’s boring distance, plate height and overlay chart. Make a scrap corner or test door when the project uses thick doors, edge profiles or an unusually large overlay. The calculator establishes the rectangle; the hardware controls its motion.',
        ],
      },
    ],
    takeaway: 'Add overlay at every outside edge, subtract inset reveal at every inside edge, reserve one center gap for a pair, and verify the result against the hinge chart.',
    relatedTools: ['cabinet-door-calculator', 'drawer-box-calculator', 'equal-spacing-calculator'],
    sourceKeys: ['blumHinges'],
  },
];

export const getGuide = (slug: string) => guides.find((guide) => guide.slug === slug);
