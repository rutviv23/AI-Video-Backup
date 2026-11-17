// THE MAN WHO SOLD THE EIFFEL TOWER: the shot list (the only file that changes per video, with script.json).
// A shot: { id, at, cam: [cx, cy], zoom, note, draw(lt, d, t) } · lt = time in shot, d = shot length, t = film time.
// It runs until the next shot's `at`; the last one ends at T.dur. Cut = L(i) - 0.08 (picture changes just before the line).
// Sound: cue(t, type, { gain, dur }): whoosh slide pop plop gulp boing bubbles sizzle sparkle thud slam tock zip alarm.
import { ctx, C, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, bigText } from './core/lib.js';
import { L, Le, Wd, T } from './core/timing.js';
import * as K from './core/kit.js';

export function buildShots() {
  const S = [], CUES = [];
  const add = (o) => (S.push(o), o);
  const cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cut = (i) => (i === 0 ? 0 : L(i) - 0.08);
  const pop = (lt, t0, dur = 0.26) => eob(seg(lt, t0, t0 + dur));
  // the two leads: same look all video
  const CON = { coat: C.teal, coatShade: C.tealShade, hat: 'bowler', hatCol: C.hat, stache: true, scarf: C.scarf };
  const DEALER = { coat: C.brown, coatShade: C.brownShade, hat: 'flat', hatCol: '#4A3A2E', belly: true, pants: C.trousersShade };
  const blink = (t) => (Math.sin(t * 2.3) > 0.985 || (t % 3.1) < 0.12 ? 'closed' : 'n');

  // ── 1 · HOOK: dusk Paris, the con man tips his hat ──────────────────────
  {
    const st = cut(0), wSold = Wd('sold', 0) - st;
    add({ id: 'S01', at: st, cam: [540, 900], zoom: 0.08, note: 'dusk Paris, tower, con man tips hat, sparkle on "sold"',
      draw(lt, d, t) {
        K.dusk(t); K.tower(740, 1480, 1.0, C.iron);
        K.person({ ...CON, x: 330, y: 1560, s: 1.3, arm: K.poseMix(K.POSE.down, K.POSE.tip, eo(seg(lt, 0.2, 0.7))), mouth: lt > wSold ? 'grin' : 'smirk', eyes: blink(t), brow: 0.3, bob: Math.sin(t * 3) * 3 });
        K.sparkle(760, 520, lt > wSold ? eob(seg(lt, wSold, wSold + 0.3)) * 1.2 : 0, lt * 2, 1);
      } });
    cue(st + 0.35, 'pop', { gain: 0.5 }); cue(st + wSold, 'sparkle', { dur: 0.7 });
  }

  // ── 2 · "the whole thing": tower close, SOLD stamp ──────────────────────
  {
    const st = cut(1), wWhole = Wd('whole', 1) - st;
    add({ id: 'S02', at: st, cam: [540, 800], zoom: 0.14, note: 'tower fills the frame, SOLD stamp slams on "whole"',
      draw(lt, d, t) {
        K.dusk(t); K.glow(540, 900, 600, C.amber, 0.3); K.tower(540, 1700, 1.45, C.iron);
        const a = lt > wWhole ? 1 : 0, sc = lt > wWhole ? lerp(2.2, 1, eo(seg(lt, wWhole, wWhole + 0.18))) : 2;
        K.stamp('SOLD', 540, 760, sc, -0.14, a);
      } });
    cue(st, 'whoosh'); cue(st + wWhole + 0.05, 'slam', { gain: 0.9 });
  }

  // ── 3 · the newspaper: rusting ──────────────────────────────────────────
  {
    const st = cut(2), wRust = Wd('rusting', 2) - st;
    add({ id: 'S03', at: st, cam: [540, 780], zoom: 0.1, note: 'newspaper slides in, RUST headline pops on "rusting"',
      draw(lt, d, t) {
        K.study(t);
        const p = eo(seg(lt, 0, 0.45));
        K.newspaper(540, lerp(2200, 760, p), 1.12, lerp(0.5, -0.05, p), 'RUST!', 'TOWER IN TROUBLE');
        if (lt > wRust) { ctx.save(); ctx.translate(540, 910); ctx.scale(0.14, 0.14); K.tower(0, 400, 1.0, C.iron, clamp((lt - wRust) * 1.2)); ctx.restore(); }
      } });
    cue(st, 'whoosh'); cue(st + 0.1, 'slide', { dur: 0.4, gain: 0.5 }); cue(st + wRust, 'pop', { gain: 0.5 });
  }

  // ── 4 · a fortune to fix it: rusty tower, coins pour out ────────────────
  {
    const st = cut(3), wFor = Wd('fortune', 3) - st;
    add({ id: 'S04', at: st, cam: [540, 900], zoom: 0.1, note: 'rust spreads over the tower, coins rain down on "fortune"',
      draw(lt, d, t) {
        K.dusk(t); K.tower(540, 1560, 1.1, C.iron, clamp(lt * 0.8));
        for (let i = 0; i < 26; i++) { const t0 = wFor + rnd(i) * 0.9, p = seg(lt, t0, t0 + 0.9 + rnd(i + 5) * 0.4); if (p <= 0) continue; K.coin(160 + rnd(i + 3) * 760, lerp(-80, 1500, p * p), 34 + rnd(i + 9) * 18, p * 12 + i); }
        ctx.save(); ctx.globalAlpha = lt > wFor ? clamp((lt - wFor) * 3) : 0; for (let i = 0; i < 9; i++) K.coin(250 + i * 70, 1500 - (i % 3) * 20, 40, 0.2 * i); ctx.restore();
      } });
    cue(st, 'whoosh'); for (let i = 0; i < 6; i++) cue(st + wFor + 0.2 + i * 0.28, 'plop', { gain: 0.35 });
  }

  // ── 5 · forged letters fly out ──────────────────────────────────────────
  {
    const st = cut(4), wForged = Wd('forged', 4) - st, wScrap = Wd('scrap', 4) - st, wGov = Wd('government', 4) - st;
    add({ id: 'S05', at: st, cam: [440, 900], zoom: 0.08, note: 'con man writes at his desk, envelopes fly right on "scrap dealers"',
      draw(lt, d, t) {
        K.study(t);
        K.person({ ...CON, x: 400, y: 1560, s: 1.5, arm: K.poseMix(K.POSE.down, K.POSE.write, eo(seg(lt, 0.1, 0.5))), mouth: lt > wGov ? 'grin' : 'smirk', eyes: 'n', brow: 0.2, look: [0.6, 0.9], bob: Math.sin(lt * 8) * 3 });
        ctx.fillStyle = C.wood; ctx.fillRect(-300, 1380, W + 600, 700); ctx.fillStyle = C.woodDark; ctx.fillRect(-300, 1380, W + 600, 14);
        K.envelope(520, 1360, 1, -0.1);
        for (let i = 0; i < 6; i++) { const p = seg(lt, wScrap + i * 0.18, wScrap + i * 0.18 + 0.9); if (p <= 0) continue; K.envelope(lerp(560, 1250, eo(p)), lerp(1250, 600 - i * 60, eo(p)), lerp(0.9, 0.7, p), p * 4 + i); }
        K.pill('FORGED', 540, 420, 70, C.red, C.cream, pop(lt, wForged));
      } });
    cue(st, 'whoosh'); cue(st + wForged, 'pop', { gain: 0.45 }); for (let i = 0; i < 6; i++) cue(st + wScrap + i * 0.18, 'zip', { gain: 0.4 });
  }

  // ── 6 · the hotel meeting ───────────────────────────────────────────────
  {
    const st = cut(5), wPriv = Wd('private', 5) - st;
    add({ id: 'S06', at: st, cam: [540, 900], zoom: 0.08, note: 'two men at a table under the chandelier, PRIVATE pill',
      draw(lt, d, t) {
        K.hotel(t);
        K.person({ ...CON, x: 270, y: 1640, s: 1.3, arm: K.poseMix(K.POSE.down, K.POSE.hold, eo(seg(lt, 0.2, 0.6))), mouth: 'smile', eyes: blink(t), brow: 0.2 });
        K.person({ ...DEALER, x: 810, y: 1640, s: 1.3, flip: true, arm: K.POSE.front, mouth: 'flat', eyes: 'n', brow: 0.5, look: [-0.5, 0] });
        ctx.fillStyle = '#3A2118'; ctx.fillRect(250, 1330, 60, 220); ctx.fillRect(770, 1330, 60, 220); ctx.fillStyle = '#6B4128'; ctx.fillRect(190, 1280, 700, 56); ctx.fillStyle = '#8A5636'; ctx.fillRect(190, 1280, 700, 14);
        K.pill('PRIVATE', 540, 560, 74, C.ink, C.cream, pop(lt, wPriv));
      } });
    cue(st, 'whoosh'); cue(st + wPriv, 'pop', { gain: 0.45 });
  }

  // ── 7 · the suitcase of cash ────────────────────────────────────────────
  {
    const st = cut(6), wNerv = Wd('nervous', 6) - st, wSuit = Wd('suitcase', 6) - st;
    add({ id: 'S07', at: st, cam: [540, 900], zoom: 0.1, note: 'nervous dealer, sweat; suitcase thumps down and flips open on "suitcase"',
      draw(lt, d, t) {
        K.hotel(t);
        K.person({ ...DEALER, x: 540, y: 1700, s: 1.55, mouth: lt > wSuit ? 'o' : 'frown', eyes: 'wide', brow: 1, tilt: -1, sweat: lt > wNerv ? 1 : 0, arm: K.POSE.front, shake: Math.sin(lt * 40) * 2 });
        const p = eo(seg(lt, wSuit - 0.2, wSuit + 0.25)), open = eo(seg(lt, wSuit + 0.2, wSuit + 0.55));
        if (lt > wSuit - 0.25) K.suitcase(540, lerp(900, 1640, p), 1.25, open);
        if (open > 0.6) { K.glow(540, 1620, 380, C.gold, 0.4); K.sparkle(360, 1560, 0.8 * open, lt * 2); K.sparkle(730, 1590, 0.6 * open, -lt * 2); }
      } });
    cue(st, 'whoosh'); cue(st + wSuit + 0.1, 'thud', { gain: 0.8 }); cue(st + wSuit + 0.35, 'sparkle', { dur: 0.6 });
  }

  // ── 8 · the con man vanishes into the night ─────────────────────────────
  {
    const st = cut(7), wVan = Wd('vanished', 7) - st;
    add({ id: 'S08', at: st, cam: [540, 900], zoom: 0.06, note: 'night street, con man hurries away with the case, speed lines',
      draw(lt, d, t) {
        K.night(t);
        const x = lerp(300, 1050, eio(seg(lt, wVan - 0.6, d)));
        K.person({ ...CON, x, y: 1620, s: 1.0, flip: true, walk: lt * 14, arm: { l: [-122, -96], r: [118, -60] }, mouth: 'smirk', eyes: 'n', holdR: (hx, hy) => K.suitcase(hx + 4, hy + 90, 0.35, 0) });
        K.speedLines(x - 150, 1400, clamp((lt - (wVan - 0.6)) * 3), -1);
      } });
    cue(st, 'whoosh'); cue(st + wVan, 'zip', { gain: 0.7 });
  }

  // ── 9 · the embarrassed dealer ──────────────────────────────────────────
  {
    const st = cut(8), wEmb = Wd('embarrassed', 8) - st, wPol = Wd('police', 8) - st;
    add({ id: 'S09', at: st, cam: [540, 900], zoom: 0.1, note: 'dealer alone, blushing; police badge gets a red X on "police"',
      draw(lt, d, t) {
        K.hotel(t);
        K.person({ ...DEALER, x: 540, y: 1700, s: 1.55, arm: lt > wEmb ? K.POSE.face : K.POSE.shrug, mouth: 'frown', eyes: lt > wEmb ? 'closed' : 'wide', brow: 0.6, tilt: -1, blush: lt > wEmb ? clamp((lt - wEmb) * 2) : 0, sweat: 1 });
        K.badge(820, 640, 1.2 * pop(lt, wPol - 0.4)); if (lt > wPol) K.redX(820, 640, lerp(1.8, 0.9, eo(seg(lt, wPol, wPol + 0.2))), 1);
      } });
    cue(st, 'whoosh'); cue(st + wPol - 0.4, 'pop', { gain: 0.4 }); cue(st + wPol + 0.05, 'slam', { gain: 0.8 });
  }

  // ── 10 · he comes back ──────────────────────────────────────────────────
  {
    const st = cut(9), wBack = Wd('came', 9) - st, wAgain = Wd('again', 9) - st;
    add({ id: 'S10', at: st, cam: [540, 900], zoom: 0.08, note: 'con man slides back in under the tower, AGAIN pops',
      draw(lt, d, t) {
        K.dusk(t); K.tower(800, 1480, 0.95, C.iron);
        const p = eo(seg(lt, wBack - 0.1, wBack + 0.6));
        K.person({ ...CON, x: lerp(-200, 380, p), y: 1580, s: 1.3, walk: p < 1 ? lt * 14 : undefined, arm: K.poseMix(K.POSE.down, K.POSE.tip, eo(seg(lt, wBack + 0.6, wBack + 1.0))), mouth: 'grin', eyes: blink(t), brow: 0.3 });
        if (lt > wAgain) bigText('AGAIN!', 540, 520, 150, C.gold, -0.08, eob(seg(lt, wAgain, wAgain + 0.2)));
      } });
    cue(st, 'whoosh'); cue(st + wAgain, 'boing', { gain: 0.5 });
  }

  // ── 11 · spooked, he flees across the sea ───────────────────────────────
  {
    const st = cut(10), wSp = Wd('spooked', 10) - st, wAm = Wd('america', 10) - st;
    add({ id: 'S11', at: st, cam: [540, 900], zoom: 0.1, note: 'ocean liner sails away under the moon',
      draw(lt, d, t) {
        K.ocean(t);
        const x = lerp(220, 860, eio(seg(lt, 0.2, d)));
        K.ship(x, 1320, 1.0, t);
        if (lt > wSp) bigText('!', 300, 760, 220, C.gold, -0.1, pop(lt, wSp, 0.2) * clamp(1 - (lt - wSp) * 0.5));
      } });
    cue(st, 'whoosh'); cue(st + wSp, 'boing', { gain: 0.4 }); cue(st + wAm - 0.5, 'slide', { dur: 1.2, gain: 0.4 });
  }

  // ── 12 · still standing ─────────────────────────────────────────────────
  {
    const st = cut(11), wStand = Wd('standing', 11) - st;
    add({ id: 'S12', at: st, cam: [540, 900], zoom: 0.12, note: 'the tower at dusk, twinkling; the end',
      draw(lt, d, t) {
        K.dusk(t); K.glow(540, 1000, 700, C.amber, 0.25); K.tower(540, 1500, 1.15, C.iron);
        const a = lt > wStand ? eob(seg(lt, wStand, wStand + 0.35)) : 0;
        K.sparkle(540, 380, 1.3 * a, lt * 1.5); K.sparkle(380, 820, 0.7 * a, -lt * 2); K.sparkle(700, 700, 0.6 * a, lt * 2);
      } });
    cue(st, 'whoosh'); cue(st + wStand, 'sparkle', { dur: 0.9 });
  }

  return { shots: S, cues: CUES };
}
