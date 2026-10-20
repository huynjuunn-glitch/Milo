import measured from "../../public/evidence/manifest.json" with { type: "json" };

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
    title: "Etsy Image Requirements",
    description:
      "Check Etsy's supported photo types, pixel recommendations, upload-size warnings and thumbnail workflow using directly linked Etsy help sources.",
    category: "Etsy reference",
    published: "2026-09-22",
    updated: "2026-10-20",
    lastVerified: "2026-10-20",
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
    title: "Shopify Image Requirements",
    description:
      "Current Shopify image limits, format guidance and collection-image behavior, with a practical check that accounts for theme crops and this site's tool limits.",
    category: "Shopify reference",
    published: "2026-09-22",
    updated: "2026-10-20",
    lastVerified: "2026-10-20",
    sections: [
      {
        title: "Current image limits and accepted formats",
        paragraphs: [
          "Shopify's product-media documentation, checked October 20, 2026, says product and collection images can be up to 5000 × 5000 pixels or 25 megapixels, and must be smaller than 20 MB. It lists PNG as the preferred format for most product images, followed by JPEG; it also lists TIFF, BMP, GIF, SVG, HEIC and WebP. It also supports animated GIF and WebP, unlike this site's static-image tools. Shopify's image service selects a format supported by each customer's web client.",
          "The 2048 × 2048 square recommendation applies to square product images that usually display best; it is not a universal upload requirement. Use the current linked help page if a platform rule matters to your workflow, because requirements can change.",
        ],
      },
      {
        title: "Why the collection can still look uneven",
        paragraphs: [
          "Shopify says consistent aspect ratios for featured images can help collection images appear the same size side by side. It also notes that themes can request consistent sizes from Shopify's CDN and that different image sizes are created for different theme areas. A matching source ratio can improve consistency, but theme crops and responsive layouts still affect the final display.",
          "Equal output canvases do not equalize the size of the objects inside them. If one source product fills 80% of its frame and another fills 40%, fitting both into the same square preserves the apparent-size difference. Added padding surrounds the source rectangle; it does not detect or trim empty background around a product.",
        ],
        steps: [
          "Choose the featured-image ratio used by the product family or theme, rather than assuming square is always best.",
          "Use Fit to preserve all source edges. Use Fill only if the part removed by cropping is genuinely expendable.",
          "Compare one portrait and one landscape product at the same output dimensions; note whether empty source margins cause unequal object scale.",
          "Upload representative images and inspect both the collection grid and product page on phone and desktop.",
        ],
      },
      {
        title: "Shopify limits versus Image Prep limits",
        paragraphs: [
          "Shopify allows images up to 5000 pixels per edge and 25 megapixels. Image Prep is deliberately smaller: it limits each output to 4096 pixels per edge and 12 megapixels. Shopify may accept file types this tool cannot open; Image Prep supports JPG, PNG and static WebP. A platform-valid file is not automatically within this browser tool's limits.",
          "Seller Operations Lab cannot see your store theme, its custom image settings or Shopify's final CDN response. Use the live theme preview as the presentation check; use this reference for the linked platform facts and the tool pages for local file checks.",
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
      { label: "Shopify product image sizes and a worked fit calculation", href: "/guides/consistent-product-grid/" },
      { label: "Crop geometry experiment", href: "/experiments/crop-geometry/" },
      { label: "Image Prep tool", href: "/tools/image-prep/" },
      { label: "Compare browser output formats", href: "/tools/format-compare/" },
    ],
  },
];

