## Summary

Setup Next.js project infrastructure with pre-commit hooks to enforce tests and code quality on every commit.

## Changes

- Add Next.js 14 + TypeScript project configuration
- Configure pre-commit hooks (Prettier, ESLint, Tests, Lint)
- Add Vitest test framework with example tests
- Create Drug types model for the Medik application
- Add Redis client dependency (ioredis) for caching
- Add basic test setup with Next.js router mocks

## Pre-commit Hooks Added

1. **Always on commit**:
   - Prettier formatting
   - ESLint linting
   - Vitest test suite (Forces tests to pass on every commit)
   - Next.js lint check

2. **On push**:
   - TypeScript type checking

## New Dependencies

- next - React framework
- vitest - Test framework
- ioredis - Redis client for caching
- prettier - Code formatting
- eslint + configs - Linting

## How to Use

```
# Install dependencies
pnpm install

# Install pre-commit hooks
pre-commit install

# Run tests manually
pnpm test

# Run linting
pnpm lint

# Run type checking
pnpm type-check
```

## Notes

- Tests MUST pass before any commit is allowed (enforced by pre-commit)
- Build check is commented out (slow, only run on push if needed)
- Python prototype (bpom_search.py) preserved for reference
- Mandatory disclaimer included in types
