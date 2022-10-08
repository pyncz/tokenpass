- [Setup](#setup)
  - [Development](#development)
  - [Build](#build)
- [Add translations](#add-translations)
- [Set up linting](#set-up-linting)
  - [Git hooks](#git-hooks)
  - [VS Code Setup](#vs-code-setup)


# Setup

Make sure to install the dependencies

```
ni
```

## Development

### Start the development server

```
nr dev
```
> Default port is `:3000`

### Start Vitest UI
```
nr test:ui
```
> Default path is `:51204/__vitest__`

## Build

### Build the application for production

```
nr build
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/docs/deployment).


# Set up linting

## Git hooks

It's **highly** recommended to set up commits' fixing by linter.

We're using a [simple-git-hooks](https://github.com/toplenboren/simple-git-hooks) package.

- Update packages
  ```
  ni
  ```
- Set git's hooks directory
  ```
  git config core.hooksPath .git/hooks/
  rm -rf .git/hooks
  ```
  > **Note**
  > It's important because your local git hooks dir's path might be overriden by similar package - `husky` - if you have tried it.
- Say `simple-git-hooks` to start doing its magic:
  ```
  npx simple-git-hooks
  ```

After that your staged files will be checked and fixed locally on commit.

## VS Code Setup

Get and use [`dbaeumer.vscode-eslint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [`stylelint.vscode-stylelint`](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) (don't forget to [config](https://kumardeepak.xyz/blog/stylelint-scss-and-visual-studio-code/) it) extensions.

---

We recommend to look at the [documentation](https://v3.nuxtjs.org).
