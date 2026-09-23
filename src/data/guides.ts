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
    title: "Shopify Product Image Sizes: Make a Consistent Grid",
    published: "2026-09-07",
    updated: "2026-09-08",
    related: ["fit-vs-fill", "file-size-and-quality", "product-photo-workflow"],
    imageAlt:
      "Three equal square canvases form a consistent grid while the objects inside retain different apparent sizes.",
    description:
      "Use consistent aspect ratios for Shopify product images, try a 2048-pixel square canvas, and fix uneven grids without stretching your photos.",
    category: "Shop presentation",
    sections: [
      {
        title: "A practical Shopify starting size, not a theme guarantee",
        paragraphs: [
          "Shopify's product-media guidance, checked September 8, 2026, recommends 2048 × 2048 pixels as a useful square product-image size. It emphasizes consistent aspect ratios for featured images shown together. There is no single canvas size that overrides every theme's crop and display settings.",
           "In Image Prep, choose Custom dimensions, enter 2048 for both sides, and start with Fit. Prepare a portrait and a landscape original together. If your theme uses portrait cards, choose matching portrait dimensions instead of forcing a square. Image Prep has its own lower processing limits; a file accepted by Shopify is not automatically supported here.",
        ],
      },
      {
        title: "Standardize the frame before the subject",
        paragraphs: [
          "Choose a single aspect ratio for the images that belong together. A square is a convenient starting shape, but your storefront theme and product type should decide the final choice. Use the same output width and height for the batch.",
           "Do not distort a portrait photo into a square by changing width and height independently. Image Prep scales both axes by the same factor and either adds a background or crops the overflow. Circular objects remain circular.",
        ],
      },
      {
        title: "Equal canvases can still look inconsistent",
        paragraphs: [
          "Imagine two 2000 × 2000 originals. In the first, a product occupies 80% of the frame height. In the second, it occupies 40%. Exporting both to the same size with the same margin preserves that difference: the first product will still appear twice as tall.",
          "This tool does not detect product boundaries. Its padding applies to the source rectangle. If a source already has excessive empty space, adding margin compounds it. Adjust that original’s framing first, or separate it from the batch.",
        ],
      },
      {
        title: "A portrait source on a square canvas",
        paragraphs: [
          "A 1600 × 2400 source fitted to 2000 × 2000 with zero margin becomes approximately 1333 × 2000, with about 333 pixels of padding at each side. With a 5% margin it becomes 1200 × 1800.",
           "Filling the same square would require a 1.25× enlargement and would remove top and bottom content. With Image Prep's default “Allow enlarging” turned off, it will not perform that enlargement; some padding remains. This is intentional protection against silently stretching a small original.",
        ],
      },
      {
        title: "Check the collection, not just one listing",
        paragraphs: [
          "Shopify notes that matching aspect ratios can help collection images look consistent. Your theme still controls display behavior, so a local preview cannot guarantee the final grid.",
        ],
        steps: [
          "Compare representative products side by side after uploading.",
          "Check background tone as well as the border color. Added white padding cannot remove a gray studio background inside a source.",
          "Keep intentional close-ups separate from primary product images.",
          "Inspect phone and desktop layouts in your actual theme.",
           "Save your Image Prep settings only after the final storefront check.",
        ],
      },
    ],
    source: {
      title: "Shopify: product media types and image presentation",
      url: "https://help.shopify.com/en/manual/products/product-media/product-media-types",
    },
  },
  {
    slug: "file-size-and-quality",
    title: "Reduce Product Photo File Size: JPG, PNG or WebP?",
    published: "2026-09-07",
    updated: "2026-09-23",
    related: [
      "consistent-product-grid",
      "thumbnail-crop-checklist",
      "browser-image-troubleshooting",
    ],
    relatedLab: [{ label: "See exact JPG, PNG and WebP fixture measurements", href: "/experiments/jpg-png-webp/" }],
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
          "This workflow is for choosing settings for your own source image. Keep its dimensions and source unchanged while comparing compression, then inspect the actual exports. For a separate, reproducible benchmark using one fixed sample image, see the linked reference-encoder experiment; its byte counts are not predictions for your photos.",
        ],
        steps: [
          "Export a representative photo at the starting quality of 85%.",
          "Inspect text, fine texture, diagonals and high-contrast edges at normal viewing size and at 100%.",
          "Export again at 75%, from the original file rather than the previous export.",
          "Compare both actual file sizes. If edge artifacts or smearing become visible, use the higher quality version.",
          "Only then apply the chosen settings to the full batch; check more than one result.",
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
