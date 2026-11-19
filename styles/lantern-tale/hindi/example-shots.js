// HOWRAH BRIDGE (Hindi audio, English captions): shot list.
import { ctx, C, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, bigText } from './core/lib.js';
import { L, Le, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';

export function buildShots() {
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);
  const pop = (lt, t0, dur = 0.26) => eob(seg(lt, t0, t0 + dur));
  const STEEL = '#3a4452', STEELD = '#222a34';

  // a cantilever truss from x0..x1 at deck y, height h, drawn to fraction p
  const truss = (x0, x1, y, h, p = 1, col = STEEL) => {
    const xe = lerp(x0, x1, p), n = Math.max(2, Math.round(Math.abs(xe - x0) / 70));
    ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 9; ctx.lineCap = 'square';
    ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(xe, y); ctx.moveTo(x0, y - h); ctx.lineTo(xe, y - h); ctx.stroke();
    ctx.lineWidth = 5; ctx.beginPath();
    for (let i = 0; i <= n; i++) { const x = lerp(x0, xe, i / n); ctx.moveTo(x, y); ctx.lineTo(x, y - h); if (i < n) { ctx.moveTo(x, y); ctx.lineTo(lerp(x0, xe, (i + 1) / n), y - h); } }
    ctx.stroke(); ctx.restore();
  };
  const river = (y) => { ctx.save(); const g = ctx.createLinearGradient(0, y, 0, H); g.addColorStop(0, '#c98a5a'); g.addColorStop(1, '#4b3a4a'); ctx.fillStyle = g; ctx.fillRect(0, y, W, H - y); ctx.restore(); };
  const bridge = (y, p = 1) => {
    const a = 140, b = 940; ctx.save(); ctx.fillStyle = STEELD; ctx.fillRect(40, y - 14, 1000, 24);
    ctx.fillRect(a - 30, y - 330, 60, 340); ctx.fillRect(b - 30, y - 330, 60, 340); ctx.restore();
    truss(a, 540, y - 330, 120, p); truss(b, 540, y - 330, 120, p);
    ctx.save(); ctx.strokeStyle = STEEL; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(a, y - 330); ctx.quadraticCurveTo(540, y - 560, b, y - 330); ctx.stroke(); ctx.restore();
  };
  const label = (txt, y, size, col, a, sc = 1) => { if (a <= 0) return; ctx.save(); ctx.globalAlpha = clamp(a); ctx.translate(540, y); ctx.scale(sc, sc); bigText(txt, 0, 0, size, col); ctx.restore(); };
  const rivet = (x, y, r, col = '#8d939b') => { ctx.save(); ctx.fillStyle = col; ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.arc(x - r * .3, y - r * .3, r * .35, 0, TAU); ctx.fill(); ctx.restore(); };
  const cross = (x, y, s, a) => { ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = C.red; ctx.lineWidth = 26; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); };
  const sun = (t) => { K.dusk(t); K.glow(540, 1000, 700, C.amber, 0.35); };

  // 1 hook
  { const st = cut(0);
    add({ id: 'S01', at: st, cam: [540, 900], zoom: 0.08, note: 'sunset bridge, nut and bolt crossed out',
      draw(lt, d, t) { sun(t); river(1250); bridge(1250); const a = eo(seg(lt, 0.4, 0.8));
        ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = '#b9bec6'; ctx.beginPath(); for (let i = 0; i < 6; i++) { const q = i / 6 * TAU; ctx.lineTo(540 + Math.cos(q) * 90, 560 + Math.sin(q) * 90); } ctx.fill(); ctx.fillStyle = '#222'; ctx.beginPath(); ctx.arc(540, 560, 34, 0, TAU); ctx.fill(); ctx.restore();
        cross(540, 560, 130, eo(seg(lt, 1.2, 1.5))); } });
    cue(st, 'whoosh'); cue(st + 1.2, 'slam', { gain: 0.8 }); }
  // 2 rivets
  { const st = cut(1);
    add({ id: 'S02', at: st, cam: [540, 900], zoom: 0.12, note: 'rivet close-up, pill RIVETS ONLY',
      draw(lt, d, t) { K.study ? K.study(t) : K.dusk(t); ctx.fillStyle = STEEL; ctx.fillRect(0, 500, W, 700);
        for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) rivet(160 + c * 190, 620 + r * 220, 44 * pop(lt, 0.1 + (r * 5 + c) * 0.06));
        K.pill('RIVETS ONLY', 540, 1290, 70, C.red, C.cream, pop(lt, 1.6)); } });
    cue(st, 'whoosh'); for (let i = 0; i < 8; i++) cue(st + 0.15 + i * 0.2, 'tock', { gain: 0.4 }); }
  // 3 1936, 26,500 tons
  { const st = cut(2);
    add({ id: 'S03', at: st, cam: [540, 900], zoom: 0.1, note: 'steel stack, counter to 26,500',
      draw(lt, d, t) { K.dusk(t); river(1300);
        for (let i = 0; i < 6; i++) { const k = pop(lt, 0.3 + i * 0.12); ctx.fillStyle = STEEL; ctx.fillRect(160, 1250 - i * 70 * k, 760, 56 * k); }
        label('1936', 420, 190, C.cream, eo(seg(lt, 0.1, 0.5)));
        const n = Math.round(26500 * eo(seg(lt, 3.2, 5.2))); label(n.toLocaleString('en-US') + ' TONS', 700, 100, C.amber, eo(seg(lt, 3.2, 3.5))); } });
    cue(st, 'whoosh'); cue(st + 3.2, 'pop', { gain: 0.5 }); }
  // 4 war, only 3000
  { const st = cut(3);
    add({ id: 'S04', at: st, cam: [540, 900], zoom: 0.1, note: 'ship brings only 3,000 tons',
      draw(lt, d, t) { K.dusk(t); river(1100); const x = lerp(1300, 560, eo(seg(lt, 0, 1.2)));
        ctx.save(); ctx.fillStyle = '#2d3138'; ctx.beginPath(); ctx.moveTo(x - 300, 1000); ctx.lineTo(x + 300, 1000); ctx.lineTo(x + 230, 1130); ctx.lineTo(x - 230, 1130); ctx.fill(); ctx.fillStyle = STEEL; ctx.fillRect(x - 60, 900, 120, 100); ctx.fillRect(x - 220, 960, 90, 40); ctx.restore();
        K.pill('ONLY 3,000 TONS', 540, 520, 80, C.red, C.cream, pop(lt, 2.6)); } });
    cue(st, 'whoosh'); cue(st + 2.6, 'slam', { gain: 0.7 }); }
  // 5 tata
  { const st = cut(4);
    add({ id: 'S05', at: st, cam: [540, 900], zoom: 0.1, note: 'Tata Steel train, 23,000 tons',
      draw(lt, d, t) { K.dusk(t); ctx.fillStyle = '#2a2a2e'; ctx.fillRect(0, 1250, W, 20); const x = lerp(-900, 700, eo(seg(lt, 0, 1.6)));
        ctx.fillStyle = '#7a2f26'; ctx.fillRect(x, 1120, 220, 130); ctx.fillStyle = STEEL; for (let i = 0; i < 4; i++) ctx.fillRect(x - 250 * (i + 1) + 20, 1160, 230, 90);
        K.pill('TATA STEEL', 540, 560, 90, C.teal, C.cream, pop(lt, 0.4)); const n = Math.round(23000 * eo(seg(lt, 1.8, 3.2)));
        label(n.toLocaleString('en-US') + ' TONS', 780, 100, C.amber, eo(seg(lt, 1.8, 2.1))); } });
    cue(st, 'whoosh'); cue(st + 0.4, 'pop', { gain: 0.5 }); }
  // 6 arms grow
  { const st = cut(5);
    add({ id: 'S06', at: st, cam: [540, 900], zoom: 0.08, note: 'arms grow from both banks',
      draw(lt, d, t) { sun(t); river(1250); bridge(1250, 0.15 + 0.4 * eo(seg(lt, 0.2, 3.2))); } });
    cue(st, 'whoosh'); for (let i = 0; i < 5; i++) cue(st + 0.5 + i * 0.6, 'tock', { gain: 0.5 }); }
  // 7 jacks join
  { const st = cut(6);
    add({ id: 'S07', at: st, cam: [540, 900], zoom: 0.1, note: '16 jacks join the halves',
      draw(lt, d, t) { sun(t); river(1250); bridge(1250, 0.55 + 0.45 * eo(seg(lt, 0.2, 2.2)));
        const k = pop(lt, 2.4); K.pill('16 JACKS x 800 TONS', 540, 470, 66, C.red, C.cream, k); } });
    cue(st, 'whoosh'); cue(st + 2.3, 'slam', { gain: 0.7 }); }
  // 8 opening date
  { const st = cut(7);
    add({ id: 'S08', at: st, cam: [540, 900], zoom: 0.1, note: 'calendar 3 FEB 1943',
      draw(lt, d, t) { sun(t); river(1250); bridge(1250); const k = pop(lt, 0.3);
        ctx.save(); ctx.translate(540, 640); ctx.scale(k, k); ctx.fillStyle = C.cream; ctx.fillRect(-300, -230, 600, 460); ctx.fillStyle = C.red; ctx.fillRect(-300, -230, 600, 100); ctx.restore();
        if (k > 0.5) { label('FEBRUARY', 555, 70, C.cream, 1); label('3', 690, 220, '#222', 1); label('1943', 810, 90, '#222', 1); } } });
    cue(st, 'whoosh'); cue(st + 0.3, 'tock', { gain: 0.7 }); }
  // 9 span
  { const st = cut(8);
    add({ id: 'S09', at: st, cam: [540, 900], zoom: 0.08, note: '1,500 feet dimension line',
      draw(lt, d, t) { sun(t); river(1250); bridge(1250); const p = eo(seg(lt, 0.3, 1.4)); ctx.save(); ctx.strokeStyle = C.amber; ctx.lineWidth = 8;
        ctx.beginPath(); ctx.moveTo(140, 1340); ctx.lineTo(lerp(140, 940, p), 1340); ctx.moveTo(140, 1310); ctx.lineTo(140, 1370); ctx.moveTo(lerp(140, 940, p), 1310); ctx.lineTo(lerp(140, 940, p), 1370); ctx.stroke(); ctx.restore();
        K.pill('1,500 FEET', 540, 400, 84, C.amber, '#222', pop(lt, 1.2)); } });
    cue(st, 'whoosh'); cue(st + 1.3, 'pop', { gain: 0.5 }); }
  // 10 lesson
  { const st = cut(9);
    add({ id: 'S10', at: st, cam: [540, 900], zoom: 0.08, note: 'rivets and WHICH BRIDGE NEXT?',
      draw(lt, d, t) { K.dusk(t); ctx.fillStyle = STEEL; ctx.fillRect(0, 700, W, 500);
        for (let c = 0; c < 6; c++) rivet(110 + c * 170, 950, 34 * pop(lt, 0.2 + c * 0.1));
        label('BIG THINGS', 420, 110, C.cream, eo(seg(lt, 0.1, 0.4))); K.pill('WHICH BRIDGE NEXT?', 540, 1290, 70, C.red, C.cream, pop(lt, 3.4)); } });
    cue(st, 'whoosh'); cue(st + 3.4, 'pop', { gain: 0.6 }); }
  return { shots: S, cues: CUES };
}
