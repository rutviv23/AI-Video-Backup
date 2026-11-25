// HOW A ROCKET FLIES WITH NO AIR (Hindi audio, English captions): bright colourful shot list.
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
  const RED = '#ff3b57', YEL = '#ffd23f', ORG = '#ff8a1f', TEAL = '#12c2b3', BLUE = '#2f7bff', GRN = '#35d07f', PINK = '#ff6bd6';

  const rr = (x, y, w, h, r, fill) => { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); ctx.fillStyle = fill; ctx.fill(); };
  const circ = (x, y, r, fill) => { ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fillStyle = fill; ctx.fill(); };
  const lin = (c0, c1, y0 = 0, y1 = H) => { const g = ctx.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, c0); g.addColorStop(1, c1); ctx.fillStyle = g; ctx.fillRect(0, y0, W, y1 - y0); };
  const label = (txt, y, size, col, a, sc = 1) => { if (a <= 0) return; ctx.save(); ctx.globalAlpha = clamp(a); ctx.translate(540, y); ctx.scale(sc, sc); bigText(txt, 0, 0, size, col); ctx.restore(); };
  const shade = () => { const g = ctx.createLinearGradient(0, 1380, 0, H); g.addColorStop(0, 'rgba(25,10,70,0)'); g.addColorStop(0.35, 'rgba(25,10,70,0.55)'); g.addColorStop(1, 'rgba(25,10,70,0.8)'); ctx.fillStyle = g; ctx.fillRect(0, 1380, W, H - 1380); };
  const cloud = (x, y, s) => { ctx.fillStyle = 'rgba(255,255,255,.95)'; [[0, 0, 60], [55, -22, 70], [120, 0, 58], [60, 18, 62]].forEach(([dx, dy, r]) => circ(x + dx * s, y + dy * s, r * s, 'rgba(255,255,255,.95)')); };
  const sky = (t) => { lin('#2aa8ff', '#c9f1ff', 0, 1400); circ(880, 260, 110, YEL); circ(880, 260, 150, 'rgba(255,210,63,.25)');
    cloud(((t * 18) % 1500) - 250, 420, 1.2); cloud(((t * 11 + 700) % 1500) - 250, 760, 0.9); cloud(((t * 14 + 300) % 1500) - 250, 1040, 1.1);
    ctx.fillStyle = '#4ddb7c'; ctx.beginPath(); ctx.ellipse(300, 1500, 900, 240, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#2fbf67'; ctx.beginPath(); ctx.ellipse(900, 1560, 800, 220, 0, 0, TAU); ctx.fill(); };
  const space = (t) => { lin('#5b2bb5', '#1f2a8a', 0, H); for (let i = 0; i < 60; i++) { const a = 0.5 + 0.5 * Math.sin(t * 2.4 + i * 1.7); circ(hash(i) * W, hash(i + 40) * 1500, 3 + hash(i + 9) * 5, `rgba(${i % 3 ? '255,255,255' : '255,214,90'},${0.4 + 0.6 * a})`); }
    circ(170, 250, 90, ORG); circ(140, 225, 90, 'rgba(255,200,90,.35)'); ctx.save(); ctx.strokeStyle = PINK; ctx.lineWidth = 12; ctx.beginPath(); ctx.ellipse(170, 255, 150, 34, -0.35, 0, TAU); ctx.stroke(); ctx.restore();
    circ(930, 620, 60, TEAL); circ(915, 605, 22, 'rgba(255,255,255,.35)'); };
  const stars = (k) => { }; // placeholder
  // rocket: origin = centre of body, pointing up; s scale; flame 0..1
  const rocket = (x, y, s, flame = 1, t = 0, rot = 0) => { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
    if (flame > 0) { const f = flame * (1 + 0.15 * Math.sin(t * 30)); [[ORG, 150], [YEL, 105], ['#fff6c8', 62]].forEach(([c, hh], i) => { ctx.fillStyle = c; ctx.beginPath(); ctx.moveTo(-34 + i * 6, 150); ctx.quadraticCurveTo(0, 150 + hh * 2 * f, 34 - i * 6, 150); ctx.fill(); }); }
    ctx.fillStyle = RED; ctx.beginPath(); ctx.moveTo(-70, 60); ctx.lineTo(-130, 170); ctx.lineTo(-45, 140); ctx.fill(); ctx.beginPath(); ctx.moveTo(70, 60); ctx.lineTo(130, 170); ctx.lineTo(45, 140); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.moveTo(0, -200); ctx.quadraticCurveTo(95, -80, 70, 150); ctx.lineTo(-70, 150); ctx.quadraticCurveTo(-95, -80, 0, -200); ctx.fill();
    ctx.fillStyle = RED; ctx.beginPath(); ctx.moveTo(0, -200); ctx.quadraticCurveTo(52, -140, 62, -95); ctx.lineTo(-62, -95); ctx.quadraticCurveTo(-52, -140, 0, -200); ctx.fill();
    circ(0, -20, 38, BLUE); circ(0, -20, 28, '#9fd3ff'); circ(-9, -30, 8, '#fff'); rr(-70, 90, 140, 22, 8, YEL); ctx.restore(); };
  const arrow = (x1, y1, x2, y2, col, w = 16, p = 1, a = 1) => { if (p <= 0 || a <= 0) return; const x = lerp(x1, x2, p), y = lerp(y1, y2, p), ang = Math.atan2(y2 - y1, x2 - x1);
    ctx.save(); ctx.globalAlpha = clamp(a); ctx.strokeStyle = col; ctx.fillStyle = col; ctx.lineWidth = w; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x - Math.cos(ang) * w, y - Math.sin(ang) * w); ctx.stroke();
    ctx.translate(x, y); ctx.rotate(ang); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-w * 2.4, -w * 1.5); ctx.lineTo(-w * 2.4, w * 1.5); ctx.closePath(); ctx.fill(); ctx.restore(); };
  const gasDots = (x, y, t, n, a = 1, spread = 60, len = 420, col = YEL) => { for (let i = 0; i < n; i++) { const k = (t * 0.9 + i / n) % 1; ctx.save(); ctx.globalAlpha = clamp(a) * (1 - k); circ(x + (hash(i) - 0.5) * spread * (0.4 + k), y + k * len, 10 + 8 * (1 - k), i % 2 ? col : ORG); ctx.restore(); } };
  const bob = (t, a = 10, f = 3) => Math.sin(t * f) * a;
  const pill = (txt, x, y, size, bg, fg, sc) => K.pill(txt, x, y, size, bg, fg, sc);

  // 0 hook: rocket on a bright sky, question
  { const st = cut(0);
    add({ id: 'S01', at: st, cam: [540, 760], zoom: 0.12, note: 'rocket launching in bright sky, NO AIR IN SPACE?',
      draw(lt, d, t) { sky(t); const up = eio(seg(lt, 0.2, 4.6)); rocket(540, lerp(1050, 720, up), 1.25, 1, t); gasDots(540, lerp(1050, 720, up) + 190, t, 14, 1, 80, 380);
        pill('NO AIR IN SPACE', 540, 170, 78, RED, '#fff', pop(lt, 0.15)); pill('SO WHAT DOES IT PUSH ON?', 540, 310, 56, YEL, '#222', pop(lt, 1.2));
        label('?', 560, 300 * (1 + 0.06 * Math.sin(t * 5)), 'rgba(255,255,255,0.6)', eo(seg(lt, 2.4, 2.9))); shade(); } });
    cue(st, 'whoosh'); cue(st + 0.15, 'pop', { gain: 0.5 }); cue(st + 1.2, 'pop', { gain: 0.5 }); }

  // 1 myth: pushes the ground/air? red X
  { const st = cut(1);
    add({ id: 'S02', at: st, cam: [540, 800], zoom: 0.1, note: 'myth: rocket pushes ground and air, crossed out',
      draw(lt, d, t) { sky(t); rocket(540, 760, 1.15, 1, t); gasDots(540, 960, t, 12, 1, 70, 300);
        arrow(540, 1130, 540, 1300, RED, 16, eo(seg(lt, 0.4, 0.9))); arrow(380, 1100, 300, 1280, RED, 14, eo(seg(lt, 0.5, 1.0))); arrow(700, 1100, 780, 1280, RED, 14, eo(seg(lt, 0.6, 1.1)));
        pill('PUSHING AIR / GROUND?', 540, 250, 60, BLUE, '#fff', pop(lt, 0.2)); K.redX(540, 1210, 0.8, eo(seg(lt, 2.0, 2.4))); pill('MYTH!', 800, 560, 84, RED, '#fff', pop(lt, 2.6)); shade(); } });
    cue(st, 'whoosh'); cue(st + 2.0, 'slam', { gain: 0.7 }); }

  // 2 burns fuel, throws hot gas back
  { const st = cut(2);
    add({ id: 'S03', at: st, cam: [540, 800], zoom: 0.1, note: 'rocket cutaway: fuel burns, hot gas shoots out the back',
      draw(lt, d, t) { space(t); const y = 700 + bob(t); rocket(540, y, 1.3, 1, t); const a = eo(seg(lt, 0.8, 1.2)); gasDots(540, y + 215, t, 18, a, 90, 470);
        // fuel tank glow inside
        ctx.save(); ctx.globalAlpha = 0.35 + 0.15 * Math.sin(t * 6); circ(540, y + 70, 70, ORG); ctx.restore();
        pill('BURNS FUEL', 270, 280, 62, ORG, '#fff', pop(lt, 0.2)); pill('HOT GAS OUT THE BACK', 540, 1260, 56, RED, '#fff', pop(lt, 1.6)); shade(); } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + 1.6, 'pop', { gain: 0.5 }); }

  // 3 newton's 3rd law: action / reaction pair
  { const st = cut(3);
    add({ id: 'S04', at: st, cam: [540, 800], zoom: 0.1, note: 'Newton third law: ACTION arrow vs REACTION arrow',
      draw(lt, d, t) { lin('#ff9a3c', '#ff4f8b', 0, H); circ(540, 700, 340, 'rgba(255,255,255,.18)');
        pill("NEWTON'S 3RD LAW", 540, 210, 72, '#fff', '#c2185b', pop(lt, 0.15));
        const a1 = eo(seg(lt, 0.8, 1.5)), a2 = eo(seg(lt, 2.0, 2.7));
        arrow(740, 560, 340, 560, YEL, 26, a1); label('ACTION', 480, 70, '#fff', a1);
        arrow(340, 860, 740, 860, '#1ee3cf', 26, a2); label('REACTION', 980, 70, '#fff', a2);
        label('equal and opposite', 1200, 54, '#fff', eo(seg(lt, 3.2, 3.7))); shade(); } });
    cue(st, 'whoosh'); cue(st + 0.9, 'pop', { gain: 0.6 }); cue(st + 2.1, 'pop', { gain: 0.6 }); }

  // 4 rocket pushes gas back, gas pushes rocket forward
  { const st = cut(4);
    add({ id: 'S05', at: st, cam: [540, 800], zoom: 0.1, note: 'gas back arrow, rocket forward arrow',
      draw(lt, d, t) { space(t); const y = 640 + bob(t, 8); rocket(540, y, 1.2, 1, t); gasDots(540, y + 200, t, 16, 1, 80, 440);
        const a1 = eo(seg(lt, 0.6, 1.2)), a2 = eo(seg(lt, 2.2, 2.9));
        arrow(850, 1000, 850, 1200, YEL, 20, a1); label('', 0, 1, '#fff', 0); pill('ROCKET PUSHES GAS BACK', 540, 1290, 50, ORG, '#fff', pop(lt, 0.6));
        arrow(230, 700, 230, 420, '#1ee3cf', 20, a2); pill('GAS PUSHES ROCKET FORWARD', 540, 230, 50, TEAL, '#fff', pop(lt, 2.2)); shade(); } });
    cue(st, 'whoosh'); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + 2.2, 'pop', { gain: 0.5 }); }

  // 5 no air needed: empty space, rocket still moves
  { const st = cut(5);
    add({ id: 'S06', at: st, cam: [540, 800], zoom: 0.1, note: 'rocket flies through empty starry space, NO AIR NEEDED',
      draw(lt, d, t) { space(t); const x = lerp(250, 790, eio(seg(lt, 0.2, 3.8))); rocket(x, 700 + bob(t, 12), 0.95, 1, t, 0.9);
        gasDots(x - 150, 520, t, 14, 1, 60, 300); pill('NO AIR NEEDED', 540, 220, 80, GRN, '#06402a', pop(lt, 0.2));
        pill('ITS OWN GAS IS ENOUGH', 540, 1260, 54, YEL, '#222', pop(lt, 1.8)); shade(); } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + 1.8, 'sparkle', { dur: 1 }); }

  // 6 balloon
  { const st = cut(6);
    add({ id: 'S07', at: st, cam: [540, 800], zoom: 0.1, note: 'balloon releases air backwards, shoots forward',
      draw(lt, d, t) { lin('#ffe066', '#ff9ecd', 0, H); const p = eio(seg(lt, 0.8, 3.4)); const x = lerp(260, 760, p), y = 700 - 60 * p;
        ctx.save(); ctx.translate(x, y); ctx.rotate(-0.15); ctx.fillStyle = RED; ctx.beginPath(); ctx.ellipse(0, 0, 130, 170, 0, 0, TAU); ctx.fill(); ctx.fillStyle = 'rgba(255,255,255,.4)'; ctx.beginPath(); ctx.ellipse(-45, -60, 28, 50, 0.4, 0, TAU); ctx.fill();
        ctx.fillStyle = '#c0102f'; ctx.beginPath(); ctx.moveTo(-10, 170); ctx.lineTo(-26, 205); ctx.lineTo(26, 205); ctx.lineTo(10, 170); ctx.fill(); ctx.restore();
        if (lt > 0.8) for (let i = 0; i < 10; i++) { const k = ((lt - 0.8) * 1.3 + i / 10) % 1; ctx.save(); ctx.globalAlpha = 1 - k; circ(x - 20 - k * 360, y + 190 + (hash(i) - 0.5) * 60 + k * 20, 16 * (1 - k * 0.5), '#fff'); ctx.restore(); }
        pill('AIR GOES BACK', 300, 1260, 54, BLUE, '#fff', pop(lt, 1.0)); pill('BALLOON SHOOTS FORWARD', 540, 220, 58, RED, '#fff', pop(lt, 0.2)); shade(); } });
    cue(st, 'whoosh'); cue(st + 0.8, 'zip', { gain: 0.6 }); }

  // 7 jet needs air, rocket carries everything
  { const st = cut(7);
    add({ id: 'S08', at: st, cam: [540, 760], zoom: 0.08, note: 'jet engine breathes air, X in space; rocket carries tanks',
      draw(lt, d, t) { lin('#41d6c3', '#2f7bff', 0, H);
        // left: jet plane silhouette
        ctx.save(); ctx.translate(290, 640); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.ellipse(0, 0, 200, 46, 0, 0, TAU); ctx.fill(); ctx.fillStyle = '#dfe9f5'; ctx.beginPath(); ctx.moveTo(-40, 0); ctx.lineTo(-140, -150); ctx.lineTo(-70, -150); ctx.lineTo(40, 0); ctx.fill(); ctx.beginPath(); ctx.moveTo(-40, 0); ctx.lineTo(-140, 150); ctx.lineTo(-70, 150); ctx.lineTo(40, 0); ctx.fill(); ctx.restore();
        for (let i = 0; i < 5; i++) { const k = (t * 0.8 + i / 5) % 1; ctx.save(); ctx.globalAlpha = 1 - k; arrow(60 + k * 50, 540 + i * 50 - 40, 130 + k * 50, 640, '#fff', 6, 1, 1 - k); ctx.restore(); }
        pill('JET: NEEDS AIR', 290, 330, 50, BLUE, '#fff', pop(lt, 0.2)); K.redX(290, 860, 0.55, eo(seg(lt, 1.4, 1.8)));
        // right: rocket with tank labels
        rocket(790, 720 + bob(t, 8), 0.8, 1, t); pill('ROCKET: CARRIES', 790, 330, 46, RED, '#fff', pop(lt, 0.8)); pill('EVERYTHING', 790, 1060, 52, GRN, '#06402a', pop(lt, 2.0)); shade(); } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + 0.8, 'pop', { gain: 0.5 }); cue(st + 1.4, 'slam', { gain: 0.5 }); }

  // 8 works in space
  { const st = cut(8);
    add({ id: 'S09', at: st, cam: [540, 780], zoom: 0.1, note: 'rocket in space with Earth below, no air label',
      draw(lt, d, t) { space(t); circ(540, 1650, 800, '#2f7bff'); circ(540, 1650, 770, '#35d07f'); circ(400, 1250, 130, 'rgba(255,255,255,.5)'); ctx.save(); ctx.globalAlpha = 0.25; circ(540, 1650, 840, '#9fd3ff'); ctx.restore();
        const y = lerp(1000, 520, eio(seg(lt, 0.2, 3.6))); rocket(540, y, 1.0, 1, t); gasDots(540, y + 160, t, 14, 1, 70, 360);
        pill('WORKS IN SPACE', 540, 210, 78, ORG, '#fff', pop(lt, 0.15)); pill('ZERO AIR', 540, 340, 64, '#fff', '#c2185b', pop(lt, 1.2)); shade(); } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + 1.2, 'pop', { gain: 0.5 }); }

  // 9 question
  { const st = cut(9);
    add({ id: 'S10', at: st, cam: [540, 800], zoom: 0.1, note: 'AIR or GROUND choice with rocket',
      draw(lt, d, t) { sky(t); rocket(540, 760 + bob(t, 8), 1.0, 1, t); gasDots(540, 925, t, 12, 1, 70, 300);
        pill('A: AIR', 250, 330, 68, BLUE, '#fff', pop(lt, 0.3)); pill('B: GROUND', 800, 330, 68, GRN, '#06402a', pop(lt, 0.9));
        pill('WHAT DID YOU THINK?', 540, 190, 64, RED, '#fff', pop(lt, 0.05)); shade(); } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop', { gain: 0.5 }); cue(st + 0.9, 'pop', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
