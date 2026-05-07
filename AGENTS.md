# Agent Collaboration Rules

## 1. Branching & Git Flow
- **Never** commit directly to `main`.
- Always create a new branch for every task using the prefix `agent/`.
- Format: `agent/short-description-of-task` (e.g., `agent/auth-refactor`).
- If a branch already exists, pull the latest changes before starting work.

## 2. Commit Standards
- **Atomic Commits:** Keep commits small and focused on a single change.
- **Message Format:** Use Conventional Commits (e.g., `feat: add login validation` or `fix: resolve api timeout`).
- **Identity:** Ensure you are committing using the designated Agent GitHub account.

## 3. Code Quality & Context
- **Read First:** Scan the existing codebase and `README.md` to match the project's architectural style and naming conventions.
- **No Placeholders:** Do not leave `// TODO` or "logic goes here" comments unless explicitly asked.
- **Self-Correct:** Before submitting, verify that the new code doesn't break existing imports or shared utilities.

## 4. Submission (Definition of Done)
- **Validation:** Run any existing test suite (e.g., `npm test` or `pytest`) before pushing.
- **Pull Request:** Push the branch and create a PR to `main`. 
- **PR Description:** Summarize exactly what was changed and list any new dependencies added.

## 5. Communication
- If a task is ambiguous or requires a breaking change to the core architecture, **stop and ask** for clarification before proceeding.

