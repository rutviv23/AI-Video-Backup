// Lantern Tale: the COMPONENT ZOO. Every reusable thing on screen lives here.
// All functions draw immediately with the shared ctx, in 1080x1920 canvas pixels unless a scale is given.
import { ctx, C, W, H, TAU, lerp, clamp, rnd, rr, circle, ell, line, fillAll, grad, hexA, seg, eo, eob } from './lib.js';

// ═════════════════════════ LIGHT ═════════════════════════
/** soft radial pool of light (the look's signature): warm centre fading to nothing */
export function glow(x, y, r, col = C.gold, a = 0.5) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r);
  g.addColorStop(0, hexA(col, a)); g.addColorStop(0.45, hexA(col, a * 0.4)); g.addColorStop(1, hexA(col, 0));
  ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2);
}
/** dark edges: drawn once over every shot by main.js */
export function vignette(a = 0.55) {
  const g = ctx.createRadialGradient(540, 930, 480, 540, 960, 1220);
  g.addColorStop(0, 'rgba(20,10,8,0)'); g.addColorStop(1, `rgba(20,10,8,${a})`);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
}
/** drifting gold motes: rise slowly and twinkle */
export function dust(t, n = 30, col = C.gold) {
  ctx.save();
  for (let i = 0; i < n; i++) {
    const x = ((rnd(i) * W + Math.sin(t * 0.6 + i) * 26 + t * (6 + rnd(i + 4) * 12)) % W + W) % W;
    const y = (((rnd(i + 9) * H - t * (16 + rnd(i + 2) * 24)) % H) + H) % H;
    ctx.globalAlpha = (0.25 + 0.5 * Math.abs(Math.sin(t * 1.4 + i * 1.7))) * 0.8;
    circle(x, y, 2 + rnd(i + 5) * 4, col);
  }
  ctx.restore();
}
/** four-point white twinkle */
export function sparkle(x, y, s, rot = 0, a = 1) {
  if (a <= 0 || s <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha = a;
  ctx.beginPath(); ctx.moveTo(0, -60); ctx.quadraticCurveTo(8, -8, 60, 0); ctx.quadraticCurveTo(8, 8, 0, 60); ctx.quadraticCurveTo(-8, 8, -60, 0); ctx.quadraticCurveTo(-8, -8, 0, -60);
  ctx.fillStyle = C.white; ctx.fill(); ctx.restore();
}
/** final pass over every frame */
export function grade(t) { vignette(0.5); dust(t); }

// ═════════════════════════ PLACES ═════════════════════════
/** Paris at dusk: peach horizon, plum sky, rooftops, cobbles. Horizon line sits at y 1480. */
export function dusk(t = 0) {
  grad(-300, 1500, [[0, C.dusk], [0.38, C.plum], [0.72, '#E58E6D'], [1, C.peach]]);
  glow(250, 1330, 760, '#FFD59A', 0.6);
  ctx.fillStyle = '#6A3F5C'; for (let i = 0; i < 14; i++) { const h = 120 + rnd(i) * 110; ctx.fillRect(-40 + i * 100, 1480 - h, 96, h); if (i % 3 == 0) ctx.fillRect(-20 + i * 100, 1480 - h - 40, 22, 42); }
  ctx.fillStyle = '#4B2B45'; for (let i = 0; i < 10; i++) { const h = 70 + rnd(i + 20) * 90; ctx.fillRect(i * 118 - 30, 1480 - h, 112, h); }
  ctx.fillStyle = C.ground; ctx.fillRect(-300, 1480, W + 600, 700);
  ctx.strokeStyle = 'rgba(255,200,120,0.12)'; ctx.lineWidth = 4; for (let y = 1520; y < 1920; y += 60) { ctx.beginPath(); ctx.moveTo(-300, y); ctx.lineTo(W + 300, y); ctx.stroke(); }
}
/** night: indigo sky, moon, twinkling stars, dark ground at y 1480 */
export function night(t = 0) {
  grad(-300, 1500, [[0, '#10162E'], [1, C.indigoLight]]);
  glow(820, 330, 520, C.cream, 0.5); circle(820, 330, 86, C.cream);
  for (let i = 0; i < 70; i++) { ctx.globalAlpha = 0.3 + 0.7 * Math.abs(Math.sin(t * 1.5 + i)); circle(rnd(i) * W, rnd(i + 30) * 1100, 2 + rnd(i + 7) * 3, C.white); } ctx.globalAlpha = 1;
  ctx.fillStyle = '#3A2F4A'; ctx.beginPath(); ctx.moveTo(-100, 1480); for (let x = -100; x <= W + 100; x += 60) ctx.lineTo(x, 1380 - 70 * Math.abs(Math.sin(x * 0.006 + 1))); ctx.lineTo(W + 100, 1480); ctx.fill();
  ctx.fillStyle = '#1D1A2B'; ctx.fillRect(-300, 1480, W + 600, 700);
}
/** the sea at night: sky above, three slow wave bands from y 1250 */
export function ocean(t = 0) {
  grad(-300, 1300, [[0, '#0F1530'], [1, '#3B3F7A']]);
  glow(300, 360, 480, C.cream, 0.45); circle(300, 360, 80, C.cream);
  for (let i = 0; i < 70; i++) { ctx.globalAlpha = 0.3 + 0.7 * Math.abs(Math.sin(t * 1.5 + i)); circle(rnd(i + 3) * W, rnd(i + 40) * 1000, 2 + rnd(i + 8) * 3, C.white); } ctx.globalAlpha = 1;
  for (let b = 0; b < 3; b++) {
    ctx.beginPath(); ctx.moveTo(-100, 1920);
    for (let x = -100; x <= W + 100; x += 20) ctx.lineTo(x, 1250 + b * 90 + Math.sin(x * 0.012 + t * (1 + b * 0.4) + b * 2) * (14 + b * 6));
    ctx.lineTo(W + 100, 1920); ctx.fillStyle = [C.sea, '#1D3260', '#162750'][b]; ctx.fill();
  }
  ctx.fillStyle = 'rgba(255,233,189,0.18)'; for (let i = 0; i < 6; i++) ctx.fillRect(250 + Math.sin(t * 2 + i) * 20, 1270 + i * 38, 100 - i * 8, 8);
}
/** hotel salon: striped wall, wainscot, chandelier glow, floor at y 1500 */
export function hotel(t = 0) {
  fillAll(C.wall);
  ctx.fillStyle = hexA(C.wallLight, 0.5); for (let x = -40; x < W + 40; x += 110) ctx.fillRect(x, -100, 54, 1500);
  ctx.fillStyle = C.wood; ctx.fillRect(-300, 1180, W + 600, 340); ctx.fillStyle = C.woodDark; ctx.fillRect(-300, 1170, W + 600, 14);
  ctx.fillStyle = C.woodDark; ctx.fillRect(-300, 1500, W + 600, 600);
  line([[540, -200], [540, 250]], C.ink, 8);
  glow(540, 300, 620, C.gold, 0.55 + 0.05 * Math.sin(t * 5));
  ctx.fillStyle = '#B98A3E'; ctx.beginPath(); ctx.moveTo(380, 300); ctx.quadraticCurveTo(540, 380, 700, 300); ctx.lineTo(700, 280); ctx.lineTo(380, 280); ctx.fill();
  for (const x of [380, 460, 540, 620, 700]) { line([[x, 290], [x, 262]], '#B98A3E', 8); ell(x, 240 + Math.sin(t * 9 + x) * 2, 11, 20, C.cream); }
  rr(70, 380, 200, 260, 14); ctx.fillStyle = C.woodDark; ctx.fill(); rr(88, 398, 164, 224, 6); ctx.fillStyle = C.indigoLight; ctx.fill(); glow(170, 520, 160, C.cream, 0.2);   // a night window
}
/** study: warm lamplit wall with a night window, desk edge at y 1420 */
export function study(t = 0) {
  fillAll('#3B2A24');
  rr(660, 300, 280, 400, 16); ctx.fillStyle = C.woodDark; ctx.fill(); rr(680, 320, 240, 360, 8); ctx.fillStyle = C.indigoLight; ctx.fill(); ctx.fillStyle = C.woodDark; ctx.fillRect(796, 320, 8, 360); ctx.fillRect(680, 494, 240, 8);
  glow(250, 820, 700, C.gold, 0.6 + 0.04 * Math.sin(t * 6));
  rr(140, 760, 220, 40, 20); ctx.fillStyle = C.amber; ctx.fill(); line([[250, 800], [250, 1100]], C.iron, 20);
  ctx.fillStyle = C.wood; ctx.fillRect(-300, 1420, W + 600, 700); ctx.fillStyle = C.woodDark; ctx.fillRect(-300, 1420, W + 600, 14);
}

// ═════════════════════════ LANDMARK ═════════════════════════
/** lattice iron tower silhouette. origin = centre of the base, ~1090 px tall at s = 1. rust 0..1 sprinkles ember patches. */
export function tower(x, y, s, col = C.iron, rust = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const p = new Path2D();
  p.moveTo(-230, 0); p.quadraticCurveTo(-120, -330, -50, -640); p.quadraticCurveTo(-26, -860, -8, -1020); p.lineTo(0, -1090); p.lineTo(8, -1020);
  p.quadraticCurveTo(26, -860, 50, -640); p.quadraticCurveTo(120, -330, 230, 0); p.lineTo(150, 0);
  p.quadraticCurveTo(130, -190, 0, -215); p.quadraticCurveTo(-130, -190, -150, 0); p.closePath();
  ctx.fillStyle = col; ctx.fill(p);
  ctx.save(); ctx.clip(p);
  ctx.strokeStyle = 'rgba(255,200,120,0.22)'; ctx.lineWidth = 5;
  for (let yy = -40; yy > -1090; yy -= 62) { ctx.beginPath(); ctx.moveTo(-260, yy); ctx.lineTo(260, yy - 62); ctx.moveTo(260, yy); ctx.lineTo(-260, yy - 62); ctx.stroke(); }
  for (let i = 0; i < Math.round(rust * 90); i++) circle((rnd(i) - 0.5) * 420, -40 - rnd(i + 50) * 1000, 10 + rnd(i + 9) * 18, C.ember);
  ctx.restore();
  rr(-142, -338, 284, 24, 8); ctx.fillStyle = col; ctx.fill(); rr(-64, -654, 128, 20, 8); ctx.fill(); ctx.fillRect(-3, -1130, 6, 60);
  ctx.restore();
}

// ═════════════════════════ PEOPLE ═════════════════════════
export const POSE = {
  down: { l: [-122, -96], r: [122, -96] }, up: { l: [-170, -440], r: [170, -440] }, cheer: { l: [-190, -360], r: [190, -360] },
  front: { l: [-60, -150], r: [60, -150] }, tip: { l: [-122, -96], r: [78, -470] }, hold: { l: [-110, -130], r: [96, -180] }, write: { l: [-90, -130], r: [100, -140] },
  shrug: { l: [-180, -200], r: [180, -200] }, point: { l: [-122, -96], r: [250, -330] }, face: { l: [-60, -400], r: [60, -400] },
};
export const poseMix = (a, b, t) => ({ l: [lerp(a.l[0], b.l[0], t), lerp(a.l[1], b.l[1], t)], r: [lerp(a.r[0], b.r[0], t), lerp(a.r[1], b.r[1], t)] });

function limb(side, h, o) {
  const sh = [92 * side, -262], mid = [(sh[0] + h[0]) / 2 + side * 14, (sh[1] + h[1]) / 2 + 26];
  ctx.beginPath(); ctx.moveTo(sh[0], sh[1]); ctx.quadraticCurveTo(mid[0], mid[1], h[0], h[1]);
  ctx.strokeStyle = o.coat; ctx.lineWidth = 46; ctx.lineCap = 'round'; ctx.stroke();
  circle(h[0], h[1], 29, C.skin); circle(h[0] + side * 6, h[1] + 8, 15, C.skinShade);
}
function hat(kind, col, hy) {
  if (!kind || kind === 'none') return;
  if (kind === 'bowler') { ell(0, hy - 84, 142, 22, col); ctx.beginPath(); ctx.ellipse(0, hy - 90, 96, 80, 0, Math.PI, TAU); ctx.fillStyle = col; ctx.fill(); rr(-98, hy - 112, 196, 24, 6); ctx.fillStyle = C.hatBand; ctx.fill(); ell(-38, hy - 142, 22, 10, 'rgba(255,255,255,0.18)', -0.6); }
  if (kind === 'top') { ell(0, hy - 90, 132, 20, col); rr(-80, hy - 250, 160, 168, 14); ctx.fillStyle = col; ctx.fill(); rr(-80, hy - 130, 160, 26, 4); ctx.fillStyle = C.hatBand; ctx.fill(); }
  if (kind === 'flat') { ctx.beginPath(); ctx.ellipse(-6, hy - 78, 126, 54, 0, Math.PI, TAU); ctx.fillStyle = col; ctx.fill(); rr(-132, hy - 84, 176, 22, 11); ctx.fill(); rr(40, hy - 86, 100, 18, 9); ctx.fill(); }
}
/** a person: round head, bean body. origin = feet centre; ~590 px tall at s = 1. Faces front; `flip` mirrors.
 *  o = { x, y, s, flip, bob, shake, walk (phase), lean, coat, coatShade, pants, hat, hatCol, stache, scarf, belly,
 *        arm: POSE.x (both arms), eyes 'n'|'wide'|'closed'|'happy', mouth 'smile'|'grin'|'o'|'flat'|'smirk'|'frown',
 *        brow 0..1 raise, tilt -1..1 (-1 worried / +1 angry), look [dx, dy], sweat 0..1, blush 0..1, holdR: (x, y) => draw prop } */
export function person(o = {}) {
  const s = o.s || 1, coat = o.coat || C.teal, coatS = o.coatShade || C.tealShade, pose = o.arm || POSE.down;
  ctx.save(); ctx.translate(o.x + (o.shake || 0), o.y + (o.bob || 0)); ctx.scale((o.flip ? -1 : 1) * s, s);
  ell(0, 6, 130, 18, 'rgba(0,0,0,0.3)');
  const st = o.walk != null ? Math.sin(o.walk) * 30 : 0;
  line([[-36, -130], [-36 + st, -16]], o.pants || C.trousers, 52); line([[36, -130], [36 - st, -16]], o.pants || C.trousers, 52);
  ell(-40 + st, -8, 38, 20, C.ink); ell(40 - st, -8, 38, 20, C.ink);
  limb(-1, pose.l, { coat: coatS });
  const bw = o.belly ? 112 : 96;
  rr(-bw, -310, bw * 2, 214 + (o.belly ? 24 : 0), 80); ctx.fillStyle = coat; ctx.fill();
  ctx.save(); rr(-bw, -310, bw * 2, 214 + (o.belly ? 24 : 0), 80); ctx.clip(); ctx.beginPath(); ctx.moveTo(bw * 0.35, -320); ctx.quadraticCurveTo(bw * 0.2, -200, bw * 0.45, -80); ctx.lineTo(bw + 4, -80); ctx.lineTo(bw + 4, -320); ctx.fillStyle = coatS; ctx.fill(); ctx.restore();
  if (o.scarf) { rr(-70, -330, 140, 46, 23); ctx.fillStyle = o.scarf; ctx.fill(); rr(30, -312, 34, 100, 12); ctx.fill(); }
  limb(1, pose.r, { coat });
  if (o.holdR) o.holdR(pose.r[0], pose.r[1]);
  const hy = -400 + (o.lean || 0) * 0;
  ctx.save(); ctx.translate(o.lean ? o.lean * 24 : 0, 0);
  circle(0, hy, 124, C.skinShade); ctx.save(); ctx.beginPath(); ctx.arc(0, hy, 124, 0, TAU); ctx.clip(); circle(-30, hy - 26, 122, C.skin); ctx.restore();
  const [lx, ly] = o.look || [0, 0], ey = hy + 6, ex = 44;
  for (const sx of [-1, 1]) {
    const x = sx * ex;
    if (o.eyes === 'closed') line([[x - 14, ey], [x + 14, ey]], C.ink, 7);
    else if (o.eyes === 'happy') { ctx.beginPath(); ctx.arc(x, ey + 6, 15, Math.PI * 1.1, Math.PI * 1.9); ctx.strokeStyle = C.ink; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.stroke(); }
    else { const r = o.eyes === 'wide' ? 15 : 10; if (o.eyes === 'wide') circle(x, ey, 22, C.white); circle(x + lx * 6, ey + ly * 6, r, C.ink); circle(x + lx * 6 + 3, ey + ly * 6 - 4, 3.5, C.white); }
    const br = (o.brow || 0) * 18, tl = (o.tilt || 0) * 12;
    const bo = ey - 44 - br, inner = bo + tl, outer = bo - tl;   // angry: inner end down, worried: inner end up
    line(sx < 0 ? [[x - 22, outer], [x + 22, inner]] : [[x - 22, inner], [x + 22, outer]], C.ink, 7);
  }
  ell(-70, hy + 40, 20, 12, hexA(C.cheek, 0.35 + 0.55 * (o.blush || 0))); ell(70, hy + 40, 20, 12, hexA(C.cheek, 0.35 + 0.55 * (o.blush || 0)));
  if (o.stache) { ell(-22, hy + 38, 30, 11, C.ink, -0.25); ell(22, hy + 38, 30, 11, C.ink, 0.25); }
  const my = hy + 64, m = o.mouth || 'smile'; ctx.lineCap = 'round'; ctx.strokeStyle = C.ink; ctx.lineWidth = 7;
  if (m === 'smile') { ctx.beginPath(); ctx.arc(0, my - 14, 28, 0.25, Math.PI - 0.25); ctx.stroke(); }
  if (m === 'smirk') { ctx.beginPath(); ctx.moveTo(-20, my); ctx.quadraticCurveTo(10, my + 14, 34, my - 12); ctx.stroke(); }
  if (m === 'grin') { ctx.beginPath(); ctx.moveTo(-34, my - 12); ctx.quadraticCurveTo(0, my + 40, 34, my - 12); ctx.closePath(); ctx.fillStyle = '#5A2523'; ctx.fill(); ctx.stroke(); ctx.save(); ctx.clip(); rr(-26, my - 14, 52, 14, 4); ctx.fillStyle = C.white; ctx.fill(); ctx.restore(); }
  if (m === 'o') ell(0, my + 4, 15, 19, '#5A2523');
  if (m === 'flat') line([[-22, my], [22, my]], C.ink, 7);
  if (m === 'frown') { ctx.beginPath(); ctx.arc(0, my + 24, 26, Math.PI + 0.35, TAU - 0.35); ctx.stroke(); }
  for (let i = 0; i < Math.round((o.sweat || 0) * 3); i++) { const sy = hy - 70 + i * 40; ctx.beginPath(); ctx.moveTo(-134 - i * 6, sy - 24); ctx.quadraticCurveTo(-112 - i * 6, sy + 6, -134 - i * 6, sy + 10); ctx.quadraticCurveTo(-156 - i * 6, sy + 6, -134 - i * 6, sy - 24); ctx.fillStyle = C.cream; ctx.fill(); }
  hat(o.hat, o.hatCol || C.hat, hy);
  ctx.restore(); ctx.restore();
}

// ═════════════════════════ PROPS ═════════════════════════
export function coin(x, y, r, rot = 0, a = 1) {
  if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.rotate(rot);
  ell(0, 0, r, r * (0.55 + 0.45 * Math.abs(Math.cos(rot * 2))), C.gold); ell(0, 0, r * 0.7, r * 0.7 * (0.55 + 0.45 * Math.abs(Math.cos(rot * 2))), C.amber); ctx.restore();
}
export function envelope(x, y, s, rot = 0) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  rr(-70, -46, 140, 92, 10); ctx.fillStyle = C.paper; ctx.fill(); ctx.lineWidth = 5; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-70, -42); ctx.lineTo(0, 12); ctx.lineTo(70, -42); ctx.stroke(); circle(0, 12, 14, C.red); ctx.restore();
}
/** suitcase: open 0..1 lifts the lid and reveals stacks of cash */
export function suitcase(x, y, s, open = 0) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  rr(-160, -20, 320, 190, 24); ctx.fillStyle = C.brown; ctx.fill(); ctx.fillStyle = C.brownShade; ctx.fillRect(-160, 110, 320, 60);
  if (open > 0) { for (let i = 0; i < 5; i++) { rr(-140 + i * 56, -50 - (i % 2) * 14, 52, 70, 8); ctx.fillStyle = C.cash; ctx.fill(); rr(-140 + i * 56, -26 - (i % 2) * 14, 52, 18, 4); ctx.fillStyle = C.cashShade; ctx.fill(); } }
  ctx.save(); ctx.translate(0, -20); ctx.scale(1, 1 - 1.7 * open); ctx.translate(0, 0); rr(-160, -40, 320, 56, 24); ctx.fillStyle = C.brown; ctx.fill(); ctx.restore();
  rr(-40, 70, 80, 36, 10); ctx.fillStyle = C.gold; ctx.fill(); line([[-60, -22], [60, -22]], C.gold, 10);
  ctx.restore();
}
export function newspaper(x, y, s, rot, head, sub) {
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  rr(-260, -340, 520, 680, 14); ctx.fillStyle = C.paper; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.fillStyle = C.ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.font = '900 46px Inter'; ctx.fillText('THE DAILY', 0, -290); line([[-230, -258], [230, -258]], C.ink, 6);
  ctx.font = '900 118px Inter'; ctx.fillText(head, 0, -170);
  ctx.font = '900 34px Inter'; ctx.fillText(sub || '', 0, -86);
  for (let i = 0; i < 7; i++) line([[-230, 10 + i * 40], [i % 3 === 2 ? 20 : 230, 10 + i * 40]], C.paperShade, 14);
  ctx.restore();
}
export function stamp(text, x, y, s, rot, a = 1) {
  if (a <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha = a;
  rr(-260, -110, 520, 220, 30); ctx.lineWidth = 16; ctx.strokeStyle = C.red; ctx.stroke();
  ctx.fillStyle = C.red; ctx.font = '900 160px Inter'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.letterSpacing = '6px'; ctx.fillText(text, 0, 8); ctx.letterSpacing = '0px'; ctx.restore();
}
/** police shield with a star */
export function badge(x, y, s, a = 1) {
  if (a <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha = a;
  ctx.beginPath(); ctx.moveTo(0, -150); ctx.lineTo(120, -110); ctx.quadraticCurveTo(120, 60, 0, 150); ctx.quadraticCurveTo(-120, 60, -120, -110); ctx.closePath();
  ctx.fillStyle = C.gold; ctx.fill(); ctx.lineWidth = 12; ctx.strokeStyle = C.ink; ctx.stroke();
  ctx.beginPath(); for (let i = 0; i < 10; i++) { const r = i % 2 ? 36 : 80, an = -Math.PI / 2 + i * Math.PI / 5; ctx.lineTo(Math.cos(an) * r, Math.sin(an) * r - 4); } ctx.closePath(); ctx.fillStyle = C.ember; ctx.fill();
  ctx.restore();
}
/** red X (danger / "no") */
export function redX(x, y, s, a = 1) {
  if (a <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha = a; ctx.lineCap = 'round';
  for (const [w, c] of [[90, C.ink], [66, C.red]]) { ctx.strokeStyle = c; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(-200, -200); ctx.lineTo(200, 200); ctx.moveTo(200, -200); ctx.lineTo(-200, 200); ctx.stroke(); }
  ctx.restore();
}
export function speedLines(x, y, a, dir = -1) {
  if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; for (let i = 0; i < 5; i++) line([[x + dir * (60 + i * 18), y - 80 + i * 40], [x + dir * (240 + i * 40), y - 80 + i * 40]], C.cream, 10); ctx.restore();
}
/** simple ship silhouette on the waves (origin = waterline centre) */
export function ship(x, y, s, t = 0) {
  ctx.save(); ctx.translate(x, y + Math.sin(t * 1.6) * 8); ctx.rotate(Math.sin(t * 1.2) * 0.02); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(-260, -60); ctx.lineTo(260, -60); ctx.lineTo(200, 30); ctx.lineTo(-210, 30); ctx.closePath(); ctx.fillStyle = '#16122A'; ctx.fill();
  rr(-130, -150, 230, 92, 10); ctx.fill(); rr(-60, -226, 120, 80, 10); ctx.fill(); rr(-96, -300, 56, 90, 8); ctx.fillStyle = '#2A2240'; ctx.fill(); rr(10, -290, 56, 80, 8); ctx.fill();
  for (let i = 0; i < 6; i++) circle(-190 + i * 62, -22, 10, C.gold);
  for (let i = 0; i < 4; i++) circle(-110 + i * 56, -110, 9, C.gold);
  for (let i = 0; i < 6; i++) { ctx.globalAlpha = 0.5 - i * 0.07; circle(-70 - i * 50 - Math.sin(t + i) * 10, -320 - i * 36, 30 + i * 9, '#CFC6E0'); } ctx.globalAlpha = 1;
  ctx.restore();
}
/** label pill */
export function pill(text, x, y, size, bg = C.ink, fg = C.cream, sc = 1) {
  if (sc <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc);
  ctx.font = `900 ${size}px Inter`; ctx.letterSpacing = '2px';
  const w = ctx.measureText(text).width + size * 1.1, h = size * 1.6;
  rr(-w / 2, -h / 2, w, h, h / 2); ctx.fillStyle = bg; ctx.fill(); ctx.fillStyle = fg; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, size * 0.05); ctx.letterSpacing = '0px'; ctx.restore();
}
