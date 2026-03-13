# CLAUDE.md — Comprehension Tracker

## Orientation

Read `docs/design.md` first. It contains the full design plan — schema, triggers, measurement model, data architecture.

For prior art research, see `docs/prior-art-comprehension-tracker.md`.

## Reference: Origin Transcripts

If you need raw context beyond the design doc, the original design conversations are available:

1. **Design session** (schema, decay model, triggers, quiz format):
   `C:/Users/timw/.claude/projects/C--Continuous-Improvement-Personal-Development/35a6730f-d1a1-4859-a667-6653b67d3e12.jsonl`

2. **Repo setup session** (architecture decisions, repo structure, data location):
   `C:/Users/timw/.claude/projects/C--Continuous-Improvement-Personal-Development/23182caf-b6e1-41e2-8475-ea09fb75a451.jsonl`

## Key Rules

- **Data file**: `~/.comprehension/data.json` — lives outside this repo. Never commit personal data.
- **No hardcoded user paths** in code — use `~/.comprehension/`, not `C:/Users/timw/`.
- **Repo is private**. No secrets, no personal data, code only.
- **Conversation first, artifacts second** — don't jump to building until aligned with Tim on the approach.
