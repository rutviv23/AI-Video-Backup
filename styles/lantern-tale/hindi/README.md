Hindi audio + English captions (used for Howrah Bridge, voice hm_omega, speed 0.95).
script.json: "lang":"hi", each line has "text" (Devanagari, spoken) and "caps" (English subtitle chunks, "*" marks the gold word).
Copy voice_hi.py and words_hi.py into the project's tools/ folder, then run: scripts/py tools/voice_hi.py . ; scripts/py tools/words_hi.py .
(Do NOT run the stock words.py: it strips Devanagari.) Then check, cues, mix.py, sheet, video as usual.
Write numbers as Hindi words in "text" (e.g. उन्नीस सौ तैंतालीस) so the voice reads them right. Keep overlays (pills, counters) above y=1250, captions sit near y=1500.
example-shots.js: simple bridge shots written for this video.
