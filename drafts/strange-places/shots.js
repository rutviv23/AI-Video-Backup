// FOUR PLACES THAT SOUND FAKE BUT ARE REAL (English): bright colourful shot list.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, bigText } from './core/lib.js';
import { L, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';

export function buildShots() {
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);
  const pop = (lt, t0, dur = 0.26) => eob(seg(lt, t0, t0 + dur));
  const hash = (n) => { const s = Math.sin(n * 127.1 + 3.7) * 43758.5453; return s - Math.floor(s); };
  const RED = '#ff3b57', YEL = '#FACC15', ORG = '#ff7a1a', TEAL = '#0fb5a6', BLUE = '#2f6bff', GRN = '#35d07f', NAVY = '#24336b', PLUM = '#3a1150';

  const circ = (x, y, r, fill) => { ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = fill; ctx.fill(); };
  const oval = (x, y, rx, ry, fill, rot = 0) => { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, rot, 0, TAU); ctx.fillStyle = fill; ctx.fill(); };
  const rr = (x, y, w, h, r, fill) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fillStyle = fill; ctx.fill(); };
  const poly = (pts, fill) => { ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); };
  const stroke = (pts, col, w) => { ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); };
  const bg = (stops) => { const g = ctx.createLinearGradient(0, 0, 0, H); stops.forEach(([o, c]) => g.addColorStop(o, c)); ctx.fillStyle = g; ctx.fillRect(-300, -300, W + 600, H + 600); };
  const shade = () => { const g = ctx.createLinearGradient(0, 1380, 0, H); g.addColorStop(0, 'rgba(58,17,80,0)'); g.addColorStop(0.3, 'rgba(58,17,80,0.6)'); g.addColorStop(1, 'rgba(58,17,80,0.82)'); ctx.fillStyle = g; ctx.fillRect(-300, 1380, W + 600, H - 1080); };
  const label = (txt, x, y, size, col, sc = 1) => { if (sc <= 0) return; bigText(txt, x, y, size, col, 0, sc); };
  const pill = (txt, x, y, size, bgc, fg, sc) => K.pill(txt, x, y, size, bgc, fg, sc);
  const arrow = (x1, y1, x2, y2, col, w = 20, p = 1) => { if (p <= 0) return; const x = lerp(x1, x2, p), y = lerp(y1, y2, p), a = Math.atan2(y2 - y1, x2 - x1);
    ctx.save(); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x - Math.cos(a) * w * 1.6, y - Math.sin(a) * w * 1.6); ctx.strokeStyle = '#fff'; ctx.lineWidth = w + 12; ctx.stroke(); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke();
    ctx.translate(x, y); ctx.rotate(a); ctx.beginPath(); ctx.moveTo(8, 0); ctx.lineTo(-w * 2.4, -w * 1.5); ctx.lineTo(-w * 2.4, w * 1.5); ctx.closePath(); ctx.lineJoin = 'round'; ctx.strokeStyle = '#fff'; ctx.lineWidth = 8; ctx.stroke(); ctx.fillStyle = col; ctx.fill(); ctx.restore(); };
  const badge = (n, x, y, sc) => { if (sc <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); circ(0, 0, 82, '#fff'); circ(0, 0, 68, RED); bigText(String(n), 0, 4, 100, '#fff'); ctx.restore(); };

  // ── props ──
  const cloud = (x, y, s, col = '#fff') => { [[0, 0, 55], [55, -26, 68], [118, 0, 54], [58, 14, 62]].forEach(([dx, dy, r]) => circ(x + dx * s, y + dy * s, r * s, col)); };
  const flame = (x, y, w, h, t, seed) => { if (h < 2) return; const f = 1 + 0.16 * Math.sin(t * 13 + seed * 3) + 0.08 * Math.sin(t * 23 + seed); const lean = Math.sin(t * 7 + seed * 2) * w * 0.25;
    [['#ff4a1c', 1], ['#ff8a1f', 0.72], ['#ffe14a', 0.42]].forEach(([c, k]) => { ctx.beginPath(); ctx.moveTo(x - w * k / 2, y); ctx.bezierCurveTo(x - w * k * 0.75, y - h * f * k * 0.45, x + lean * k - w * k * 0.05, y - h * f * k * 0.55, x + lean, y - h * f * k); ctx.bezierCurveTo(x + w * k * 0.15 + lean * k, y - h * f * k * 0.55, x + w * k * 0.75, y - h * f * k * 0.4, x + w * k / 2, y); ctx.closePath(); ctx.fillStyle = c; ctx.fill(); }); };
  // gas crater in perspective; power 0..1 sets the amount of fire
  const crater = (cx, cy, s, power, t) => { ctx.save(); ctx.translate(cx, cy); ctx.scale(s, s);
    oval(0, 0, 470, 175, '#e9a45c'); oval(0, 6, 420, 145, '#8e4524');
    const g = ctx.createRadialGradient(0, 40, 20, 0, 40, 400); g.addColorStop(0, `rgba(255,190,60,${0.35 + 0.65 * power})`); g.addColorStop(0.55, `rgba(214,76,24,${0.4 + 0.5 * power})`); g.addColorStop(1, '#4a1f18'); oval(0, 22, 390, 122, g);
    for (let i = 0; i < 22; i++) { const x = -340 + (i / 21) * 680 + (hash(i) - 0.5) * 40, y = 30 + (hash(i + 7) - 0.5) * 120 * Math.cos(x / 420); const keep = hash(i + 33) < 0.18 + 0.82 * power; if (keep) flame(x, y, 60 + hash(i + 3) * 55, (50 + hash(i + 11) * 190) * (0.35 + 0.65 * power), t, i); }
    // front rim over the flame bases
    ctx.beginPath(); ctx.ellipse(0, 6, 420, 145, 0, 0, Math.PI); ctx.ellipse(0, 0, 470, 205, 0, Math.PI, 0, true); ctx.closePath(); ctx.fillStyle = '#e9a45c'; ctx.fill(); stroke([[-300, 150], [-240, 175]], '#c57f3d', 10); stroke([[180, 165], [270, 145]], '#c57f3d', 10);
    ctx.restore(); };
  const desert = (t, y0 = 760) => { bg([[0, '#6a4bd6'], [0.25, '#ff6f91'], [0.45, '#ffc15e']]); circ(880, 560, 70, '#ffe45c');
    poly([[-300, y0], [-300, y0 - 90], [100, y0 - 170], [360, y0 - 60], [620, y0 - 150], [900, y0 - 50], [1150, y0 - 140], [1380, y0 - 60], [1380, y0]], '#b9537f');
    const g = ctx.createLinearGradient(0, y0, 0, H); g.addColorStop(0, '#ffcf87'); g.addColorStop(1, '#c9783c'); ctx.fillStyle = g; ctx.fillRect(-300, y0, W + 600, H); };
  const penguin = (x, y, s, t, i = 0) => { ctx.save(); ctx.translate(x, y); ctx.rotate(Math.sin(t * 5 + i * 2) * 0.07); ctx.scale(s, s);
    oval(-34, 4, 34, 14, ORG); oval(34, 4, 34, 14, ORG); oval(0, -110, 82, 118, '#1d2340'); oval(-80, -105, 20, 66, '#1d2340', 0.35 + 0.15 * Math.sin(t * 8 + i)); oval(80, -105, 20, 66, '#1d2340', -0.35 - 0.15 * Math.sin(t * 8 + i));
    oval(0, -88, 56, 86, '#fff'); circ(-25, -170, 20, '#fff'); circ(25, -170, 20, '#fff'); circ(-22, -168, 9, '#111'); circ(22, -168, 9, '#111'); poly([[-20, -145], [20, -145], [0, -122]], ORG); ctx.restore(); };
  const station = (x, y, s) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); [-150, -50, 50, 150].forEach((px) => stroke([[px, 0], [px, -70]], '#44516b', 16)); rr(-200, -220, 400, 160, 36, RED); rr(-200, -120, 400, 24, 6, '#ffd23f'); [-140, -50, 40, 130].forEach((wx) => circ(wx, -165, 27, '#bfeaff')); stroke([[130, -220], [130, -320]], '#44516b', 10); poly([[130, -320], [200, -298], [130, -276]], YEL); ctx.restore(); };
  const snowGround = (y0) => { poly([[-300, y0], [-300, y0 - 110], [0, y0 - 250], [230, y0 - 80], [480, y0 - 200], [760, y0 - 60], [960, y0 - 230], [1380, y0 - 90], [1380, y0]], '#bfe3ff'); poly([[-60, y0 - 220], [0, y0 - 250], [60, y0 - 205], [5, y0 - 215]], '#fff'); poly([[900, y0 - 195], [960, y0 - 230], [1040, y0 - 205], [965, y0 - 200]], '#fff'); const g = ctx.createLinearGradient(0, y0, 0, H); g.addColorStop(0, '#ffffff'); g.addColorStop(1, '#9fd0f5'); ctx.fillStyle = g; ctx.fillRect(-300, y0 - 2, W + 600, H); };
  const flakes = (t, n, a = 1) => { ctx.save(); ctx.globalAlpha = a; for (let i = 0; i < n; i++) { const k = (t * (0.12 + hash(i) * 0.15) + hash(i + 4)) % 1; circ(hash(i + 9) * W + Math.sin(t * 2 + i) * 30, k * 1350, 5 + hash(i + 2) * 8, '#fff'); } ctx.restore(); };
  const rings = (x, y, t, n, col, maxR, a = 1) => { for (let i = 0; i < n; i++) { const k = (t * 0.75 + i / n) % 1; ctx.save(); ctx.globalAlpha = a * (1 - k); ctx.beginPath(); ctx.arc(x, y, 40 + k * maxR, 0, TAU); ctx.strokeStyle = col; ctx.lineWidth = 16 * (1 - k * 0.6); ctx.stroke(); ctx.restore(); } };
  const hydrophone = (x, y, t) => { const sway = Math.sin(t * 2 + x) * 12; stroke([[x, 1330], [x + sway, y]], '#24336b', 9); rr(x - 45, 1300, 90, 40, 10, '#24336b'); rr(x + sway - 34, y - 90, 68, 110, 30, YEL); circ(x + sway, y - 60, 17, '#24336b'); stroke([[x + sway - 18, y - 20], [x + sway + 18, y - 20]], '#24336b', 8); };
  const fishy = (x, y, s, col, dir) => { ctx.save(); ctx.translate(x, y); ctx.scale(s * dir, s); oval(0, 0, 60, 34, col); poly([[-50, 0], [-100, -34], [-100, 34]], col); circ(30, -8, 9, '#fff'); circ(33, -8, 5, '#111'); ctx.restore(); };
  const village = (y) => { [[110, ORG], [330, '#ffefc7'], [760, '#ffefc7'], [970, ORG]].forEach(([x, c], i) => { rr(x - 70, y - 100, 140, 100, 8, c); poly([[x - 90, y - 100], [x, y - 175], [x + 90, y - 100]], i % 2 ? RED : BLUE); rr(x - 22, y - 55, 44, 55, 6, '#6b3a1c'); }); circ(540, y - 95, 55, GRN); stroke([[540, y], [540, y - 60]], '#6b3a1c', 18); };
  const tinyPerson = (x, y, s, col) => { circ(x, y - 46 * s, 14 * s, '#f6d9b8'); rr(x - 13 * s, y - 34 * s, 26 * s, 34 * s, 10 * s, col); };
  // underground cross-section: `n` levels revealed (fractional allowed)
  const cityLevels = (top, n, t) => { const lh = 41; for (let i = 0; i < 18; i++) { const a = clamp(n - i); if (a <= 0) break; const y = top + 12 + i * lh; ctx.save(); ctx.globalAlpha = a;
      const x0 = 120 + hash(i) * 120, x1 = 960 - hash(i + 30) * 120; rr(x0, y + 12, x1 - x0, 14, 7, '#ffb347');
      for (let r = 0; r < 4; r++) { const rx = x0 + (r + 0.12 + hash(i * 4 + r) * 0.2) * ((x1 - x0) / 4), rw = 85 + hash(i + r * 9) * 70; rr(rx, y + 2, Math.min(rw, (x1 - x0) / 4.4), 32, 14, '#ffd97a'); if ((i + r) % 2 === 0) tinyPerson(rx + 34 + Math.sin(t * 3 + i + r) * 8, y + 32, 0.5, [RED, BLUE, TEAL][(i + r) % 3]); }
      const sx = i % 2 ? 330 : 700; rr(sx, y + 24, 20, lh + 2, 8, '#ffb347'); ctx.restore(); } };
  const soil = (top) => { const g = ctx.createLinearGradient(0, top, 0, H); g.addColorStop(0, '#b8693a'); g.addColorStop(1, '#5a2a30'); ctx.fillStyle = g; ctx.fillRect(-300, top, W + 600, H); rr(-300, top - 14, W + 600, 28, 12, GRN); };

  // 0 hook: four mystery cards on frame 0
  { const st = cut(0), but = Wd('but', 0);
    add({ id: 'S01', at: st, cam: [540, 760], zoom: 0.07, note: 'FOUR PLACES THAT SOUND FAKE from frame 0, four picture cards pop, then BUT REAL',
      draw(lt, d, t) { bg([[0, '#5b2fd1'], [0.55, '#ff5fa2'], [1, '#ffb347']]); for (let i = 0; i < 16; i++) K.sparkle(60 + hash(i) * 960, 150 + hash(i + 20) * 1100, 0.15 + 0.14 * Math.abs(Math.sin(t * 2.5 + i)), t * 0.4 + i, 0.9);
        pill('4 PLACES THAT', 540, 225, 76, '#fff', PLUM, 1); pill('SOUND FAKE?!', 540, 365, 88, RED, '#fff', 1 + 0.05 * Math.sin(t * 6));
        [[295, 625], [785, 625], [295, 990], [785, 990]].forEach(([x, y], i) => { const k = 1 + 0.09 * Math.sin(Math.PI * seg(lt, 0.2 + i * 0.28, 0.55 + i * 0.28)); ctx.save(); ctx.translate(x, y + Math.sin(t * 4 + i) * 8); ctx.scale(k, k); rr(-220, -165, 440, 330, 40, '#fff'); ctx.beginPath(); ctx.roundRect(-205, -150, 410, 300, 30); ctx.clip();
          if (i === 0) { rr(-220, -165, 440, 330, 0, '#ffc15e'); crater(0, 60, 0.4, 1, t); }
          if (i === 1) { rr(-220, -165, 440, 330, 0, '#1f9fe0'); rings(0, 0, t, 3, '#fff', 190); circ(0, 0, 42, YEL); }
          if (i === 2) { rr(-220, -165, 440, 330, 0, '#7fd0ff'); rr(-220, 90, 440, 90, 0, '#fff'); penguin(0, 122, 1.0, t); }
          if (i === 3) { rr(-220, -165, 440, 330, 0, '#8fd8ff'); ctx.translate(-216, -150); ctx.scale(0.4, 0.4); soil(150); cityLevels(150, 18, t); }
          ctx.restore(); label(String(i + 1), x - 180, y - 135, 80, YEL, k); });
        pill("BUT THEY'RE REAL!", 540, 1228, 70, GRN, '#06402a', pop(lt, but - st));
        shade(); } });
    cue(st, 'whoosh'); [0.48, 0.76, 1.04].forEach((q) => cue(st + q, 'pop', { gain: 0.5 })); cue(but, 'sparkle', { dur: 0.8, gain: 0.6 }); }

  // 1a the Door to Hell, wide
  { const st = cut(1), door = Wd('door', 1) - st, mid = Wd('this', 1) - 0.08;
    add({ id: 'S02', at: st, cam: [540, 850], zoom: 0.1, note: 'number 1: flaming gas crater in the desert, THE DOOR TO HELL',
      draw(lt, d, t) { desert(t); crater(540, 1000, 0.95, 1, t); badge(1, 540, 220, pop(lt, 0.05)); pill('THE DOOR TO HELL', 540, 390, 72, '#fff', '#c2185b', pop(lt, door)); shade(); } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.5 }); cue(st + door, 'sizzle', { dur: 1.2, gain: 0.6 });
    // 1b close: Turkmenistan, decades
    const tk = Wd('turkmenistan', 1) - mid, dec = Wd('decades', 1) - mid;
    add({ id: 'S03', at: mid, cam: [540, 880], zoom: 0.08, note: 'close on the flames: gas crater in Turkmenistan, burning for decades',
      draw(lt, d, t) { desert(t, 700); crater(540, 960, 1.35, 1, t); for (let i = 0; i < 22; i++) { const k = (t * 0.5 + hash(i)) % 1; circ(150 + hash(i + 5) * 780 + Math.sin(t * 3 + i) * 24, 950 - k * 520, 5 + 6 * (1 - k), `rgba(255,${180 + (i % 3) * 30},60,${1 - k})`); }
        pill('GAS CRATER', 540, 225, 66, YEL, '#222', pop(lt, 0.08)); pill('TURKMENISTAN', 540, 365, 66, BLUE, '#fff', pop(lt, tk));
        label('FOR DECADES!', 540, 1215, 100, '#fff', pop(lt, dec - 0.15)); shade(); } });
    cue(mid, 'whoosh'); cue(mid + tk, 'pop', { gain: 0.5 }); cue(mid + dec, 'thud', { gain: 0.6 }); }

  // 2 smaller now: before / now
  { const st = cut(2), sm = Wd('smaller', 2) - st;
    add({ id: 'S04', at: st, cam: [540, 800], zoom: 0.06, note: 'before and now: big fire above, much smaller fire below',
      draw(lt, d, t) { bg([[0, '#ff9a5a'], [1, '#c9783c']]); crater(540, 520, 0.72, 1, t); const p = 1 - 0.95 * eio(seg(lt, 0.15, sm + 0.45)); crater(540, 1040, 0.72, p, t);
        pill('BEFORE', 215, 215, 62, '#fff', PLUM, pop(lt, 0.05)); pill('NOW: MUCH SMALLER', 540, 750, 56, TEAL, '#fff', pop(lt, sm - 0.2)); arrow(940, 640, 940, 880, BLUE, 26, eo(seg(lt, 0.3, 0.8))); shade(); } });
    cue(st, 'whoosh'); cue(st + sm - 0.2, 'slide', { dur: 0.8, gain: 0.7 }); }

  // 3 the Bloop
  { const st = cut(3), blp = Wd('bloop', 3) - st, yr = Wd('nineteen', 3) - st;
    add({ id: 'S05', at: st, cam: [540, 820], zoom: 0.09, note: 'number 2: underwater microphones catch a giant sound, BLOOP, 1997',
      draw(lt, d, t) { bg([[0, '#4fd8ff'], [0.35, '#1f9fe0'], [1, '#1b4fb4']]); for (let i = 0; i < 24; i++) { const k = (t * 0.16 + hash(i)) % 1; ctx.beginPath(); ctx.arc(hash(i + 8) * W, 1350 - k * 1200, 6 + hash(i + 3) * 12, 0, TAU); ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.lineWidth = 4; ctx.stroke(); }
        oval(540, 1390, 900, 150, '#ffd08c'); if (lt > blp - 0.15) rings(540, 930, t, 4, '#fff', 520);
        hydrophone(150, 1050, t); hydrophone(930, 1020, t); fishy(((t * 130) % 1400) - 150, 760, 0.9, ORG, 1); fishy(1200 - ((t * 90 + 400) % 1400), 1160, 0.7, YEL, -1);
        circ(540, 930, 90 + 18 * Math.abs(Math.sin(t * 9)), YEL);
        label('BLOOP!', 540, 660, 190, '#fff', pop(lt, blp) * (1 + 0.07 * Math.sin(t * 11)));
        badge(2, 540, 220, pop(lt, 0.05)); pill('RECORDED IN 1997', 540, 400, 62, RED, '#fff', pop(lt, yr)); pill('UNDERWATER MICS', 540, 1225, 52, '#fff', NAVY, pop(lt, 0.55));
        shade(); } });
    cue(st, 'whoosh'); cue(st + blp, 'plop', { gain: 1 }); cue(st + blp + 0.35, 'boing', { gain: 0.5 }); cue(st + yr, 'pop', { gain: 0.5 }); }

  // 4 the cause: ice cracking
  { const st = cut(4), ice = Wd('ice', 4) - st, off = Wd('off', 4) - st;
    add({ id: 'S06', at: st, cam: [540, 760], zoom: 0.09, note: 'iceberg cracks, a huge chunk breaks off, sound waves travel into the sea',
      draw(lt, d, t) { bg([[0, '#7fd0ff'], [0.4, '#d8f4ff'], [1, '#d8f4ff']]); const WL = 860;
        const br = eio(seg(lt, ice + 0.1, off + 0.55));
        poly([[-300, WL + 20], [-300, 470], [-20, 430], [140, 520], [300, 440], [470, 540], [610, 500], [560, 700], [630, WL + 20]], '#f4fcff'); poly([[300, 440], [470, 540], [430, WL + 20], [330, 660]], '#bfe6fb');
        ctx.save(); ctx.translate(630 + br * 110, WL + 10 + br * 70); ctx.rotate(br * 0.42); poly([[0, 10], [-70, -170], [-20, -360], [110, -300], [250, -340], [310, -150], [240, 10]], '#f4fcff'); poly([[110, -300], [250, -340], [310, -150], [170, -120]], '#bfe6fb'); ctx.restore();
        const g = ctx.createLinearGradient(0, WL, 0, H); g.addColorStop(0, '#2bb4ee'); g.addColorStop(1, '#1b4fb4'); ctx.fillStyle = g; ctx.fillRect(-300, WL, W + 600, H); stroke([[-300, WL], [1380, WL]], '#fff', 10);
        const c = eo(seg(lt, ice - 0.1, ice + 0.35)); if (c > 0) { const pts = [[612, 500], [578, 575], [622, 645], [575, 715], [620, 790], [630, 860]]; stroke(pts.slice(0, Math.max(2, Math.ceil(pts.length * c))), '#1b4fb4', 14); }
        if (lt > ice) { rings(660, 960, t, 4, '#fff', 380); label('CRACK!', 720, 360, 112, RED, pop(lt, ice)); }
        pill('THE CAUSE?', 540, 190, 66, YEL, '#222', pop(lt, 0.05)); pill('ANTARCTIC ICE BREAKING', 540, 1225, 54, '#fff', NAVY, pop(lt, off));
        shade(); } });
    cue(st, 'whoosh'); cue(st + ice, 'slam', { gain: 0.8 }); cue(st + off + 0.4, 'plop', { gain: 0.8 }); }

  // 5a Antarctica: no permanent residents
  { const st = cut(5), no = Wd('no', 5) - st, mid = Wd('only', 5) - 0.08;
    add({ id: 'S07', at: st, cam: [540, 850], zoom: 0.09, note: 'number 3: research station and penguins on snow, NO PERMANENT RESIDENTS',
      draw(lt, d, t) { bg([[0, '#2f8cff'], [0.45, '#bfe6ff'], [1, '#ffffff']]); snowGround(940); station(560, 960, 1.35); penguin(160, 1190, 0.95, t, 0); penguin(900, 1210, 1.15, t, 1); penguin(730, 1130, 0.6, t, 2); flakes(t, 40, 0.9);
        badge(3, 540, 220, pop(lt, 0.05)); pill('ANTARCTICA', 540, 385, 74, BLUE, '#fff', pop(lt, 0.35)); pill('NO PERMANENT RESIDENTS', 540, 510, 52, RED, '#fff', pop(lt, no)); shade(); } });
    cue(st, 'whoosh'); cue(st + 0.35, 'pop', { gain: 0.5 }); cue(st + no, 'thud', { gain: 0.6 });
    // 5b about 1,000 in winter
    const th = Wd('thousand', 5) - mid, win = Wd('winter', 5) - mid;
    add({ id: 'S08', at: mid, cam: [540, 800], zoom: 0.07, note: 'winter: about 1,000 people, rows of tiny researchers fill in',
      draw(lt, d, t) { bg([[0, '#4b3fc4'], [0.5, '#6f8cff'], [1, '#bfe6ff']]); for (let k = 0; k < 3; k++) { ctx.beginPath(); for (let x = -60; x <= 1140; x += 30) { const y = 420 + k * 70 + Math.sin(x * 0.008 + t * 1.5 + k * 2) * 55; x === -60 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); } ctx.strokeStyle = ['rgba(80,255,190,.55)', 'rgba(255,120,220,.45)', 'rgba(90,230,255,.45)'][k]; ctx.lineWidth = 46; ctx.lineCap = 'round'; ctx.stroke(); }
        rr(70, 760, 940, 480, 46, 'rgba(255,255,255,.94)'); const n = Math.floor(100 * eo(seg(lt, 0.1, th + 0.5))); for (let i = 0; i < n; i++) tinyPerson(140 + (i % 20) * 42, 850 + Math.floor(i / 20) * 82, 1.15, [RED, ORG, BLUE, TEAL, '#7b3fe4'][(i * 7) % 5]);
        flakes(t, 46); label('ONLY ABOUT', 540, 250, 82, '#fff', pop(lt, 0.05)); label('1,000', 540, 470, 250, YEL, pop(lt, th - 0.25)); pill('STAY FOR WINTER', 540, 665, 62, '#fff', PLUM, pop(lt, win - 0.35)); shade(); } });
    cue(mid, 'whoosh'); cue(mid + th, 'pop', { gain: 0.8 }); cue(mid + win - 0.3, 'sparkle', { dur: 0.8, gain: 0.5 }); }

  // 6a underground city: levels dig down
  { const st = cut(6), city = Wd('city', 6) - st, eig = Wd('eighteen', 6) - st, mid = Wd('with', 6) - 0.08;
    add({ id: 'S09', at: st, cam: [540, 850], zoom: 0.06, note: 'number 4: cut-away of the ground, underground levels appear one by one up to 18',
      draw(lt, d, t) { bg([[0, '#2aa8ff'], [0.3, '#c9f1ff'], [1, '#c9f1ff']]); village(500); soil(515); const n = 18 * seg(lt, 0.5, eig + 0.75); cityLevels(515, n, t);
        badge(4, 150, 195, pop(lt, 0.05)); pill('UNDER TURKEY', 640, 195, 58, RED, '#fff', pop(lt, 0.4)); pill('A HIDDEN CITY', 640, 305, 52, '#fff', PLUM, pop(lt, city - 0.1));
        if (n > 0.5) pill(n >= 17.9 ? '18+ LEVELS!' : 'LEVEL ' + Math.ceil(n), 540, 1315 - 20, 54, n >= 17.9 ? YEL : BLUE, n >= 17.9 ? '#222' : '#fff', n >= 17.9 ? 1 + 0.07 * Math.sin(t * 9) : 1);
        shade(); } });
    cue(st, 'whoosh'); cue(st + 0.4, 'pop', { gain: 0.5 }); for (let i = 0; i < 6; i++) cue(st + 0.6 + i * 0.38, 'tock', { gain: 0.5 }); cue(st + eig + 0.75, 'sparkle', { dur: 0.7, gain: 0.6 });
    // 6b inside: room for 20,000
    const tw = Wd('twenty', 6) - mid;
    add({ id: 'S10', at: mid, cam: [540, 860], zoom: 0.08, note: 'inside the city: lamp-lit rooms full of people, round stone door rolls, room for 20,000',
      draw(lt, d, t) { bg([[0, '#c9783c'], [1, '#6a2f38']]);
        [[700, 0], [960, 1], [1220, 2]].forEach(([y, j]) => { rr(60, y - 190, 960, 215, 80, '#ffcf6e'); rr(100, y - 6, 880, 24, 10, '#a85c2c'); K.glow(540, y - 130, 300, '#fff3b0', 0.6); for (let i = 0; i < 9; i++) { const x = 150 + i * 96 + Math.sin(t * 2.4 + i * 1.7 + j) * 20; if (eo(seg(lt, 0.1, tw + 0.6)) * 27 > j * 9 + i) tinyPerson(x, y - 8 + Math.abs(Math.sin(t * 6 + i + j)) * -8, 1.9 + hash(i + j) * 0.5, [RED, BLUE, TEAL, '#7b3fe4', ORG][(i + j * 2) % 5]); } });
        const dx = lerp(1130, 905, eio(seg(lt, 0.2, 1.4))); ctx.save(); ctx.translate(dx, 868); ctx.rotate(-(1130 - dx) / 105); circ(0, 0, 105, '#8d7f8f'); circ(0, 0, 70, '#a795a8'); circ(0, 0, 22, '#5c4a62'); stroke([[-70, 0], [70, 0]], '#5c4a62', 9); ctx.restore();
        pill('ROOM FOR', 540, 200, 62, '#fff', PLUM, pop(lt, 0.05)); label('20,000', 540, 360, 210, YEL, pop(lt, tw - 0.1)); pill('PEOPLE!', 540, 1300 - 20, 60, RED, '#fff', pop(lt, tw + 0.4)); shade(); } });
    cue(mid, 'whoosh'); cue(mid + 0.2, 'slide', { dur: 1.1, gain: 0.7 }); cue(mid + tw, 'thud', { gain: 0.8 }); }

  // 7 question: A or B
  { const st = cut(7), fire = Wd('fire', 7) - st, hid = Wd('hidden', 7) - st;
    add({ id: 'S11', at: st, cam: [540, 760], zoom: 0.05, note: 'A fire crater or B hidden city, comment, tagline',
      draw(lt, d, t) { bg([[0, '#5b2fd1'], [0.55, '#ff5fa2'], [1, '#ffb347']]); for (let i = 0; i < 12; i++) K.sparkle(60 + hash(i) * 960, 150 + hash(i + 20) * 1100, 0.15 + 0.12 * Math.abs(Math.sin(t * 2.5 + i)), t * 0.4 + i, 0.9);
        pill('WHICH WOULD YOU VISIT?', 540, 205, 58, '#fff', PLUM, pop(lt, 0.05));
        [[295, fire, 0], [785, hid, 1]].forEach(([x, q, i]) => { const k = pop(lt, 0.15 + i * 0.2); const hot = lt > q && (i === 1 || lt < hid); ctx.save(); ctx.translate(x, 650); const s = k * (hot ? 1.06 + 0.02 * Math.sin(t * 9) : 1); ctx.scale(s, s); rr(-230, -300, 460, 600, 44, hot ? YEL : '#fff'); ctx.beginPath(); ctx.roundRect(-212, -282, 424, 564, 32); ctx.clip();
          if (i === 0) { rr(-230, -300, 460, 600, 0, '#ffc15e'); crater(0, 90, 0.43, 1, t); } else { rr(-230, -300, 460, 600, 0, '#8fd8ff'); ctx.translate(-216, -330); ctx.scale(0.4, 0.4); village(500); soil(515); cityLevels(515, 18, t); ctx.fillStyle = '#6a2f38'; }
          ctx.restore(); label(i ? 'B' : 'A', x, 1020, 150, i ? '#7ff0c8' : YEL, k); });
        pill('COMMENT A OR B!', 540, 1135, 58, RED, '#fff', pop(lt, hid + 0.3)); pill('FACTS THAT BLOW YOUR MIND!', 540, 1232, 34, BLUE, '#fff', pop(lt, hid + 0.7));
        shade(); } });
    cue(st, 'whoosh'); cue(st + fire, 'pop', { gain: 0.7 }); cue(st + hid, 'pop', { gain: 0.7 }); cue(st + hid + 0.7, 'sparkle', { dur: 0.8, gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
