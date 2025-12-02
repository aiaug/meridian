<CODE_GUIDE_ADDON_TDD>
> ⚠️ **READ BASELINE FIRST**
> This add-on enables TDD workflow for `CODE_GUIDE.md`.

## Override Notice

This TDD add-on **overrides all prior rules related to testing**, including baseline and other add-on testing guidance.

When TDD mode is enabled:
- **Tests MUST be written first** (Red → Green → Refactor) regardless of project type.
- In hackathon mode: tests remain minimal but still written first.
- In production mode: tests follow TDD with appropriate depth.
- If any instruction conflicts with TDD, **TDD wins**.

---

## TDD Workflow

### Start with Behavior
Pick the smallest observable behavior to specify as a test:
- **New feature**: Write one acceptance/integration test for the main happy path.
- **Bug fix**: Write a failing regression test that reproduces the bug.
- **Refactor**: Write characterization tests for current behavior first.

### Red → Green → Refactor
1. **Red**: Write a failing test; confirm it fails for the expected reason.
2. **Green**: Implement the minimal code to make it pass.
3. **Refactor**: Improve design while keeping tests green.

### Test Level Selection
- **Integration**: Prefer at boundaries (HTTP handlers, component interactions).
- **Unit**: Use for pure logic (validators, reducers, utilities).
- **E2E**: Reserve for critical journeys only (checkout, auth, onboarding).

### Mocks & Fakes
- Prefer fakes/containers for data stores over mocks.
- Use HTTP mocking tools (e.g., MSW) at boundaries.
- Control non-determinism (time, random, UUID) via adapters.
- Avoid mocking the system under test.

### Test Data
- Use small builder functions rather than large fixtures.
- Keep builders colocated with tests or in a shared test directory.

### Coverage
- Aim for changed-lines coverage; don't chase 100%.
- Write the next test that proves the next behavior.

---

## Confirm Test Cases with User

TDD is an opportunity to align on behavior details early:

1. **Present the test case** before writing:
   - What behavior you're about to test
   - Expected inputs and outputs
   - Edge cases you plan to cover

2. **Get confirmation** before implementing:
   - User may clarify requirements
   - User may deprioritize certain edge cases
   - User may suggest different acceptance criteria

3. **If user says "go ahead"**: Proceed with your best judgment and document assumptions.

---

## When TDD Can Be Skipped

- **Exploratory spike**: Prototype quickly, then write tests before merging.
- **Unknown third-party behavior**: Create a contract test against real API first, then TDD locally.
- **Massive refactor with weak coverage**: Write characterization tests first, then TDD for new behavior.

Document exceptions in the task context file.

---

## Integration Notes

### With Plans
- Add a TDD Test Plan section mapping acceptance criteria to planned tests.
- Steps should follow: "Write failing test for X" → "Implement" → "Refactor".

### With Memory
- If TDD reveals a repeatable pattern, record it via `memory-curator`.
</CODE_GUIDE_ADDON_TDD>
