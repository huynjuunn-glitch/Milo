import fs from "node:fs/promises";
import path from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";
import { zipSync } from "fflate";
import { DEFAULTS, geometry, outputName } from "../src/scripts/image-core.ts";

// This generates reference-encoder evidence, not browser or marketplace results.
const measuredOn = process.argv[2];
if (!/^\d{4}-\d{2}-\d{2}$/.test(measuredOn ?? "")) throw new Error("Pass the actual measurement date as YYYY-MM-DD.");
const root = path.resolve("public/evidence");
await fs.mkdir(root, { recursive: true });
const credits = JSON.parse(await fs.readFile("assets/source/credits.json", "utf8"));
const digest = (bytes) => createHash("sha256").update(bytes).digest("hex");
async function save(name, bytes) {
  await fs.writeFile(path.join(root, name), bytes);
  const meta = await sharp(bytes).metadata();
  return { url: `/evidence/${name}`, bytes: bytes.length, width: meta.width, height: meta.height, format: meta.format, sha256: digest(bytes) };
}
const svg = (body) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900">${body}</svg>`);
const text = svg('<rect width="1200" height="900" fill="white"/><text x="80" y="190" font-family="sans-serif" font-size="88" fill="#17252b">MUG 042</text><text x="80" y="300" font-family="sans-serif" font-size="36" fill="#17252b">Fine text and sharp edges</text><path d="M80 410h1040v12H80zM80 450h1040v6H80zM80 490h1040v3H80z" fill="#135ceb"/><text x="80" y="670" font-family="sans-serif" font-size="18" fill="#17252b">18 px source text: inspect the downloaded file at 100%.</text>');
const texture = svg(`<rect width="1200" height="900" fill="#e8ddd0"/>${Array.from({length:150},(_,i)=>`<path d="M${i*8} 0v900M0 ${i*8}h1200" stroke="${i%2?'#5d6554':'#ad7758'}" stroke-width="${i%3+1}"/>`).join("")}`);
const alpha = svg('<path d="M220 200h600v420H220z" fill="#135ceb"/><path d="M820 280h90a120 120 0 0 1 0 240h-90v-65h90a55 55 0 0 0 0-110h-90z" fill="#135ceb"/><text x="235" y="740" font-family="sans-serif" font-size="64" fill="#17252b">Transparent test graphic</text>');
let seed = 42;
const noisePixels = Buffer.alloc(1200*900*3);
for (let i=0;i<noisePixels.length;i++) { seed = (Math.imul(seed,1664525)+1013904223)>>>0; noisePixels[i]=seed>>>24; }
const specs = [
  { id:"cup", label:"Porcelain cup photograph", kind:"Photograph", input:await fs.readFile("assets/source/museum-cup.jpg"), credit:credits[0], fit:"contain" },
  { id:"beans", label:"Coffee and fine texture", kind:"Photograph", input:await fs.readFile("assets/source/coffee-beans.jpg"), credit:credits[1], fit:"contain" },
  { id:"text", label:"Text and sharp edges", kind:"Synthetic test graphic", input:text },
  { id:"texture", label:"Fine woven pattern", kind:"Synthetic test graphic", input:texture },
  { id:"alpha", label:"Transparent graphic", kind:"Synthetic test graphic", input:alpha },
  { id:"noise", label:"Seeded random noise", kind:"Synthetic stress test; not a photograph", input:await sharp(noisePixels,{raw:{width:1200,height:900,channels:3}}).png().toBuffer() },
];
const cases = [];
for (const spec of specs) {
  // A single normalized, opaque input is used for all three format encodes.
  const normalized = await sharp(spec.input).rotate().resize(1200,900,{fit:spec.fit??"fill",background:"white"}).flatten({background:"white"}).png().toBuffer();
  const input = await save(`${spec.id}-input.png`,normalized);
  const outputs = {};
  for (const format of ["jpeg","png","webp"]) {
    const pipeline = sharp(normalized);
    const bytes = await (format === "png" ? pipeline.png() : pipeline[format]({quality:85})).toBuffer();
    outputs[format] = await save(`${spec.id}.${format === "jpeg" ? "jpg" : format}`,bytes);
  }
  cases.push({id:spec.id,label:spec.label,kind:spec.kind,credit:spec.credit??null,input,outputs});
}
// The portrait source is kept separate from normalized format-test inputs.
const portrait = await sharp(specs[0].input).rotate().resize({height:1000}).png().toBuffer();
const portraitMeta = await sharp(portrait).metadata();
const framing = { source:await save("portrait-source.png",portrait), outputs:[] };
for (const mode of ["contain","cover"]) {
  const settings = {...DEFAULTS,width:800,height:800,fit:mode,padding:0,upscale:true};
  const g = geometry(portraitMeta.width,portraitMeta.height,settings);
  const scaled = await sharp(portrait).resize(Math.round(g.dw),Math.round(g.dh)).png().toBuffer();
  const output = mode === "contain"
    ? await sharp({create:{width:800,height:800,channels:3,background:"white"}}).composite([{input:scaled,left:Math.round(g.dx),top:Math.round(g.dy)}]).png().toBuffer()
    : await sharp(scaled).extract({left:Math.round(-g.dx),top:Math.round(-g.dy),width:800,height:800}).png().toBuffer();
  framing.outputs.push({mode,geometry:g,file:await save(`portrait-${mode}.png`,output)});
}
const transparent = await sharp(alpha).png().toBuffer();
const transparency = {
  source:await save("transparent-source.png",transparent),
  white:await save("transparent-white.jpg",await sharp(transparent).flatten({background:"white"}).jpeg({quality:85}).toBuffer()),
  black:await save("transparent-black.jpg",await sharp(transparent).flatten({background:"black"}).jpeg({quality:85}).toBuffer()),
};
const square = await fs.readFile(path.join(root,"portrait-contain.png"));
const crops = [
  {label:"Square",ratio:"1:1",removed:"No crop",file:framing.outputs[0].file},
  {label:"Landscape",ratio:"4:3",removed:"100 px from top and bottom",file:await save("crop-landscape.png",await sharp(square).extract({left:0,top:100,width:800,height:600}).png().toBuffer())},
  {label:"Portrait",ratio:"3:4",removed:"100 px from left and right",file:await save("crop-portrait.png",await sharp(square).extract({left:100,top:0,width:600,height:800}).png().toBuffer())},
];
const smaller = await sharp(portrait).resize({height:400}).png().toBuffer();
const scale = await save("extra-source-margin.png",await sharp({create:{width:800,height:800,channels:3,background:"white"}}).composite([{input:smaller,left:248,top:200}]).png().toBuffer());
const entries = cases.slice(0,3).map((item,index)=>({source:item.input.url,output:item.outputs.jpeg.url,name:outputName({...DEFAULTS,prefix:"MUG-042"},index,"image/jpeg")}));
const archiveEntries = await Promise.all(entries.map(async item => [item.name, new Uint8Array(await fs.readFile(`public${item.output}`))]));
const archiveBytes = zipSync(Object.fromEntries(archiveEntries),{level:0});
await fs.writeFile(path.join(root,"example-batch.zip"),archiveBytes);
const batch = {url:"/evidence/example-batch.zip",bytes:archiveBytes.length,sha256:digest(archiveBytes),entries};
const previews = {};
for (const [name,input] of [["source",portrait],["contain",square],["cover",await fs.readFile(path.join(root,"portrait-cover.png"))]]) {
  previews[name] = await save(`preview-${name}.webp`,await sharp(input).resize({width:600}).webp({quality:82}).toBuffer());
}
const manifest = {measuredOn,encoder:{node:process.versions.node,sharp:sharp.versions.sharp,vips:sharp.versions.vips},parameters:{width:1200,height:900,jpegQuality:85,webpQuality:85,background:"white",png:"lossless default encoder"},cases,framing,transparency,crops,scale,batch,previews};
await fs.writeFile(path.join(root,"manifest.json"),JSON.stringify(manifest,null,2)+"\n");
console.log(JSON.stringify({measuredOn,cases:cases.map(c=>({id:c.id,jpeg:c.outputs.jpeg.bytes,png:c.outputs.png.bytes,webp:c.outputs.webp.bytes})),framing:{source:framing.source,outputs:framing.outputs},encoder:manifest.encoder},null,2));
