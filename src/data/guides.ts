export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: string;
  published: string;
  updated: string;
  related: string[];
  relatedLab?: Array<{ label: string; href: string }>;
  imageAlt: string;
  sections: { title: string; paragraphs: string[]; steps?: string[] }[];
  example?: { headers: string[]; rows: string[][] };
  source?: { title: string; url: string };
};

export const guides: Guide[] = [
  {
    slug: "fit-vs-fill",
    title: "Fit vs Fill for Product Photos",
    description: "Compare downloadable square exports from one portrait photo, then choose whether to preserve the source edges or fill the frame.",
    category: "Size and framing",
    published: "2026-09-07", updated: "2026-10-20",
    related: ["thumbnail-crop-checklist", "consistent-product-grid"],
    relatedLab: [{label:"Crop calculations and downloadable frames",href:"/experiments/crop-geometry/"}],
    imageAlt: "The same cup photograph fitted and cropped into square exports.",
    sections: [
      {title:"Choose the detail to protect",paragraphs:[
        "Choose Fit when the entire photograph must remain visible. The empty part of the output receives a background color. Choose Fill when covering the whole output is more important than retaining the source edges. Inspect exactly what is removed before accepting it.",
        "A photograph and the product inside it have different boundaries. Fit preserves the source rectangle, including any empty background already in that rectangle. It does not find a cup handle, remove a background or equalize the apparent sizes of different products."
      ]},
      {title:"Read the worked example",paragraphs:[
        "The source photograph below is portrait-shaped. Fitting it to a square preserves its top and bottom and introduces white side margins. Filling the square removes some of the background above and below the cup. In this particular composition, the cropped area is mostly background; a taller product in the same source frame could lose an important detail.",
        "The exported pixels, rather than the names of the settings, settle the comparison. Download both square results and open them at the same display size. Compare the cup rim, base, painted decoration and surrounding background. Changing the composition can change which mode is appropriate."
      ]},
      {title:"Repeat in any image editor",paragraphs:[
        "Use an editor with a canvas or crop control. Keep a copy of the original. A resize control alone may only change dimensions while preserving the original ratio; it may not create a square canvas at all."
      ],steps:[
        "Set the destination canvas, for example 800 × 800 pixels, and preserve the source proportions.",
        "For Fit, scale until the entire source fits inside the canvas and choose the background deliberately.",
        "For Fill, scale until the canvas is covered, then position the crop around the details that must survive.",
        "Export each variation separately from the original. Open the saved files and compare them side by side.",
        "Inspect the final marketplace draft as well, because the destination can apply another crop."
      ]},
      {title:"When neither mode works",paragraphs:[
        "If Fit makes the product too small, inspect the empty space in the original before increasing the output resolution. A tighter source composition can help more than a larger canvas. If Fill removes a handle, accessory or quantity-defining piece, reposition the crop or retain the complete frame.",
        "When a small source is enlarged, extra pixels do not restore a blurred label. Image Prep leaves enlargement off by default. Its margin applies to Fit, and Fill uses the chosen crop position. The reference example enables enlargement so both modes can cover the requested square; match that choice when reproducing it."
      ]}
    ],
    source:{title:"MDN: drawImage scaling and source/destination rectangles",url:"https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage"}
  },
  {
    slug:"thumbnail-crop-checklist",
    title:"Check Etsy Thumbnail Crops",
    description:"Use downloadable square, landscape and portrait crop examples to find edge risks, then verify the actual Etsy listing preview.",
    category:"Size and framing", published:"2026-09-07",updated:"2026-10-20",
    related:["fit-vs-fill","consistent-product-grid"],
    relatedLab:[{label:"Etsy requirements and current sources",href:"/marketplace/etsy/"}],
    imageAlt:"Three actual crops of the same cup image.",
    sections:[
      {title:"Identify meaningful edges",paragraphs:[
        "Before testing a crop, identify what tells a shopper what is included: the whole silhouette, a handle, a cable, a matching piece or packaging. A crop that removes that context can change the meaning of a listing even when the main object remains visible.",
        "The examples below start from one square export. A centered landscape frame removes image content vertically; a portrait frame removes it horizontally. This is a reproducible geometry example. Etsy's actual placement, focal position and current listing controls remain the final presentation check."
      ]},
      {title:"Test three viewing sizes",paragraphs:[
        "Check the full source, the crop and a small thumbnail. A label can survive the crop but become unreadable when the image is reduced. A narrow object can remain complete yet become difficult to recognize. The output needs to communicate clearly at the size at which it will be seen.",
        "Use the three downloadable examples to separate clipping from scale. The portrait crop of a padded square can remove empty side margins rather than the product. Conversely, a landscape crop may remove source content above and below the subject. A removed pixel count alone does not judge whether the crop is useful."
      ],steps:[
        "Write down the outermost meaningful detail before changing the frame.",
        "View each crop at approximately its eventual thumbnail size.",
        "Inspect whether the item, included quantity and key distinguishing detail are still clear.",
        "Use a separate detail image when small lettering cannot be read in the main thumbnail."
      ]},
      {title:"Verify inside Etsy",paragraphs:[
        "Etsy's image guidance recommends leaving enough border for square, portrait and landscape thumbnail views. It also provides a thumbnail adjustment tool when creating or editing a listing. Use that tool instead of assuming a locally prepared square dictates every placement. The platform reference on this site keeps the current pixel and file-type guidance in one place."
      ],steps:[
        "Upload one representative image to a draft rather than replacing a whole image set immediately.",
        "Open the thumbnail adjustment and inspect the views Etsy currently offers.",
        "Check that repositioning one view has not hidden an important edge in another.",
        "Reopen the saved draft at phone and desktop sizes before publishing."
      ]},
      {title:"Repair the source composition",paragraphs:[
        "When a crop clips the product, add space around the source or move the crop to protect it. When all views look too distant, use a tighter source image with sufficient breathing room. Repeatedly increasing pixel dimensions does not repair the relationship between the product and its background.",
        "Do not crop away pieces merely to make the main image more dramatic. A main image that stays truthful and readable is preferable to a tighter crop that suggests a different quantity or hides a distinguishing feature."
      ]}
    ],source:{title:"Etsy: image requirements and thumbnail best practices",url:"https://help.etsy.com/hc/en-us/articles/115015663347-Requirements-and-Best-Practices-for-Images-in-Your-Etsy-Shop"}
  },
  {
    slug:"consistent-product-grid",
    title:"Fix Uneven Product Image Grids",
    description:"See why identical image dimensions can still produce uneven product sizes, using two downloadable exports of the same photograph.",
    category:"Size and framing",published:"2026-09-07",updated:"2026-10-20",
    related:["fit-vs-fill","thumbnail-crop-checklist"],
    relatedLab:[{label:"Shopify limits and official image recommendations",href:"/marketplace/shopify/"}],
    imageAlt:"The same cup at two apparent sizes on identical square canvases.",
    sections:[
      {title:"Compare the subject, not just pixels",paragraphs:[
        "If two files have the same width and height but the products look different in size, inspect the space around each subject. Equal canvases do not equalize the objects inside them. A source with more empty background produces a smaller-looking product when the whole photo is fitted into the same frame.",
        "The paired example uses one photograph at two scales on identical 800 × 800 canvases. This isolates source occupancy from product differences. It is a controlled reference example, not a screenshot of a Shopify theme."
      ]},
      {title:"Find which layer differs",paragraphs:[
        "Start with the downloaded images outside the storefront. If the products already look uneven there, adjust the source framing. If they look consistent outside the store but different inside it, inspect the theme's image ratio, crop, container dimensions and responsive settings.",
        "A wide or tall product can legitimately occupy a different amount of visual space. Matching every object to the same height may exaggerate a tiny accessory beside a large item. Choose a consistent presentation rule for a product family rather than forcing unlike products to look physically identical."
      ],steps:[
        "Open two representative source images at the same display size.",
        "Compare the subject's top, bottom and side margins.",
        "Normalize the source framing where appropriate, then export to a shared aspect ratio.",
        "Inspect the resulting grid inside the actual storefront theme on a phone and desktop."
      ]},
      {title:"Choose a useful canvas",paragraphs:[
        "A square canvas is convenient for many product groups, while tall or wide objects may work better in another ratio. The current Shopify image requirements and square-image recommendation are linked in the separate platform reference. Choose output resolution after deciding the framing; a pixel recommendation does not select a composition for you.",
        "Image Prep can fit or crop a complete source rectangle. It cannot detect the product boundary or automatically trim empty background. To standardize subject scale, adjust the original in an editor with manual crop or positioning controls, then run a small export test."
      ]},
      {title:"Check the finished collection",paragraphs:[
        "Shopify documents that themes can request consistent CDN sizes and that different image sizes are created for different theme areas. A shared upload ratio therefore helps but does not control every displayed crop. Check both collection and product pages after saving a theme change.",
        "If a theme setting solves the display issue, avoid destructively recropping every original. Keep the originals, record which presentation setting changed, and test a portrait and a landscape image before processing the remaining catalog."
      ]}
    ],source:{title:"Shopify: product images, collection ratios and theme behavior",url:"https://help.shopify.com/en/manual/products/product-media/product-media-types"}
  },
  {
    slug:"file-size-and-quality",
    title:"Choose JPG, PNG or WebP",
    description:"Compare measured exports from photographs, text, patterns and noise, then select a format without assuming the smallest file always looks best.",
    category:"Formats and quality",published:"2026-09-07",updated:"2026-10-20",
    related:["fit-vs-fill","browser-image-troubleshooting"],
    relatedLab:[{label:"Full six-image format benchmark and downloads",href:"/experiments/jpg-png-webp/"},{label:"Compare your own image in this browser",href:"/tools/format-compare/"}],
    imageAlt:"Photographic and synthetic inputs used in the downloadable format comparison.",
    sections:[
      {title:"Choose by content and destination",paragraphs:[
        "Start with a format the destination supports. For an opaque photograph, JPG is a useful baseline; WebP is another option when accepted. PNG can suit sharp graphics and transparency, but photographs may become much larger. The measured files below show why the content matters: a pattern behaves differently from a photograph.",
        "Choose dimensions before comparing compression. All outputs in each table row use the same normalized pixels. The quality parameter is an encoder instruction, not a percentage of visual quality, and the same numeric setting does not make JPG and WebP perceptually identical."
      ]},
      {title:"Handle transparent backgrounds",paragraphs:[
        "JPG cannot carry an alpha channel. Converting a transparent graphic to JPG requires a background choice. A white label on a transparent background can appear to disappear on white, while a black composite can create an unwanted dark rectangle.",
        "Image Prep deliberately composites every export onto its selected background, including PNG and WebP outputs. It is therefore unsuitable when the task requires retaining transparent pixels. Use an editor with an explicit alpha-preserving export for that task. The separate transparent sample below lets you inspect white and black composites without guessing."
      ]},
      {title:"Inspect the visual cost",paragraphs:[
        "Download the files and view them at normal display size, then at 100%. Inspect fine lettering, diagonals, high-contrast edges and texture. A lower byte count is not useful if a product label becomes unreadable or a texture loses important detail.",
        "In this reference set, the woven pattern's PNG is much smaller than its JPG, while the seeded noise JPG is smaller than its WebP. Random noise is a stress case rather than a normal product photograph. These examples overturn a blanket format ranking, but do not tell you which format every future photograph needs."
      ],steps:[
        "Make each variation from the same original, with unchanged dimensions and background.",
        "Record actual MIME type and bytes; a browser can fall back to another format.",
        "Compare important detail at the size your customer will see.",
        "Repeat with an image containing different detail before choosing a batch setting.",
        "Upload a representative result to the intended destination and inspect its saved preview."
      ]},
      {title:"Keep an editable original",paragraphs:[
        "Repeatedly saving a lossy export can compound damage. Keep an original and start every new comparison from it. Enlarging a blurred source adds pixels without restoring the missing information.",
        "Canvas export creates a newly encoded file; it is not an archival copy of original EXIF/IPTC metadata and color-profile behavior. Compare important colors with the original and keep the source separately. PNG ignores the canvas quality parameter, which is why the tool disables that slider for PNG."
      ]}
    ],source:{title:"MDN: toBlob formats, quality, PNG defaults and fallback",url:"https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob"}
  },
  {
    slug:"product-photo-workflow",
    title:"Batch Resize and Rename Photos",
    description:"Inspect a downloadable three-file ZIP, then build a repeatable product-code naming and export routine without changing your originals.",
    category:"Export and troubleshooting",published:"2026-09-07",updated:"2026-10-20",
    related:["file-size-and-quality","browser-image-troubleshooting"],
    imageAlt:"Three reference image exports with sequential product filenames.",
    sections:[
      {title:"Choose a stable product code",paragraphs:[
        "Use one product code per batch so an exported filename tells you which item it belongs to. For example, MUG-042-001.jpg combines a stable product code with the image sequence. Keep the originals in another folder; the export folder should contain copies that can be recreated.",
        "The downloadable archive below contains three real image files and the exact names generated by this site's filename function. Extract the ZIP and inspect it before adapting the scheme to your own catalog. A filename organizes files; it does not establish storefront image order or guarantee search rankings."
      ]},
      {title:"Prove one export first",paragraphs:[
        "Begin with a landscape image, a portrait image and a detail image. Keep the output settings the same. Open the saved results outside the browser to check dimensions, framing and important details. One representative test is cheaper to repair than an incorrectly cropped full batch.",
        "In any editor, set an export folder, retain the original extension only if it matches the actual encoded type, and record the resize rule. If you use Image Prep, every file receives the same prefix and settings. Prefix characters outside A–Z letters, digits, hyphens and underscores become hyphens; an empty prefix becomes product."
      ],steps:[
        "Choose the product code, destination ratio, dimensions and accepted file type.",
        "Prepare a small representative set and open a saved copy.",
        "Check that the number of exported files equals the expected successful inputs.",
        "Inspect the names and actual file types before uploading.",
        "Arrange the primary image and remaining order inside the marketplace."
      ]},
      {title:"Understand ordering and gaps",paragraphs:[
        "Image Prep assigns numbers in the order displayed after selection. Operating-system file pickers can return a different order from the one you expected, and this tool does not offer drag-to-reorder. Use the visible list as the export-order reference.",
        "If input 2 fails, the successful files can be numbered 001 and 003. The gap preserves the connection to the failed input. Review the errors, then remove or replace the failed file and prepare again if continuous numbering is required. Never assume that a ZIP containing some successful files means the entire batch succeeded."
      ]},
      {title:"Close and reuse the batch",paragraphs:[
        "ZIP collects the exports in one archive; it does not necessarily make already compressed images substantially smaller. Extract it and open representative files. A webpage can request a download but cannot prove that you saved and extracted it successfully.",
        "Saved settings belong to this device's browser profile. They include the filename prefix, so replace the previous product code before a new batch. They do not save photos in a cloud library, sync to another device or substitute for a backup. Clear the batch when finished, and use Forget saved settings to remove the optional stored recipe."
      ]}
    ],source:{title:"MDN: localStorage persistence and browser restrictions",url:"https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"}
  },
  {
    slug:"browser-image-troubleshooting",
    title:"Fix Image Export Failures",
    description:"Separate file-type errors, excessive pixel counts, memory pressure and blocked downloads using a small repeatable diagnostic sequence.",
    category:"Export and troubleshooting",published:"2026-09-07",updated:"2026-10-20",
    related:["file-size-and-quality","product-photo-workflow"],
    relatedLab:[{label:"Pixel-buffer calculation with downloadable files",href:"/experiments/browser-limits/"}],
    imageAlt:"Two files with equal dimensions and different compressed byte counts.",
    sections:[
      {title:"Identify where it failed",paragraphs:[
        "Separate three stages: reading the source, preparing the output and saving the result. An unsupported source needs conversion or recovery. A processing failure can require fewer pixels or a smaller batch. A successful export with no saved file needs a download check. Repeating every step without identifying the stage hides the useful clue.",
        "Compressed bytes and pixel count describe different demands. The actual files below have equal dimensions but different byte sizes. Their one-buffer estimates are equal; total browser memory use has not been measured. This is why reducing dimensions can help even when the original file looks small on disk."
      ]},
      {title:"If selection rejects the file",paragraphs:[
        "This tool accepts JPG, PNG and static WebP and checks image headers instead of trusting the extension. Renaming HEIC to JPG does not convert it. Animated PNG/WebP, GIF and SVG are outside its supported scope. Convert a supported copy in a trusted editor, keeping the original.",
        "Image Prep limits inputs to 24 megapixels, 20 MB per file, 20 files and 100 MB total. A file can meet a marketplace's requirements and still exceed these tool limits. If the source will not open in another editor either, recover a complete original rather than repeatedly uploading a damaged copy."
      ]},
      {title:"If preparation stalls",paragraphs:[
        "Cancel, preserve any successful results and test one failing image by itself. Then reduce output dimensions and close other demanding tabs. Memory pressure depends on device, browser and other activity; a product limit is a safeguard rather than a capacity guarantee."
      ],steps:[
        "Note the failed filename and the exact displayed message.",
        "Try that file alone using smaller dimensions.",
        "Compare another supported file at the same settings.",
        "If both fail, retry in a current browser after reloading and without unrelated tabs.",
        "If only one source fails, convert it from a complete original and retry."
      ]},
      {title:"If the download is missing",paragraphs:[
        "Check the browser's downloads list and any save-location prompt. The tool says download requested because it cannot inspect your Downloads folder. If the archive fails, save individual successful images or prepare a smaller batch. Outputs are capped at 12 megapixels each and 100 MB per batch.",
        "If a saved file has the wrong extension, inspect its actual format rather than renaming it to force acceptance. Browser encoding can fall back to PNG; the tool uses the returned MIME type to choose the filename. Open the downloaded file before sending it to a marketplace."
      ]},
      {title:"If settings disappear",paragraphs:[
        "A private browser window, blocked storage or cleared site data can remove saved settings. You can still use the controls without storing them. Browser settings are not a cross-device account and should not contain confidential product or customer information.",
        "If the problem remains reproducible, report the page, browser, operating system, input type and dimensions, chosen settings and exact error. The linked tracker is public, so provide a non-private test file rather than a customer's photograph."
      ]}
    ],source:{title:"MDN: canvas export behavior and failure cases",url:"https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob"}
  }
];
