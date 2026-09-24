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
  diagram?: boolean;
};
export const guides: Guide[] = [
  {
    slug: "fit-vs-fill",
    title: "Fit vs Fill for Product Photos: Choose the Right Resize Mode",
    published: "2026-09-07",
    updated: "2026-09-23",
    related: [
      "thumbnail-crop-checklist",
      "product-photo-workflow",
    ],
    relatedLab: [{ label: "See the crop geometry calculations", href: "/experiments/crop-geometry/" }],
    imageAlt:
      "A whole source photo fitted inside a frame with padding, compared with a fill that removes the overflow.",
    description:
      "Choose whether to preserve the entire product photo or fill a frame by cropping, based on what the listing image must keep visible.",
    category: "Framing",
    sections: [
      {
        title: "Choose by risk, not by preset",
        paragraphs: [
          "Fit keeps the whole source photo inside the output frame and may leave padding. Use it when a product edge, accessory, label or included-piece count must remain visible. Fill covers the frame and removes overflow; use it only when the removed area is expendable and the remaining photo still represents the product accurately.",
          "Neither mode recognizes the product or removes its background. A margin adds space around the full source photo, not around the product itself. If the original already contains a wide empty border, Fit preserves that border too.",
        ],
      },
      {
        title: "Make the decision with one representative image",
        paragraphs: [
          "Do not decide from a single easy-to-crop product. Test one image with a detail near an edge and one image whose whole silhouette matters. Preview at the small size where a shopper will see it; a crop can preserve the object yet make a thin or small item hard to recognize.",
        ],
      },
      {
        title: "Use a short review routine",
        paragraphs: [
          "Image Prep's preview shows illustrative center crops. It does not know which area of your image is important and is not a recreation of Etsy's interface. The downloaded file remains the prepared image; the small crop cards are checks, not alternate exports.",
        ],
        steps: [
          "Name the details that must stay visible: full silhouette, text, accessories or quantity.",
          "Prepare one copy with Fit and one with Fill; change no other setting during the comparison.",
          "Inspect each complete export, then use Check crops to spot likely clipping.",
          "If Fill cuts something important, use Fit, choose another source composition or adjust it in an editor with manual crop controls.",
          "Check Etsy's own thumbnail editor and the final listing preview before publishing.",
        ],
      },
    ],
    source: {
      title: "Canvas drawImage: destination size and image scaling",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage",
    },
  },
  {
    slug: "thumbnail-crop-checklist",
    title: "Etsy Thumbnail Crop Checklist: Keep Product Details in Frame",
    published: "2026-09-07",
    updated: "2026-09-23",
    related: ["fit-vs-fill", "file-size-and-quality", "product-photo-workflow"],
    relatedLab: [
      { label: "Etsy image requirements and official reference", href: "/marketplace/etsy/" },
      { label: "Crop geometry experiment", href: "/experiments/crop-geometry/" },
    ],
    imageAlt:
      "Square, landscape and portrait thumbnail frames shown with their 1:1, 4:3 and 3:4 aspect ratios.",
    description:
      "A practical crop-review sequence for Etsy listing photos: inspect product edges, meaning and the actual thumbnail before publishing.",
    category: "Thumbnail checks",
    sections: [
      {
        title: "Use local previews as a warning, not a platform guarantee",
        paragraphs: [
          "Image Prep shows center-crop examples in square, landscape and portrait frames. These previews help identify a risky edge; they do not predict every Etsy search, collection or shop placement and do not change the exported file.",
          "Etsy's own thumbnail editor is the decisive check for its current listing flow. The separate Etsy image reference lists the current official requirements and sources.",
        ],
      },
      {
        title: "Review the image in three layers",
        paragraphs: [
          "A source image, a marketplace thumbnail and a small search result are not interchangeable views. A product can look complete when enlarged but become ambiguous when reduced. Check the actual Etsy preview rather than assuming a square or landscape canvas dictates its display everywhere.",
        ],
        steps: [
          "Inspect the full source and identify its outermost meaningful detail.",
          "Open the Image Prep crop cards to find obvious edge risks.",
          "Use Etsy's thumbnail adjustment tool and inspect each preview it currently offers.",
          "Check the saved draft at small display size before publishing.",
        ],
      },
      {
        title: "Check that the crop keeps the listing truthful",
        paragraphs: [
          "A crop is not merely a composition choice if it changes what a shopper thinks is included. A handle, cable, matching piece or packaging can establish product identity or quantity. Do not remove such context just to make a thumbnail more dramatic.",
          "Small text may be unreadable in a thumbnail even when no pixels are cropped. Keep the main image understandable at small size and use separate detail photos for close-up information.",
        ],
      },
      {
        title: "When the thumbnail does not work",
        paragraphs: [
          "If the subject is clipped, do not solve it by blindly adding output pixels. Try a less aggressive crop, add breathing room to the original composition or choose a different hero photo. If the subject becomes too small when fully preserved, create a closer source image while keeping enough context to represent the item accurately.",
        ],
        steps: [
          "Return to Fit when preserving the whole photograph matters more than filling the frame.",
          "Use a source with more space around the object when the current edge is too tight.",
          "Separate the primary product view from detail or scale-reference views.",
          "Reopen Etsy's own preview after any image or crop adjustment.",
        ],
      },
    ],
    source: {
      title: "Etsy: image requirements and thumbnail best practices",
      url: "https://help.etsy.com/hc/en-us/articles/115015663347-Requirements-and-Best-Practices-for-Images-in-Your-Etsy-Shop",
    },
  },
  {
    slug: "consistent-product-grid",
    title: "Shopify Product Image Sizes: What 2048 px Does—and Doesn't—Mean",
    published: "2026-09-07",
    updated: "2026-09-24",
    related: ["fit-vs-fill", "file-size-and-quality", "product-photo-workflow"],
    imageAlt:
      "Three equal square canvases form a consistent grid while the objects inside retain different apparent sizes.",
    description:
      "Understand Shopify's current image limits, when a 2048-pixel square is useful, and why a consistent image frame still needs a theme preview.",
    category: "Shop presentation",
    sections: [
      {
        title: "What Shopify currently recommends",
        paragraphs: [
          "Shopify's product-media page, checked September 24, 2026, says product and collection images can be up to 5000 × 5000 pixels or 25 megapixels, with a file size under 20 MB. It says 2048 × 2048 pixels usually displays best for square product images; that is a starting recommendation, not a mandatory upload size.",
          "The same page lists PNG as the best type for most product images, followed by JPEG, and says Shopify's Imagery service selects a format supported by a customer's web client. This site's browser tools accept JPG, PNG and static WebP only. Shopify accepting another type does not mean Image Prep can process it.",
        ],
      },
      {
        title: "Choose one featured-image ratio for a collection",
        paragraphs: [
          "Shopify notes that featured images with a consistent aspect ratio can appear the same size beside one another on collection pages. It also says themes can request consistent image sizes from Shopify's CDN, and that Shopify creates different image sizes for different theme areas. This means a matching source ratio can help a collection grid, but it does not control every display crop or resolution.",
          "Choose a ratio that fits the product family and inspect it in the actual theme. Do not stretch a portrait image into a square: Image Prep preserves proportions and uses padding or cropping instead. A square canvas also cannot make two products appear equally large if one source includes much more empty space.",
        ],
      },
      {
        title: "Worked example: portrait photo on a square canvas",
        paragraphs: [
          "A 1600 × 2400 portrait fitted inside a 2048 × 2048 square at zero margin scales to about 1365 × 2048. That leaves about 341 pixels of canvas at each side. With a 5% inner margin, the usable square is 1843 × 1843; the portrait scales to about 1229 × 1843, leaving about 410 pixels per side.",
          "These are geometric calculations from the source dimensions and fit rule, not a Shopify preview. Fill would crop the top and bottom to cover the square. If the source is smaller than the target and enlarging is disabled, Fit will preserve its original pixel size rather than invent detail.",
        ],
      },
      {
        title: "Check the theme, then check the file limit",
        paragraphs: [
          "The platform allows up to 5000 pixels on an edge and 25 megapixels, but Image Prep is intentionally more conservative: dimensions top out at 4096 pixels per edge and 12 megapixels per output. A file can be valid for Shopify and still exceed this tool's limits. Use another trusted editor for a larger output rather than repeatedly retrying it here.",
        ],
        steps: [
          "Choose the featured-image ratio used by the product family or theme; do not assume square is always best.",
          "Prepare one portrait and one landscape source with Fit before trying any crop.",
          "Compare the complete exports side by side and check whether empty margins—not canvas dimensions—explain uneven product scale.",
          "Upload representative files and inspect the collection page at both phone and desktop widths.",
          "Check the image's actual uploaded type, pixel dimensions and byte size against Shopify's current requirements.",
          "Revisit Shopify's official media page when its published limits or supported types change.",
        ],
      },
    ],
    source: {
        title: "Shopify: product media types, image requirements and presentation",
      url: "https://help.shopify.com/en/manual/products/product-media/product-media-types",
    },
  },
  {
    slug: "file-size-and-quality",
    title: "Reduce Product Photo File Size: JPG, PNG or WebP?",
    published: "2026-09-07",
    updated: "2026-09-24",
    related: [
      "consistent-product-grid",
      "thumbnail-crop-checklist",
      "browser-image-troubleshooting",
    ],
    relatedLab: [
      { label: "Compare formats using your own image", href: "/tools/format-compare/" },
      { label: "See the fixed-fixture encoder benchmark", href: "/experiments/jpg-png-webp/" },
    ],
    imageAlt:
      "Dimensions, encoding quality and output format are three separate controls; the final file size must be measured.",
    description:
      "Choose output dimensions and JPG, PNG or WebP using a repeatable comparison instead of a promised file-size target.",
    category: "File quality",
    sections: [
      {
        title: "Dimensions are not a file-size promise",
        paragraphs: [
          "Dimensions describe the pixel grid. A 2000 × 2000 image contains four million pixels regardless of whether its encoded file occupies 300 KB or 3 MB. File size also depends on the content, format and encoder. A detailed fabric photograph can need more bytes than a plain background at the same quality setting.",
           "The quality percentage is an encoder input, not a visual quality score. An 85% setting does not guarantee a specific number of kilobytes or identical results in every browser. Image Prep displays the actual output file size after preparation; it does not promise a hard KB target.",
        ],
      },
      {
        title: "Choose a format with the image in mind",
        paragraphs: [
          "JPG is a practical starting point for photographs when the destination accepts it. WebP may provide smaller files, but confirm destination support before choosing it. PNG is lossless at the encoding stage and can be useful for sharp graphics, although photo files can be much larger.",
           "The PNG quality slider is disabled because the canvas PNG encoder ignores that parameter. All Image Prep exports are composited onto the selected background. This includes transparent PNG and WebP inputs; the tool currently does not preserve transparent backgrounds.",
        ],
      },
      {
        title: "Compare your own product photos consistently",
        paragraphs: [
          "This workflow is for choosing settings for your own source image. Keep its dimensions and source unchanged while comparing compression, then inspect the actual exports. The local format-comparison tool encodes your image in the current browser and records its actual output MIME type and byte count. For a separate controlled reference-encoder benchmark, see the fixed-fixture experiment; its byte counts are not predictions for your photos.",
        ],
        steps: [
          "Use the local format-comparison tool to encode one original as JPG, PNG and WebP at the same target dimensions.",
          "Record the actual format and byte count returned by your browser; a browser may fall back to a different MIME type.",
          "Inspect text, fine texture, diagonals and high-contrast edges at normal viewing size and at 100%.",
          "Repeat with a second source that differs in texture, text or transparency; one file does not establish a general winner.",
          "If edge artifacts or smearing become visible, use a less compressed output and verify the destination accepts that format.",
          "Only then prepare a batch; check more than one result and the real listing preview.",
        ],
      },
      {
        title: "What re-encoding can change",
        paragraphs: [
          "Re-encoding a compressed source can compound visible damage. Keep originals separately and start each new variation from them. Enlargement adds pixels, not detail; it cannot recover a blurry label.",
          "Canvas creates a new encoded image rather than copying the original metadata container. Original EXIF/IPTC metadata and color-profile behavior are not preserved as an archival workflow. Browser decoding, color management and interpolation can differ, so compare important product colors against the original.",
          "If a browser cannot encode the chosen format and returns PNG, the download uses the actual .png extension and displays a fallback notice. Do not rename a .png file to .webp to make it acceptable to a platform.",
        ],
      },
    ],
    source: {
      title: "Canvas toBlob: formats, quality and browser fallback",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob",
    },
  },
  {
    slug: "product-photo-workflow",
    title: "Batch Resize and Rename Product Photos for ZIP Export",
    published: "2026-09-07",
    updated: "2026-09-08",
    related: [
      "fit-vs-fill",
      "file-size-and-quality",
      "browser-image-troubleshooting",
    ],
    imageAlt:
      "Three camera filenames map to the sequential product filenames MUG-042-001.jpg, MUG-042-002.jpg and MUG-042-003.jpg.",
    description:
      "Set a product-code naming pattern, review every export and reuse browser-saved settings for your next listing.",
    category: "Batch workflow",
    example: {
      headers: ["Source name", "Export name"],
      rows: [
        ["IMG_1048.jpg", "MUG-042-001.jpg"],
        ["IMG_1051.jpg", "MUG-042-002.jpg"],
        ["detail-final.png", "MUG-042-003.jpg"],
      ],
    },
    sections: [
      {
        title: "One product, one batch",
        paragraphs: [
           "Choose a stable identifier such as MUG-042 before adding photos. Image Prep uses one shared filename prefix per batch, so separating products prevents unrelated images from receiving the same code. Keep your original folder unchanged.",
           "Files receive sequence numbers in the order shown in the workspace. If order matters, add files in the desired order; operating-system file pickers may return their own ordering. Image Prep does not currently offer drag-to-reorder. Check and arrange image order inside the marketplace after uploading.",
        ],
      },
      {
        title: "Make a small test export first",
        paragraphs: [
          "Add one landscape image, one portrait image and a detail photo. Choose dimensions, fit, background and format. A convenient default is a square canvas with Fit and a small margin, but review your destination rather than treating the preset as a requirement.",
          "After Prepare images, compare the actual byte sizes, check crops and save a result. Open the downloaded copy to verify appearance. A successful export only means the browser created a file; it does not guarantee that a marketplace will accept it.",
        ],
      },
      {
        title: "Naming rules you can predict",
        paragraphs: [
          "With prefix MUG-042 and first number 1, the first file becomes MUG-042-001.jpg when exported as JPG. Numbers are padded to at least three digits. Prefix characters outside letters A–Z, digits, hyphens and underscores are replaced with hyphens. Empty prefixes become product. The preview shows the final sanitized prefix, including adjustments for reserved filenames.",
          "Each input keeps its assigned position during processing. If the second image fails, successful exports may be numbered 001 and 003. The gap is useful evidence of a failed file: review the error list and archive contents. Remove a failed file and prepare again if you need a continuous sequence.",
          "Sequence numbers help organize files; they do not guarantee search rankings or storefront order. Never rely on filenames alone to select a listing’s primary photo.",
        ],
      },
      {
        title: "Close the batch deliberately",
        paragraphs: [],
        steps: [
          "Confirm that the number of prepared images matches the number you expect.",
          "Download the ZIP or save individual successful images. ZIP is an archive, not extra image compression.",
          "Extract the archive and inspect names, dimensions and appearance.",
          "Upload to your platform and check the actual listing preview.",
          "Save settings for next time. The prefix is saved too, so change the product code for a new item.",
          "Clear the batch when finished. Clearing removes selected files and results from the workspace but leaves your controls and optional saved settings unchanged.",
        ],
      },
      {
        title: "What comes back next visit",
        paragraphs: [
          "Saved settings belong to this browser profile on this device. They do not sync with another phone or computer, and clearing site data can remove them. Photos and ZIP files are not saved in a cloud library. Use “Forget saved settings” to delete the stored recipe without changing the controls currently on screen.",
        ],
      },
    ],
    source: {
      title: "Browser localStorage: persistence and limitations",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage",
    },
  },
  {
    slug: "browser-image-troubleshooting",
    title: "Image Resizing or ZIP Download Failed? Browser Fixes",
    published: "2026-09-07",
    updated: "2026-09-23",
    related: ["file-size-and-quality", "product-photo-workflow", "fit-vs-fill"],
    relatedLab: [{ label: "Read the browser memory calculation and its limits", href: "/experiments/browser-limits/" }],
    imageAlt:
      "A 4000 by 3000 pixel image expands to a roughly 48 MB RGBA buffer before browser overhead, even if its compressed file is small.",
    description:
      "Resolve unsupported formats, large images, memory pressure, failed ZIP downloads and blocked browser settings storage.",
    category: "Troubleshooting",
    sections: [
      {
        title: "Separate memory pressure from the file's download size",
        paragraphs: [
          "The compressed file size does not tell you how much working memory the browser needs after decoding. This page focuses on recovery steps; the separate browser-limits experiment shows the pixel-buffer estimate and explains why it is not a device guarantee.",
          "Image Prep processes images sequentially and limits inputs to 24 megapixels, 20 MB per file, 20 images and 100 MB total. Outputs are capped at 12 megapixels per image and 100 MB per batch. These are product safeguards, not a guarantee that every low-memory device can handle a full batch.",
        ],
      },
      {
        title: "If a file is rejected before preparation",
        paragraphs: [
          "The tool checks image headers rather than trusting a filename extension. Renaming picture.heic to picture.jpg does not convert it. Open the original in a trusted editor and export JPG, PNG or static WebP. GIF, SVG, HEIC and animated PNG/WebP are outside the supported scope.",
          "A damaged or incomplete file may have a familiar extension but lack valid image data. Try opening it outside the browser. If it cannot be opened there, recover the original rather than repeatedly trying the same broken export.",
        ],
      },
      {
        title: "If processing slows or stops",
        paragraphs: [],
        steps: [
          "Cancel the run; cancellation takes effect after the current decode or encode operation finishes.",
          "Keep or download any successful outputs, then try fewer photos.",
          "Reduce output dimensions and close other memory-heavy tabs.",
          "Test the failing file by itself. Large pixel dimensions matter even if the compressed size is small.",
          "Try a current browser with image bitmap and canvas support.",
          "Keep originals outside the browser. An open tab is not a backup.",
        ],
      },
      {
        title: "If the ZIP is missing",
        paragraphs: [
           "A browser may block a download or ask where to save it. Check its downloads list first. Image Prep says “download requested” because a web page cannot verify that you saved and extracted a file.",
          "If building an archive fails, use Save image on individual results or prepare a smaller batch. PNG outputs can become large; a suitable JPG or WebP may reduce memory use when your destination supports it. The 100 MB output limit is checked as results are created, so some files can succeed and later files can fail.",
        ],
      },
      {
        title: "If saved settings do not return",
        paragraphs: [
          "Private browsing, storage restrictions, cleared site data, a different browser profile, or a different device can explain missing settings. The workspace should still function with defaults. A failed save displays a message instead of silently promising persistence.",
           "Do not rely on browser navigation to preserve or clear a batch. Use Clear batch when finished, and keep originals separately. Browser and operating-system caches are outside Image Prep's control; local processing is not a promise of secure erasure of every trace.",
        ],
      },
    ],
    source: {
      title: "Canvas image data and pixel buffers",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/ImageData",
    },
  },
];
