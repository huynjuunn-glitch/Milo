export type Settings = {
  width: number;
  height: number;
  fit: "contain" | "cover";
  padding: number;
  background: string;
  anchor: "center" | "top" | "bottom" | "left" | "right";
  upscale: boolean;
  format: "jpeg" | "png" | "webp";
  quality: number;
  prefix: string;
  start: number;
};
export const DEFAULTS: Settings = {
  width: 2000,
  height: 2000,
  fit: "contain",
  padding: 5,
  background: "#ffffff",
  anchor: "center",
  upscale: false,
  format: "jpeg",
  quality: 85,
  prefix: "product",
  start: 1,
};
export const LIMITS = {
  count: 20,
  file: 20_000_000,
  total: 100_000_000,
  inputPixels: 24_000_000,
  outputPixels: 12_000_000,
  outputBytes: 100_000_000,
};
export function validateSettings(s: Settings): Settings {
  if (!s || typeof s !== "object")
    throw new Error("Settings could not be read. Reset and try again.");
  for (const key of ["width", "height"] as const)
    if (!Number.isInteger(s[key]) || s[key] < 64 || s[key] > 4096)
      throw new Error(
        "Width and height must be whole numbers from 64 to 4096.",
      );
  if (s.width * s.height > LIMITS.outputPixels)
    throw new Error(
      "Output must be 12 megapixels or less. Reduce width or height.",
    );
  if (
    !["contain", "cover"].includes(s.fit) ||
    !["jpeg", "png", "webp"].includes(s.format) ||
    !["center", "top", "bottom", "left", "right"].includes(s.anchor)
  )
    throw new Error("Choose a supported fit, position and format.");
  if (
    !Number.isFinite(s.padding) ||
    s.padding < 0 ||
    s.padding > 20 ||
    !Number.isFinite(s.quality) ||
    s.quality < 40 ||
    s.quality > 100
  )
    throw new Error("Margin must be 0–20% and quality 40–100%.");
  if (
    !/^#[a-f\d]{6}$/i.test(s.background) ||
    typeof s.upscale !== "boolean" ||
    typeof s.prefix !== "string"
  )
    throw new Error("Invalid background or filename settings.");
  if (!Number.isInteger(s.start) || s.start < 1 || s.start > 999999)
    throw new Error(
      "First sequence number must be a whole number from 1 to 999999.",
    );
  return { ...s, prefix: safePrefix(s.prefix) };
}
export function safePrefix(value: string): string {
  let clean =
    value
      .normalize("NFKC")
      .replace(/[^a-zA-Z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "product";
  if (/^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/i.test(clean))
    clean = `product-${clean}`;
  return clean;
}
export function outputName(s: Settings, index: number, mime: string) {
  const extension = (
    { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" } as Record<
      string,
      string
    >
  )[mime];
  if (!extension)
    throw new Error("Browser returned an unsupported output format.");
  return `${safePrefix(s.prefix)}-${String(s.start + index).padStart(3, "0")}.${extension}`;
}
export function geometry(
  sw: number,
  sh: number,
  s: Pick<
    Settings,
    "width" | "height" | "fit" | "padding" | "upscale" | "anchor"
  >,
) {
  if (!Number.isFinite(sw) || !Number.isFinite(sh) || sw <= 0 || sh <= 0)
    throw new Error("Invalid source dimensions.");
  const inset = s.fit === "contain" ? s.padding / 100 : 0;
  const aw = s.width * (1 - 2 * inset),
    ah = s.height * (1 - 2 * inset);
  let scale =
    s.fit === "cover" ? Math.max(aw / sw, ah / sh) : Math.min(aw / sw, ah / sh);
  if (!s.upscale) scale = Math.min(scale, 1);
  const dw = sw * scale,
    dh = sh * scale;
  const ax = s.anchor === "left" ? 0 : s.anchor === "right" ? 1 : 0.5;
  const ay = s.anchor === "top" ? 0 : s.anchor === "bottom" ? 1 : 0.5;
  return {
    dx: (s.width - dw) * (s.fit === "cover" ? ax : 0.5),
    dy: (s.height - dh) * (s.fit === "cover" ? ay : 0.5),
    dw,
    dh,
    scale,
  };
}
export function inspectImage(bytes: Uint8Array): {
  width: number;
  height: number;
  mime: string;
} {
  const v = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength),
    len = bytes.length;
  const text = (offset: number, n: number) =>
    String.fromCharCode(...bytes.subarray(offset, offset + n));
  const checked = (width: number, height: number, mime: string) => {
    if (
      !width ||
      !height ||
      width * height > LIMITS.inputPixels ||
      width > 32768 ||
      height > 32768
    )
      throw new Error(
        "Image exceeds 24 megapixels or has invalid dimensions. Export a smaller original.",
      );
    return { width, height, mime };
  };
  if (
    len >= 24 &&
    text(1, 3) === "PNG" &&
    bytes[0] === 137 &&
    bytes[4] === 13 &&
    bytes[5] === 10 &&
    bytes[6] === 26 &&
    bytes[7] === 10
  ) {
    if (text(12, 4) !== "IHDR" || v.getUint32(8) !== 13)
      throw new Error("Invalid PNG header.");
    let p = 8,
      ended = false;
    while (p + 12 <= len) {
      const size = v.getUint32(p),
        kind = text(p + 4, 4);
      if (size > len - p - 12) throw new Error("PNG data is incomplete.");
      if (kind === "acTL")
        throw new Error("Animated PNG is not supported. Export a still image.");
      p += 12 + size;
      if (kind === "IEND") {
        ended = true;
        break;
      }
    }
    if (!ended) throw new Error("PNG data is incomplete.");
    return checked(v.getUint32(16), v.getUint32(20), "image/png");
  }
  if (len >= 4 && bytes[0] === 255 && bytes[1] === 216) {
    let p = 2;
    while (p + 3 < len) {
      if (bytes[p] !== 255) throw new Error("Invalid JPEG marker.");
      while (bytes[p] === 255) p++;
      const marker = bytes[p++];
      if (marker === 217 || marker === 218) break;
      if (marker === 1 || (marker >= 208 && marker <= 215)) continue;
      if (p + 2 > len) break;
      const size = v.getUint16(p);
      if (size < 2 || p + size > len)
        throw new Error("JPEG data is incomplete.");
      if (
        [
          192, 193, 194, 195, 197, 198, 199, 201, 202, 203, 205, 206, 207,
        ].includes(marker)
      ) {
        if (size < 8) break;
        return checked(v.getUint16(p + 5), v.getUint16(p + 3), "image/jpeg");
      }
      p += size;
    }
    throw new Error("JPEG dimensions could not be read. Re-export this file.");
  }
  if (len >= 30 && text(0, 4) === "RIFF" && text(8, 4) === "WEBP") {
    if (v.getUint32(4, true) + 8 > len)
      throw new Error("WebP data is incomplete.");
    let dims: { width: number; height: number; mime: string } | undefined;
    for (let p = 12; p + 8 <= len;) {
      const kind = text(p, 4),
        size = v.getUint32(p + 4, true),
        d = p + 8;
      if (size > len - d) throw new Error("WebP data is incomplete.");
      if (
        kind === "ANIM" ||
        kind === "ANMF" ||
        (kind === "VP8X" && bytes[d] & 2)
      )
        throw new Error("Animated WebP is not supported.");
      if (kind === "VP8X" && size >= 10)
        dims = checked(
          1 + bytes[d + 4] + (bytes[d + 5] << 8) + (bytes[d + 6] << 16),
          1 + bytes[d + 7] + (bytes[d + 8] << 8) + (bytes[d + 9] << 16),
          "image/webp",
        );
      if (
        !dims &&
        kind === "VP8 " &&
        size >= 10 &&
        bytes[d + 3] === 157 &&
        bytes[d + 4] === 1 &&
        bytes[d + 5] === 42
      )
        dims = checked(
          v.getUint16(d + 6, true) & 16383,
          v.getUint16(d + 8, true) & 16383,
          "image/webp",
        );
      if (!dims && kind === "VP8L" && size >= 5 && bytes[d] === 47) {
        const bits = v.getUint32(d + 1, true);
        dims = checked(
          (bits & 16383) + 1,
          ((bits >>> 14) & 16383) + 1,
          "image/webp",
        );
      }
      p = d + size + (size % 2);
    }
    if (dims) return dims;
    throw new Error("WebP dimensions could not be read.");
  }
  throw new Error(
    "Unsupported file. Choose a JPG, PNG or static WebP, not HEIC, SVG or GIF.",
  );
}
