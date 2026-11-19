"""Caption timing for Hindi audio + English captions: spread each line's English caption words inside that line's voice time."""
import json, re, sys
from pathlib import Path
P = Path(sys.argv[1] if len(sys.argv) > 1 else '.')
S = json.loads((P/'script.json').read_text()); L = json.loads((P/'data/lines.json').read_text())['lines']
out = []
for i, ln in enumerate(S['lines']):
    toks = [w.replace('*', '') for w in re.split(r'[\s|]+', ln['caps']) if w.replace('*', '')]
    a, b = L[i]['start'], L[i]['end']; wts = [len(re.sub(r'[^a-z0-9]', '', w.lower())) + 2.5 for w in toks]; tot = sum(wts); t = a
    for w, wt in zip(toks, wts):
        d = (b - a) * wt / tot; out.append({'w': w, 'line': i, 's': round(t, 3), 'e': round(t + d * 0.92, 3)}); t += d
(P/'data/words.json').write_text(json.dumps(out)); print(len(out), 'caption words')
