# Exploration Notes

**Status:** Active exploration — not a design doc yet. Capturing ideas and reframings to explore further.

## Current Design (design.md)

The existing design describes a **personal comprehension tracker**: SOLO taxonomy scoring, half-life decay model, session-based normalized learning gain, concept dependency graph, three triggers (manual drill, contextual, detection). The interaction layer is conversational via LLM.

This is solid but scoped to the **inner loop** — measuring and drilling an individual learner.

## Expanded Framing (from cross-session discussion)

A broader vision emerged: a system where **domain experts extract and structure their knowledge into a learning game**, without needing to understand coding or game design. The game provides the feedback loop that real-world learning environments are too costly or inaccessible to provide.

### Core theoretical frame

Learning is a **prediction error loop** (Sutton's reinforcement learning framework):
1. Learner holds a model (beliefs, mental schemas)
2. Learner takes an action with an expected outcome
3. Environment produces a real outcome
4. The gap between expectation and reality is the **error signal**
5. Error signal updates the learner's model

This is true for both humans and machines.

### Key insights to carry forward

- **People learn to the level of immediate utility** and build patterns on top of incomplete foundations. When those foundations are challenged (lateral movement, collaboration, system failure), cognitive dissonance results. This is a protective mechanism, not a flaw.
- **Conflict between people with aligned intentions is a diagnostic signal** — it reveals foundational mismatches and can prioritize what needs to be learned or taught.
- The domain expert validates the game as an accurate representation of their knowledge. Learners build foundational understanding safely before transferring to real-world application.

### Gap in the current design

The design doc covers:
- **State** — what the learner currently knows (SOLO levels + decay)
- **Error signal** — partially (assessment format)
- **Model update measurement** — normalized gain, session tracking

Missing:
- **Action space** — what does the learner actually *do*? The current design only has verbal explanation.
- **Environment** — what generates outcomes the learner can compare against their predictions? This is the "game" — the thing the domain expert builds.

## Next Steps

Explore before designing:
- What are the fundamental components required for the feedback loop to actually produce learning?
- How does a domain expert's knowledge get structured into something a learner can interact with?
- What is the minimum viable "game" or "environment" that closes the loop?
- How does the existing comprehension tracker (decay, SOLO, sessions) compose with this broader system?
