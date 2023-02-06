import * as jest from "jest-mock";
import '../src/styles/tailwind-dev.css';
window.jest = jest;

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
