# Angular Blog App - Getting Started

Welcome to the **Angular Blog App**! This guide will help you set up, run, and explore the project after cloning the repository.

---

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v16.x or higher, LTS version recommended)

   - Download and install from [Node.js official website](https://nodejs.org/).

2. **Angular CLI** (v15.x or higher)

   - Install globally using:
     ```bash
     npm install -g @angular/cli
     ```

3. **Git**
   - Download and install from [Git official website](https://git-scm.com/).

---

## Getting Started

### 1. Clone the Repository

Clone the project repository to your local machine:

```bash
git clone git@github.com:hftm-in2022/angular-blog-app-andres-soria.git
```

### 2. Open the project in VS Code

Make sure the terminal is visible and ready.

### 3. Install Dependencies

Install the required dependencies using `npm`:

```bash
npm install
```

This will download and install all the necessary packages defined in `package.json`.

---

## Running the Application

### 1. Development Server

Start the development server:

```bash
ng serve -o
```

The app will be available at [http://localhost:4200](http://localhost:4200). With the `-o` option, the browser will automatically open up and show the running app.

### 2. Build the Project

If you want to build the project for production:

```bash
ng build --prod
```

The compiled files will be located in the `dist/` folder.

---

## Useful Commands

### Serve the Application

```bash
ng serve -o
```

Runs the app in development mode. Navigate to [http://localhost:4200](http://localhost:4200).

### Run Unit Tests

```bash
ng test --browsers ChromeHeadless
```

Executes unit tests using Karma. The `--browsers ChromeHeadless` option, the tests are run in the background.

### Lint the Code

```bash
ng lint
```

Checks the code for linting issues.

### Update the project version

Project version is 0.0.0 => major.minor.patch

To increment major version:

```bash
npm version major
```

To increment minor version:

```bash
npm version minor
```

To increment patch version:

```bash
npm version patch
```

---

## Troubleshooting

If you encounter any issues, try the following:

1. **Force clear npm cache (not necessary in most cases):**

   ```bash
   npm cache clean --force
   ```

2. **Ensure Angular CLI is up to date:**

   ```bash
   npm install -g @angular/cli@latest
   ```

3. **Check for peer dependency issues:**
   Use the `--legacy-peer-deps` flag if needed:
   ```bash
   npm install --legacy-peer-deps
   ```

---
