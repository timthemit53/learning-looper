# Prior Art: Comprehension Tracking Systems

Research gathered 2026-03-13 for designing Tim's concept mastery tracker.

## Decay Models

### Duolingo Half-Life Regression (HLR)
- **Best fit for our use case.** Per-item decay model.
- Formula: `p = 2^(-delta/h)` where delta = days since last practice, h = half-life
- Each concept gets its own half-life that increases on correct recall, decreases on errors
- 9.5% retention improvement over Leitner in A/B tests
- Source: https://research.duolingo.com/papers/settles.acl16.pdf
- GitHub: https://github.com/duolingo/halflife-regression

### FSRS (Free Spaced Repetition Scheduler)
- State of the art. Based on DSR model (Difficulty, Stability, Retrievability)
- Retrievability: `R = e^(-t/S)` — probability of recall right now, decays exponentially
- Stability (S): days for R to drop from 100% to 90%
- Difficulty (D): inherent complexity, higher D = slower stability growth
- Open source, ML-optimized per learner
- Source: https://github.com/open-spaced-repetition/fsrs4anki/wiki/abc-of-fsrs
- 100-line implementation: https://borretti.me/article/implementing-fsrs-in-100-lines

### Bayesian Knowledge Tracing (BKT)
- Classic model from educational data mining. Two-state HMM (learned/unlearned).
- Parameters: P(L0) prior, P(T) transition, P(F) forget, P(G) guess, P(S) slip
- Workhorse behind most intelligent tutoring systems
- Source: https://en.wikipedia.org/wiki/Bayesian_knowledge_tracing

## Comprehension Rubrics

### SOLO Taxonomy (Structure of Observed Learning Outcomes)
- 5 levels of understanding complexity, applied to programming:
  1. **Pre-structural:** No understanding
  2. **Uni-structural:** Understands one aspect
  3. **Multi-structural:** Understands several aspects independently
  4. **Relational:** Understands how aspects inter-operate
  5. **Extended Abstract:** Can generalize to new domains
- Right rubric for "can you explain this code?" assessments
- Source: https://en.wikipedia.org/wiki/Structure_of_observed_learning_outcome

### Multi-Faceted SOLO for Programming (Fisler, Brown)
- Extended SOLO into multiple parallel progressions for different sub-skills
- Source: https://cs.brown.edu/~kfisler/Pubs/koli17-solo.pdf

## Session Metrics

### Normalized Learning Gain (Hake, 1998)
- Standard formula: `g = (post - pre) / (max - pre)`
- g < 0.3 = low gain, 0.3-0.7 = medium, > 0.7 = high
- This is our **session delta** metric
- Source: https://www.physport.org/expert/gain/

### Inter-Session Decay
- Ebbinghaus: `R = e^(-t/S)` where t = time elapsed, S = memory strength
- Power law often fits better: `R = 0.99 * t^(-0.07)`
- Each concept has its own decay rate
- Source: https://en.wikipedia.org/wiki/Forgetting_curve

### Meaningful Aggregate Metrics
- Per-concept retrievability (current probability of comprehension)
- Per-concept stability (how slowly it decays)
- Average normalized gain per session (are sessions productive?)
- Retention rate at next session start (how much survived?)
- Concept difficulty (inherent resistance to stability growth)

## Existing Systems

### Mastery Grids (U of Pittsburgh)
- Visualizes programming concept mastery at topic/concept level
- Bayesian network student model from performance history
- Source: http://adapt2.sis.pitt.edu/wiki/Mastery_Grids_Interface

### Spaced Repetition for Programming (Anki-based)
- Derek Sivers: one succinct code example per card, must apply not just recall
- Consensus: SRS works for syntax/API memorization, needs augmentation for comprehension
- Source: https://sive.rs/srs

## The Gap (What Doesn't Exist)
Nobody has combined:
1. Comprehension rubric (SOLO-style, not binary) as the observation signal
2. Per-concept decay model (HLR/FSRS-style)
3. Session-level normalized gain on comprehension (not just recall)
4. Inter-session decay of *understanding* (not just memory)

This is what we're building.
