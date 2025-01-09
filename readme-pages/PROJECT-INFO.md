# Project Summary:

## Project Information

- **Project Name:** Angular Blog App (Andres Soria)
- **Version:** -

---

## Scripts

The project provides the following NPM scripts:

- **`ng`**: Alias for Angular CLI.
- **`start`**: Starts the development server.
  ```bash
  npm run start
  ```
- **`build`**: Builds the project for production.
  ```bash
  npm run build
  ```
- **`watch`**: Builds the project in development mode with file watch.
  ```bash
  npm run watch
  ```
- **`test`**: Runs unit tests.
  ```bash
  npm run test
  ```
- **`lint`**: Lints the codebase.
  ```bash
  npm run lint
  ```
- **`format`**: Formats the source files using Prettier.
  ```bash
  npm run format
  ```
- **`prepare`**: Runs Husky for git hooks setup.
- **`test:ci`**: Runs unit tests in CI mode with headless Chrome.
  ```bash
  npm run test:ci
  ```
- **`analyze:deps:all`**: Generates a dependency graph image.
  ```bash
  npm run analyze:deps:all
  ```

---

## Dependencies

### Core Dependencies

- **Angular Framework:**

  - `@angular/animations`: ^19.0.6
  - `@angular/cdk`: ~19.0.5
  - `@angular/common`: ^19.0.6
  - `@angular/compiler`: ^19.0.6
  - `@angular/core`: ^19.0.6
  - `@angular/forms`: ^19.0.6
  - `@angular/material`: ~19.0.5
  - `@angular/platform-browser`: ^19.0.6
  - `@angular/platform-browser-dynamic`: ^19.0.6
  - `@angular/router`: ^19.0.6

- **Additional Libraries:**
  - `angular-auth-oidc-client`: 19.0.0
  - `firebase`: ^11.1.0
  - `material-design-icons`: ^3.0.1
  - `rxjs`: ~7.8.1
  - `tslib`: ^2.8.1
  - `zod`: ^3.24.1
  - `zone.js`: ~0.15.0

### Dev Dependencies

- **Angular CLI and Build Tools:**

  - `@angular-devkit/build-angular`: ^19.0.7
  - `@angular/cli`: ^19.0.7
  - `@angular/compiler-cli`: ^19.0.6

- **Testing Tools:**

  - `@types/jasmine`: ~5.1.5
  - `jasmine-core`: ~5.5.0
  - `karma`: ~6.4.4
  - `karma-chrome-launcher`: ~3.2.0
  - `karma-coverage`: ~2.2.1
  - `karma-jasmine`: ~5.1.0
  - `karma-jasmine-html-reporter`: ~2.1.0

- **Linting and Formatting:**

  - `angular-eslint`: 19.0.2
  - `eslint`: ^9.17.0
  - `prettier`: ^3.4.2
  - `typescript-eslint`: 8.19.1

- **Other Tools:**
  - `husky`: ^9.1.7
  - `lint-staged`: ^15.3.0
  - `typescript`: ~5.5.2

---

## Code Quality and Pre-Commit Hooks

### **Commit Linting**

- Configured with `@commitlint/config-conventional`.
- Ensures conventional commit messages.

### **Lint-Staged Configuration**

- Automatically runs linters and formatters on staged files.
- Configured for:
  - **ESLint** on `*.ts, *.js, *.html` files.
  - **Prettier** on `*.ts, *.js, *.html, *.css, *.scss, *.less, *.md` files.

---