export const experiments: LabContent[] = [
  {
    slug: "jpg-png-webp", type: "experiment", title: "JPG, PNG and WebP Compared",
    description: "Six downloadable inputs and actual format exports show how photographs, text, patterns and noise change file-size results.",
    category: "Measured format comparison", published: "2026-09-22", updated: "2026-10-20", lastVerified: "2026-10-20",
    evidence: {
      question: "Does one image format always produce the smallest useful file?",
      method: "Normalize two CC0 photographs and four generated test fixtures to the same 1200 × 900 opaque canvas. Encode each unchanged input as JPG and WebP at quality 85 and as lossless PNG. Record dimensions, actual bytes and SHA-256 for the downloadable files.",
      result: "WebP is smaller than JPG for both photographs in this set. PNG strongly favors the repeated woven pattern, while the seeded noise has a smaller JPG than WebP. The table and downloadable files are the result; no universal winner is implied.",
      limitation: "Quality 85 is an encoder parameter, not equal perceptual quality across formats. The photographs were already JPEG-compressed before normalization. Synthetic stress cases do not represent a random sample of product photos. Browser and marketplace encoders can produce different files.",
      environment: `Node ${measured.encoder.node}; sharp ${measured.encoder.sharp}; libvips ${measured.encoder.vips}; measured ${measured.measuredOn}. PNG uses default lossless encoding; all format inputs are flattened onto white.`,
      reproduce: ["Download one normalized input and its three outputs below.", "Verify dimensions and actual bytes with Image QA or file properties; inspect lettering, edges and texture at 100%.", "Regenerate the reference files with npm run generate:evidence -- YYYY-MM-DD using the actual measurement date, then npm run test:evidence.", "Run the normalized input separately through the browser comparison tool and record that browser's own results."]
    },
    sections: [
      {title: "What stayed constant", paragraphs: ["Every row uses one normalized PNG input. Dimensions, background and source pixels remain unchanged while the format changes. Photographs are fitted to the canvas; the generated cases already use the target size. The normalized inputs are published so a repeat test does not depend on recreating a museum download or a drawing.", "The transparent test graphic is deliberately flattened to white before the three-format comparison. Its byte counts are therefore not an alpha-preservation test. The file-quality guide separately shows the transparent source and white/black composites."]},
      {title: "Interpret the trade-off", paragraphs: ["Repeated structures can compress efficiently in PNG. Random noise contains many unpredictable pixels and is deliberately difficult to compress. A photograph of a real fabric or a detailed label can behave differently from either generated fixture.", "Byte counts are reproducible; acceptable quality is a viewing decision. Compare important detail at normal display size and at 100%. No visual-quality score, marketplace acceptance, sales improvement or device-speed claim was measured."],steps:["Choose a destination-supported format before optimizing bytes.", "Compare outputs from the same input and dimensions.", "Inspect label text, edges and texture rather than only file size.", "Repeat with a second relevant image before committing to a batch setting."]}
    ],
    sources: [
      {title:"Evidence generator and recorded input sources",url:"https://github.com/huynjuunn-glitch/Milo/blob/main/scripts/generate-evidence.mjs",publisher:"Seller Operations Lab"},
      {title:"MDN: toBlob format and quality behavior",url:"https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob",publisher:"MDN Web Docs"}
    ],
    related:[{label:"Choose a format for your own photos",href:"/guides/file-size-and-quality/"},{label:"Compare your own image in this browser",href:"/tools/format-compare/"}]
  },
  {
    slug:"crop-geometry",type:"experiment",title:"How Center Crops Work",
    description:"Inspect actual square, landscape and portrait files from one image, with the retained dimensions and removed edges explained.",
    category:"Worked crop example",published:"2026-09-22",updated:"2026-10-20",lastVerified:"2026-10-20",
    evidence:{
      question:"Which edges disappear when a square image is center-cropped?",
      method:"Start from the published 800 × 800 square export. Extract an 800 × 600 landscape frame and a 600 × 800 portrait frame with equal removal on opposite edges. Save both resulting image files.",
      result:"The 4:3 export removes 100 pixels from both top and bottom; the 3:4 export removes 100 from both left and right. The downloadable images show what those pixels contained.",
      limitation:"This is a controlled crop demonstration, not an Etsy screenshot or evidence that every storefront uses the same focal point.",
      environment:"Published reference files generated with sharp. The dimensions are encoded in the files, and their hashes are in the manifest.",
      reproduce:["Download the square source from the examples below.", "In a crop-capable editor, select a centered 4:3 frame without scaling the source.", "Export and check that the output is 800 × 600.", "Repeat with a centered 3:4 frame and compare the removed image content."]
    },
    sections:[
      {title:"Calculate the retained frame",paragraphs:["For a square of side S, a centered 4:3 crop retains a height of 3S/4 and removes S/8 from each vertical edge. A 3:4 crop retains a width of 3S/4 and removes S/8 from each horizontal edge. With S = 800, that is 100 pixels at each affected edge.", "The same fractions apply to a larger square: a 2000 × 2000 source loses 250 pixels at each affected edge. A non-square source requires its own calculation. Do not carry the square example over to every source ratio."]},
      {title:"Judge the content removed",paragraphs:["The padded cup example has spare space at its sides, so removing side pixels need not remove the cup. The same crop could clip a handle in a tighter composition. Compare the actual product boundary, not merely the retained percentage.", "Use the separate thumbnail checklist to assess meaning, readability and the final marketplace preview. Its job is a publishing decision; this page provides the file geometry behind that decision."]}
    ],
    sources:[{title:"MDN: drawImage source and destination rectangles",url:"https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage",publisher:"MDN Web Docs"}],
    related:[{label:"Thumbnail review checklist",href:"/guides/thumbnail-crop-checklist/"},{label:"Choose Fit or Fill",href:"/guides/fit-vs-fill/"}]
  },
  {
    slug:"browser-limits",type:"experiment",title:"Why Small Files Need Memory",
    description:"Compare actual compressed file sizes with a transparent pixel-buffer calculation, without claiming a device memory benchmark.",
    category:"Technical explanation",published:"2026-09-22",updated:"2026-10-20",lastVerified:"2026-10-20",
    evidence:{
      question:"Why can a small file still demand substantial working memory?",
      method:"Read the dimensions and byte count of the published JPEG files. Separately calculate width × height × 4 as a teaching estimate for one 8-bit RGBA pixel buffer.",
      result:"A 1200 × 900 cup photo and a 1200 × 900 noise image have different compressed sizes but the same 4,320,000-byte one-buffer estimate. This result is arithmetic based on actual file dimensions.",
      limitation:"No total browser RAM, processing speed or mobile-device capacity was measured. Extra copies, decoders, canvases, color formats and other tabs change real memory use.",
      environment:"File metadata plus an explicitly identified RGBA calculation. Decimal MB means 1,000,000 bytes.",
      measurements:[{label:"2000 × 2000",value:"16 MB for one RGBA buffer",basis:"4,000,000 × 4 bytes"},{label:"4000 × 3000",value:"48 MB for one RGBA buffer",basis:"12,000,000 × 4 bytes"},{label:"6000 × 4000",value:"96 MB for one RGBA buffer",basis:"24,000,000 × 4 bytes"}],
      reproduce:["Download the cup and noise JPEGs from the examples below.", "Read each file's width, height and actual encoded bytes.", "Calculate width × height × 4 separately from the compressed byte size.", "Use a device's own profiler for a true memory measurement; do not label this estimate as measured RAM."]
    },
    sections:[
      {title:"The file and its decoded pixels",paragraphs:["JPEG and WebP store an encoded representation. To display or manipulate it, a browser decodes image information and may create canvases, thumbnails and additional buffers. Compression efficiency therefore does not describe all working-memory costs.", "The four-bytes-per-pixel model is useful for explaining scale. It is not a claim that every browser uses exactly that representation for every operation. High-bit-depth sources, decoder storage and implementation details can require a different amount."]},
      {title:"Use the distinction to diagnose",paragraphs:["When a tab struggles, test one image and reduce dimensions before assuming that changing the extension will fix it. Reducing both width and height by half reduces pixel count to one quarter; the visual result must still be sufficient for the destination.", "Image Prep limits batch size and output pixels to reduce risk. Those safeguards are not a guarantee that a low-memory device can complete the maximum batch. The troubleshooting guide gives the recovery procedure without presenting a theoretical estimate as a device benchmark."]}
    ],
    sources:[{title:"MDN: ImageData pixel representations",url:"https://developer.mozilla.org/en-US/docs/Web/API/ImageData",publisher:"MDN Web Docs"},{title:"MDN: createImageBitmap",url:"https://developer.mozilla.org/en-US/docs/Web/API/Window/createImageBitmap",publisher:"MDN Web Docs"}],
    related:[{label:"Recover from an export failure",href:"/guides/browser-image-troubleshooting/"},{label:"Inspect a file locally",href:"/tools/image-qa/"}]
  }
];
export const allLabContent = [...marketplaceReferences,...experiments];
