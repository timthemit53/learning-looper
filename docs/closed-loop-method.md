# Closed-Loop Method for Goal Achievement

**Created:** 2026-03-02
**Status:** Draft — discovered through building the scheduling assistant, being formalized and applied.

## Origin

This method emerged empirically. Tim tried to build a production scheduler using his default approach — optimize locally, fix the most painful thing first, iterate. It failed repeatedly. Not from lack of skill, tools, or intelligence, but from lack of process. The failures forced reflection, and that reflection produced five principles that, once applied, drove rapid convergence.

The method is stated in scientific and computer science terminology because those disciplines have formal verification. Business terms describe symptoms ("alignment," "accountability"). CS terms describe mechanisms you can fix ("interface contract," "feedback latency").

## Overarching Frame: Closed-Loop Control

The entire method is a **closed-loop control system** applied to goal achievement:

- **Setpoint** = the goal (a hypothesis, not a constant — the loop may revise it)
- **Plant** = the work system (people, processes, tools)
- **Controller** = the method/strategy
- **Sensor** = the feedback mechanism
- **Signal loss** at any point causes error

The five principles are design requirements for a well-functioning control system.

## The Five Principles

### 1. Prior Art

**Start with proven controller designs. Don't invent from scratch.**

Before designing a solution, search for established methods. This is a **prior art check** — verify the problem has known solutions before reinventing. The scheduler spike applied dispatch rules (EDD, SPT), backward scheduling, and interactive what-if — all textbook approaches, not inventions.

Every hour spent here saves 10 hours of rediscovery. The most common failure mode isn't picking the wrong method — it's not knowing a method exists.

### 2. Modular Decomposition with Interface Contracts

**Break the system into components with verified boundaries.**

Decompose the *system* (not just the task) into fundamental parts. Build complexity at the part level first, then at the interaction level. At every boundary, prove compatibility through computation.

Three distinct operations:

- **Decomposition** — identify the fundamental parts (e.g., Layer 1/2/3/4 in data architecture)
- **Compositional construction** — each part validates before the next layer builds on it
- **Interface verification** — prove computationally that parts are compatible (cascade validation, `compare_backends`, the layer status register)

Decomposition without verified interfaces is just a list. The computation is what makes it real. This is what failed in the "fix one small part" approach — optimizing a part without verifying its interfaces to the rest produces local improvement and systemic drift.

This principle also standardizes vocabulary across the system. Naming the parts precisely (BT is the atom, Job is the container, Chunk is the connected component) compresses ambiguity. When everyone uses the same terms with the same definitions, communication errors drop.

#### Decomposition at Different Levels of Abstraction

The same decomposition discipline applies at every level of abstraction — the atoms change, the method doesn't. The factory is the primary system; the ERP is a second-order encoding of it. Each level needs its own decomposition because the encoding is lossy — the ERP doesn't capture shift handoffs, training, habits, or tribal knowledge.

The **5M+Measurement framework** (Ishikawa, 1960s) gives the atoms for the physical/operational level, just as tables and foreign keys give the atoms for the ERP level:

| Physical (Ishikawa 5M+Measurement) | CS / DDD Concept | Role |
|---|---|---|
| People | Actor / Entity | Who does the work |
| Equipment | Resource / Node | What they use |
| Materials | Entity | What gets transformed |
| Locations | Context / Node | Where it happens |
| Methods | Edge / Routing | How it flows — the process connecting the other four |
| Measurement | Sensor / Signal | How you know it worked — closes the loop |

Methods are the edges connecting the other nodes. Measurement is the feedback signal that closes the loop — without it, you have a process description but no control system.

**Levels in practice:**
- **ERP level:** Atoms are tables, fields, foreign keys. Validated by scripts. (Data architecture layers, L1-3 validated for scheduling.)
- **Physical/operational level:** Atoms are the 5M+Measurement. Validated by walking the process with the oracle (the domain expert who defines correct).

The levels aren't independent — the ERP encodes (lossily) the physical reality. But they need separate decomposition because improving the model doesn't fix the process, and fixing the process doesn't fix the model. Both matter. Decompose both.

### 3. Demand-Driven Evaluation

**Only compute, measure, and build what the current state requires.**

