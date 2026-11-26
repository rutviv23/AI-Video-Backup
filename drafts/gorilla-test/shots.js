// THE INVISIBLE GORILLA ATTENTION TEST (Hindi audio, English captions): bright colourful shot list.
import { ctx, C, W, H, TAU, clamp, lerp, seg, eo, eio, eob, bigText } from './core/lib.js';
import { L, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';

export function buildShots() {
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);
  const pop = (lt, t0, dur = 0.26) => eob(seg(lt, t0, t0 + dur));
  const hash = (n) => { const s = Math.sin(n * 127.1 + 3.7) * 43758.5453; return s - Math.floor(s); };
  const RED = '#ff3b57', YEL = '#FACC15', ORG = '#ff8a1f', TEAL = '#12c2b3', BLUE = '#2f7bff', GRN = '#35d07f', NAVY = '#24336b', PLUM = '#3a1150';

  const rr = (x, y, w, h, r, fill) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fillStyle = fill; ctx.fill(); };
  const circ = (x, y, r, fill) => { ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = fill; ctx.fill(); };
  const oval = (x, y, rx, ry, fill, rot = 0) => { ctx.beginPath(); ctx.ellipse(x, y, rx, ry, rot, 0, TAU); ctx.fillStyle = fill; ctx.fill(); };
  const poly = (pts, fill) => { ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); };
  const stroke = (pts, col, w) => { ctx.beginPath(); pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.strokeStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke(); };
  const lin = (c0, c1, y0 = 0, y1 = H) => { const g = ctx.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, c0); g.addColorStop(1, c1); ctx.fillStyle = g; ctx.fillRect(-60, y0 - 60, W + 120, y1 - y0 + 120); };
  const label = (txt, x, y, size, col, a = 1, sc = 1) => { if (a <= 0 || sc <= 0) return; ctx.save(); ctx.globalAlpha = clamp(a); bigText(txt, x, y, size, col, 0, sc); ctx.restore(); };
  const shade = () => { const g = ctx.createLinearGradient(0, 1380, 0, H); g.addColorStop(0, 'rgba(58,17,80,0)'); g.addColorStop(0.3, 'rgba(58,17,80,0.6)'); g.addColorStop(1, 'rgba(58,17,80,0.82)'); ctx.fillStyle = g; ctx.fillRect(-80, 1380, W + 160, H - 1300); };
  const pill = (txt, x, y, size, bg, fg, sc) => K.pill(txt, x, y, size, bg, fg, sc);
  const arrow = (x1, y1, x2, y2, col, w = 16, p = 1) => { if (p <= 0) return; const x = lerp(x1, x2, p), y = lerp(y1, y2, p), a = Math.atan2(y2 - y1, x2 - x1);
    stroke([[x1, y1], [x - Math.cos(a) * w, y - Math.sin(a) * w]], col, w); ctx.save(); ctx.translate(x, y); ctx.rotate(a); poly([[0, 0], [-w * 2.4, -w * 1.5], [-w * 2.4, w * 1.5]], col); ctx.restore(); };
  const rays = (x, y, t, col, n = 14) => { ctx.save(); ctx.translate(x, y); ctx.rotate(t * 0.15); for (let i = 0; i < n; i++) { ctx.rotate(TAU / n); poly([[0, 0], [1500, -130], [1500, 130]], col); } ctx.restore(); };

  // ---------- props ----------
  const gym = (t) => {
    lin('#ffd45e', '#ff9d76', 0, 720);
    for (const wx of [70, 410, 750]) { rr(wx, 330, 260, 250, 26, '#ffffff'); rr(wx + 14, 344, 232, 222, 16, '#6fd0ff'); circ(wx + 80 + Math.sin(t * 0.5 + wx) * 20, 440, 30, '#fff'); circ(wx + 118 + Math.sin(t * 0.5 + wx) * 20, 428, 40, '#fff'); circ(wx + 158 + Math.sin(t * 0.5 + wx) * 20, 444, 28, '#fff'); stroke([[wx + 130, 344], [wx + 130, 566]], '#fff', 10); }
    for (let i = 0; i < 12; i++) { const x = i * 100 - 20, y = 105 + Math.sin(i * 0.9) * 14; poly([[x, y], [x + 70, y], [x + 35, y + 70]], [RED, TEAL, BLUE, '#fff'][i % 4]); }
    stroke([[-40, 104], [1120, 104]], '#fff', 6);
    lin('#f3b562', '#d9873a', 700, H);
    for (let i = 0; i < 12; i++) stroke([[540 + (i - 5.5) * 130, 700], [540 + (i - 5.5) * 330, H]], 'rgba(140,70,20,0.22)', 5);
    stroke([[-60, 704], [1140, 704]], '#fff', 12);
    ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = 9; ctx.beginPath(); ctx.ellipse(540, 1080, 330, 150, 0, 0, TAU); ctx.stroke(); ctx.restore();
  };
  const ball = (x, y, r, col, seam, rot = 0) => { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); circ(0, 0, r + 5, '#2a1530'); circ(0, 0, r, col); ctx.strokeStyle = seam; ctx.lineWidth = r * 0.12; ctx.beginPath(); ctx.moveTo(-r, 0); ctx.lineTo(r, 0); ctx.moveTo(0, -r); ctx.lineTo(0, r); ctx.stroke(); ctx.beginPath(); ctx.arc(-r * 1.25, 0, r, -0.7, 0.7); ctx.stroke(); ctx.beginPath(); ctx.arc(r * 1.25, 0, r, Math.PI - 0.7, Math.PI + 0.7); ctx.stroke(); circ(-r * 0.35, -r * 0.4, r * 0.18, 'rgba(255,255,255,.7)'); ctx.restore(); };
  // penguin: origin = feet centre, ~330 px tall at s 1
  const penguin = (x, y, s, t, walk = 1, flap = 0) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); oval(0, 8, 110, 18, 'rgba(0,0,0,.22)'); ctx.rotate(Math.sin(t * 9) * 0.11 * walk);
    oval(-48, -4 - Math.max(0, Math.sin(t * 9)) * 16 * walk, 44, 20, ORG); oval(48, -4 - Math.max(0, -Math.sin(t * 9)) * 16 * walk, 44, 20, ORG);
    for (const sx of [-1, 1]) { ctx.save(); ctx.translate(sx * 96, -190); ctx.rotate(-sx * (0.35 + flap * (1.1 + 0.6 * Math.sin(t * 18)))); oval(0, 70, 28, 92, '#151b36'); ctx.restore(); }
    oval(0, -165, 115, 168, '#1c2447'); oval(0, -130, 78, 122, '#ffffff'); oval(-38, -235, 40, 46, '#fff'); oval(38, -235, 40, 46, '#fff');
    circ(-34, -236, 14, '#1b1410'); circ(34, -236, 14, '#1b1410'); circ(-29, -242, 5, '#fff'); circ(39, -242, 5, '#fff');
    poly([[-32, -206], [32, -206], [0, -170]], ORG); oval(-66, -200, 15, 10, '#ff9db0'); oval(66, -200, 15, 10, '#ff9db0'); ctx.restore(); };
  // cartoon person in a gorilla suit: origin = feet centre, ~520 px tall at s 1; thump 0..1
  const gorilla = (x, y, s, t, walk = 0, thump = 0) => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); oval(0, 8, 190, 24, 'rgba(0,0,0,.25)');
    const st = Math.sin(t * 8) * 26 * walk, D = '#463a4d', M = '#5a4c63', F = '#c9a892';
    stroke([[-70, -150], [-82 + st, -34]], D, 86); stroke([[70, -150], [82 - st, -34]], D, 86); oval(-90 + st, -20, 62, 26, '#2c2332'); oval(90 - st, -20, 62, 26, '#2c2332');
    oval(0, -245, 160, 150, D); oval(0, -225, 100, 105, M);
    stroke([[0, -300], [0, -140]], '#e8eef5', 9); for (let k = 0; k < 9; k++) stroke([[-8, -292 + k * 18], [8, -292 + k * 18]], '#aeb9c6', 4); rr(-9, -318, 18, 30, 7, '#e8eef5');
    oval(0, -420, 112, 108, D); circ(-108, -430, 30, D); circ(108, -430, 30, D); circ(-110, -430, 15, F); circ(110, -430, 15, F);
    oval(-34, -428, 48, 40, F); oval(34, -428, 48, 40, F); oval(0, -372, 76, 54, F);
    stroke([[-70, -458], [-12, -448]], '#2c2332', 18); stroke([[70, -458], [12, -448]], '#2c2332', 18);
    circ(-30, -425, 12, '#1b1410'); circ(30, -425, 12, '#1b1410'); circ(-26, -429, 4, '#fff'); circ(34, -429, 4, '#fff'); oval(-13, -388, 7, 10, '#5a3a30'); oval(13, -388, 7, 10, '#5a3a30');
    ctx.beginPath(); ctx.arc(0, -375, 36, 0.35, Math.PI - 0.35); ctx.strokeStyle = '#3a2420'; ctx.lineWidth = 8; ctx.stroke();
    for (const sx of [-1, 1]) { const beat = thump * Math.max(0, Math.sin(t * 20 + (sx > 0 ? Math.PI : 0)));
      const hx = lerp(sx * (205 - st * 0.3 * sx), sx * (45 + 70 * (1 - beat)), thump), hy = lerp(-80, -235, thump), ex = sx * lerp(195, 230, thump), ey = lerp(-215, -190, thump);
      ctx.beginPath(); ctx.moveTo(sx * 125, -305); ctx.quadraticCurveTo(ex, ey, hx, hy); ctx.strokeStyle = D; ctx.lineWidth = 78; ctx.lineCap = 'round'; ctx.stroke(); circ(hx, hy, 46, '#2c2332'); }
    ctx.restore(); };

  // ---------- the game ----------
  const RP = [[215, 870], [820, 1290], [865, 870]];     // red team: R1, R2, R3
  const NP = [[540, 840], [220, 1300], [525, 1325]];    // blue team
  const PS = 0.6;
  const wob = (p, i, t) => [p[0] + Math.sin(t * 1.5 + i * 2.1) * 34, p[1] + Math.sin(t * 2.1 + i * 1.3) * 14];
  const RSEQ = [0, 2, 1, 0, 1, 2, 0, 1], RT0 = 1.0, RGAP = 0.95, RDUR = 0.62;   // exactly 7 red passes
  const NSEQ = [1, 0, 2, 1, 2, 0], NT0 = 1.45, NGAP = 1.22, NDUR = 0.6;         // 5 blue passes
  const flight = (seq, t0, gap, dur, t) => { const n = seq.length - 1; if (t < t0) return { a: seq[0], b: seq[0], p: 0 };
    const k = Math.min(n - 1, Math.floor((t - t0) / gap)); return { a: seq[k], b: seq[k + 1], p: eio(seg(t, t0 + k * gap, t0 + k * gap + dur)) }; };
  const player = (pos, i, t, col, colS, f) => { const [x, y] = wob(pos, i, t); const has = (f.p < 0.5 && f.a === i % 3) || (f.p >= 0.5 && f.b === i % 3);
    K.person({ x, y, s: PS, coat: col, coatShade: colS, pants: '#2b2350', arm: has ? K.POSE.front : K.POSE.shrug, eyes: has ? 'happy' : 'n', mouth: has ? 'grin' : 'smile', bob: Math.sin(t * 6 + i) * 5, walk: t * 5 + i }); };
  const teamBall = (P, off, f, t, col, seam) => { const [ax, ay] = wob(P[f.a], f.a + off, t), [bx, by] = wob(P[f.b], f.b + off, t);
    const x = lerp(ax, bx, f.p), y = lerp(ay, by, f.p) - 100 - Math.sin(Math.PI * f.p) * 170; ball(x, y, 40, col, seam, t * 5 * (f.p > 0 && f.p < 1 ? 1 : 0.1)); };
  // penguin walk path: in from the right, stops and waves in the middle, walks out to the left
  const peng = (t) => { if (t < 2.1 || t > 8.0) return null; if (t < 4.5) return { x: lerp(1190, 540, seg(t, 2.1, 4.5)), walk: 1, flap: 0 }; if (t < 5.6) return { x: 540, walk: 0, flap: eo(seg(t, 4.5, 4.75)) * (1 - seg(t, 5.4, 5.6)) }; return { x: lerp(540, -160, seg(t, 5.6, 8.0)), walk: 1, flap: 0 }; };
  const PY = 1100, PSZ = 0.82;
  const game = (t) => { gym(t); const fr = flight(RSEQ, RT0, RGAP, RDUR, t), fn = flight(NSEQ, NT0, NGAP, NDUR, t);
    const back = [], front = [];
    RP.forEach((p, i) => (p[1] < 1000 ? back : front).push(() => player(p, i, t, RED, '#d31f3d', fr)));
    NP.forEach((p, i) => (p[1] < 1000 ? back : front).push(() => player(p, i + 3, t, NAVY, '#17214a', fn)));
    back.forEach((d) => d()); const pg = peng(t); if (pg) penguin(pg.x, PY, PSZ, t, pg.walk, pg.flap); front.forEach((d) => d());
    teamBall(NP, 3, fn, t, '#ffffff', '#24336b'); teamBall(RP, 0, fr, t, ORG, '#7a2c00'); };

  // S01: the challenge
  { const st = cut(0);
    add({ id: 'S01', at: st, cam: [540, 960], zoom: 0.025, note: 'challenge: red vs blue passing, penguin walks through, 7 red passes',
      draw(lt, d, t) { game(t); shade();
        pill('COUNT THE RED PASSES!', 540, 215, 64, RED, '#fff', 1 + 0.05 * Math.sin(t * 5) * (t < 2 ? 1 : 0));
        if (t < 4.8) pill('ONLY THE ORANGE BALL', 540, 345, 48, '#fff', '#c2410c', pop(lt, 1.0));
        else pill("DON'T MISS ONE!", 540, 345, 56, YEL, '#2a1530', pop(lt, 4.85)); } });
    for (let k = 0; k < 7; k++) cue(RT0 + k * RGAP + RDUR, 'tock', { gain: 0.35 }); cue(0.1, 'pop', { gain: 0.5 }); }

  // S02: answer 7
  const tRev = Wd('but', 2) - 0.06;
  { const st = cut(2);
    add({ id: 'S02', at: st, cam: [540, 760], zoom: 0.1, note: 'answer: big 7 with seven balls',
      draw(lt, d, t) { lin('#7b3ff2', '#ff5fa2', 0, H); rays(540, 700, t, 'rgba(255,255,255,.09)');
        pill('ANSWER', 540, 220, 76, '#fff', '#7b3ff2', pop(lt, 0.0));
        label('7', 540, 710, 520, YEL, 1, pop(lt, 0.1, 0.35));
        for (let k = 0; k < 7; k++) { const x = 135 + k * 135, sc = pop(lt, 0.4 + k * 0.09, 0.2); if (sc > 0) { ball(x, 1110 + Math.sin(t * 6 + k) * 10, 50 * sc, ORG, '#7a2c00'); label(String(k + 1), x, 1215, 46, '#fff', 1, sc); } }
        shade(); } });
    cue(st, 'whoosh'); cue(st + 0.15, 'slam', { gain: 0.5 }); cue(st + 0.45, 'sparkle', { dur: 0.7 }); }

  // S03: replay with a spotlight on the penguin
  { const st = tRev;
    add({ id: 'S03', at: st, cam: [540, 960], zoom: 0.09, note: 'replay, spotlight follows the penguin',
      draw(lt, d, t) { const tt = 3.9 + lt * 0.75; game(tt); const pg = peng(tt), px = pg ? pg.x : 540, py = PY - 135;
        ctx.save(); ctx.beginPath(); ctx.rect(-100, -100, W + 200, H + 200); ctx.arc(px, py, lerp(900, 200, eo(seg(lt, 0, 0.5))), 0, TAU, true); ctx.fillStyle = 'rgba(48,10,80,0.68)'; ctx.fill('evenodd'); ctx.restore();
        penguin(px, PY, PSZ, tt, pg ? pg.walk : 0, pg ? pg.flap : 0);
        ctx.save(); ctx.strokeStyle = YEL; ctx.lineWidth = 14; ctx.beginPath(); ctx.arc(px, py, lerp(900, 200, eo(seg(lt, 0, 0.5))), 0, TAU); ctx.stroke(); ctx.restore();
        pill('DID YOU SEE ME?', 540, 330, 78, YEL, '#2a1530', pop(lt, 0.35)); pill('REPLAY', 540, 190, 48, RED, '#fff', pop(lt, 0.05));
        arrow(540, 440, px, py - 215, YEL, 20, eo(seg(lt, 0.7, 1.1))); shade(); } });
    cue(st, 'whoosh'); cue(st + 0.35, 'boing', { gain: 0.6 }); }

  // S04: a famous experiment (viewer counts passes on a screen)
  const tHalf = Wd('about', 3) - 0.06, tGor = Wd('gorilla', 3) - 0.1;
  { const st = cut(3);
    add({ id: 'S04', at: st, cam: [540, 760], zoom: 0.1, note: 'a famous experiment: a screen with two teams passing, 1999',
      draw(lt, d, t) { lin('#14c8c0', '#2f7bff', 0, H); rays(540, 760, t, 'rgba(255,255,255,.08)');
        pill('FAMOUS EXPERIMENT', 540, 220, 68, '#fff', '#1556c0', pop(lt, 0.0)); pill('1999', 540, 360, 70, YEL, '#2a1530', pop(lt, 0.35));
        rr(120, 500, 840, 560, 50, '#2a1530'); rr(150, 530, 780, 500, 30, '#ffd978'); rr(150, 800, 780, 230, 30, '#e39a49');
        const spots = [[270, 790, 1], [470, 760, 0], [720, 800, 1], [370, 990, 0], [600, 960, 1], [800, 990, 0]];
        spots.forEach(([x, y, w], i) => K.person({ x: x + Math.sin(t * 2 + i) * 18, y, s: 0.36, coat: w ? '#ffffff' : '#222222', coatShade: w ? '#dfe3ea' : '#111111', arm: K.POSE.shrug, mouth: 'smile', walk: t * 5 + i }));
        const k = (t * 1.2) % 1, from = Math.floor(t * 1.2) % 3, to = (from + 1) % 3, W3 = [spots[0], spots[2], spots[4]];
        ball(lerp(W3[from][0], W3[to][0], k), lerp(W3[from][1], W3[to][1], k) - 80 - Math.sin(Math.PI * k) * 110, 26, ORG, '#7a2c00', t * 5);
        rr(470, 1060, 140, 70, 10, '#2a1530'); rr(340, 1115, 400, 36, 18, '#2a1530');
        pill('COUNT THE PASSES', 540, 1235, 50, ORG, '#fff', pop(lt, 0.7)); shade(); } });
    cue(st, 'whoosh'); cue(st + 0.35, 'pop', { gain: 0.5 }); }

  // S05: about half missed it
  { const st = tHalf;
    add({ id: 'S05', at: st, cam: [540, 780], zoom: 0.08, note: 'ten viewers, about half turn grey with question marks',
      draw(lt, d, t) { lin('#ff9a3c', '#ff4f8b', 0, H); pill('ABOUT HALF', 540, 220, 96, '#fff', '#c2185b', pop(lt, 0.0)); pill('DID NOT NOTICE IT', 540, 390, 62, YEL, '#2a1530', pop(lt, 0.55));
        for (let i = 0; i < 10; i++) { const x = 140 + (i % 5) * 200, y = i < 5 ? 840 : 1220, miss = [0, 2, 4, 6, 8].includes(i), on = miss ? seg(lt, 0.5 + i * 0.07, 0.65 + i * 0.07) : 0, sc = pop(lt, i * 0.03, 0.2);
          if (sc <= 0) continue; const grey = on >= 0.5;
          K.person({ x, y, s: 0.46 * sc, coat: grey ? '#8d86a0' : GRN, coatShade: grey ? '#736c88' : '#23a862', eyes: grey ? 'n' : 'wide', mouth: grey ? 'flat' : 'o', arm: grey ? K.POSE.shrug : K.POSE.cheer, bob: grey ? 0 : Math.abs(Math.sin(t * 6 + i)) * -16 });
          if (grey) label('?', x, y - 290, 110, '#fff'); else label('!', x, y - 295, 110, YEL); }
        shade(); } });
    cue(st, 'whoosh'); cue(st + 0.55, 'pop', { gain: 0.5 }); cue(st + 0.85, 'pop', { gain: 0.4 }); }

  // S06: the gorilla appears
  { const st = tGor;
    add({ id: 'S06', at: st, cam: [540, 800], zoom: 0.08, note: 'big gorilla pops up',
      draw(lt, d, t) { lin('#35d07f', '#0f9fb5', 0, H); rays(540, 850, t * 3, 'rgba(255,255,255,.14)'); const sc = pop(lt, 0.0, 0.3); gorilla(540, 1230, 1.5 * Math.max(0.01, sc), t, 0, 0);
        pill('A GORILLA?!', 540, 270, 104, RED, '#fff', pop(lt, 0.1)); shade(); } });
    cue(st, 'slam', { gain: 0.7 }); }

  // S07: person in a suit walks in, nine seconds on screen
  const tNine = Wd('nine', 4), tThump = Wd('thumped', 4) - 0.12;
  { const st = cut(4);
    add({ id: 'S07', at: st, cam: [540, 880], zoom: 0.08, note: 'gorilla suit walks into the middle of the game, 9 second ring',
      draw(lt, d, t) { gym(t); [[190, 900, RED], [900, 880, NAVY], [170, 1310, NAVY], [925, 1305, RED]].forEach(([x, y, c], i) => K.person({ x, y, s: 0.5, coat: c, coatShade: c === RED ? '#d31f3d' : '#17214a', arm: K.POSE.shrug, mouth: 'smile', walk: t * 5 + i, look: [i % 2 ? -1 : 1, 0] }));
        const k = (t * 1.25) % 1, flip = Math.floor(t * 1.25) % 2; ball(lerp(flip ? 900 : 190, flip ? 190 : 900, k), 780 - Math.sin(Math.PI * k) * 150, 34, ORG, '#7a2c00', t * 6);
        const p = seg(lt, 0.1, 2.2); gorilla(lerp(1250, 540, p), 1240, 1.0, t, p < 1 ? 1 : 0, 0);
        pill('A PERSON IN A SUIT', 540, 200, 60, '#fff', '#5a2d82', pop(lt, 0.15));
        const f = seg(t, st + 0.3, tNine + 0.4), n = Math.min(9, Math.floor(f * 9.001)); circ(540, 420, 120, '#2a1530'); circ(540, 420, 104, '#fff');
        ctx.save(); ctx.strokeStyle = RED; ctx.lineWidth = 24; ctx.beginPath(); ctx.arc(540, 420, 88, -Math.PI / 2, -Math.PI / 2 + TAU * Math.max(0.001, f)); ctx.stroke(); ctx.restore();
        label(String(n), 540, 424, 96, '#fff');
        pill('9 SECONDS ON SCREEN', 540, 610, 52, YEL, '#2a1530', pop(t, tNine)); shade(); } });
    cue(st, 'whoosh'); cue(tNine, 'pop', { gain: 0.6 }); }

  // S08: chest thump close-up
  { const st = tThump;
    add({ id: 'S08', at: st, cam: [540, 860], zoom: 0.1, note: 'close-up chest thump',
      draw(lt, d, t) { lin('#ff4f8b', '#ff9a3c', 0, H); rays(540, 850, t * 4, 'rgba(255,255,255,.13)'); const sh = Math.sin(t * 40) * 8; gorilla(540 + sh, 1270, 1.55, t, 0, 1);
        pill('...AND THUMPED ITS CHEST', 540, 230, 52, '#fff', '#c2185b', pop(lt, 0.0));
        const b = Math.floor(lt / 0.2) % 2; ctx.save(); ctx.translate(b ? 800 : 260, 450); ctx.rotate(b ? 0.2 : -0.2); label('THUMP!', 0, 0, 82, YEL, 1, 0.85 + 0.15 * Math.sin(t * 20)); ctx.restore(); shade(); } });
    cue(st, 'whoosh'); [0.1, 0.35, 0.6, 0.85].forEach((o) => cue(st + o, 'thud', { gain: 0.5 })); }

  // S09: why: attention is limited
  const tLike = Wd('like', 5) - 0.06, tLights = Wd('lights', 5);
  const items = (a = 1, t = 0) => { ctx.save(); ctx.globalAlpha = a; ball(210, 940, 90, ORG, '#7a2c00', Math.sin(t * 2) * 0.3); penguin(540, 1040, 0.78, t, 0.4, 0); gorilla(865, 1050, 0.52, t, 0, 0); ctx.restore(); };
  { const st = cut(5);
    add({ id: 'S09', at: st, cam: [540, 800], zoom: 0.08, note: 'brain with limited attention, three things around it',
      draw(lt, d, t) { lin('#41d6c3', '#6a5cff', 0, H); pill('INATTENTIONAL BLINDNESS', 540, 200, 55, '#fff', '#4326a8', pop(lt, 0.0));
        // brain
        ctx.save(); ctx.translate(540, 500); const br = (1 + 0.04 * Math.sin(t * 5)) * pop(lt, 0.15, 0.35); ctx.scale(br, br);
        [[-95, 10, 90], [-30, -50, 105], [60, -45, 100], [105, 25, 85], [20, 45, 105], [-55, 55, 80]].forEach(([x, y, r]) => circ(x, y, r + 8, '#a8327a'));
        [[-95, 10, 90], [-30, -50, 105], [60, -45, 100], [105, 25, 85], [20, 45, 105], [-55, 55, 80]].forEach(([x, y, r]) => circ(x, y, r, '#ff8fc4'));
        stroke([[-130, -10], [-80, -30], [-50, 5], [-5, -25], [25, 10], [80, -20], [130, 10]], '#d4559c', 14); stroke([[-90, 70], [-40, 45], [0, 80], [55, 55], [100, 80]], '#d4559c', 14); ctx.restore();
        pill('ATTENTION IS LIMITED', 540, 700, 54, YEL, '#2a1530', pop(lt, 0.5)); items(eo(seg(lt, 0.3, 0.6)), t);
        shade(); } });
    cue(st, 'whoosh'); cue(st + 0.5, 'pop', { gain: 0.5 }); }

  // S10: torch spotlight
  { const st = tLike;
    add({ id: 'S10', at: st, cam: [540, 800], zoom: 0.06, note: 'torch lights one thing at a time',
      draw(lt, d, t) { lin('#ffb13d', '#ff5f6d', 0, H); items(1, t);
        const m = eio(seg(t, tLights - 0.75, tLights + 0.05)), cx = lerp(210, 540, m), cy = 910;
        ctx.save(); ctx.beginPath(); ctx.rect(-100, -100, W + 200, H + 200); ctx.arc(cx, cy, 200, 0, TAU, true); ctx.fillStyle = 'rgba(112,52,205,0.74)'; ctx.fill('evenodd'); ctx.restore();
        const g = ctx.createLinearGradient(540, 460, cx, cy); g.addColorStop(0, 'rgba(255,240,150,.75)'); g.addColorStop(1, 'rgba(255,240,150,.12)');
        const ang = Math.atan2(cy - 470, cx - 540), nx = -Math.sin(ang), ny = Math.cos(ang);
        ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(540 + nx * 40, 470 + ny * 40); ctx.lineTo(cx + nx * 195, cy + ny * 195); ctx.lineTo(cx - nx * 195, cy - ny * 195); ctx.lineTo(540 - nx * 40, 470 - ny * 40); ctx.closePath(); ctx.fill();
        ctx.save(); ctx.translate(540, 470); ctx.rotate(ang); rr(-150, -34, 130, 68, 22, TEAL); rr(-40, -58, 70, 116, 20, '#fff'); oval(30, 0, 14, 52, YEL); circ(-90, -34, 14, RED); ctx.restore();
        ctx.save(); ctx.strokeStyle = YEL; ctx.lineWidth = 12; ctx.beginPath(); ctx.arc(cx, cy, 200, 0, TAU); ctx.stroke(); ctx.restore();
        pill('ATTENTION = TORCH', 540, 220, 66, '#fff', '#4326a8', pop(lt, 0.0)); pill('OUTSIDE THE BEAM: EASY TO MISS', 540, 1235, 43, YEL, '#2a1530', pop(lt, 0.7)); shade(); } });
    cue(st, 'whoosh'); cue(tLights - 0.7, 'slide', { dur: 0.6, gain: 0.5 }); cue(tLights, 'sparkle', { dur: 0.6 }); }

  // S11: the question
  const tYes = Wd('yes', 6), tNo = Wd('no', 6);
  { const st = cut(6);
    add({ id: 'S11', at: st, cam: [540, 800], zoom: 0.06, note: 'penguin asks: did you see me? yes or no, tagline pill',
      draw(lt, d, t) { lin('#33c9ff', '#a35bff', 0, H); rays(540, 800, t, 'rgba(255,255,255,.1)');
        pill('BE HONEST!', 540, 210, 90, RED, '#fff', pop(lt, 0.0)); pill('DID YOU SEE THE PENGUIN?', 540, 360, 52, '#fff', '#4326a8', pop(lt, 0.25));
        penguin(540, 905, 1.35 * (0.9 + 0.1 * pop(lt, 0, 0.4)), t, 0.5, 0.7);
        pill('A: YES!', 280, 1030, 70, GRN, '#06402a', pop(t, tYes - 0.1)); pill('B: NO!', 800, 1030, 70, ORG, '#fff', pop(t, tNo - 0.1));
        pill('COMMENT A OR B', 540, 1140, 46, YEL, '#2a1530', pop(lt, 2.2));
        pill('Facts that blow your mind!', 540, 1230, 34, PLUM, '#fff', pop(lt, 0.6)); shade(); } });
    cue(st, 'whoosh'); cue(tYes - 0.1, 'pop', { gain: 0.5 }); cue(tNo - 0.1, 'pop', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
