// WHY A PRESSURE COOKER DOESN'T EXPLODE (Hindi audio, English captions): shot list.
import { ctx, C, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, bigText, rr, circle, grad } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';

export function buildShots() {
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);
  const pop = (lt, t0, dur = 0.26) => eob(seg(lt, t0, t0 + dur));
  const STEEL = '#9aa4b1', STEELD = '#6f7a88', DARK = '#2b2230';

  const kitchen = (t) => {
    grad(-300, 1500, [[0, '#2a1d2e'], [0.5, '#6d3b33'], [1, '#8A4B36']]);
    ctx.save(); ctx.strokeStyle = 'rgba(255,200,140,0.07)'; ctx.lineWidth = 3;
    for (let y = 200; y < 1420; y += 110) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    for (let x = 0; x < W; x += 110) { ctx.beginPath(); ctx.moveTo(x, 200); ctx.lineTo(x, 1420); ctx.stroke(); } ctx.restore();
    K.glow(540, 900, 820, C.gold, 0.28);
    ctx.fillStyle = '#35242a'; ctx.fillRect(-300, 1420, W + 600, 600);
    ctx.fillStyle = 'rgba(255,200,120,0.18)'; ctx.fillRect(-300, 1420, W + 600, 8);
  };
  const arrow = (x0, y0, x1, y1, w, col, a = 1) => {
    if (a <= 0) return; const ang = Math.atan2(y1 - y0, x1 - x0); ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1 - Math.cos(ang) * w * 1.2, y1 - Math.sin(ang) * w * 1.2); ctx.stroke();
    ctx.translate(x1, y1); ctx.rotate(ang); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-w * 2.2, -w * 1.5); ctx.lineTo(-w * 2.2, w * 1.5); ctx.fill(); ctx.restore();
  };
  const label = (txt, x, y, size, col, a = 1, sc = 1) => { if (a <= 0) return; ctx.save(); ctx.globalAlpha = clamp(a); ctx.translate(x, y); ctx.scale(sc, sc); bigText(txt, 0, 0, size, col); ctx.restore(); };
  const puffs = (x, y, t, n, spread, rise, a = 0.6, col = '#ffffff') => {
    for (let i = 0; i < n; i++) { const ph = ((t * 0.9 + rnd(i) * 3) % 1), px = x + (rnd(i + 9) - 0.5) * spread * ph * 2, py = y - ph * rise;
      circle(px, py, 14 + ph * 34, `rgba(255,255,255,${(1 - ph) * a * 0.5})`); }
  };
  // cutaway cooker. local origin = bottom centre.
  const cooker = (o) => {
    const { cx = 540, s = 1, p = 0, steam = 0, vo = 0, bub = 0, fill = 0.4, t = 0, block = 0, backup = 0, shake = 0 } = o;
    ctx.save(); ctx.translate(cx + shake, 1260); ctx.scale(s, s);
    ell0(); function ell0() {}
    rr(-300, -560, 600, 560, 46); ctx.fillStyle = STEEL; ctx.fill();
    ctx.save(); rr(-300, -560, 600, 560, 46); ctx.clip(); ctx.fillStyle = STEELD; ctx.fillRect(200, -560, 120, 560); ctx.restore();
    rr(-262, -520, 524, 482, 24); ctx.fillStyle = DARK; ctx.fill();
    ctx.save(); rr(-262, -520, 524, 482, 24); ctx.clip();
    const yw = -40 - fill * 440;
    if (fill > 0) { const g = ctx.createLinearGradient(0, yw, 0, -40); g.addColorStop(0, '#f0b04a'); g.addColorStop(1, '#c9772a'); ctx.fillStyle = g; ctx.fillRect(-262, yw, 524, -40 - yw);
      ctx.fillStyle = 'rgba(255,255,255,0.18)'; ctx.fillRect(-262, yw, 524, 8);
      for (let i = 0; i < 14; i++) { if (bub <= 0) break; const ph = ((t * (0.8 + rnd(i) * 0.6) + rnd(i + 3)) % 1), bx = -230 + rnd(i + 7) * 460, by = -40 - ph * (-40 - yw); circle(bx, by, (6 + rnd(i + 11) * 14) * bub, `rgba(255,240,200,${0.55 * (1 - ph * 0.6)})`); } }
    for (let i = 0; i < Math.round(34 * steam); i++) { const ph = ((t * 0.35 + rnd(i + 40)) % 1), px = -230 + rnd(i + 50) * 460, py = lerp(yw - 6, -500, ph); circle(px, py, 16 + rnd(i) * 22, `rgba(255,255,255,${0.22 * steam * (1 - Math.abs(ph - 0.5) * 1.4)})`); }
    if (p > 0.02) { const len = 36 + 70 * p, ww = 10 + 10 * p, a = clamp(p * 2.5);
      arrow(-140, -330, -140 - len, -330, ww, C.red, a); arrow(-140, -230, -140 - len, -230, ww, C.red, a); arrow(140, -330, 140 + len, -330, ww, C.red, a); arrow(140, -230, 140 + len, -230, ww, C.red, a);
      arrow(-120, -430, -120, -430 - len * 0.55, ww, C.red, a); arrow(120, -430, 120, -430 - len * 0.55, ww, C.red, a); }
    ctx.restore();
    rr(-330, -620, 660, 76, 30); ctx.fillStyle = '#b4bdc8'; ctx.fill(); rr(-330, -566, 660, 14, 7); ctx.fillStyle = '#3a3340'; ctx.fill();
    rr(-440, -600, 130, 42, 20); ctx.fillStyle = '#2b2b33'; ctx.fill(); rr(310, -600, 130, 42, 20); ctx.fill();
    // valve
    ctx.fillStyle = '#3a3340'; ctx.fillRect(-26, -664, 52, 48);
    if (block > 0) circle(0, -668, 30 * block, '#c9772a');
    rr(-46, -742 - 40 * vo, 92, 80, 16); ctx.fillStyle = '#2b2b33'; ctx.fill(); ctx.fillStyle = C.gold; ctx.fillRect(-46, -716 - 40 * vo, 92, 12);
    if (vo > 0.05) puffs(0, -760 - 40 * vo, t, 9, 70 * vo, 280, 0.9 * vo);
    // backup plug
    const bu = backup; circle(190, -640 - 70 * bu, 24, C.red); ctx.fillStyle = '#7a1f1a'; ctx.fillRect(176, -640 - 70 * bu + 14, 28, 22);
    if (bu > 0.05) puffs(190, -690 - 70 * bu, t, 8, 60 * bu, 260, 0.9 * bu);
    ctx.restore();
  };
  const padlock = (x, y, s, open = 0, a = 1) => {
    ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s); ctx.lineWidth = 22; ctx.strokeStyle = '#d9dde3'; ctx.lineCap = 'round';
    ctx.beginPath(); ctx.arc(0, -60 - 38 * open, 52, Math.PI, TAU); ctx.lineTo(52, -60 - 38 * open + (open ? 14 : 60)); ctx.stroke();
    rr(-80, -62, 160, 120, 22); ctx.fillStyle = C.gold; ctx.fill(); circle(0, -10, 14, DARK); ctx.restore();
  };
  const dial = (x, y, r, v, limit = 0.75) => {
    ctx.save(); ctx.translate(x, y); const a0 = Math.PI * 0.8, a1 = Math.PI * 2.2;
    circle(0, 0, r + 22, '#1b1410'); circle(0, 0, r + 10, '#d9dde3'); circle(0, 0, r, '#2b2230');
    ctx.lineWidth = 26; ctx.lineCap = 'butt';
    ctx.strokeStyle = '#2F8F8B'; ctx.beginPath(); ctx.arc(0, 0, r - 30, a0, lerp(a0, a1, limit)); ctx.stroke();
    ctx.strokeStyle = C.red; ctx.beginPath(); ctx.arc(0, 0, r - 30, lerp(a0, a1, limit), a1); ctx.stroke();
    const an = lerp(a0, a1, clamp(v)); ctx.strokeStyle = C.cream; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(an) * (r - 50), Math.sin(an) * (r - 50)); ctx.stroke();
    circle(0, 0, 20, C.gold); ctx.restore();
  };
  const thermo = (x, y, h, v, max = 130) => {
    ctx.save(); ctx.translate(x, y); rr(-26, -h, 52, h, 26); ctx.fillStyle = '#e9edf2'; ctx.fill(); circle(0, 0, 50, '#e9edf2');
    circle(0, 0, 36, C.red); const hh = (h - 20) * clamp(v / max); rr(-12, -hh, 24, hh, 12); ctx.fillStyle = C.red; ctx.fill(); ctx.restore();
  };
  const tick = (x, y, s, a) => { if (a <= 0) return; ctx.save(); ctx.globalAlpha = a; ctx.translate(x, y); ctx.scale(s, s); ctx.strokeStyle = '#46d37a'; ctx.lineWidth = 34; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(-60, 0); ctx.lineTo(-15, 50); ctx.lineTo(70, -50); ctx.stroke(); ctx.restore(); };
  const cross = (x, y, s, a) => { ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = C.red; ctx.lineWidth = 30; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - s, y - s); ctx.lineTo(x + s, y + s); ctx.moveTo(x + s, y - s); ctx.lineTo(x - s, y + s); ctx.stroke(); ctx.restore(); };

  // 0 hook
  { const st = cut(0);
    add({ id: 'S01', at: st, cam: [540, 900], zoom: 0.1, note: 'cooker shaking, 120C pill, BOOM?',
      draw(lt, d, t) { kitchen(t); const sh = Math.sin(lt * 40) * 6 * eo(seg(lt, 1.5, 3));
        cooker({ cx: 540, s: 1, p: 0.4 + 0.5 * eo(seg(lt, 1.2, 4.5)), steam: 0.8, bub: 1, fill: 0.4, t: lt, shake: sh });
        K.pill('120°C', 540, 330, 120, C.red, C.cream, pop(lt, 0.5));
        label('BOOM?', 540, 480, 150, C.gold, eo(seg(lt, 3.6, 3.9)), 0.8 + 0.2 * eob(seg(lt, 3.6, 3.95))); } });
    cue(st, 'whoosh'); cue(st + 0.5, 'pop', { gain: 0.6 }); cue(st + 1.0, 'sizzle', { dur: 2.5, gain: 0.4 }); cue(st + 3.6, 'slam', { gain: 0.7 }); }
  // 1 sealed, pressure builds
  { const st = cut(1);
    add({ id: 'S02', at: st, cam: [540, 900], zoom: 0.1, note: 'lid sealed, steam piles up, pressure arrows grow',
      draw(lt, d, t) { kitchen(t); const p = 0.15 + 0.5 * eo(seg(lt, 0.4, 4));
        cooker({ cx: 540, s: 1, p, steam: 0.3 + 0.7 * eo(seg(lt, 0.2, 3)), bub: 1, fill: 0.4, t: lt });
        padlock(540, 440, 0.9, 0, pop(lt, 0.3)); K.pill('PRESSURE ↑', 540, 300, 80, C.red, C.cream, pop(lt, 1.6)); } });
    cue(st, 'whoosh'); cue(st + 0.3, 'tock', { gain: 0.6 }); cue(st + 1.6, 'pop', { gain: 0.5 }); }
  // 2 hotter, faster
  { const st = cut(2);
    add({ id: 'S03', at: st, cam: [540, 900], zoom: 0.1, note: 'thermometer 100 to 120, dal cooks faster',
      draw(lt, d, t) { kitchen(t); const v = lerp(100, 120, eo(seg(lt, 0.6, 3.2)));
        cooker({ cx: 410, s: 0.85, p: 0.6, steam: 0.9, bub: 1.3, fill: 0.4, t: lt * 1.6 }); thermo(920, 1250, 640, v, 130);
        label(Math.round(v) + '°C', 880, 480, 100, C.gold, eo(seg(lt, 0.2, 0.5)));
        K.pill('HOTTER = FASTER', 440, 330, 72, C.teal, C.cream, pop(lt, 2.6)); } });
    cue(st, 'whoosh'); cue(st + 0.6, 'bubbles', { dur: 2.6, gain: 0.4 }); cue(st + 2.6, 'pop', { gain: 0.5 }); }
  // 3 about 1 bar
  { const st = cut(3);
    add({ id: 'S04', at: st, cam: [540, 800], zoom: 0.1, note: 'dial rises to about 1 bar over outside air',
      draw(lt, d, t) { kitchen(t); const v = 0.7 * eo(seg(lt, 0.3, 2.6));
        dial(540, 650, 290, v, 0.8); label('0', 270, 930, 56, C.cream, 1); label('1', 540, 400, 0, C.cream, 0);
        label('BAR', 540, 760, 70, C.cream, eo(seg(lt, 0.4, 0.8)));
        K.pill('≈ 1 BAR MORE', 540, 1080, 96, C.red, C.cream, pop(lt, 2.0));
        K.pill('THAN OUTSIDE AIR', 540, 1230, 64, C.teal, C.cream, pop(lt, 2.5)); } });
    cue(st, 'whoosh'); cue(st + 2.0, 'slam', { gain: 0.6 }); }
  // 4 valve opens
  { const st = cut(4);
    add({ id: 'S05', at: st, cam: [540, 900], zoom: 0.1, note: 'pressure reaches limit, valve lifts, steam escapes',
      draw(lt, d, t) { kitchen(t); const up = eo(seg(lt, 0.2, 2.4)), vo = eo(seg(lt, 2.6, 3.0)) * (1 - 0.3 * Math.abs(Math.sin(lt * 14)) * seg(lt, 3, 6));
        cooker({ cx: 540, s: 1, p: 0.85 * up, steam: 1, bub: 1, fill: 0.4, t: lt, vo });
        K.pill('VALVE', 270, 460, 70, C.gold, '#222', pop(lt, 0.3)); arrow(330, 520, 480, 560, 12, C.gold, pop(lt, 0.4));
        K.pill('OPENS AT THE LIMIT', 540, 330, 66, C.teal, C.cream, pop(lt, 3.0)); } });
    cue(st, 'whoosh'); cue(st + 2.7, 'sizzle', { dur: 2.2, gain: 0.7 }); cue(st + 2.7, 'pop', { gain: 0.6 }); }
  // 5 back under control
  { const st = cut(5);
    add({ id: 'S06', at: st, cam: [540, 900], zoom: 0.08, note: 'pressure drops, tick',
      draw(lt, d, t) { kitchen(t); const v = lerp(0.8, 0.55, eo(seg(lt, 0.2, 1.8)));
        dial(540, 600, 250, v, 0.8); cooker({ cx: 540, s: 0.62, p: 0.3, steam: 0.6, bub: 1, fill: 0.4, t: lt, vo: 0.5 * (1 - seg(lt, 0.8, 1.8)) });
        tick(540, 1000 - 0, 1.2 * pop(lt, 1.6), 1); } });
    cue(st, 'whoosh'); cue(st + 1.6, 'sparkle', { dur: 0.6, gain: 0.5 }); }
  // 6 blocked, backup
  { const st = cut(6);
    add({ id: 'S07', at: st, cam: [540, 900], zoom: 0.1, note: 'food blocks valve, backup valve pops',
      draw(lt, d, t) { kitchen(t); const bl = pop(lt, 0.3), bu = eo(seg(lt, 2.4, 2.8));
        cooker({ cx: 540, s: 1, p: 0.5 + 0.4 * eo(seg(lt, 0.3, 2.4)), steam: 1, bub: 1, fill: 0.4, t: lt, block: bl, backup: bu });
        cross(540, 560, 60, eo(seg(lt, 0.8, 1.1))); K.pill('BACKUP VALVE', 540, 330, 80, C.red, C.cream, pop(lt, 2.4)); } });
    cue(st, 'whoosh'); cue(st + 0.9, 'slam', { gain: 0.6 }); cue(st + 2.4, 'pop', { gain: 0.7 }); cue(st + 2.45, 'sizzle', { dur: 1.8, gain: 0.6 }); }
  // 7 fill limit
  { const st = cut(7);
    add({ id: 'S08', at: st, cam: [540, 900], zoom: 0.08, note: 'fill level rises to two-thirds line',
      draw(lt, d, t) { kitchen(t); const f = lerp(0.15, 0.66, eo(seg(lt, 0.2, 1.8)));
        cooker({ cx: 540, s: 1, p: 0, steam: 0, bub: 0, fill: f, t: lt });
        ctx.save(); ctx.translate(540, 1260); ctx.strokeStyle = C.gold; ctx.lineWidth = 8; ctx.setLineDash([26, 16]); ctx.beginPath(); ctx.moveTo(-262, -40 - 0.66 * 440); ctx.lineTo(262, -40 - 0.66 * 440); ctx.stroke(); ctx.restore();
        K.pill('MAX ⅔ FULL', 540, 330, 96, C.gold, '#222', pop(lt, 1.6)); } });
    cue(st, 'whoosh'); cue(st + 0.3, 'plop', { gain: 0.5 }); cue(st + 1.6, 'pop', { gain: 0.6 }); }
  // 8 lid lock
  { const st = cut(8);
    add({ id: 'S09', at: st, cam: [540, 900], zoom: 0.08, note: 'padlock on lid, opens when pressure drops',
      draw(lt, d, t) { kitchen(t); const v = lerp(0.8, 0.0, eo(seg(lt, 1.8, 3.4))), op = eo(seg(lt, 3.4, 3.8));
        dial(540, 560, 230, v, 0.8); cooker({ cx: 540, s: 0.55, p: v * 0.8, steam: v, bub: 1, fill: 0.4, t: lt });
        padlock(540, 1060, 0.9, op, 1);
        K.pill(op > 0.5 ? 'SAFE TO OPEN' : 'LID LOCKED', 540, 1220, 66, op > 0.5 ? C.teal : C.red, C.cream, 1); } });
    cue(st, 'whoosh'); cue(st + 3.4, 'tock', { gain: 0.7 }); }
  // 9 A or B
  { const st = cut(9);
    add({ id: 'S10', at: st, cam: [540, 900], zoom: 0.08, note: 'A strong lid vs B steam valve',
      draw(lt, d, t) { kitchen(t); const a = pop(lt, 0.3), b = pop(lt, 0.9);
        ctx.save(); ctx.translate(290, 800); ctx.scale(a, a); rr(-230, -300, 460, 600, 40); ctx.fillStyle = 'rgba(27,20,16,0.7)'; ctx.fill(); rr(-150, -60, 300, 70, 28); ctx.fillStyle = '#b4bdc8'; ctx.fill(); rr(-230, -10, 0, 0, 0); ctx.restore();
        ctx.save(); ctx.translate(790, 800); ctx.scale(b, b); rr(-230, -300, 460, 600, 40); ctx.fillStyle = 'rgba(27,20,16,0.7)'; ctx.fill(); rr(-46, -40, 92, 80, 16); ctx.fillStyle = '#2b2b33'; ctx.fill(); ctx.fillStyle = C.gold; ctx.fillRect(-46, -14, 92, 12); ctx.restore();
        puffs(790, 760 - 10, lt, 8, 70, 220, 0.8 * b);
        K.pill('A', 290, 560, 120, C.gold, '#222', a); K.pill('STRONG LID', 290, 1040, 58, C.teal, C.cream, a);
        K.pill('B', 790, 560, 120, C.gold, '#222', b); K.pill('STEAM VALVE', 790, 1040, 58, C.red, C.cream, b);
        K.pill('COMMENT A OR B 👇', 540, 1290, 66, C.cream, '#222', pop(lt, 2.8)); } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop', { gain: 0.5 }); cue(st + 0.9, 'pop', { gain: 0.5 }); cue(st + 2.8, 'pop', { gain: 0.6 }); }
  return { shots: S, cues: CUES };
}
