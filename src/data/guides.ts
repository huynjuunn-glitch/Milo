export type Guide = {
  slug: string;
  title: string;
  description: string;
  category: string;
  sections: { title: string; paragraphs: string[]; steps?: string[] }[];
  example?: { headers: string[]; rows: string[][] };
  source?: { title: string; url: string };
  diagram?: boolean;
};
export const guides: Guide[] = [
  {
    slug: "fit-vs-fill",
    title: "Fit or fill: keep the important edges in your product photos",
    description:
      "Compare exact fit and crop calculations, choose a margin, and avoid cutting important details out of product images.",
    category: "Framing",
    diagram: true,
    sections: [
      {
        title: "Start with what cannot be cut off",
        paragraphs: [
          "Before choosing a size, identify what makes the product understandable: its entire outline, a handle, the number of pieces included, or the label. If any of these touches the edge of the original, filling a different shape is risky.",
          "Fit preserves the entire source photograph. Fill covers the output canvas and crops whatever extends beyond it. Neither mode recognizes your product or removes its background. A margin adds space around the photograph, not automatically around the product itself.",
        ],
      },
      {
        title: "A worked example: landscape to square",
        paragraphs: [
          "Take a 3000 × 2000 photo and a 2000 × 2000 output. With Fit, no margin and no enlargement, the scale is 2000 ÷ 3000, or two-thirds. The image becomes approximately 2000 × 1333 pixels, leaving about 333 pixels above and below it. Fractional edges are rendered with browser interpolation.",
          "With Fill, the scale is one. The image remains 3000 × 2000, and the canvas shows only 2000 pixels of its width. A centered crop discards 500 pixels from each side. Left position keeps the left edge and removes all 1000 excess pixels from the right.",
        ],
      },
      {
        title: "What the margin setting actually does",
        paragraphs: [
          "A 5% margin on a 2000 × 2000 canvas reserves 100 pixels along each edge. Fit places the image inside the remaining 1800 × 1800 area. A 3000 × 2000 source therefore becomes 1800 × 1200, with 100-pixel side margins and 400-pixel top and bottom margins.",
          "Margin is ignored in Fill mode. When enlargement is off and a source is too small to cover the output, the tool adds background instead of stretching it. If a frame must be completely filled, you need a larger original or must deliberately enable enlargement.",
        ],
      },
      {
        title: "A reliable decision routine",
        paragraphs: [
          "For a varied batch, Fit is the safer starting point because it preserves source content. That does not mean every result will have equal apparent product size: empty space already inside an original remains.",
        ],
        steps: [
          "Prepare one representative landscape photo and one portrait photo.",
          "Open Check crops on each result. Look for missing edges and unreadable labels.",
          "Use Fill only when the removed background is expendable. Move the crop position if the subject is off-center.",
          "If the source contains too much empty space, frame it in an image editor first. This tool does not provide per-photo manual crop handles.",
          "Review the final downloaded file and the storefront preview before publishing.",
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
    title: "Check the thumbnail, not just the full-size product photo",
    description:
      "Use square, landscape and portrait crop checks to find clipped product edges before publishing a listing.",
    category: "Thumbnail checks",
    sections: [
      {
        title: "The file and the storefront are different frames",
        paragraphs: [
          "A 2000 × 2000 export is square, but a website can display it in a differently shaped container. A theme or search layout may crop the sides, add empty space, or use a focal point. The source file alone does not tell you exactly what a shopper will see.",
          "Dama shows center crops of your prepared image at 1:1, 4:3 and 3:4. These are geometric checks, not a reproduction of any marketplace screen. The crop previews do not change the downloaded file.",
        ],
      },
      {
        title: "How much a new crop can remove",
        paragraphs: [
          "Starting with a 2000 × 2000 square, a centered 4:3 frame retains the full width but only 1500 pixels of height. The top and bottom each lose 250 pixels. A centered 3:4 frame instead loses 250 pixels from each side.",
          "In percentage terms, an important detail sitting inside the outer 12.5% of a square is at risk in one of these previews. This is a check for these specific ratios, not a universal safe-area rule. Actual storefronts can use different shapes or positions.",
        ],
      },
      {
        title: "Inspect meaning, not just symmetry",
        paragraphs: [
          "A centered subject is not automatically a good thumbnail. A thin necklace can remain fully inside the frame but become too small to understand. A group of products may fit while hiding how many pieces are included.",
        ],
        steps: [
          "Check the full product boundary, including handles, sleeves, stems and cables.",
          "Check that a crop does not change the apparent quantity or exclude an included accessory.",
          "View the preview at its small display size. Do not rely only on zoomed detail.",
          "Use a separate detail image if a label needs close inspection; do not force every detail into the first image.",
          "After uploading, inspect the listing and collection/search previews provided by your platform.",
        ],
      },
      {
        title: "When the three previews disagree",
        paragraphs: [
          "If one crop clips the subject, return to Fit and add more margin, then prepare the batch again. If the subject becomes too small in every preview, a new source composition may be necessary. Adding more pixels does not fix composition.",
          "Etsy provides its own image and thumbnail guidance. Read that alongside these checks, especially when a listing layout changes. Dama presets are independent starting sizes rather than official Etsy templates.",
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
    title: "Build a consistent product grid without stretching photos",
    description:
      "Understand why equal image dimensions do not guarantee equal product scale, and prepare a coherent listing gallery.",
    category: "Shop presentation",
    sections: [
      {
        title: "Standardize the frame before the subject",
        paragraphs: [
          "Choose a single aspect ratio for the images that belong together. A square is a convenient starting shape, but your storefront theme and product type should decide the final choice. Use the same output width and height for the batch.",
          "Do not distort a portrait photo into a square by changing width and height independently. Dama scales both axes by the same factor and either adds a background or crops the overflow. Circular objects remain circular.",
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
          "Filling the same square would require a 1.25× enlargement and would remove top and bottom content. With Dama’s default “Allow enlarging” turned off, it will not perform that enlargement; some padding remains. This is intentional protection against silently stretching a small original.",
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
          "Save your Dama settings only after the final storefront check.",
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
    title: "Pixels, file size and quality: three different controls",
    description:
      "Choose output dimensions and JPG, PNG or WebP using a repeatable comparison instead of a promised file-size target.",
    category: "File quality",
    sections: [
      {
        title: "Dimensions are not a file-size promise",
        paragraphs: [
          "Dimensions describe the pixel grid. A 2000 × 2000 image contains four million pixels regardless of whether its encoded file occupies 300 KB or 3 MB. File size also depends on the content, format and encoder. A detailed fabric photograph can need more bytes than a plain background at the same quality setting.",
          "The quality percentage is an encoder input, not a visual quality score. An 85% setting does not guarantee a specific number of kilobytes or identical results in every browser. Dama displays the actual output file size after preparation; it does not promise a hard KB target.",
        ],
      },
      {
        title: "Choose a format with the image in mind",
        paragraphs: [
          "JPG is a practical starting point for photographs when the destination accepts it. WebP may provide smaller files, but confirm destination support before choosing it. PNG is lossless at the encoding stage and can be useful for sharp graphics, although photo files can be much larger.",
          "The PNG quality slider is disabled because the canvas PNG encoder ignores that parameter. All Dama exports are composited onto the selected background. This includes transparent PNG and WebP inputs; the tool currently does not preserve transparent backgrounds.",
        ],
      },
      {
        title: "A controlled comparison",
        paragraphs: [
          "Keep the source and dimensions unchanged while comparing compression. Otherwise you cannot tell which control caused a visible change.",
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
    title: "A repeatable product photo batch: from originals to named files",
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
          "Choose a stable identifier such as MUG-042 before adding photos. Dama uses one shared filename prefix per batch, so separating products prevents unrelated images from receiving the same code. Keep your original folder unchanged.",
          "Files receive sequence numbers in the order shown in the workspace. If order matters, add files in the desired order; operating-system file pickers may return their own ordering. Dama does not currently offer drag-to-reorder. Check and arrange image order inside the marketplace after uploading.",
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
    title: "Why a local image batch can fail—and how to recover",
    description:
      "Resolve unsupported formats, large images, memory pressure, failed ZIP downloads and blocked browser settings storage.",
    category: "Troubleshooting",
    sections: [
      {
        title: "A small file can become a large image in memory",
        paragraphs: [
          "Compressed bytes are not the same as decoded memory. A 4000 × 3000 photo has 12 million pixels. A basic four-byte-per-pixel buffer alone is about 48 MB before output canvases, thumbnails and browser overhead. Several full-resolution copies can use considerably more.",
          "Dama processes images sequentially and limits inputs to 24 megapixels, 20 MB per file, 20 images and 100 MB total. Outputs are capped at 12 megapixels per image and 100 MB per batch. These are product safeguards, not a guarantee that every low-memory device can handle a full batch.",
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
          "A browser may block a download or ask where to save it. Check its downloads list first. Dama says “download requested” because a web page cannot verify that you saved and extracted a file.",
          "If building an archive fails, use Save image on individual results or prepare a smaller batch. PNG outputs can become large; a suitable JPG or WebP may reduce memory use when your destination supports it. The 100 MB output limit is checked as results are created, so some files can succeed and later files can fail.",
        ],
      },
      {
        title: "If saved settings do not return",
        paragraphs: [
          "Private browsing, storage restrictions, cleared site data, a different browser profile, or a different device can explain missing settings. The workspace should still function with defaults. A failed save displays a message instead of silently promising persistence.",
          "Do not rely on browser navigation to preserve or clear a batch. Use Clear batch when finished, and keep originals separately. Browser and operating-system caches are outside Dama’s control; local processing is not a promise of secure erasure of every trace.",
        ],
      },
    ],
    source: {
      title: "Canvas image data and pixel buffers",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/ImageData",
    },
  },
];
