export function initFramingDemo(root: ParentNode = document) {
  const demo = root.querySelector<HTMLElement>("[data-framing-demo]");
  const image = demo?.querySelector<HTMLImageElement>("[data-demo-image]");
  const caption = demo?.querySelector<HTMLElement>("[data-demo-caption]");
  const controls = demo?.querySelector<HTMLFieldSetElement>(
    "[data-demo-controls]",
  );
  if (!image || !caption || !controls) return;

  controls.hidden = false;
  controls.addEventListener("change", () => {
    const fill =
      controls.querySelector<HTMLInputElement>("input:checked")?.value ===
      "cover";
    image.src = (fill ? image.dataset.cover : image.dataset.contain)!;
    image.alt = fill
      ? "Portrait photograph enlarged to fill the square, cropping the source top and bottom"
      : "Full portrait photograph fitted into a square with white side margins";
    caption.textContent = fill
      ? "Fill: the square is covered, removing some source background above and below."
      : "Fit: the whole photograph stays visible, with white space at the sides.";
  });
}
