// Lantern Tale engine: canvas, palette, math and drawing primitives.
// Every drawing function in the kit uses the shared `ctx` exported here (set once by main.js).
export const W = 1080, H = 1920, FPS = 30;
export let ctx = null;
export function setCtx(c) { ctx = c; }

// The style-sheet palette: warm lantern light against deep cool shadow. Only these appear on screen.
export const C = {
  // people
  skin: '#F1DFC8', skinShade: '#D9BFA0', cheek: '#E9A38E', ink: '#1B1410', white: '#FFFFFF',
  teal: '#2F8F8B', tealShade: '#236E6B', brown: '#8C5A3C', brownShade: '#6E4429', trousers: '#3B3550', trousersShade: '#2C2840',
  hat: '#2A2230', hatBand: '#C8433A', scarf: '#C8433A',
  // light
  gold: '#FFC857', yellow: '#FFC857', amber: '#E9923B', ember: '#C4561F', red: '#C8433A', cream: '#FFE9BD',
  // places
  indigo: '#1B2347', indigoLight: '#2E3B73', plum: '#7A4A6B', peach: '#F2B987', dusk: '#3E3A73',
  wall: '#8A4B36', wallLight: '#A05D43', wood: '#4A2C20', woodDark: '#2A1A14', iron: '#3A2E33', ground: '#2B1D2E',
  paper: '#EFE3C6', paperShade: '#D8C8A3', cash: '#7DB07A', cashShade: '#5E9060', sea: '#243B6B', seaLight: '#35508C',
};

// ---------- math ----------
export const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const seg = (t, a, b) => clamp((t - a) / ((b - a) || 1e-6));
export const eo = (t) => 1 - Math.pow(1 - t, 3);
export const eio = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const eob = (t) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); };
export const rnd = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
export const TAU = Math.PI * 2;
export const hexA = (h, a) => { const n = parseInt(h.slice(1), 16); return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`; };

// ---------- primitives ----------
export function rr(x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }
export function circle(x, y, r, fill) { ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = fill; ctx.fill(); }
export function ell(x, y, rx, ry, fill, rot = 0) { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, rot, 0, TAU); ctx.fillStyle = fill; ctx.fill(); }
export function line(pts, color, w) {
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
  ctx.strokeStyle = color; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
}
export function fillAll(color) { ctx.fillStyle = color; ctx.fillRect(-300, -300, W + 600, H + 600); }
/** vertical gradient over the whole (over-scanned) canvas: stops = [[0, '#hex'], [1, '#hex']] spanning y0..y1 */
export function grad(y0, y1, stops) {
  const g = ctx.createLinearGradient(0, y0, 0, y1); stops.forEach(([o, c]) => g.addColorStop(o, c));
  ctx.fillStyle = g; ctx.fillRect(-300, -300, W + 600, H + 600);
}
/** outlined bold text (sound-effect words, stamps), centred at x, y */
export function bigText(text, x, y, size, fill = C.white, rot = 0, sc = 1) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc);
  ctx.font = `900 ${size}px Inter`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
  ctx.lineWidth = size * 0.18; ctx.strokeStyle = C.ink; ctx.strokeText(text, 0, 0); ctx.fillStyle = fill; ctx.fillText(text, 0, 0);
  ctx.restore();
}
