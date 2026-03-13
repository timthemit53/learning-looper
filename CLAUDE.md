# CLAUDE.md — Comprehension Tracker

## First Session Orientation

This project was designed across two conversations in the Personal Development workspace. Before doing anything, read these session transcripts to get full context on the design decisions, user intent, and prior art:

1. **Design session** (schema, decay model, triggers, prior art research):
   `C:/Users/timw/.claude/projects/C--Continuous-Improvement-Personal-Development/35a6730f-d1a1-4859-a667-6653b67d3e12.jsonl`

2. **Repo setup session** (architecture decisions, repo structure, data location):
   `C:/Users/timw/.claude/projects/C--Continuous-Improvement-Personal-Development/23182caf-b6e1-41e2-8475-ea09fb75a451.jsonl`

After reading, summarize what you learned back to Tim before building anything.

## Project Summary

Generic comprehension tracking system — domain-agnostic (JS, CS, grease formulation, anything). Combines SOLO taxonomy rubrics with per-concept decay modeling. Nobody has built this yet (see `docs/prior-art-comprehension-tracker.md`).

## Architecture Decisions

- **Shared data file**: `C:/Users/timw/.comprehension/data.json` — lives outside any repo, accessible from any project/session
- **This repo**: Code only. No personal data committed.
- **Privacy**: Repo is private. Data file is gitignored and external. No hardcoded user paths in code — use `~/.comprehension/`.

## Schema (from design session)

Top level: Users → Domains → Concepts. Each concept tracks SOLO level (1-5), half-life (days), and session history with start/end scores, normalized gain, and notes.

## Three Triggers

1. **Manual drill** — user calls explicitly, gets quizzed on due concepts
2. **Contextual** — Claude pauses before using a concept the user is weak on
3. **Detection** — Claude catches confusion in natural conversation

## Vocabulary

- **SOLO taxonomy** — 5-level comprehension rubric (Pre-structural → Extended Abstract)
- **Half-life** — days before comprehension decays, grows with successful reviews
- **Normalized learning gain** — `(end - start) / (max - start)` per session
- **Decay signal** — delta between last session's end score and next session's start score
