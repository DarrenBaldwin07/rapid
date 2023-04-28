### Stack

The `Stack` component is a simple and customizable container component that allows you to easily create layouts with consistent spacing between items. It supports both horizontal and vertical stacking directions.

#### Import
```jsx
import { Stack } from '@rapid-web/ui';
```

#### Usage

Here's a basic example of how to use the `Stack` component:
```jsx
<Stack
  direction="column"
  spacing="lg"
>
  <Button variant="primary">
    Button 1
  </Button>
  <Button variant="secondary">
    Button 2
  </Button>
  <Button variant="destructive">
    Button 3
  </Button>
</Stack>
```

#### Props

-   `spacing`: Spacing between items in the stack. Can be 'sm', 'md', or 'lg'. (String)
-   `direction`: Direction of the stack. Can be 'row' or 'column'. (String)
-   `styles`: Custom styles to be applied to the `Stack` component. (String)

#### Customization

The `Stack` component can be customized using the `spacing`, `direction`, and `styles` props. The `spacing` prop determines the space between items in the stack, while the `direction` prop sets the direction of the stack. The `styles` prop allows you to pass Tailwind CSS classes as a string to style the component.

Here's an example of a horizontal `Stack` container with a small spacing:

```jsx
<Stack
  direction="row"
  spacing="sm"
>
  <Button variant="primary">
    Button 1
  </Button>
  <Button variant="secondary">
    Button 2
  </Button>
  <Button variant="destructive">
    Button 3
  </Button>
</Stack>
```

#### Additional Resources

For more information and examples, please visit the `Stack` component's Storybook page:

-   [Storybook: Stack](https://storybook.rapid.cincinnati.ventures/?path=/docs/components-layout-stack--primary)
