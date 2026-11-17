// Captions: small, lowercase, Inter Black, white with a soft dark edge, centred a little below the middle of the frame.
// Each script line has "caps": "the tower was *rusting | and paris *paid"  ("|" = next caption, "*" = the gold word).
// Without "caps", the line is chunked automatically (2-3 words, longest word gold). Chunks start on their first spoken word.
import { ctx, C, clamp, lerp, seg, eob } from './lib.js';
import { T, lineWords } from './timing.js';

export const CAP = { y: 1500, size: 84, maxW: 880 };
let caps = [];

function autoChunks(text) {
  const ws = text.toLowerCase().split(/\s+/).filter(Boolean), out = [];
  for (let i = 0; i < ws.length;) { const n = ws.length - i === 4 ? 2 : Math.min(3, ws.length - i); out.push(ws.slice(i, i + n)); i += n; }
  return out.map((c) => { const k = c.reduce((b, w, j) => (w.replace(/[^a-z]/g, '').length > c[b].replace(/[^a-z]/g, '').length ? j : b), 0); return c.map((w, j) => (j === k ? '*' + w : w)).join(' '); });
}

export function buildCaptions(script) {
  caps = [];
  script.lines.forEach((ln, i) => {
    const chunks = (ln.caps ? ln.caps.split('|') : autoChunks(ln.text)).map((s) => s.trim()).filter(Boolean);
    const ws = lineWords(i); if (!ws.length) return;
    const counts = chunks.map((c) => c.split(/\s+/).length), N = counts.reduce((a, b) => a + b, 0);
    const nm = (w) => String(w).toLowerCase().replace(/[^a-z0-9']+/g, '');
    let acc = 0, from = 0;
    chunks.forEach((c, j) => {
      const first = nm(c.split(/\s+/)[0]);
      let idx = j === 0 ? 0 : ws.findIndex((w, k) => k > from && first && (nm(w.w) === first || (first.length > 2 && nm(w.w).startsWith(first))));
      if (idx < 0) idx = Math.max(from + (j ? 1 : 0), Math.min(ws.length - 1, Math.round(acc * ws.length / N)));
      acc += counts[j]; from = idx;
      caps.push({ line: i, s: ws[idx].s - 0.05, words: c.split(/\s+/).map((w) => ({ txt: w.replace('*', ''), hi: w.startsWith('*') })) });
    });
  });
  caps.forEach((c, k) => {
    const next = caps[k + 1], lineEnd = T.lines[c.line].end;
    c.e = next ? (next.s - lineEnd > 0.7 && next.line !== c.line ? lineEnd + 0.35 : next.s) : T.dur;
  });
  return caps;
}
export const captionList = () => caps;

export function drawCaption(t) {
  const c = caps.find((c) => t >= c.s && t < c.e); if (!c) return;
  const lt = t - c.s, size = CAP.size;
  ctx.font = `900 ${size}px Inter`; ctx.letterSpacing = '-1px';
  const sp = size * 0.28;
  c.words.forEach((w) => (w.w = ctx.measureText(w.txt).width));
  const width = (ws) => ws.reduce((a, w) => a + w.w, 0) + sp * (ws.length - 1);
  const fit = Math.min(1, CAP.maxW / width(c.words));
  const sc = (lt < 0.16 ? lerp(0.8, 1, eob(seg(lt, 0, 0.16))) : 1) * fit;
  ctx.save(); ctx.translate(540, CAP.y); ctx.scale(sc, sc);
  ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.lineJoin = 'round';
  let x = -width(c.words) / 2;
  for (const w of c.words) {
    ctx.shadowColor = 'rgba(20,10,8,0.55)'; ctx.shadowBlur = 18; ctx.shadowOffsetY = 6;
    ctx.lineWidth = 16; ctx.strokeStyle = 'rgba(27,20,16,0.92)'; ctx.strokeText(w.txt, x, 0);
    ctx.shadowColor = 'transparent'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;
    ctx.fillStyle = w.hi ? C.gold : C.white; ctx.fillText(w.txt, x, 0); x += w.w + sp;
  }
  ctx.letterSpacing = '0px'; ctx.restore();
}
