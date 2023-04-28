### Spinner

The `Spinner` component is a loading indicator used to communicate to users that data is being fetched or processed. It can be customized with different sizes, speeds, and styles.

#### Import
```jsx
import { Spinner } from '@rapid-web/ui';
```

#### Usage

Here's a basic example of how to use the `Spinner` component:
```jsx
<Spinner
  label="Loading..."
  size="md"
  speed="fast"
/>
```

#### Props

-   `styles`: Custom styles to be applied to the `Spinner` component. (String)
-   `label`: Accessible label for the spinner, typically "Loading..." or a similar message. (String)
-   `speed`: The speed of the spinner animation. Available options are 'slow', 'medium', and 'fast'. (String)
-   `size`: The size of the spinner. Available options are 'sm', 'md', and 'lg'. (String)

#### Customization

The `Spinner` component can be customized using the `styles`, `speed`, and `size` props. The `styles` prop allows you to pass Tailwind CSS classes as a string to style the component. The `speed` prop lets you choose from predefined animation speeds. The `size` prop allows you to set the size of the spinner.

Here's an example of a customized `Spinner` component with custom color and size:

```jsx
<Spinner
  label="Loading..."
  size="lg"
  speed="medium"
  styles="bg-red-500"
/>
```

#### Additional Resources

For more information and examples, please visit the `Spinner` component's Storybook page:

-   [Storybook: Spinner](https://storybook.rapid.cincinnati.ventures/?path=/docs/components-feedback-spinner--primary)