### Divider

The `Divider` component is a simple and customizable component that can be used to visually separate content within your application. It supports different sizes, orientations, and styles.

#### Import
```jsx
import { Divider } from '@rapid-web/ui';
```

#### Usage

Here's a basic example of how to use the `Divider` component:
```jsx
<div className="flex-col h-48 w-48 items-center justify-center">
  <div className="h-16 w-16 bg-blue-200" />
  <Divider
    orientation="horizontal"
    size="sm"
    variant="solid"
  />
  <div className="h-16 w-16 bg-blue-200" />
</div>
```

#### Props

-   `styles`: Custom styles to be applied to the `Divider` component. (String)
-   `size`: Sets the size of the divider. Available options are `'sm'`, `'md'`, `'lg'`, and `'xl'`. The default is `'sm'`. (String)
-   `orientation`: Sets the orientation of the divider. Available options are `'horizontal'` and `'vertical'`. The default is `'horizontal'`. (Orientation)
-   `variant`: Sets the style of the divider. Available options are `'dashed'` and `'solid'`. The default is `'solid'`. (String)

#### Customization

The `Divider` component can be customized using the `styles`, `size`, `orientation`, and `variant` props. Here's an example of a vertical divider with a dashed line and large size:

```jsx
<div className="flex-row w-48 h-48 items-center justify-center">
  <div className="h-16 w-16 bg-blue-200" />
  <Divider
    orientation="vertical"
    size="lg"
    variant="dashed"
  />
  <div className="h-16 w-16 bg-blue-200" />
</div>
```

#### Additional Resources

For more information and examples, please visit the `Divider` component's Storybook page:

-   [Storybook: Divider](https://storybook.rapid.cincinnati.ventures/?path=/docs/components-layout-divider--primary)

