### Textarea

The `Textarea` component is a customizable textarea element that can be used for user input in your application.

#### Import

`import { Textarea } from '@rapid-web/ui';`

#### Usage

Here's a basic example of how to use the `Textarea` component:

`<Textarea />`

#### Customization

The `Textarea` component provides a set of props to allow customization of its appearance and behavior. Some of the available props include:

-   `variant`: Controls the style variant of the textarea (options: `"default", "filled", "faded", "invalid", "unstyled"`). The default is `default`.
-   `styles`: Allows you to pass Tailwind CSS classes as a string to style the component.

```jsx
// Example of using the Textarea component with different variants 
<Textarea variant="filled" /> 
<Textarea variant="faded" /> 
<Textarea variant="invalid" />`
```


#### Additional Resources

For more information and examples, please visit the `Textarea` component's Storybook page:

-   [Storybook: Textarea](https://storybook.rapid.cincinnati.ventures/?path=/docs/components-primitives-textarea--primary)