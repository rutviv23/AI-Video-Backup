// WHY TRAIN TRACKS ARE FILLED WITH SHARP STONES (Hindi audio, English captions): bright colourful shot list.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, bigText } from './core/lib.js';
import { L, Wd } from './core/timing.js';
import * as K from './core/kit.js';

export function buildShots() {
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);
  const pop = (lt, t0, dur = 0.26) => eob(seg(lt, t0, t0 + dur));
  const hash = (n) => { const s = Math.sin(n * 127.1 + 3.7) * 43758.5453; return s - Math.floor(s); };
  const RED = '#ff3b57', YEL = '#FACC15', ORG = '#ff8a1f', BLUE = '#2f6bff', GRN = '#2fd673', NAVY = '#1f2c6b';

  // ───────── helpers ─────────
  const rr = (x, y, w, h, r, fill, stroke, lw = 8) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fillStyle = fill; ctx.fill(); if (stroke) { ctx.lineWidth = lw; ctx.strokeStyle = stroke; ctx.stroke(); } };
  const circ = (x, y, r, fill) => { ctx.beginPath(); ctx.arc(x, y, Math.max(0, r), 0, TAU); ctx.fillStyle = fill; ctx.fill(); };
  const poly = (pts, fill, stroke, lw = 6) => { ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); if (stroke) { ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.strokeStyle = stroke; ctx.stroke(); } };
  const lin = (c0, c1, y0 = 0, y1 = H) => { const g = ctx.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, c0); g.addColorStop(1, c1); ctx.fillStyle = g; const top = y0 === 0 ? -200 : y0; ctx.fillRect(-200, top, W + 400, H + 200 - top); };
  const shade = () => { const g = ctx.createLinearGradient(0, 1380, 0, H); g.addColorStop(0, 'rgba(45,10,70,0)'); g.addColorStop(0.3, 'rgba(45,10,70,0.62)'); g.addColorStop(1, 'rgba(45,10,70,0.85)'); ctx.fillStyle = g; ctx.fillRect(-200, 1380, W + 400, H - 1380 + 200); };
  // pill that always fits the frame
  const pill = (txt, x, y, size, bg, fg, sc = 1, maxW = 940) => { if (sc <= 0) return; ctx.save(); ctx.font = `900 ${size}px Inter`; ctx.letterSpacing = '2px'; const w = ctx.measureText(txt).width + size * 1.1; ctx.restore();
    const f = Math.min(1, maxW / w); ctx.save(); ctx.shadowColor = 'rgba(30,10,60,.28)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 8; K.pill(txt, x, y, size * f, bg, fg, sc); ctx.restore(); };
  const label = (txt, x, y, size, col, sc = 1) => { if (sc <= 0) return; bigText(txt, x, y, size, col, 0, sc); };
  const cloud = (x, y, s, col = '#ffffff') => { [[0, 0, 60], [55, -22, 70], [120, 0, 58], [60, 18, 62]].forEach(([dx, dy, r]) => circ(x + dx * s, y + dy * s, r * s, col)); };
  const sun = (x, y, t) => { ctx.save(); ctx.translate(x, y); ctx.rotate(t * 0.3); for (let i = 0; i < 12; i++) { ctx.rotate(TAU / 12); poly([[110, -16], [185, 0], [110, 16]], 'rgba(250,204,21,.75)'); } ctx.restore(); circ(x, y, 100, YEL); circ(x - 25, y - 25, 40, '#ffe45c'); };
  const sky = (t, sunX = 900, sunY = 520) => { lin('#1e9bff', '#c4f0ff', 0, H); sun(sunX, sunY, t);
    cloud(((t * 26) % 1500) - 250, 470, 1.1); cloud(((t * 16 + 700) % 1500) - 250, 330, 0.8); cloud(((t * 20 + 320) % 1500) - 250, 640, 0.7); };
  const hills = (y) => { ctx.fillStyle = '#58e07f'; ctx.beginPath(); ctx.ellipse(220, y + 80, 620, 190, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#35c96b'; ctx.beginPath(); ctx.ellipse(940, y + 100, 640, 180, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#2fbd62'; ctx.fillRect(-200, y + 90, W + 400, H); };

  const STONE = ['#9aa3bd', '#b9c0d4', '#7d86a6', '#c9a58a', '#a8906f', '#8f9bb8'];
  // angular crushed stone
  const stone = (x, y, r, i, rot = 0, col, sq = 0.82) => { const n = 5 + Math.floor(hash(i + 2) * 3), pts = [];
    for (let k = 0; k < n; k++) { const a = (k + (hash(i * 7 + k) - 0.5) * 0.55) / n * TAU; const rad = r * (0.74 + hash(i * 13 + k * 3) * 0.48); pts.push([Math.cos(a) * rad, Math.sin(a) * rad * sq]); }
    ctx.save(); ctx.translate(x, y); ctx.rotate(rot); poly(pts, col || STONE[i % STONE.length], '#3a3f5c', Math.max(2, r * 0.1));
    poly([[0, 0], pts[Math.floor(n * 0.55)], pts[Math.floor(n * 0.75)]], 'rgba(255,255,255,.34)'); poly([[0, 0], pts[0], pts[1]], 'rgba(30,25,60,.18)'); ctx.restore(); };
  const pebble = (x, y, r, i) => { const cols = ['#ffd0a8', '#c9b8ff', '#9ee0ff', '#ffe28a', '#a8f0c0']; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = cols[i % cols.length]; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = '#3a3f5c'; ctx.stroke(); circ(x - r * 0.34, y - r * 0.36, r * 0.22, 'rgba(255,255,255,.85)'); };
  const arrow = (x1, y1, x2, y2, col, w = 16, p = 1, a = 1) => { if (p <= 0 || a <= 0) return; const x = lerp(x1, x2, p), y = lerp(y1, y2, p), ang = Math.atan2(y2 - y1, x2 - x1), len = Math.hypot(x - x1, y - y1);
    if (len < w * 2) return; ctx.save(); ctx.globalAlpha = clamp(a);
    for (const [cc, ex] of [['#ffffff', 12], [col, 0]]) { ctx.strokeStyle = cc; ctx.fillStyle = cc; ctx.lineWidth = w + ex; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x - Math.cos(ang) * w * 1.7, y - Math.sin(ang) * w * 1.7); ctx.stroke();
      ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.beginPath(); ctx.moveTo(ex * 0.8, 0); ctx.lineTo(-w * 2.3 - ex * 0.3, -w * 1.5 - ex * 0.7); ctx.lineTo(-w * 2.3 - ex * 0.3, w * 1.5 + ex * 0.7); ctx.closePath(); ctx.fill(); ctx.restore(); }
    ctx.restore(); };
  const tick = (x, y, s, a = 1) => { if (a <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s * a, s * a); circ(0, 0, 100, '#ffffff'); circ(0, 0, 86, '#18b657'); ctx.strokeStyle = '#fff'; ctx.lineWidth = 28; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(-44, 2); ctx.lineTo(-10, 36); ctx.lineTo(48, -30); ctx.stroke(); ctx.restore(); };
  const cross = (x, y, s, a = 1) => { if (a <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s * a, s * a); circ(0, 0, 100, '#ffffff'); circ(0, 0, 86, RED); ctx.strokeStyle = '#fff'; ctx.lineWidth = 28; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-36, -36); ctx.lineTo(36, 36); ctx.moveTo(36, -36); ctx.lineTo(-36, 36); ctx.stroke(); ctx.restore(); };

  // front view of a bright engine; origin = rail top centre (rails at x = ±200)
  const trainFront = (x, y, s, txt) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    for (const wx of [-200, 200]) { circ(wx, -48, 52, '#2b2f45'); circ(wx, -48, 24, '#c9d2e3'); }
    rr(-250, -120, 500, 62, 18, '#33385a');
    rr(-275, -455, 550, 350, 80, RED, '#7a1030', 10);
    rr(-220, -492, 440, 60, 30, '#d9284a');
    rr(-228, -400, 208, 140, 28, '#bfeaff', '#ffffff', 12); rr(20, -400, 208, 140, 28, '#bfeaff', '#ffffff', 12);
    poly([[-200, -280], [-130, -386], [-100, -386], [-170, -280]], 'rgba(255,255,255,.7)'); poly([[50, -280], [120, -386], [150, -386], [80, -280]], 'rgba(255,255,255,.7)');
    ctx.fillStyle = YEL; ctx.fillRect(-270, -232, 540, 52);
    for (const hx of [-165, 165]) { circ(hx, -145, 34, '#ffffff'); circ(hx, -145, 22, '#fff3a6'); }
    circ(0, -462, 24, '#fff3a6');
    if (txt) { ctx.font = '900 40px Inter'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#4a0d20'; ctx.fillText(txt, 0, -205); }
    ctx.restore(); };
  // side view train, wheels on y
  const trainSide = (x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    for (let c = 3; c >= 0; c--) { const cx = -c * 345;
      if (c === 0) { poly([[cx - 160, -230], [cx + 90, -230], [cx + 175, -130], [cx + 175, -50], [cx - 160, -50]], RED, '#7a1030', 8); rr(cx + 30, -200, 80, 70, 14, '#bfeaff', '#fff', 8); rr(cx - 130, -200, 100, 60, 14, '#bfeaff', '#fff', 8); ctx.fillStyle = YEL; ctx.fillRect(cx - 160, -112, 335, 26); }
      else { rr(cx - 165, -220, 320, 170, 28, BLUE, '#14307a', 8); for (let k = 0; k < 4; k++) rr(cx - 140 + k * 72, -190, 52, 62, 10, '#cdeeff', '#fff', 6); ctx.fillStyle = YEL; ctx.fillRect(cx - 165, -108, 320, 22); }
      for (const wx of [-105, -45, 55, 115]) { circ(cx + wx, -30, 30, '#2b2f45'); circ(cx + wx, -30, 12, '#c9d2e3'); } }
    ctx.restore(); };
  // rail in cross-section: top surface at y
  const railSec = (x, y) => { rr(x - 38, y, 76, 30, 9, '#e3e9f5', '#3a3f5c', 6); ctx.fillStyle = '#9aa6bf'; ctx.fillRect(x - 15, y + 28, 30, 42); rr(x - 52, y + 66, 104, 24, 6, '#c3ccdf', '#3a3f5c', 6); };
  // the whole track cut open: rail top y=740
  const soil = (top) => { lin('#e08a45', '#8a4522', top, H); for (let i = 0; i < 70; i++) circ(hash(i + 5) * W, top + 30 + hash(i + 77) * 420, 5 + hash(i + 3) * 10, i % 2 ? 'rgba(90,40,15,.35)' : 'rgba(255,200,140,.35)'); };
  const bed = (press = 0) => { // ballast heap: trapezoid y 880..1135
    poly([[150, 880], [930, 880], [1060, 1135], [20, 1135]], '#646c8c');
    let n = 0; for (let row = 0; row < 6; row++) { const y = 895 + row * 46, half = lerp(375, 500, row / 5); for (let x = 540 - half; x <= 540 + half + 1; x += 66) { const i = n++; stone(x + (hash(i) - 0.5) * 22, y + (hash(i + 31) - 0.5) * 14 + (row < 2 ? press * 4 : 0), 43 + hash(i + 9) * 9, i, hash(i + 4) * TAU); } } };
  const trackCut = (press = 0) => { soil(1135); bed(press); rr(135, 828 + press * 6, 810, 78, 18, '#f1ead9', '#55506a', 8); for (const x of [340, 740]) railSec(x, 740 + press * 6); };

  // perspective track going to the horizon
  const persp = (t, zt) => { sky(t, 900, 560); hills(770);
    const hz = 760, bot = 1700;
    poly([[498, hz], [582, hz], [1230, bot], [-150, bot]], '#6d7696');
    const Y = (z) => hz + (bot - hz) * z * z, HALF = (z) => lerp(42, 690, z * z);
    const items = []; for (let i = 0; i < 520; i++) items.push([(hash(i) + t * 0.05) % 1, i]); items.sort((a, b) => a[0] - b[0]);
    for (const [z, i] of items) stone(540 + (hash(i + 200) * 2 - 1) * HALF(z) * 0.96, Y(z) + 6, 6 + 62 * z * z, i, hash(i + 3) * TAU);
    for (let k = 0; k < 13; k++) { const z = ((k / 13) + t * 0.12) % 1, y = Y(z), w = HALF(z) * 0.7, h = 3 + 36 * z * z; if (z > 0.08) rr(540 - w, y, w * 2, h, h * 0.3, '#f1ead9', '#55506a', 1 + 5 * z * z); }
    for (const sgn of [-1, 1]) poly([[540 + sgn * 18, hz], [540 + sgn * 25, hz], [540 + sgn * 385, bot], [540 + sgn * 335, bot]], '#f4f7ff', '#3a3f5c', 5);
    const z = zt; trainFront(540, Y(z) + 4, (HALF(z) * ((18 + 360) / 2 / 690)) / 200 + 0.06); };

  // ───────── 0: hook ─────────
  { const st = 0, mid = Wd('why', 0) - 0.05;
    add({ id: 'S01', at: st, cam: [540, 820], zoom: 0.1, note: 'train coming on a track full of stones, question on frame 0',
      draw(lt, d, t) { persp(t, lerp(0.54, 0.72, eio(seg(lt, 0, d))));
        pill('WHY ALL THESE', 540, 185, 90, NAVY, '#fff', 1);
        pill('STONES?', 540, 345, 132, RED, '#fff', 1 + 0.05 * Math.sin(t * 7));
        arrow(975, 960, 860, 1200, YEL, 26, eo(seg(lt, 0.8, 1.2))); arrow(105, 960, 220, 1200, YEL, 26, eo(seg(lt, 0.95, 1.35))); shade(); } });
    cue(st, 'whoosh'); cue(0.5, 'pop', { gain: 0.5 }); cue(0.8, 'zip', { gain: 0.35 });
    add({ id: 'S01b', at: mid, cam: [540, 800], zoom: 0.14, note: 'close-up: pile of stones and a rail, giant question mark',
      draw(lt, d, t) { lin('#ffb11f', '#ff5d7a', 0, H); ctx.save(); ctx.translate(540, 560); ctx.rotate(t * 0.15); for (let i = 0; i < 14; i++) { ctx.rotate(TAU / 14); poly([[0, 0], [1300, -110], [1300, 110]], 'rgba(255,255,255,.13)'); } ctx.restore();
        for (let i = 0; i < 74; i++) { const row = Math.floor(i / 9), col = i % 9; const fall = eo(seg(lt, hash(i) * 0.2, 0.3 + hash(i) * 0.25)); stone(40 + col * 128 + (row % 2) * 55 + (hash(i + 8) - 0.5) * 40, lerp(500, 920 + row * 78 + (hash(i + 2) - 0.5) * 30, fall), 84, i, hash(i + 6) * TAU); }
        rr(-240, 820, 1560, 70, 20, '#e3e9f5', '#3a3f5c', 9); rr(-240, 885, 1560, 34, 8, '#9aa6bf', '#3a3f5c', 7);
        const q = pop(lt, 0.1, 0.35); ctx.save(); ctx.translate(540, 550); ctx.rotate(Math.sin(t * 5) * 0.12); label('?', 0, 0, 440, YEL, q); ctx.restore();
        pill('BUT... WHY?', 540, 200, 90, NAVY, '#fff', pop(lt, 0.03)); shade(); } });
    cue(mid, 'whoosh'); cue(mid + 0.1, 'boing', { gain: 0.5 }); }

  // ───────── 1: spreads the weight ─────────
  { const st = cut(1), fan = Wd('over', 1) - st - 0.45;
    add({ id: 'S02', at: st, cam: [540, 820], zoom: 0.06, note: 'cross-section: heavy train presses, arrows fan out through the stones to a wide area',
      draw(lt, d, t) { sky(t, 930, 380); hills(900);
        const drop = seg(lt, 0.1, 0.65), hit = seg(lt, 0.65, 0.95), press = lt > 0.65 ? 1.6 - 0.6 * eo(seg(lt, 0.95, 1.4)) : 0;
        trackCut(press); trainFront(540, lerp(520, 742, drop * drop) + press * 6 - (hit > 0 && hit < 1 ? Math.sin(hit * Math.PI) * 26 : 0), 1, 'HEAVY TRAIN');
        const ha = eo(seg(lt, 0.45, 0.9)); for (const x of [150, 930]) arrow(x, 400, x, 700, RED, 34, ha);
        const ends = [[75, 1210], [225, 1222], [385, 1228], [540, 1230], [695, 1228], [855, 1222], [1005, 1210]], starts = [[320, 915], [340, 915], [360, 915], [540, 915], [720, 915], [740, 915], [760, 915]];
        ends.forEach(([x, y], i) => { const p = eo(seg(lt, fan + i * 0.05, fan + 0.55 + i * 0.05)); arrow(starts[i][0], starts[i][1], x, y, ORG, 18, p);
          if (p >= 1) { const k = (t * 1.5 + i * 0.13) % 1; circ(lerp(starts[i][0], x, k), lerp(starts[i][1], y, k), 17, YEL); } });
        const b = eo(seg(lt, fan + 0.5, fan + 1.1)); if (b > 0) { for (const [c, w] of [['#241342', 30], ['#fff', 16]]) { ctx.strokeStyle = c; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(540 - 490 * b, 1262); ctx.lineTo(540 + 490 * b, 1262); ctx.stroke(); } }
        pill('STONES SPREAD THE LOAD', 540, 180, 66, NAVY, '#fff', pop(lt, 0.05)); 
        pill('WIDER AREA', 540, 1340, 58, GRN, '#06361f', pop(lt, fan + 0.8)); shade(); } });
    cue(st, 'whoosh'); cue(st + 0.65, 'slam', { gain: 0.7 }); cue(st + fan, 'zip', { gain: 0.5 }); cue(st + fan + 0.8, 'pop', { gain: 0.5 }); }

  // ───────── 2: holds the sleepers ─────────
  { const st = cut(2), hold = Wd('in', 2) - st - 0.35;
    add({ id: 'S03', at: st, cam: [540, 760], zoom: 0.08, note: 'top view: sleepers gripped by stones, side pushes fail, held in place',
      draw(lt, d, t) { lin('#6fe58a', '#2fbd62', 0, H); for (let i = 0; i < 40; i++) { const x = i % 2 ? 20 + hash(i) * 90 : 960 + hash(i) * 100, y = hash(i + 4) * 1380; circ(x, y, 14 + hash(i + 2) * 20, '#1fa352'); }
        rr(140, -150, 800, 2200, 40, '#646c8c');
        let n = 0; for (let row = 0; row < 28; row++) for (let c = 0; c < 10; c++) { const i = n++; stone(185 + c * 79 + (row % 2) * 26 + (hash(i) - 0.5) * 24, 20 + row * 67 + (hash(i + 50) - 0.5) * 22, 48, i, hash(i + 4) * TAU); }
        const shake = lt < hold ? Math.sin(t * 38) * 12 * seg(lt, 0.8, 1.0) : 0, glowA = 0.5 + 0.5 * Math.sin(t * 9);
        for (let k = 0; k < 4; k++) { const y = 340 + k * 250, dx = k === 2 ? shake : 0; rr(190 + dx, y, 700, 96, 20, '#f1ead9', '#55506a', 9); if (lt > 0.35 && lt < hold) { ctx.save(); ctx.globalAlpha = glowA; rr(190 + dx, y, 700, 96, 20, 'rgba(250,204,21,.6)', YEL, 16); ctx.restore(); } }
        for (const x of [340, 740]) { rr(x - 28, -150, 56, 2200, 12, '#dfe6f5', '#3a3f5c', 8); ctx.fillStyle = '#ffffff'; ctx.fillRect(x - 10, -150, 12, 2200); }
        const push = eo(seg(lt, 0.7, 1.1)), back = Math.abs(Math.sin(t * 7)) * 30;
        if (lt < hold) { arrow(15 + back, 888, 185 + back * 0.4, 888, RED, 30, push); arrow(1065 - back, 888, 895 - back * 0.4, 888, RED, 30, push); }
        const g = pop(lt, hold); tick(540, 888, 1.25, g);
        pill('SLEEPERS', 540, 190, 84, NAVY, '#fff', pop(lt, 0.15)); pill('HELD IN PLACE', 540, 1235, 74, '#18b657', '#fff', g);
        pill('STONES = "BALLAST"', 540, 640, 54, ORG, '#fff', pop(lt, 1.4)); shade(); } });
    cue(st, 'whoosh'); cue(st + 0.15, 'pop', { gain: 0.5 }); cue(st + 0.75, 'zip', { gain: 0.4 }); cue(st + 1.4, 'pop', { gain: 0.4 }); cue(st + hold, 'thud', { gain: 0.8 }); }

  // ───────── 3a: rain drains ─────────
  { const st = cut(3), weeds = Wd('and', 3) - 0.1;
    const drop = (x, y, r, a = 1) => { ctx.save(); ctx.globalAlpha = clamp(a); ctx.beginPath(); ctx.moveTo(x, y - r * 2.2); ctx.quadraticCurveTo(x + r * 1.2, y - r * 0.3, x + r, y); ctx.arc(x, y, r, 0, Math.PI); ctx.quadraticCurveTo(x - r * 1.2, y - r * 0.3, x, y - r * 2.2); ctx.fillStyle = '#19b9ff'; ctx.fill(); ctx.lineWidth = 4; ctx.strokeStyle = '#fff'; ctx.stroke(); ctx.restore(); };
    add({ id: 'S04', at: st, cam: [540, 830], zoom: 0.08, note: 'rain falls, water slips down between the stones',
      draw(lt, d, t) { lin('#3a6fe0', '#9fe3ff', 0, H); trackCut(0);
        [[60, 360, 1.5], [380, 330, 1.8], [720, 370, 1.5]].forEach(([x, y, s], i) => cloud(x + Math.sin(t + i) * 15, y, s, i === 1 ? '#f4f8ff' : '#d3def7'));
        for (let i = 0; i < 44; i++) { const k = (t * 1.1 + hash(i)) % 1; drop(40 + hash(i + 20) * 1000, 480 + k * 350, 10, 0.95); }
        for (let i = 0; i < 44; i++) { const k = (t * 0.55 + hash(i + 90)) % 1, x0 = 110 + (i % 11) * 86; drop(x0 + Math.sin(k * 16 + i) * 26, 900 + k * 350, 14, 1.5 - k); }
        const a = eo(seg(lt, 0.7, 1.2)); for (const x of [200, 540, 880]) arrow(x, 980, x, 1250, '#0b6fd6', 28, a);
        pill('RAIN DRAINS THROUGH', 540, 180, 70, NAVY, '#fff', pop(lt, 0.05)); shade(); } });
    cue(st, 'whoosh'); cue(st + 0.1, 'bubbles', { dur: 1.8, gain: 0.4 }); cue(st + 0.7, 'pop', { gain: 0.4 });

    // 3b: weeds
    add({ id: 'S04b', at: weeds, cam: [540, 780], zoom: 0.1, note: 'a little weed struggles among the stones and droops',
      draw(lt, d, t) { lin('#fff07a', '#7be08c', 0, H); sun(900, 560, t);
        const droop = eio(seg(lt, 0.4, 1.3));
        for (let i = 0; i < 90; i++) { const row = Math.floor(i / 9), col = i % 9; stone(30 + col * 132 + (row % 2) * 60, 940 + row * 80 + (hash(i + 2) - 0.5) * 30, 90, i + 4, hash(i + 6) * TAU); }
        ctx.save(); ctx.translate(500, 945);
        const tipX = lerp(10, 190, droop), tipY = lerp(-370, -170, droop);
        ctx.strokeStyle = '#16863f'; ctx.lineWidth = 40; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.quadraticCurveTo(-30, -300 + droop * 40, tipX, tipY); ctx.stroke();
        for (const [lx, ly, r] of [[-100, -130, -0.55 - droop * 0.2], [80, -165, 0.5 + droop * 0.3]]) { ctx.beginPath(); ctx.ellipse(lx, ly + droop * 30, 100, 44, r, 0, TAU); ctx.fillStyle = '#2fd673'; ctx.fill(); ctx.lineWidth = 8; ctx.strokeStyle = '#16863f'; ctx.stroke(); }
        circ(tipX, tipY, 100, '#6cf09c'); ctx.lineWidth = 9; ctx.strokeStyle = '#16863f'; ctx.stroke();
        ctx.strokeStyle = '#12351f'; ctx.lineWidth = 12; for (const ex of [-36, 36]) { ctx.beginPath(); if (droop < 0.5) ctx.arc(tipX + ex, tipY - 14, 12, 0, TAU); else { const s = ex < 0 ? 1 : -1; ctx.moveTo(tipX + ex - 16 * s, tipY - 30); ctx.lineTo(tipX + ex + 14 * s, tipY - 14); ctx.lineTo(tipX + ex - 16 * s, tipY + 2); } ctx.stroke(); }
        ctx.beginPath(); if (droop < 0.5) ctx.arc(tipX, tipY + 18, 28, 0.15 * Math.PI, 0.85 * Math.PI); else ctx.arc(tipX, tipY + 55, 28, 1.2 * Math.PI, 1.8 * Math.PI); ctx.stroke();
        ctx.restore();
        pill('FEWER WEEDS', 540, 210, 92, RED, '#fff', pop(lt, 0.05)); pill('HARD PLACE TO GROW', 540, 370, 54, '#fff', NAVY, pop(lt, 0.6)); shade(); } });
    cue(weeds, 'whoosh'); cue(weeds + 0.45, 'slide', { dur: 0.8, gain: 0.35 }); }

  // ───────── 4: the surprise ─────────
  { const st = cut(4), rev = Wd('sharp', 4) - st - 0.3;
    add({ id: 'S05', at: st, cam: [540, 740], zoom: 0.1, note: 'mystery stone, then reveal: SHARP ON PURPOSE',
      draw(lt, d, t) { lin('#8b2cf5', '#ff3f8e', 0, H); ctx.save(); ctx.translate(540, 730); ctx.rotate(t * 0.25); for (let i = 0; i < 16; i++) { ctx.rotate(TAU / 16); poly([[0, 0], [1400, -100], [1400, 100]], i % 2 ? 'rgba(255,220,80,.22)' : 'rgba(255,255,255,.1)'); } ctx.restore();
        const r = eob(seg(lt, rev, rev + 0.4)); const two = Math.min(1.0, rev * 0.45);
        const pts = [[-90, -370], [170, -300], [215, -190], [385, -60], [300, 120], [330, 250], [60, 330], [-90, 250], [-285, 275], [-370, 40], [-270, -60], [-285, -235]];
        const rock = () => { poly(pts, '#aeb8d6'); const shades = ['#dfe5f8', '#8d97bb', '#c6cde8', '#7c85aa', '#d3daf0', '#9aa4c7']; for (let k = 0; k < 6; k++) poly([[-20, -20], pts[k * 2], pts[k * 2 + 1], pts[(k * 2 + 2) % 12]], shades[k]);
          ctx.lineWidth = 18; ctx.lineJoin = 'round'; ctx.strokeStyle = '#2c2f55'; ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); ctx.stroke();
          for (const ex of [-95, 85]) { circ(ex, -50, 48, '#fff'); circ(ex + 8, -44, 24, '#1d1f3d'); circ(ex + 16, -54, 8, '#fff'); }
          ctx.strokeStyle = '#1d1f3d'; ctx.lineWidth = 18; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(0, 40, 85, 0.15 * Math.PI, 0.85 * Math.PI); ctx.stroke(); };
        if (lt < two) { ctx.save(); ctx.translate(540, 730); const b = 1 + 0.07 * Math.sin(t * 11); ctx.scale(b, b); circ(0, 0, 310, '#ffffff'); circ(0, 0, 282, NAVY); label('?', 0, 10, 390, YEL, 1); ctx.restore(); }
        else if (lt < rev) { const c = pop(lt, two); const sh = Math.sin(t * 20) * 0.05 * seg(lt, two + 0.3, rev);
          for (const [x, k] of [[290, 0], [790, 1]]) { ctx.save(); ctx.translate(x, 700); ctx.rotate(k ? -sh : sh); ctx.scale(c, c); rr(-220, -270, 440, 540, 50, '#ffffff', '#241342', 12); if (k === 0) pebble(0, -40, 150, 0); else { ctx.save(); ctx.translate(0, -40); ctx.scale(0.44, 0.44); rock(); ctx.restore(); } label(k ? 'SHARP?' : 'ROUND?', 0, 185, 82, YEL, 1); ctx.restore(); } }
        else { ctx.save(); ctx.translate(540, 730); ctx.rotate(Math.sin(t * 1.8) * 0.08); ctx.scale(r, r); rock();
          for (const i of [0, 3, 5, 8, 9, 11]) { const k = 1 + 0.16 * Math.sin(t * 8 + i); circ(pts[i][0], pts[i][1], 34 * k, YEL); circ(pts[i][0], pts[i][1], 16 * k, RED); } ctx.restore(); }
        if (lt >= rev) { K.sparkle(170, 390, 0.9 * r, t, 1); K.sparkle(920, 440, 0.6 * r, -t, 1); K.sparkle(880, 1085, 0.8 * r, t * 1.5, 1); }
        pill('THE BIG SURPRISE', 540, 180, 78, YEL, '#241342', pop(lt, 0.05)); pill('SHARP ON PURPOSE!', 540, 1215, 80, RED, '#fff', pop(lt, rev + 0.12)); shade(); } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); cue(st + Math.min(1.0, rev * 0.45), 'plop', { gain: 0.6 }); cue(st + rev, 'slam', { gain: 0.9 }); cue(st + rev + 0.1, 'sparkle', { dur: 1.1, gain: 0.6 }); }

  // ───────── 5a: sharp stones lock ─────────
  { const st = cut(5), round = Wd('round', 5) - 0.12;
    const pile = []; { let n = 0; [[660, 5], [800, 6], [940, 7], [1085, 8]].forEach(([y, c], row) => { for (let k = 0; k < c; k++) pile.push([540 + (k - (c - 1) / 2) * 136, y, n++, row]); }); }
    const weight = (y) => { rr(270, y - 150, 540, 150, 34, '#33385a', '#ffffff', 10); label('WEIGHT', 540, y - 74, 80, '#fff', 1); for (const x of [380, 700]) arrow(x, y + 8, x, y + 95, RED, 22, 1); };
    add({ id: 'S06', at: st, cam: [540, 800], zoom: 0.08, note: 'weight presses: sharp stones lock together',
      draw(lt, d, t) { lin('#14d1bd', '#1769d9', 0, H); const p = eo(seg(lt, 0.45, 0.95));
        ctx.fillStyle = '#ffd36b'; ctx.fillRect(-200, 1170, W + 400, 900);
        const jolt = lt > 0.55 && lt < 0.85 ? Math.sin(lt * 80) * 5 : 0;
        pile.forEach(([x, y, i, row]) => stone(x - (x - 540) * 0.05 * p + jolt * (i % 2 ? 1 : -1), y + p * (3 - row) * 14, 98, i + 11, hash(i) * TAU + (1 - p) * 0.12, undefined, 0.95));
        const wy = lerp(380, 565, eo(seg(lt, 0.1, 0.6))) + p * 25; weight(wy);
        if (lt > 0.95) for (const [x, y, j] of [[470, 735, 0], [612, 875, 1], [405, 1010, 2], [680, 1015, 3], [270, 880, 4], [815, 885, 5]]) { const k = pop(lt, 0.95 + j * 0.07) * (1 + 0.15 * Math.sin(t * 9 + j)); circ(x, y, 36 * k, YEL); circ(x, y, 15 * k, '#fff'); }
        pill('SHARP EDGES LOCK', 540, 190, 80, NAVY, '#fff', pop(lt, 0.05)); tick(930, 620, 1.05, pop(lt, 1.2)); shade(); } });
    cue(st, 'whoosh'); cue(st + 0.55, 'thud', { gain: 0.8 }); cue(st + 1.2, 'pop', { gain: 0.6 });

    // 5b: round stones slide away
    add({ id: 'S06b', at: round, cam: [540, 800], zoom: 0.08, note: 'weight presses: round pebbles roll away',
      draw(lt, d, t) { lin('#ffb02e', '#ff3d6e', 0, H); ctx.fillStyle = '#6b2f9c'; ctx.fillRect(-200, 1170, W + 400, 900);
        const p = eio(seg(lt, 0.4, 1.6));
        const order = pile.slice().sort((m, n) => m[0] - n[0] || n[1] - m[1]); const half = Math.ceil(order.length / 2);
        order.forEach(([x, y, i], j) => { const left = j < half; const k = left ? j : order.length - 1 - j; const tx = (left ? 75 : 1005) + (left ? 1 : -1) * ((k % 3) * 82 + (Math.floor(k / 3) % 2) * 20); const ty = 1105 - Math.floor(k / 3) * 98 + (hash(i) - 0.5) * 24;
          const q = clamp(p * 1.25 - hash(i + 3) * 0.25); const px = lerp(x, tx, q), py = lerp(y, ty, q) - Math.sin(q * Math.PI) * 60 * hash(i + 9); pebble(px, py, 62 + 8 * (1 - q), i); });
        const wy = lerp(380, 565, eo(seg(lt, 0.05, 0.4))) + p * 470; weight(wy);
        const a = eo(seg(lt, 1.35, 1.7)); arrow(440, 760 - 20 * p, 150, 720, YEL, 26, a); arrow(640, 760 - 20 * p, 930, 720, YEL, 26, a);
        pill('ROUND STONES SLIDE', 540, 190, 76, NAVY, '#fff', pop(lt, 0.03)); cross(920, 470, 1.0, pop(lt, 0.9)); shade(); } });
    cue(round, 'whoosh'); cue(round + 0.4, 'slide', { dur: 1.1, gain: 0.5 }); cue(round + 0.9, 'boing', { gain: 0.45 }); }

  // ───────── 6: question ─────────
  { const st = cut(6);
    add({ id: 'S07', at: st, cam: [540, 740], zoom: 0.06, note: 'YES or NO question, train rolling over the stones, tagline',
      draw(lt, d, t) { sky(t, 900, 800); hills(960);
        poly([[-200, 1040], [1280, 1040], [1280, 1130], [-200, 1130]], '#646c8c'); for (let i = 0; i < 66; i++) stone(i * 22 - 190, 1064 + (i % 3) * 26, 32, i, hash(i) * TAU);
        trainSide(lerp(260, 1650, seg(lt, 0, d + 0.3)), 1030, 1.05); ctx.fillStyle = '#eef2fb'; ctx.fillRect(-200, 1028, W + 400, 14);
        pill('DID YOU KNOW THIS?', 540, 180, 82, RED, '#fff', pop(lt, 0.03));
        const y = pop(lt, 0.15), n = pop(lt, 0.45), b = 1 + 0.06 * Math.sin(t * 7);
        tick(290, 480, 1.35 * b, y); cross(790, 480, 1.35 * (2 - b), n); label('YES', 290, 680, 100, '#4dff95', y); label('NO', 790, 680, 100, '#ff7a8e', n);
        pill('COMMENT BELOW', 540, 310, 46, YEL, '#241342', pop(lt, 1.4));
        pill('Facts that blow your mind!', 540, 1200, 52, NAVY, '#fff', pop(lt, 0.3)); shade(); } });
    cue(st, 'whoosh'); cue(st + 0.15, 'pop', { gain: 0.6 }); cue(st + 0.45, 'pop', { gain: 0.6 }); cue(st + 1.6, 'sparkle', { dur: 1, gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
