# Lantern Tale: warm lamplit 2D story shorts, 9:16

Cosy, curious, a little mischievous. Flat 2D cartoon people with big round cream heads act inside scenes that are lit
like a lantern is nearby: a warm glow pool, deep cool shadow, a dark vignette and slow gold dust over every frame.
Fits true stories told like a friend telling a tale: cons, heists, odd rules, "the town that…", "the man who…".
Example to study and copy: `example/` = **THE MAN WHO SOLD THE EIFFEL TOWER** (1925; 38 s, 12 shots). Style sheet: `style-sheet.png`.
Looks like the lamplit 2D short-story format that is popular on Shorts. It is an ORIGINAL look: our own characters,
palette and code. Never copy another creator's character design, script, scenes or frames.

**vs Tall Tale 3D:** Tall Tale is cut-out people in a bright 3D world (slow to render). Lantern Tale is 2D only, painted
light, fast to render, moodier and warmer. Pick Lantern Tale for night, dusk, interiors and atmosphere; Tall Tale for
sunny comedy.

## 1. The look (rules from the sheet: do not break them)
- **Light is the hero.** Every scene has one warm light source (`K.glow`) and cool shadow. Gradients are allowed only for
  skies and light pools; characters and props are flat cel-shaded (one shade tone, one highlight).
- **Palette:** lantern gold `#FFC857` · amber `#E9923B` · signal red `#C8433A` · dusk plum `#7A4A6B` · night indigo `#1B2347`
  · salon wall `#8A4B36` · teal coat `#2F8F8B` · cream skin `#F1DFC8`, plus ink `#1B1410` and the derived shades in `lib.js` `C`.
- **Gold means light or the one keyword** (caption keyword, coins, sparkle, lamp). **Red means danger or the con**
  (stamp, X, scarf accent). Keep red rare.
- **People:** big round cream head, dot eyes with a highlight, thin brows, optional moustache, bean body, stub legs, one hat +
  one coat colour per character, the same all video. The face acts on every beat (eyes, brows, mouth, sweat, blush).
- **Camera always moves:** a punch-in on every cut and a slow push across the shot (automatic in `main.js`), a warm flash on the cut.
- Mood: cosy, wry, never gory. True stories only, checked against good sources and listed in `script.json` "sources".

## 2. Format
- **1080x1920, 30 fps, 30-45 s.** Lead silence 0.45 s, outro 1.0 s (in `script.json`).
- **Story shape:** the most surprising fact first → "See, …" explain the trick in one picture per clause → the turn
  ("but…") → a quiet punchline that loops to the hook ("And yes, the tower is still standing.").
- **One line = one shot = one cut**; a sentence spans 1-3 lines, shots 1.5-3.5 s. Narration: conversational storyteller,
  Kokoro `am_michael` x1.05, numbers spelled as said. Music `bed`.

## 3. Captions
`script.json` line: `{ "text": "so he sent forged letters", "caps": "so he sent | *forged letters" }`
- `|` splits caption chunks, `*` marks the ONE gold word of a chunk. **1-4 words per chunk**, all lowercase.
- Inter Black 84 px, white, soft dark edge + shadow, centred at y 1500 (`CAP` in captions.js), low in the frame so faces and
  action stay clear. A chunk appears on its first spoken word (matched by spelling, else by count), pops in over 0.16 s.
- Chunk starts must be real spoken words (`nineteen`, not `1925`). Check `capture.mjs check` output.

## 4. Engine map (`example/`)
| file | gives you |
|---|---|
| `script.json` | title, voice, speed, lead, outro, gap, music, sources, lines `{text, caps, gap}` |
| `src/shots.js` | **the per-video file**: the shot list + sound cues |
| `src/core/kit.js` | the component zoo (below) |
| `src/core/lib.js` | `W H FPS`, palette `C`, `clamp lerp seg eo eio eob rnd hexA`, `rr circle ell line fillAll grad bigText` |
| `src/core/timing.js` | `L(i)` line start, `Le(i)` line end, `Wd(word, line)` word start (prefix match, throws if missing), `T.dur` |
| `src/core/captions.js` | caption chunking + drawing |
| `src/main.js` | boot, camera, cut flash, fades, `K.grade` (vignette + dust), `window.OP` for capture |
| `tools/capture.mjs` · `tools/mix.py` | same as the other 2D styles |

