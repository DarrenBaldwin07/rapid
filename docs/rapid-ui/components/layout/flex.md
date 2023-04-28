### Flex

The `Flex` component is a simple and customizable container component that allows you to easily create flexible layouts using the flexbox CSS model. It can be used to align and distribute items within a container.

#### Import
```jsx
import { Flex } from '@rapid-web/ui';
```

#### Usage

Here's a basic example of how to use the `Flex` component:
```jsx
<Flex styles="justify-evenly">
  <Button variant="primary">
    Button 1
  </Button>
  <Button variant="secondary">
    Button 2
  </Button>
  <Button variant="destructive">
    Button 3
  </Button>
</Flex>
```

#### Props

-   `styles`: Custom styles to be applied to the `Flex` component. (String)

#### Customization

The `Flex` component can be customized using the `styles` prop. This prop allows you to pass Tailwind CSS classes as a string to style the component.

Here's an example of a `Flex` container with items aligned center and distributed evenly:
```jsx
<Flex styles="items-center justify-evenly">
  <Button variant="primary">
    Button 1
  </Button>
  <Button variant="secondary">
    Button 2
  </Button>
  <Button variant="destructive">
    Button 3
  </Button>
</Flex>
```

#### Additional Resources

For more information and examples, please visit the `Flex` component's Storybook page:

-   [Storybook: Flex](https://storybook.rapid.cincinnati.ventures/?path=/docs/components-layout-flex--primary)

