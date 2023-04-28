### Container

The `Container` component is a responsive layout component that helps to contain and center your content within the viewport. It provides a way to set a maximum width and apply default padding.

#### Import
```jsx
import { Container } from '@rapid-web/ui';
```

#### Usage

Here's a basic example of how to use the `Container` component:
```jsx
<Container>
  <div
    style={{
      alignItems: 'center',
      backgroundColor: 'red',
      display: 'flex',
      fontWeight: 'bold',
      height: '50px',
      justifyContent: 'center',
      width: '100%'
    }}
  >
    I'm a div wrapper inside a Rapid-UI container
  </div>
</Container>
```

#### Props

-   `styles`: Custom styles to be applied to the `Container` component. (String)
-   `maxWidth`: Sets the maximum width of the container. Available options are `'sm'`, `'md'`, and `'lg'`. The default is `'lg'`. (MaxWidth)

#### Customization

The `Container` component can be customized using the `styles` prop to apply additional styling. You can also control the maximum width of the container by using the `maxWidth` prop.

```jsx
<Container styles="bg-blue-200 p-4" maxWidth="md">
  <div>
    I'm a div wrapper inside a Rapid-UI container with a custom background color and padding, and a medium maximum width.
  </div>
</Container>
```

#### Additional Resources

For more information and examples, please visit the `Container` component's Storybook page:

-   [Storybook: Container](https://storybook.rapid.cincinnati.ventures/?path=/docs/components-layout-container--primary)