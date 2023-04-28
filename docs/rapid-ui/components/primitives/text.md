### Text
The `Text` component is a versatile and customizable component to render text in your application. It supports various HTML text elements, such as paragraphs, spans, and more.

#### Import
```jsx 
import { Text } from '@rapid-web/ui';
```

#### Usage

Here's a basic example of how to use the `Text` component:

```jsx
<Text>   
	Hello World! 
</Text>
```

#### Customization

The `Text` component provides a set of props to allow customization of its appearance and behavior. Some of the available props include:

-   `styles`: Allows you to pass Tailwind CSS classes as a string to style the component.
-   `as`: Controls the HTML element used to render the text (options: `"p", "span", "i", "b", "u", "abbr", "cite", "kbd", "mark", "s", "samp", "sup"`). The default is `p`.

```jsx
// Example of using the Text component with different elements
<Text as="p">
  This is a paragraph.
</Text>
<Text as="span">
  This is a span.
</Text>
<Text as="kbd">
  Ctrl + C
</Text>
```

#### Additional Resources

For more information and examples, please visit the `Text` component's Storybook page:

-   [Storybook: Text](https://storybook.rapid.cincinnati.ventures/?path=/docs/components-primitives-text--primary)