# TODO — Fix InterviewAI to give correct answers (15 non-repeating questions)

- [ ] 1) Replace the current question flow (5 random questions + random scoring) with a new engine.
- [ ] 2) Create a question bank structure: {question, correctAnswer, explanation, tags, rubric}.
- [ ] 3) Update session UI: change to **15 questions**, update `qCounter` and progress.
- [ ] 4) Ensure **no question repeats** within a session (sample without replacement).
- [ ] 5) After each user answer: show **correct answer + explanation** and rubric-based feedback (no random chips).
- [ ] 6) Replace `endSession()` random scores with deterministic rubric scoring.
- [ ] 7) Keep existing Login/Dashboard/History working and store per-question feedback in history.
- [ ] 8) Run quick manual test: start session → answer → verify correct-answer appears every time.

