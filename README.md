# Node.js + TypeScript Project Template

A modern, opinionated Node.js project starter template using TypeScript. Includes a complete setup for development, linting, formatting, testing, pre-commit hooks, and CI workflows.

## Features

- ✅ TypeScript (strict) with Node.js
- ✅ ESLint with recommended rules and perfectionist plugin
- ✅ Prettier for consistent formatting
- ✅ Vitest for unit testing with coverage support
- ✅ TSX for fast local development with `.env` support
- ✅ Pre-commit checks using Husky and lint-staged
- ✅ GitHub Actions workflows for CI

## Getting Started

### 1. Use as Template

Click **"Use this template"** on GitHub to create a new repo based on this one.

### 2. Copy `.env`

```bash
    cp .env.example .env
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Development

```bash
npm run dev
```

### 5. Build

```bash
npm run build
```

### 6. Testing

```bash
npm test
# or
npm run test:ui  # interactive UI mode
npm run coverage  # run tests with coverage
```

## Scripts

| Script         | Description                                      |
| -------------- | ------------------------------------------------ |
| `dev`          | Run with hot reload via TSX                      |
| `start`        | Run compiled JS from `dist/`                     |
| `build`        | Compile TypeScript (using `tsconfig.build.json`) |
| `type-check`   | Run TypeScript type checker                      |
| `lint`         | Lint code using ESLint                           |
| `lint:fix`     | Auto-fix lint issues                             |
| `format`       | Format all files using Prettier                  |
| `format:check` | Check formatting without writing                 |
| `test`         | Run tests via Vitest                             |
| `test:run`     | Run tests non-interactively                      |
| `test:ui`      | Run tests in interactive UI                      |
| `coverage`     | Run tests and generate coverage                  |

## Pre-Commit Hooks

Powered by **Husky** and **lint-staged**. Automatically checks and formats code before commits.

## Linting & Formatting

- ESLint with:
  - `@eslint/js`
  - `eslint-plugin-perfectionist`
  - `@vitest/eslint-plugin`
- Prettier with `lint-staged` integration

## Continuous Integration

Add GitHub Actions workflows under `.github/workflows/ci.yml` (example not included here by default, but ready to integrate).

## License

This project is open source under the [MIT License](LICENSE).
