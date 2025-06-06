# @repo/tools

## 0.4.2

### Patch Changes

- 5bd3813: some patch
- Updated dependencies [5bd3813]
  - @repo/zod@0.1.4

## 0.4.1

### Patch Changes

- 7220179: remove force color (already added by gha)

## 0.4.0

### Minor Changes

- 4098da2: feat: refactor into multiple files and add tests

### Patch Changes

- f538549: chore: improve script a bit

## 0.3.2

### Patch Changes

- 1be1760: patch all the things!
- Updated dependencies [1be1760]
  - @repo/zod@0.1.3

## 0.3.1

### Patch Changes

- 5f29f56: chore: simplify script
- Updated dependencies [5f29f56]
  - @repo/zod@0.1.2

## 0.3.0

### Minor Changes

- 442c820: feat: dynamically import typescript instead of having separate entrypoint

  also adds a command to build with tsc

### Patch Changes

- b1a6e35: chore: rename \_ts to #ts
- 1c1dfa7: chore: rename run-eslint-workers to run-eslint-default
- Updated dependencies [1c1dfa7]
  - @repo/zod@0.1.1

## 0.2.0

### Minor Changes

- e650f5e: feat: only output from turbo build when it fails

  reduces noise when running `just gen`

- b615c80: feat: allow passing in sourcemap
- 53190e7: feat: clean up scripts

### Patch Changes

- d0fa18b: fix: run format after updating packages
- 15b265a: chore: update deps
- 43e0e0d: chore: move minify to flag
- e3b75a0: chore: update deps
- ec87476: chore: add tests
- db50406: fix: don't set external when platform=node
- 1a85730: feat: add --types flag to bundle-lib cmd
- b2a9f0d: fix: define require in tsconfig.ts to ensure it works in modules
- 15b265a: chore: switch to tree-shakable imports
- 5cb6aae: fix: run syncpack fix-mismatches after update
- 366930e: fix: minify output for node
  - @repo/zod@0.1.0
