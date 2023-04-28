### Input

The `Input` component is a customizable and versatile text input component that can be used for various form elements, such as text fields, number inputs, and more. It is designed to be accessible, responsive, and easy to use.

#### Import

```jsx
import { Input } from '@rapid-web/ui';
```

#### Usage

Here's a basic example of how to use the `Input` component:

```jsx
<Input placeholder="Enter your text here" />
```

#### Customization

The `Input` component provides a set of props to allow customization of its appearance and behavior. Some of the available props include:

- `placeholder`: Sets the placeholder text for the input field.
- `variant`: Controls the visual appearance of the input (options: `"default", "filled", "faded", "invalid", "flushed", "unstyled"`).
- `styles`: Allows you to apply custom styles to the input. [tailwindcss](https://tailwindcss.com/) can be used to customize the appearance of the button.

#### Examples

```jsx
// Example of a default input
<Input placeholder="Default Input" />

// Example of a filled input
<Input placeholder="Filled Input" variant="filled" />

// Example of an invalid input
<Input placeholder="Invalid Input" variant="invalid" />

// Example of a custom-styled input
<Input placeholder="Custom Styled Input" styles="bg-blue-200 rounded-md" />
```

#### Additional Resources

For more information and examples, please visit the `Input` component's Storybook page:

-   [Storybook: Input](https://storybook.rapid.cincinnati.ventures/?path=/docs/components-primitives-input--default)

