### [◄ Go back to the Readme](../README.md)

# Initial project setup: Iteration 0

[**See commit message conventions for this project**](https://www.conventionalcommits.org/)

## 1. Create basic angular project

- Styling: SCSS
- Server side rendering: No

```sh
ng new angular-<project name>-<first name>-<last name>
```

## 2. Add code quality tools to project

### 2.1 ESLint for static code analysis:

```sh
ng add @angular-eslint/schematics
```

### 2.2 Prettier for automatic code format:

- Install:

```sh
npm install prettier --save-dev
```

- In package.json add following lines to "scripts" array:

```json
"format": "npx prettier --write ./src/app/*"
```

### 2.3 Generate environments for angular project:

```sh
ng generate environments
```

### 2.4 CommitLint to check commit messages on conventions:

- Install:

```sh
npm install @commitlint/cli @commitlint/config-conventional
```

- Add following lines to package.json

```json
"commitlint": {
 "extends": [
   "@commitlint/config-conventional"
 ]
}
```

### 2.5 LintStaged (apply code formatting at every commit on changed files only):

- Install

```sh
npm install --save-dev lint-staged
```

- Add following lines to package.json

```json
"lint-staged": {
 "*.{ts,js,html}": "eslint --cache --fix",
 "*.{ts,js,html,css,scss,less,md}": "prettier --write"
}
```

### 2.6 Husky for commit hooks (apply commit naming and code formatting on every commit on changed files):

- Install

```sh
npm install --save-dev husky
```

- Initialize

```sh
npx husky init
```

- In package.json add following lines to "scripts" array (may be added automatically):

```json
"prepare": "husky"
```

- Execute prepare script manually once:

```sh
npm run prepare
```

- Create commit hook for CommitLint:

```sh
echo 'npx --no-install commitlint --edit "$1"' > .husky/commit-msg
```

- Create pre-commit hook for LintStaged:

```sh
echo 'npx --no-install lint-staged' > .husky/pre-commit
```

## 3. Use GitHub Actions to deploy static webapp to Azure

### 3.1 Install Azure Tools for vs code

[=> VS Marketplace: Azure Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack)

### 3.2 Create Azure static webapp

a) Open Azure Tools in VS Code

b) Right click on "Static Web Apps" and select "Create Static Web App..."

c) Select resource group

d) Enter the name of the web app

e) Select "Angular" as framework

f) Apply default "/" as root directory

g) App distribution location: "dist/<project name>/browser

Once finished, it will add a workflow file to the repo to deploy the app on azure.

---

# Troubleshoot

## GitHub related

- When working with GitHub Actions and Dependabot, the azure build script can fail. This is because the Dependabot has no permission to push to azure. To fix this, go to repository settings and add a new secret for Depandabot with the same name as the secret in the secrets for "Actions" (AZURE*STATIC_WEB_APPS_API_TOKEN*&lt;Web App Name&gt;). Copy the deployment key from azure and set it as the new secrets value. Re-run scripts from the pr and it should work.

## Azure related

--
