export type Source = {
  title: string;
  url: string;
  publisher?: string;
};

export type Evidence = {
  question: string;
  method: string;
  result: string;
  limitation: string;
  environment?: string;
  measurements?: Array<{ label: string; value: string; basis: string }>;
  reproduce?: string[];
};

export type LabSection = {
  title: string;
  paragraphs: string[];
  steps?: string[];
};

export type LabContent = {
  slug: string;
  type: "reference" | "experiment";
  title: string;
  description: string;
  category: string;
  published: string;
  updated: string;
  lastVerified: string;
  sections: LabSection[];
  sources: Source[];
  evidence?: Evidence;
  related: Array<{ label: string; href: string }>;
};

export const marketplaceReferences: LabContent[] = [
  {
    slug: "etsy",
    type: "reference",
    title: "Etsy Listing Photo Requirements: File Types, Sizes and Upload Fixes",
    description:
      "Check Etsy's supported photo types, pixel recommendations, upload-size warnings and thumbnail workflow using directly linked Etsy help sources.",
    category: "Etsy reference",
    published: "2026-09-22",
    updated: "2026-09-23",
    lastVerified: "2026-09-23",
    sections: [
      {
        title: "Check the file type before exporting",
        paragraphs: [
          "Etsy's current image guidance lists JPG, GIF, PNG, SVG and HEIC. It does not list WebP, even though Image Prep can export WebP and Image QA can inspect it. For an Etsy upload, choose JPG or PNG in this tool and confirm the file type in the listing draft. Renaming a WebP file does not convert it.",
          "Etsy says animated GIFs and transparent PNGs are not supported as expected; transparent areas may appear black. Image Prep composites transparent inputs onto the selected background, so choose that background deliberately. Check Etsy's linked requirements again if its supported formats change.",
        ],
      },
      {
        title: "Treat pixel dimensions as guidance, not a magic threshold",
        paragraphs: [
          "Etsy recommends listing images at least 2000 pixels wide and high. Its image guidance also says the first photo should be at least 635 pixels in both dimensions to avoid reduced search appearance. The Search Visibility page separately recommends a 2000 × 2000 main photo. These are platform recommendations; meeting a pixel count alone does not guarantee search placement, acceptance or a sharp result.",
          "The guidance allows a landscape or square first image and recommends leaving room around the subject for thumbnail treatment. Do not enlarge a small original just to hit a number: added canvas pixels cannot restore missing detail. Use Etsy's own thumbnail adjustment tool to inspect the actual crop.",
        ],
      },
      {
        title: "Upload size advice is not one universal cap",
        paragraphs: [
          "Etsy's image-requirements page warns that files over 1 MB may not finish uploading, especially on a slow connection. Its listing-creation help page separately says images over 300 KB may time out. Those statements are not the same as a single guaranteed file-size limit; connection conditions and the upload flow matter.",
          "If an upload stalls, test one image on a stable connection, then reduce dimensions or JPG quality in small steps and compare the result. Keep text, texture and product edges legible. Check the draft listing rather than treating a particular kilobyte target as a platform rule.",
        ],
      },
      {
        title: "Check composition, color and the final listing",
        paragraphs: [
          "Etsy may compress images after upload, which can make them look less sharp. Etsy also converts images to sRGB; if colors shift, convert the source to sRGB before uploading and compare the listing preview with the original.",
          "The Search Visibility page checks more than image dimensions: it also calls out a clear main photo of one finished product rather than a collage, at least one listing photo, category details and shop/customer-service signals. Treat the page as a diagnostic checklist, not a ranking promise. Image optimization cannot replace accurate listing information or a useful product offer.",
        ],
      },
      {
        title: "A repeatable pre-publish check",
        paragraphs: [
          "Use representative images that expose different risks: the main product view, an edge-sensitive detail and an image containing small text or transparency. A crop preview catches some framing problems, but only Etsy's own draft and thumbnail previews show how the platform currently presents the upload.",
        ],
        steps: [
          "Confirm that the export type is supported by Etsy; use JPG or PNG from Image Prep.",
          "Check the source dimensions and composition without enlarging a low-detail original to chase a number.",
          "Inspect the exported file at normal size and at 100%, including edges, text and important color.",
          "Upload one representative file to a draft and inspect Etsy's thumbnail adjustment and listing preview.",
          "If an upload times out, test one file and adjust dimensions or compression gradually instead of assuming a universal size cap.",
          "Record the official source and checked date when you reuse this workflow.",
        ],
      },
      {
        title: "Known limits",
        paragraphs: [
          "Image QA can identify a file type and dimensions; Image Prep can create local exports. Neither tool checks Etsy account status, listing policy, image attractiveness, accurate product representation or the exact crop on every search and collection surface. A correct export is one technical check, not a promise of visibility or sales.",
        ],
      },
    ],
    sources: [
      {
        title: "Etsy: Requirements and Best Practices for Images in Your Etsy Shop",
        url: "https://help.etsy.com/hc/en-us/articles/115015663347-Requirements-and-Best-Practices-for-Images-in-Your-Etsy-Shop",
        publisher: "Etsy Help",
      },
      {
        title: "Etsy: How to Use the Search Visibility Page",
        url: "https://help.etsy.com/hc/en-gb/articles/25869947521175-How-to-Use-the-Etsy-Search-Visibility-Page",
        publisher: "Etsy Help",
      },
      {
        title: "Etsy: How to Create a Listing",
        url: "https://help.etsy.com/hc/en-us/articles/115015628707-How-to-Create-a-Listing",
        publisher: "Etsy Help",
      },
    ],
    related: [
      { label: "Crop geometry experiment", href: "/experiments/crop-geometry/" },
      { label: "Image QA tool", href: "/tools/image-qa/" },
      { label: "Etsy thumbnail crop checklist", href: "/guides/thumbnail-crop-checklist/" },
      { label: "Reduce photo size without losing important detail", href: "/guides/file-size-and-quality/" },
    ],
  },
  {
    slug: "shopify",
    type: "reference",
    title: "Shopify Product Image Reference: Consistency Before Pixel Chasing",
    description:
      "A practical Shopify image reference that distinguishes the platform's media guidance from independent checks for consistent product grids.",
    category: "Shopify reference",
    published: "2026-09-22",
    updated: "2026-09-22",
    lastVerified: "2026-09-22",
    sections: [
      {
        title: "What the official guidance does and does not decide",
        paragraphs: [
          "Shopify's product media documentation describes supported media and image presentation considerations. A single pixel preset cannot override a theme's crop, card ratio or responsive behavior.",
          "Use one aspect ratio for images that appear together when the visual goal is a calm collection grid. Use a different ratio when the product or theme genuinely requires it; consistency is not a reason to crop away important information.",
        ],
      },
      {
        title: "A practical comparison",
        paragraphs: [
          "Prepare one landscape and one portrait original at the same target canvas. Compare the output side by side, then inspect the actual storefront at desktop and phone widths. Equal canvases do not guarantee equal apparent product size if the originals contain different amounts of empty space.",
        ],
        steps: [
          "Read Shopify's current product media guidance and record the verification date.",
          "Choose the aspect ratio used by the theme or the product family, not a generic internet template.",
          "Use Fit when preserving the full object matters; use Fill only when the removed area is expendable.",
          "Check the uploaded images in the actual theme and collection view.",
        ],
      },
      {
        title: "Known limits",
        paragraphs: [
          "Seller Operations Lab cannot see your Shopify theme, CDN transformation settings or storefront breakpoints. The final storefront preview remains the authoritative presentation check.",
        ],
      },
    ],
    sources: [
      {
        title: "Shopify: Product media types",
        url: "https://help.shopify.com/en/manual/products/product-media/product-media-types",
        publisher: "Shopify Help Center",
      },
    ],
    related: [
      { label: "Crop geometry experiment", href: "/experiments/crop-geometry/" },
      { label: "Image Prep tool", href: "/tools/image-prep/" },
      { label: "Product grid guide", href: "/guides/consistent-product-grid/" },
    ],
  },
];

