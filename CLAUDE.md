# CLAUDE.md — Learning Looper

## Orientation

Read `docs/closed-loop-method.md` first. It defines the five principles (Prior Art, Modular Decomposition with Interface Contracts, Demand-Driven Evaluation, Adaptive Control, Sample Rate Acceleration with Signal Fidelity) that govern how work is approached.

Then read `docs/design.md`. It contains the full design plan — schema, triggers, measurement model, data architecture.

For prior art research, see `docs/prior-art.md`.

## Reference: Origin Transcripts

If you need raw context beyond the design doc, the original design conversations are in the local Claude projects directory (not committed to this repo).

## Key Rules

- **Data file**: `~/.comprehension/data.json` — lives outside this repo. Never commit personal data.
- **No hardcoded user paths** in code — use `~/.comprehension/`, not absolute paths with usernames.
- **Repo is private**. No secrets, no personal data, code only.
- **Conversation first, artifacts second** — don't jump to building until aligned with Tim on the approach.