## 5. The component zoo (`kit.js`, `import * as K`)
**Light** `K.glow(x, y, r, col, a)` · `K.vignette(a)` · `K.dust(t, n)` · `K.sparkle(x, y, s, rot, a)` · `K.grade(t)` (automatic).
**Places** `K.dusk(t)` (horizon y 1480) · `K.night(t)` · `K.ocean(t)` (waves from y 1250) · `K.hotel(t)` (floor y 1500) · `K.study(t)`.
**Landmark** `K.tower(x, y, s, col, rust)` lattice tower, origin = base centre, ~1090 px tall at s 1.
**People** `K.person({ x, y, s, flip, bob, shake, walk, lean, coat, coatShade, pants, hat: none|bowler|top|flat, hatCol, stache, scarf, belly,
arm, eyes: n|wide|closed|happy, mouth: smile|grin|o|flat|smirk|frown, brow 0..1, tilt -1..1, look [dx,dy], sweat 0..1, blush 0..1, holdR })`
- origin = feet centre, ~590 px tall at s 1 (head top ≈ -520). Close-up: `s 1.5-1.8`, y 1650-1750.
- `arm` is a pose `K.POSE.down | up | cheer | front | tip | hold | write | shrug | point | face`; blend with `K.poseMix(a, b, t)`.
- `holdR: (hx, hy) => K.suitcase(hx + 4, hy + 90, 0.35)` draws a prop AT THE HAND (follows the arm). `walk: lt * 14` swings the legs.
**Props** `K.coin` · `K.envelope` · `K.suitcase(x, y, s, open)` · `K.newspaper(x, y, s, rot, head, sub)` · `K.stamp(text, x, y, s, rot, a)` ·
`K.badge` · `K.redX` · `K.speedLines(x, y, a, dir)` · `K.ship(x, y, s, t)` · `K.pill(text, x, y, size, bg, fg, sc)` · `bigText(text, x, y, size, fill, rot, sc)`.
New topic = new scene or props: add them to kit.js in the same look (glow first, flat fills, one shade tone), document them
here and look at them full size.

## 6. A shot
```js
const st = cut(1), slam = Wd('whole', 1) - st;                        // cut just before line 1; the stamp lands on "whole"
add({ id: 'S02', at: st, cam: [540, 800], zoom: 0.14, note: 'tower fills the frame, SOLD slams on "whole"',
  draw(lt, d, t) {                                                     // pure function of time: no state between frames
    K.dusk(t); K.tower(540, 1700, 1.45, C.iron);
    K.stamp('SOLD', 540, 760, lt > slam ? lerp(2.2, 1, eo(seg(lt, slam, slam + 0.18))) : 2, -0.14, lt > slam ? 1 : 0);
  } });
cue(st, 'whoosh'); cue(st + slam + 0.05, 'slam');
```
`cam` = point the camera pushes toward, `zoom` = how much it pushes over the shot (0.06 default, 0.14 strong). Keep faces and
key objects above y 1420 so the caption (y 1460-1540) never covers them; feet and floor may sit under it.
**Sound cues** `cue(t, type, { gain, dur })`: `whoosh` (every cut) · `slide` (dur) · `pop` · `plop` · `gulp` · `boing` · `bubbles` (dur) ·
`sizzle` (dur) · `sparkle` (dur) · `thud` · `slam` · `tock` · `zip` · `alarm` (dur). All soft by design.

## 7. QA pitfalls we've hit (check these first)
- A prop drawn before its cause (the suitcase hovering over a head before it drops) → guard with `if (lt > t0)`.
- A moon built from a dark disc over a gradient sky shows as a black circle → draw a full moon.
- Captions crossing a funnel, face or prop → keep action above y 1420 or move it.
- A caption chunk starting on a digit or a word that is not spoken → write it as spoken.
- Whisper not downloadable (sandbox) → `words.py` spreads words inside exact voice-line times (within ~0.2 s); fine for shorts.
