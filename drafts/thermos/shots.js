// WHY A THERMOS KEEPS TEA HOT (Hindi audio, English captions): shot list.
import { ctx, C, W, H, TAU, clamp, lerp, seg, eo, eio, eob, bigText } from './core/lib.js';
import { L, Le, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';

export function buildShots() {
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);
  const pop = (lt, t0, dur = 0.26) => eob(seg(lt, t0, t0 + dur));
  const hash = (n) => { const s = Math.sin(n * 127.1 + 3.7) * 43758.5453; return s - Math.floor(s); };
  const HOT = '#ff6a3d', COLD = '#6ec6ff', TEA = '#b5651d', STEEL = '#5b6b7d', SILVER = '#d7dde5';

  const bg = (t, hot = 0.35) => { K.night(t); K.glow(540, 860, 700, C.amber, hot); };
  const label = (txt, y, size, col, a, sc = 1) => { if (a <= 0) return; ctx.save(); ctx.globalAlpha = clamp(a); ctx.translate(540, y); ctx.scale(sc, sc); bigText(txt, 0, 0, size, col); ctx.restore(); };
  const rr = (x, y, w, h, r, fill) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fillStyle = fill; ctx.fill(); };

  // arrow from (x1,y1) to (x2,y2), drawn to fraction p
  const arrow = (x1, y1, x2, y2, col, w = 14, p = 1, a = 1) => {
    if (p <= 0 || a <= 0) return; const x = lerp(x1, x2, p), y = lerp(y1, y2, p), ang = Math.atan2(y2 - y1, x2 - x1);
    ctx.save(); ctx.globalAlpha = clamp(a); ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x - Math.cos(ang) * w, y - Math.sin(ang) * w); ctx.stroke();
    ctx.translate(x, y); ctx.rotate(ang); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-w * 2.2, -w * 1.4); ctx.lineTo(-w * 2.2, w * 1.4); ctx.closePath(); ctx.fill(); ctx.restore();
  };
  // little glowing heat dots flowing along a line
  const flow = (x1, y1, x2, y2, t, n, col, a = 1, size = 11, speed = 0.45) => {
    for (let i = 0; i < n; i++) { const k = (t * speed + i / n) % 1; ctx.save(); ctx.globalAlpha = clamp(a) * Math.sin(k * Math.PI);
      ctx.fillStyle = col; ctx.beginPath(); ctx.arc(lerp(x1, x2, k), lerp(y1, y2, k) + Math.sin(k * 14 + i) * 8, size, 0, TAU); ctx.fill(); ctx.restore(); }
  };
  const steam = (cx, y, t, a = 1) => { ctx.save(); ctx.globalAlpha = 0.5 * clamp(a); ctx.strokeStyle = '#fff'; ctx.lineWidth = 10; ctx.lineCap = 'round';
    for (let i = -1; i <= 1; i++) { ctx.beginPath(); for (let k = 0; k <= 20; k++) { const yy = y - k * 8; ctx.lineTo(cx + i * 46 + Math.sin(k * 0.5 + t * 2.4 + i) * 12, yy); } ctx.stroke(); } ctx.restore(); };

  // thermos cutaway. o: cx, y (top of body), w, h, level 0..1, tea colour, lid (0 closed ... 1 lifted), airA (alpha of air dots in gap), t
  const thermos = (o) => {
    const { cx, y, w, h, t = 0 } = o, x = cx - w / 2, lvl = o.level ?? 0.78, tea = o.tea || TEA;
    // lid / stopper
    const lift = (o.lift || 0) * 90; rr(cx - w * 0.34, y - 78 - lift, w * 0.68, 78, 18, '#c8433a'); rr(cx - w * 0.34, y - 78 - lift, w * 0.68, 22, 14, '#e35d52');
    // outer shell
    rr(x, y, w, h, 46, STEEL); rr(x + 10, y + 8, 22, h - 30, 10, 'rgba(255,255,255,.18)');
    // vacuum gap
    const gx = x + 24, gw = w - 48; rr(gx, y + 20, gw, h - 44, 30, o.gapCol || '#0d1226');
    // air dots in the gap
    if (o.airA > 0) for (let i = 0; i < 26; i++) { const side = i % 2, yy = y + 50 + hash(i) * (h - 110), xx = side ? gx + gw - 18 - hash(i + 9) * 16 : gx + 18 + hash(i + 9) * 16;
      ctx.save(); ctx.globalAlpha = o.airA * (0.55 + 0.4 * Math.sin(t * 3 + i)); ctx.fillStyle = '#9fb0c8'; ctx.beginPath(); ctx.arc(xx + Math.sin(t * 2 + i) * 4, yy, 6, 0, TAU); ctx.fill(); ctx.restore(); }
    // inner wall (mirror-coated)
    const ix = gx + 40, iw = gw - 80; rr(ix, y + 40, iw, h - 84, 26, o.mirror ? '#f4f8ff' : SILVER);
    // inside
    const jx = ix + 14, jw = iw - 28; rr(jx, y + 54, jw, h - 112, 18, '#2a1a12');
    const th = (h - 112) * lvl; ctx.save(); ctx.beginPath(); ctx.roundRect(jx, y + 54, jw, h - 112, 18); ctx.clip();
    ctx.fillStyle = tea; ctx.fillRect(jx, y + 54 + (h - 112) - th, jw, th);
    K.glow(cx, y + 54 + (h - 112) - th * 0.5, 240, o.glowCol || '#ffb347', o.glowA ?? 0.5); ctx.restore();
    if (o.mirror) { ctx.save(); ctx.globalAlpha = 0.5 + 0.4 * Math.sin(t * 5); ctx.fillStyle = '#fff'; K.sparkle(ix + 6, y + h * 0.3, 0.5, t, 1); K.sparkle(ix + iw - 6, y + h * 0.6, 0.4, -t, 1); ctx.restore(); }
  };
  // plain single-wall bottle
  const bottle = (cx, y, w, h, t) => { rr(cx - w / 2, y, w, h, 40, SILVER); rr(cx - w / 2 + 22, y + 22, w - 44, h - 70, 24, TEA); K.glow(cx, y + h * 0.55, 220, '#ffb347', 0.4); rr(cx - w * 0.28, y - 60, w * 0.56, 60, 14, '#c8433a'); };
  const thermo = (cx, y, p, a = 1) => { // little thermometer: p = fill 0..1
    ctx.save(); ctx.globalAlpha = a; rr(cx - 26, y, 52, 330, 26, '#e8ecf2'); rr(cx - 14, y + 330 - 300 * p - 10, 28, 300 * p + 10, 14, p > 0.5 ? HOT : COLD); ctx.fillStyle = p > 0.5 ? HOT : COLD; ctx.beginPath(); ctx.arc(cx, y + 350, 44, 0, TAU); ctx.fill(); ctx.restore(); };

  // 0 HOOK ------------------------------------------------------------
  { const st = cut(0);
    add({ id: 'S01', at: st, cam: [540, 880], zoom: 0.12, note: 'thermos cutaway with hot tea, 100 C pill, question mark',
      draw(lt, d, t) { bg(t, 0.5); thermos({ cx: 540, y: 520, w: 400, h: 700, t }); steam(540, 380, t, 1);
        K.pill('100°C TEA', 540, 190, 84, C.red, C.cream, pop(lt, 0.15)); K.pill('WHY STAYS HOT?', 540, 330, 64, C.amber, '#222', pop(lt, 0.9));
        label('?', 880, 260 * (1 + 0.06 * Math.sin(t * 5)), 'rgba(255,200,87,0.35)', eo(seg(lt, 1.4, 1.8))); } });
    cue(st, 'whoosh'); cue(st + 0.15, 'pop', { gain: 0.5 }); cue(st + 0.9, 'pop', { gain: 0.5 }); }

  // 1 bottle loses heat everywhere --------------------------------------
  { const st = cut(1);
    add({ id: 'S02', at: st, cam: [540, 880], zoom: 0.1, note: 'plain bottle, heat arrows escape in all directions, thermometer drops',
      draw(lt, d, t) { bg(t, 0.4); bottle(540, 520, 380, 700, t);
        const dirs = [[-1, -0.6], [1, -0.6], [-1, 0.2], [1, 0.2], [-1, 0.9], [1, 0.9], [0, -1]];
        dirs.forEach(([dx, dy], i) => { const k = eo(seg(lt, 0.4 + i * 0.12, 0.9 + i * 0.12)); arrow(540 + dx * 215, 900 + dy * 300, 540 + dx * 470, 900 + dy * 430, HOT, 14, k, 1); });
        thermo(930, 520, lerp(1, 0.25, eio(seg(lt, 0.4, d - 0.4))), eo(seg(lt, 0.2, 0.5)));
        K.pill('HEAT ESCAPES', 540, 330, 70, C.red, C.cream, pop(lt, 0.3)); } });
    cue(st, 'whoosh'); for (let i = 0; i < 4; i++) cue(st + 0.5 + i * 0.3, 'tock', { gain: 0.4 }); }

  // 2 three paths ------------------------------------------------------
  { const st = cut(2);
    add({ id: 'S03', at: st, cam: [540, 800], zoom: 0.08, note: 'three panels: conduction, convection, radiation',
      draw(lt, d, t) { bg(t, 0.2); const t1 = 0.4, t2 = d * 0.36, t3 = d * 0.68;
        // 1 conduction: heat flows along a metal bar
        { const k = pop(lt, t1); ctx.save(); ctx.translate(540, 300); ctx.scale(k, k); rr(-340, -50, 680, 100, 30, SILVER);
          ctx.fillStyle = HOT; ctx.beginPath(); ctx.roundRect(-340, -50, 680 * eo(seg(lt, t1 + 0.2, t1 + 1.6)), 100, 30); ctx.fill(); ctx.restore();
          label('TOUCH', 400, 62, C.cream, k); label('conduction', 460, 54, C.amber, k); }
        // 2 convection: swirling air
        { const k = pop(lt, t2); ctx.save(); ctx.globalAlpha = clamp(k); ctx.strokeStyle = '#9fd3ff'; ctx.lineWidth = 12; ctx.lineCap = 'round';
          for (let i = 0; i < 3; i++) { ctx.beginPath(); for (let a = 0; a < 5.2; a += 0.15) { const r = 30 + a * 22; ctx.lineTo(540 + Math.cos(a * 1.5 + t * 2.5 + i * 2.1) * r * 1.5, 660 + Math.sin(a * 1.5 + t * 2.5 + i * 2.1) * r * 0.65); } ctx.stroke(); } ctx.restore();
          label('MOVING AIR', 800, 62, C.cream, k); label('convection', 860, 54, C.amber, k); }
        // 3 radiation: rays from a glowing ball
        { const k = pop(lt, t3); ctx.save(); ctx.translate(540, 1030); ctx.globalAlpha = clamp(k); K.glow(0, 0, 200, HOT, 0.7); ctx.fillStyle = HOT; ctx.beginPath(); ctx.arc(0, 0, 60, 0, TAU); ctx.fill();
          ctx.strokeStyle = '#ffd08a'; ctx.lineWidth = 10; ctx.lineCap = 'round'; for (let i = 0; i < 12; i++) { const a = i / 12 * TAU, r0 = 100 + (t * 90 + i * 10) % 70; ctx.beginPath(); ctx.moveTo(Math.cos(a) * r0, Math.sin(a) * r0); ctx.lineTo(Math.cos(a) * (r0 + 40), Math.sin(a) * (r0 + 40)); ctx.stroke(); } ctx.restore();
          label('HEAT RAYS', 1190, 62, C.cream, k); label('radiation', 1250, 54, C.amber, k); } } });
    cue(st, 'whoosh'); cue(st + 0.4, 'pop', { gain: 0.5 }); cue(st + 2.1, 'pop', { gain: 0.5 }); cue(st + 3.9, 'pop', { gain: 0.5 }); }

  // 3 two walls, vacuum -------------------------------------------------
  { const st = cut(3);
    add({ id: 'S04', at: st, cam: [540, 880], zoom: 0.12, note: 'thermos cutaway, gap labelled, air dots get pumped out',
      draw(lt, d, t) { bg(t, 0.3); const air = 1 - eo(seg(lt, 1.6, 3.2)); thermos({ cx: 540, y: 520, w: 460, h: 700, t, airA: air });
        arrow(230, 380, 372, 640, C.amber, 12, eo(seg(lt, 0.2, 0.6))); K.pill('2 WALLS', 270, 330, 60, C.teal, C.cream, pop(lt, 0.2));
        arrow(800, 380, 700, 640, C.red, 12, eo(seg(lt, 1.0, 1.4))); K.pill('NO AIR', 790, 330, 56, C.red, C.cream, pop(lt, 1.0)); } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + 1.6, 'whoosh', { gain: 0.5 }); }

  // 4 no air, no path ---------------------------------------------------
  { const st = cut(4);
    add({ id: 'S05', at: st, cam: [540, 880], zoom: 0.12, note: 'heat dots from tea hit the empty gap and stop, red X',
      draw(lt, d, t) { bg(t, 0.35); thermos({ cx: 540, y: 520, w: 460, h: 700, t, airA: 0 });
        const a = eo(seg(lt, 0.3, 0.7)); flow(480, 900, 345, 900, t, 4, HOT, a, 12, 0.7); flow(600, 900, 735, 900, t, 4, HOT, a, 12, 0.7);
        ctx.save(); ctx.globalAlpha = eo(seg(lt, 1.6, 2.0)); K.redX ? K.redX(300, 900, 0.8, eo(seg(lt, 1.6, 2.0))) : null; K.redX && K.redX(780, 900, 0.8, eo(seg(lt, 1.8, 2.2))); ctx.restore();
        K.pill('EMPTY GAP', 540, 330, 66, C.teal, C.cream, pop(lt, 0.2)); K.pill('NO AIR = NO PATH', 540, 1330, 60, C.red, C.cream, pop(lt, 2.2)); } });
    cue(st, 'whoosh'); cue(st + 1.6, 'slam', { gain: 0.6 }); cue(st + 1.8, 'slam', { gain: 0.5 }); }

  // 5 mirror -------------------------------------------------------------
  { const st = cut(5);
    add({ id: 'S06', at: st, cam: [540, 880], zoom: 0.12, note: 'mirror coating, heat rays bounce back toward tea',
      draw(lt, d, t) { bg(t, 0.35); thermos({ cx: 540, y: 520, w: 460, h: 700, t, mirror: true, airA: 0 });
        // rays from tea hit the wall and bounce back
        for (let s = -1; s <= 1; s += 2) for (let i = 0; i < 3; i++) { const y0 = 760 + i * 130, k = ((t * 0.6 + i * 0.33) % 1), xs = 540 + s * 60, xw = 540 + s * 170;
            const x = k < 0.5 ? lerp(xs, xw, k * 2) : lerp(xw, xs, (k - 0.5) * 2), y = k < 0.5 ? lerp(y0, y0 - 40, k * 2) : lerp(y0 - 40, y0 - 80, (k - 0.5) * 2);
            ctx.save(); ctx.fillStyle = k < 0.5 ? HOT : '#ffd08a'; ctx.globalAlpha = eo(seg(lt, 0.4, 0.8)); ctx.beginPath(); ctx.arc(x, y, 13, 0, TAU); ctx.fill(); ctx.restore(); }
        K.pill('MIRROR COATING', 540, 330, 66, C.amber, '#222', pop(lt, 0.2)); } });
    cue(st, 'whoosh'); cue(st + 0.2, 'sparkle', { dur: 1.2 }); }

  // 6 tight lid ------------------------------------------------------------
  { const st = cut(6);
    add({ id: 'S07', at: st, cam: [540, 760], zoom: 0.12, note: 'lid screws down; hot air bounces off it',
      draw(lt, d, t) { bg(t, 0.35); const lift = 1 - eo(seg(lt, 0.2, 1.0)); thermos({ cx: 540, y: 620, w: 460, h: 620, t, lift: lift * 1.1 });
        const a = eo(seg(lt, 1.0, 1.4)); flow(540, 640, 540, 500, t, 4, HOT, a, 12, 0.8);
        if (lt > 1.2) K.redX && K.redX(540, 440, 0.8, eo(seg(lt, 1.2, 1.6)));
        K.pill('TIGHT LID', 540, 250, 76, C.red, C.cream, pop(lt, 1.0)); } });
    cue(st, 'whoosh'); cue(st + 1.0, 'thud', { gain: 0.7 }); }

  // 7 small leak -------------------------------------------------------------
  { const st = cut(7);
    add({ id: 'S08', at: st, cam: [540, 880], zoom: 0.1, note: 'a few heat dots leak through the lid, thermometer falls slowly',
      draw(lt, d, t) { bg(t, 0.25); thermos({ cx: 540, y: 560, w: 440, h: 660, t });
        const a = eo(seg(lt, 0.3, 0.8)); flow(540, 540, 540, 330, t, 3, HOT, a, 9, 0.35); flow(500, 540, 430, 360, t, 2, HOT, a * 0.7, 8, 0.3);
        thermo(900, 560, lerp(0.95, 0.7, eio(seg(lt, 0.5, d - 0.3))), eo(seg(lt, 0.2, 0.5)));
        K.pill('SMALL LEAK, MOSTLY LID', 540, 200, 54, C.amber, '#222', pop(lt, 0.3)); K.pill('SLOWLY COOLS', 540, 1330, 66, C.red, C.cream, pop(lt, 2.4)); } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop', { gain: 0.5 }); cue(st + 2.4, 'pop', { gain: 0.5 }); }

  // 8 cold stays cold ------------------------------------------------------------
  { const st = cut(8);
    add({ id: 'S09', at: st, cam: [540, 880], zoom: 0.1, note: 'blue thermos with ice, outside heat bounces away',
      draw(lt, d, t) { K.night(t); K.glow(540, 860, 700, COLD, 0.35); thermos({ cx: 540, y: 520, w: 440, h: 700, t, tea: '#7fc8f0', glowCol: '#bfe6ff', glowA: 0.6, level: 0.8 });
        for (let s = -1; s <= 1; s += 2) for (let i = 0; i < 3; i++) { const k = ((t * 0.5 + i * 0.33) % 1), y0 = 640 + i * 170; const x = s * (lerp(520, 285, Math.min(k * 1.6, 1)) * 1); const bx = 540 + x * 1, by = y0;
          const back = k > 0.62 ? (k - 0.62) * 2.6 : 0; ctx.save(); ctx.globalAlpha = eo(seg(lt, 0.3, 0.7)); ctx.fillStyle = HOT; ctx.beginPath(); ctx.arc(540 + s * lerp(520, 285, Math.min(k / 0.62, 1)) + s * back * 150, by - back * 40, 13, 0, TAU); ctx.fill(); ctx.restore(); }
        K.pill('COLD STAYS COLD', 540, 330, 66, C.teal, C.cream, pop(lt, 0.2)); K.pill('HEAT KEPT OUT', 540, 1330, 60, C.red, C.cream, pop(lt, 2.0)); } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + 2.0, 'pop', { gain: 0.5 }); }

  // 9 question -------------------------------------------------------------------
  { const st = cut(9);
    add({ id: 'S10', at: st, cam: [540, 880], zoom: 0.1, note: 'thermos with two choices LID or GLASS',
      draw(lt, d, t) { bg(t, 0.35); thermos({ cx: 540, y: 520, w: 400, h: 700, t });
        const a = pop(lt, 0.3), b = pop(lt, 0.9); K.pill('A: LID', 290, 330, 60, C.red, C.cream, a); K.pill('B: GLASS', 790, 330, 60, C.teal, C.cream, b);
        arrow(290, 400, 470, 500, C.red, 12, eo(seg(lt, 0.5, 0.9))); arrow(790, 400, 610, 700, C.teal, 12, eo(seg(lt, 1.1, 1.5)));
        K.pill('WEAKEST PART?', 540, 190, 76, C.amber, '#222', pop(lt, 0.05)); } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop', { gain: 0.5 }); cue(st + 0.9, 'pop', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