export const experiments: LabContent[] = [
  {
    slug: "jpg-png-webp",
    type: "experiment",
    title: "JPG, PNG or WebP for Product Photos? A Reference Encoder Benchmark",
    description:
      "A reproducible reference-encoder comparison of image formats, with a clear record of what varies by encoder and source image.",
    category: "Format experiment",
    published: "2026-09-22",
    updated: "2026-09-22",
    lastVerified: "2026-09-22",
    evidence: {
      question: "Which output format gives a useful starting point for a product photograph?",
      method:
        "Rasterize one deterministic 1600 × 1200 fixture with the repository's sharp reference encoder. Export the same pixels as JPG and WebP at quality 85 and as PNG, then compare the actual bytes. The browser tool can produce different numbers and is tested separately.",
      result:
        "On the checked fixture, JPG was 34,980 bytes, PNG was 64,198 bytes and WebP at quality 85 was 14,846 bytes. This single fixture demonstrates why format choice changes bytes; it does not establish a universal winner or prove marketplace acceptance.",
      limitation:
        "This is a repeatable reference-encoder comparison, not a universal compression benchmark. It does not test every browser, color profile or marketplace pipeline; run the browser workflow separately before relying on a result.",
      environment:
        "Node sharp reference encoder, deterministic SVG fixture rasterized to 1600 × 1200, JPG/WebP quality 85. The values below are repository measurements from that exact fixture, not Etsy requirements.",
      measurements: [
        {
          label: "Controlled input",
          value: "1600 × 1200 deterministic fixture",
          basis: "Same rasterized pixels for every output",
        },
        {
          label: "Primary output",
          value: "JPG 34,980 B · PNG 64,198 B · WebP 14,846 B",
          basis: "sharp reference encoder; quality 85 for JPG/WebP",
        },
        {
          label: "Visual checks",
          value: "Compare texture, text and edges at normal size and 100%",
          basis: "Visual follow-up still depends on the browser and destination",
        },
      ],
      reproduce: [
        "Run `node scripts/measure-format-fixture.mjs` from the repository to reproduce the reference values.",
        "Use Image Prep to export the same source as JPG, PNG and WebP in your browser.",
        "Record each browser file's MIME type and byte count from Image QA; do not substitute the reference values.",
        "Repeat with a second image containing text or transparency, then report the browser used.",
      ],
    },
    sections: [
      {
        title: "Hold the variables still",
        paragraphs: [
          "A fair format comparison changes one encoding choice at a time. Start from the original for every export; re-encoding a previously compressed file can add artifacts that obscure the result.",
        ],
        steps: [
          "Use the same source image and target dimensions for every output.",
          "Record the actual output MIME type and byte count, not only the selected extension.",
          "Inspect fine texture, text, diagonal edges and flat color at normal viewing size.",
          "Repeat with a second image whose texture and background differ.",
        ],
      },
      {
        title: "Interpret the result carefully",
        paragraphs: [
          "A smaller file is not automatically a better file. A product label that becomes unreadable or a color that shifts in a way your storefront cannot tolerate may outweigh the byte reduction. PNG can be appropriate for crisp graphics, but it is not a promise of small photographs.",
        ],
      },
    ],
    sources: [
      {
        title: "Seller Operations Lab: deterministic format fixture script",
        url: "https://github.com/huynjuunn-glitch/Milo/blob/main/scripts/measure-format-fixture.mjs",
        publisher: "Seller Operations Lab",
      },
      {
        title: "MDN: HTMLCanvasElement.toBlob()",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob",
        publisher: "MDN Web Docs",
      },
    ],
    related: [
      { label: "Run Image Prep", href: "/tools/image-prep/" },
      { label: "Browser limits experiment", href: "/experiments/browser-limits/" },
      { label: "File quality guide", href: "/guides/file-size-and-quality/" },
    ],
  },
  {
    slug: "crop-geometry",
    type: "experiment",
    title: "Crop Geometry: How Much of a Product Image Can a Thumbnail Remove?",
    description:
      "Use transparent calculations and controlled frames to see what centered 1:1, 4:3 and 3:4 crops remove from the same source.",
    category: "Framing experiment",
    published: "2026-09-22",
    updated: "2026-09-22",
    lastVerified: "2026-09-22",
    evidence: {
      question: "What content is removed when one image is shown in different aspect ratios?",
      method:
        "Render the same prepared image into centered square, landscape and portrait canvases. Calculate the retained source rectangle before checking the visual result.",
      result:
        "For a 2000 × 2000 square, a centered 4:3 crop removes 250 pixels from the top and bottom, while a centered 3:4 crop removes 250 pixels from each side. The calculation changes with every source ratio.",
      limitation:
        "These frames illustrate geometry only. A real storefront may use a different crop position, focal point or responsive container.",
      environment:
        "Deterministic aspect-ratio calculations using a 2000 × 2000 source and centered frames. The calculations are independent of a marketplace UI; the visual preview still needs a browser check.",
      measurements: [
        {
          label: "4:3 frame",
          value: "2000 × 1500; 250 px removed from top and bottom",
          basis: "2000 − 1500 = 500 total vertical pixels",
        },
        {
          label: "3:4 frame",
          value: "1500 × 2000; 250 px removed from left and right",
          basis: "2000 − 1500 = 500 total horizontal pixels",
        },
        {
          label: "1:1 frame",
          value: "2000 × 2000; no crop on a square source",
          basis: "Same source and output aspect ratio",
        },
      ],
      reproduce: [
        "Start with a square test image and mark its four edges.",
        "Render centered 4:3 and 3:4 frames at the same scale.",
        "Compare the calculated removed pixels with the visible preview.",
        "Repeat with a non-square source before applying the result to a listing.",
      ],
    },
    sections: [
      {
        title: "The geometry",
        paragraphs: [
          "A centered crop keeps the smaller dimension and trims the larger one. On a 2000 × 2000 source, a 4:3 frame is 2000 × 1500, so 500 vertical pixels are removed in total. A 3:4 frame is 1500 × 2000, so 500 horizontal pixels are removed in total.",
          "Those pixels are not inherently unimportant. A handle, label or accessory near the edge can be more valuable than empty background in the center.",
        ],
      },
      {
        title: "The visual check",
        paragraphs: [
          "Use a crop preview after preparing the image, then inspect it at approximately the size a customer will see. A centered crop is useful for identifying risk, not for claiming that a marketplace uses the same frame.",
        ],
        steps: [
          "Mark the full product boundary before choosing a crop.",
          "Compare square, landscape and portrait frames.",
          "Move the source composition or add margin when a meaningful edge is clipped.",
          "Verify the final listing preview after upload.",
        ],
      },
    ],
    sources: [
      {
        title: "MDN: CanvasRenderingContext2D.drawImage()",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage",
        publisher: "MDN Web Docs",
      },
    ],
    related: [
      { label: "Etsy image reference", href: "/marketplace/etsy/" },
      { label: "Fit versus fill guide", href: "/guides/fit-vs-fill/" },
      { label: "Image Prep tool", href: "/tools/image-prep/" },
    ],
  },
  {
    slug: "browser-limits",
    type: "experiment",
    title: "Browser Image Limits: Why a Small Photo File Can Use a Lot of Memory",
    description:
      "A reproducible explanation of pixel buffers, browser limits and why local processing still needs conservative batch sizes.",
    category: "Browser experiment",
    published: "2026-09-22",
    updated: "2026-09-22",
    lastVerified: "2026-09-22",
    evidence: {
      question: "Why can an apparently small image make a browser tab slow or fail?",
      method:
        "Compare compressed file bytes with the decoded pixel count. A basic RGBA buffer uses roughly four bytes per pixel before canvases, thumbnails and browser overhead.",
      result:
        "A 4000 × 3000 image contains 12 million pixels and needs roughly 48 MB for one raw RGBA buffer. Several copies can exist during decode, preview and export.",
      limitation:
        "The estimate is a teaching model, not a device memory guarantee. Browser implementations, color depth and concurrent tabs vary.",
      environment:
        "RGBA estimate: decoded pixel count × 4 bytes. It describes one raw buffer before browser overhead, duplicate canvases, thumbnails or other tabs.",
      measurements: [
        {
          label: "2000 × 2000",
          value: "4,000,000 pixels ≈ 16 MB per RGBA buffer",
          basis: "4,000,000 × 4 bytes",
        },
        {
          label: "4000 × 3000",
          value: "12,000,000 pixels ≈ 48 MB per RGBA buffer",
          basis: "12,000,000 × 4 bytes",
        },
        {
          label: "6000 × 4000",
          value: "24,000,000 pixels ≈ 96 MB per RGBA buffer",
          basis: "24,000,000 × 4 bytes",
        },
      ],
      reproduce: [
        "Record the compressed file size before opening the image.",
        "Multiply width × height × 4 to estimate one RGBA buffer.",
        "Process one file, then a small batch, and note when the browser slows down.",
        "Repeat on the device that will actually be used; do not treat the estimate as a memory limit.",
      ],
    },
    sections: [
      {
        title: "Compressed bytes are not decoded memory",
        paragraphs: [
          "A JPG may occupy only a few megabytes on disk while expanding into millions of pixels in memory. The browser needs decoded data to draw a canvas, create a thumbnail and encode a new result.",
          "The Image Prep tool limits files to 24 megapixels, 20 MB per input, 20 files and 100 MB total input. The limits reduce risk; they cannot guarantee a successful run on every phone or low-memory device.",
        ],
      },
      {
        title: "A safer batch routine",
        paragraphs: [],
        steps: [
          "Test one landscape and one portrait image first.",
          "Process smaller batches when the device becomes slow.",
          "Reduce output dimensions before assuming a format change will solve memory pressure.",
          "Keep originals outside the browser and inspect every downloaded result.",
        ],
      },
    ],
    sources: [
      {
        title: "MDN: ImageData and pixel data",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/ImageData",
        publisher: "MDN Web Docs",
      },
      {
        title: "MDN: createImageBitmap()",
        url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/createImageBitmap",
        publisher: "MDN Web Docs",
      },
    ],
    related: [
      { label: "Browser troubleshooting guide", href: "/guides/browser-image-troubleshooting/" },
      { label: "Image Prep tool", href: "/tools/image-prep/" },
      { label: "Methods and limits", href: "/methodology/" },
    ],
  },
];

export const allLabContent = [...marketplaceReferences, ...experiments];
