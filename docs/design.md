# Comprehension Tracker — Design Plan

## Problem

Existing spaced repetition systems (Anki, Duolingo) track **recall** — can you remember this fact? Nobody tracks **comprehension** — can you explain how this concept works, how it connects to other concepts, and how you'd use it to solve a new problem?

Users need a tool that tracks how well they actually understand concepts across multiple domains and surfaces gaps before they cause problems in real work.

## Core Concept

A domain-agnostic comprehension tracker that measures understanding depth (not just memory), models how that understanding decays over time, and creates targeted learning opportunities. Designed for use with large language models as the interaction layer — the LLM conducts assessments, delivers teaching, and detects comprehension gaps in natural conversation.

Development and testing use Claude (Anthropic) as the LLM.

## Use Cases

### Individual Learning
The core use case. Users see where they actually are on the comprehension graph versus where they think they are. The decay model proves whether understanding stuck. The dependency graph finds the real gap instead of letting users keep building on foundations that aren't there.

### LLM Effectiveness
Users who understand the concepts they're working with can direct an LLM precisely — they become the architect, not just the prompter. The tracker closes the gap between "I got a working result" and "I understand what I built." This is the difference between vibecoding and engineering.

### Organizational Competency Verification
Provides a scientific base layer for verifying user comprehension. Can be composed with other tools (code review, deployment gates, role progression) as part of a verification stack. Example: onboarding requirements, competency-based access control, or minimum comprehension thresholds before granting production access.

## Concept Dependency Graph

Concepts are not independent — they form a prerequisite graph. Each concept may depend on others:

- **Primitives** — variables, types, operators. Atomic building blocks. No prerequisites.
- **Constructs** — functions, loops, conditionals. Built from primitives.
- **Patterns** — callbacks, recursion, event handling. Built from constructs interacting.
- **Architectures** — MVC, pub/sub, client-server. Patterns composed into systems.

This structure enables **downward diagnosis**: when comprehension fails at a higher level, the system traces the graph to find where it actually broke. A user struggling with callbacks may have a decayed understanding of functions — the tracker should detect this and drill the real gap, not the surface symptom.

The graph also prevents **premature advancement** — the common pattern where users learn just enough at a high level to get a positive result, then hit a wall when moving laterally or vertically because the foundations aren't solid.

## Schema

```json
{
  "users": {
    "user1": {
      "domains": {
        "javascript": {
          "concepts": {
            "callback": {
              "solo": 3,
              "halfLife": 4.2,
              "sessions": [
                {
                  "date": "2026-03-13",
                  "start": 1,
                  "end": 3,
                  "gain": 0.5,
                  "notes": "Understands passing a function as an argument. Confused about when the callback actually executes — timing vs definition."
                }
              ]
            }
          }
        }
      }
    }
  }
}
```

### Fields

- **solo** — Current SOLO taxonomy level (1-5):
  1. Pre-structural: No understanding
  2. Uni-structural: Gets one aspect
  3. Multi-structural: Gets several aspects independently
  4. Relational: Understands how aspects interrelate
  5. Extended Abstract: Can generalize to new domains
- **halfLife** — Days before comprehension decays significantly. Starts low, grows with repeated successful reviews. Based on Duolingo's Half-Life Regression: `p = 2^(-delta/h)`
- **sessions** — Every drill session with start/end SOLO scores
- **gain** — Normalized learning gain: `(end - start) / (max - start)` (Hake, 1998)
- **notes** — Assessment of what stuck, what didn't, specific confusions

## Three Triggers

### 1. Manual Drill
User calls it explicitly (e.g., `/drill`). Gets quizzed on concepts that are due for review based on decay model.

### 2. Contextual
The system detects that a concept is about to be used during normal work. If the user's comprehension is weak or decayed, it pauses and checks understanding before proceeding.

### 3. Detection
The user says something that signals confusion about a concept. The system catches it and teaches in the moment.

## Assessment Format

Show a piece of code (or domain-appropriate example) that uses the concept. Ask the user to:
1. Describe what the code does using correct vocabulary
2. Explain how the parts interconnect and why it works

The test is **verbal explanation**, not code production. Users can rearrange code until it works without understanding why — the same fragile knowledge pattern the tool is designed to detect. Requiring explanation in the user's own words forces relational thinking (SOLO level 4) that can't be faked.

Code production is not a separate assessment step. When used alongside real work, the user's actual coding is already being observed via detection (trigger 3). The assessment format fills the gap that natural coding doesn't — proving the user can articulate *why*, not just *what*.

## Measurement Model

- **Don't assume comprehension holds** — always re-test at session start
- **Session tracking**: Each drill records a start SOLO score (tested) and end SOLO score (tested after teaching)
- **Decay signal**: Delta between last session's end score and this session's start score reveals retention
- **Key metrics**:
  - Per-concept retrievability (current probability of comprehension)
  - Per-concept stability (how slowly it decays)
  - Average normalized gain per session (are sessions productive?)
  - Retention rate at next session start (how much survived?)

## Data Architecture

- **Data file**: `~/.comprehension/data.json` — lives outside any repo, accessible from any project/session
- **Code**: This repo (`learning-looper`) — no personal data committed
- **Multi-user**: Designed in from the start, users as top-level entity

## Domains

The system is generic. Domain is just a parameter — javascript, computer-science, chemistry, whatever the user is learning. Any knowledge domain works.

## Teaching Mode

Conversational. The system uses a consistent template for presenting concepts but always engages in dialogue — not a lecture.

## Prior Art

See `docs/prior-art.md` for full research. Key models informing this design:
- **Duolingo HLR** — per-concept decay math
- **FSRS** — state-of-the-art alternative decay model
- **SOLO Taxonomy** — comprehension rubric
- **Normalized Learning Gain** — session effectiveness metric
