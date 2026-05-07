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

## 6. Development Guardrails 
- **TDD Workflow**: You must use Vitest/Jest for unit tests and Playwright/Cypress for E2E.
    1. **RED**: Create a test file (e.g., `__tests__/feature.test.tsx`) that fails.
    2. **GREEN**: Implement the component/API route in `src/`.
    3. **REFACTOR**: Cleanup code only after tests pass.
- **Strict Pre-Commit Rule**: 
    - You are FORBIDDEN from running `git commit` or `git push` if `npm run test` fails.
    - (if its NextJS) You must also run `npm run build` before pushing to ensure no Next.js-specific Type errors or SSR issues exist.
- **No Force Pushing**: Always pull and resolve conflicts before pushing.
- **MANDATORY Branch Check Before Push**: 
    - **ALWAYS** check current branch before ANY `git push` command.
    - If on `main` branch: **FORBIDDEN** to push. Create or switch to proper branch first.
    - Branch creation workflow:
        1. Check if relevant `agent/*` branch exists: `git branch -a | grep agent/`
        2. If exists: `git checkout agent/branch-name` and pull latest
        3. If not exists: `git checkout -b agent/descriptive-name`
        4. Only then proceed with commit and push
    - Pre-push checklist: `git branch --show-current` MUST NOT return `main`.
