### Select

The `Select` component is a customizable and versatile dropdown component that can be used to create a selection menu in your application. It is designed to be accessible, responsive, and easy to use.

#### Import
```jsx
import { Select, Option } from '@rapid-web/ui';
```

#### Usage

Here's a basic example of how to use the `Select` component:

```jsx
<Select>
  <Option value="test1">
	Option 1
  </Option>
  <Option value="test2">
	Option 2
  </Option>
  <Option value="test3">
	Option 3
  </Option>
</Select>
```

#### Customization

The `Select` component provides a set of props to allow customization of its appearance and behavior. Some of the available props include:

-   `styles`: Allows you to pass Tailwind CSS classes as a string to style the component.
-   `icon`: Customizes the icon displayed in the select component.
-   `iconProps`: Provides additional props for the icon component.
-   `variant`: Controls the visual appearance of the select component (options: "`default", "filled", "invalid", "flushed", "unstyled"`).
-   `variantSize`: Sets the size of the select component.
-   `placeholder`: Sets the placeholder text for the select component.
-   `selectStyles`: Allows you to pass Tailwind CSS classes as a string to style the internal `select` element.

```jsx
// Example of a default select
<Select>
  <Option value="option1">
    Option 1
  </Option>
  <Option value="option2">
    Option 2
  </Option>
</Select>

// Example of a filled select with custom styles
<Select styles="w-64 bg-blue-100" variant="filled">
  <Option value="option1">
    Option 1
  </Option>
  <Option value="option2">
    Option 2
  </Option>
</Select>
```

#### Additional Resources

For more information and examples, please visit the `Select` component's Storybook page:

-   [Storybook: Select](https://storybook.rapid.cincinnati.ventures/?path=/docs/components-primitives-select--default)

