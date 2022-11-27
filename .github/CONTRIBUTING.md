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

### Start the dev server

```
nr dev
```
> Default port is `:3000`


## Build

### Build the app for production

```
nr build
```

Check the [deployment docs](https://nuxt.com/docs/getting-started/deployment).


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

Get and use [`dbaeumer.vscode-eslint`](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).

But you've probably installed it within all the other recommended extensions already, haven't you?

---

...And ofc keep the [nuxt docs](https://nuxt.com) opened ;)