This is **lazy evaluation** (CS) or **pull-based development**. Don't solve problems that don't exist yet. The system's current state determines what gets worked on next — not a speculative roadmap, not theoretical completeness.

The CPFILE2 table discovery is the canonical example: nobody went looking for it. The SO validation *pulled* it into scope because the data demanded it. Resources flow to where they're actually needed to make progress.

The opposite — speculative building — wastes resources and generates noise (code that exists but isn't validated, features nobody uses, abstractions without consumers).

### 4. Adaptive Control

**Measurably learn by taking action toward a goal, measuring relevant outcomes against predictions, and when outcomes diverge, updating the learning model.**

Two levels of learning:

- **Single-loop**: action didn't work, adjust action. (Fix a bug.)
- **Double-loop** (Chris Argyris): action didn't work, adjust the *governing variables* — the method, the assumptions, or the goal itself. (Rewrite the process. Redefine the problem.)

"Measurably" is the gating word — without measurement, iteration is indistinguishable from thrashing. The word "relevant" prevents drowning in data (Principle 3 showing up inside Principle 4 — the principles reinforce each other).

The scheduling project's double-loop moment: shifting from "fix one thing at a time" to "build a systematic validation framework." Not a change in what was being built, but a change in *how decisions about what to build* were made.

### 5. Sample Rate Acceleration with Signal Fidelity

**Tighten the feedback loop through computational leverage, with convergence guarantees and explicit signal quality management.**

This is the payoff of the other four. Once the loop is trustworthy (Principles 1-4), compress it. Automation, computation, tooling — all reduce the time between action and measured outcome.

**Without signal fidelity, faster iteration = faster thrashing.** Convergence requires that the feedback signal accurately represents reality. Every point where information moves — person to person, system to person, goal to action, action to outcome — is a point where signal can degrade. The three degradation modes:

| Failure Mode | CS Analogy | What It Looks Like |
|---|---|---|
| **Goal ambiguity** | Specification error | Working correctly on the wrong problem |
| **Method ambiguity** | Undefined procedure | Correct goal, improvised execution, inconsistent results |
| **Feedback latency** | Control loop delay | Action on Monday, consequence visible Friday, cause invisible |

Signal fidelity management means: identify where signal degrades, measure the degradation, and reduce it — through verified interfaces (Principle 2), demand-driven focus (Principle 3), and measured outcomes (Principle 4).

Computation is the primary accelerant because it removes handoffs. Every handoff between humans is a translation step where signal degrades. Computation doesn't eliminate human judgment — it eliminates the translation losses around it.

## Loop Structure

The five principles form a loop with a ratchet. Each cycle's verified output becomes the prior art for the next cycle:

```
1. Prior Art         ->  starting position (don't start from zero)
2. Decompose+Verify  ->  structure (know what the parts are)
3. Pull-Based Work   ->  focus (work on what matters next)
4. Adaptive Control  ->  feedback (discover what you got wrong)
5. Accelerate+Fidelity -> speed (go faster without thrashing)
       |
       '-----> feeds back to 1 (new "known methods" for next cycle)
```

The ratchet is **verified, persisted knowledge** — validation suites, documented conventions, named concepts. Each cycle produces knowledge that doesn't need re-deriving. The loop gets faster because the starting position improves.

## Relationship to Existing Documents

- **`docs/design-principles.md`** — Superseded. Six earlier principles about iterative development. The ideas survive in this method; the document is retained for history.
- **`docs/closed-loop-method-operations.md`** — Operations version. Same five principles in plant-level vocabulary, structured as a coaching protocol with a pocket card (`closed-loop-method-card.md`).
- **`~/.claude/docs/plan-mode.md`** — Plan mode conventions. An application of this method to software planning with Claude.
- **`docs/plans/completed-work-log.md`** — Collapsed build logs from completed plans (including data architecture layers, product graph, resolve_qty).
- **CLAUDE.md standing orders** — Leverage, Honest Copilot, Context Hygiene, Plan Before Building. Operational rules that implement the five principles.

## First Application

This method will be applied to the **signal loss analysis** of the scheduling project. The `schedule_builder.py` spike (2026-03-02) surfaced specification gaps — places where the tool's model diverges from reality. Each gap is a signal fidelity failure. Resolving them through Tim's feedback (the oracle) is Principle 4 in action.
