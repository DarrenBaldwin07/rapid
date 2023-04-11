# Getting Started
To setup your dev environment for Rapid-UI on your local machine follow these steps:

- node v16 or higher is required
- pnpm

1. Navigate to the UI package and build the package: cd rapid/packages/rapid-ui && npm run build

2. Locate the example app (inside of `rapid/examples/ui`) and install the dependencies via pnpm install && pnpm dev

View the Rapid UI components at http://localhost:5173. If making changes, be sure to rebuild the rapid-ui package and reinstall the example project so that it uses the updated package.

> Checkout the storybook of components found here: https://storybook.rapid.cincinnati.ventures
