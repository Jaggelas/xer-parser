# Changelog

All notable changes to this project will be documented in this file.

## 2.0.0 - 2025-09-08

Breaking changes:

- Validation API returns structured results only. `validate()` now always returns `ValidationIssue[]`.
  - Removed legacy string[] mode and the `structured` option.
  - New options: `{ autoRefresh?: boolean }` to rebuild entities inside `validate`.

Enhancements:

- Dayjs ESM subpath imports fixed for Node ESM (explicit .js plugin imports).
- Bench script runnable via Node ESM (`npm run bench`).
- README and tests updated to reflect structured validation.
- CI moved to Node/npm; added cross-OS matrix.
- Release workflow publishes to npm on tags `v*`.

Migration notes:

- Replace any `xer.validate().some(i => i.includes('...'))` checks with
  `xer.validate().some(i => i.code === '...')` or inspect other fields
  like `table`, `id`, `refTable`, `refId`.
