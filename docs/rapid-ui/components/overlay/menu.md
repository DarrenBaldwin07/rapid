### Menu

The `Menu` component is a dropdown menu that can be used for navigation or actions. It consists of a `MenuButton` that triggers the dropdown and a list of `MenuItems` that can be selected.

#### Import
```jsx
import { Menu, MenuButton, MenuItems, MenuItem } from '@rapid-web/ui';
```

#### Usage

Here's a basic example of how to use the `Menu` component:
```jsx
<Menu>
  <MenuButton variant="outline">
    Menu
  </MenuButton>
  <MenuItems>
    <MenuItem>Option 1</MenuItem>
    <MenuItem>Option 2</MenuItem>
    <MenuItem>Option 3</MenuItem>
    <MenuItem>Option 4</MenuItem>
  </MenuItems>
</Menu>
```

#### Props

`Menu` component does not have any specific props, but it accepts all `HTMLAttributes` for a `div`.

-   `styles`: Custom styles to be applied to the menu. (String, optional)

#### Customization

The `Menu` component can be customized using the `styles` prop to apply custom styles to the menu.

#### Additional Resources

For more information and examples, please visit the `Menu` component's Storybook page:

-   [Storybook: Menu](https://storybook.rapid.cincinnati.ventures/?path=/docs/components-overlay-menu--primary)
