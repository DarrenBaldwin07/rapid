### Switch

The `Switch` component is a toggle switch component that can be used as an interactive control in your application. It can be toggled between an enabled and disabled state, and can be customized with various styles, sizes, and variants.

```jsx
import { Switch } from '@rapid-web/ui';
```

#### Usage

Here's a basic example of how to use the `Switch` component:
```jsx
<div>
  <Switch
    ariaLabel="Toggle Switch"
    enabled
    onChange={function Ql(){}}
  />
</div>
```

#### Props

-   `styles`: Custom styles to be applied to the `Switch` component. (String)
-   `ariaLabel`: A label for accessibility purposes. (String)
-   `enabled`: Determines if the switch is enabled or not. (Boolean)
-   `size`: The size of the switch. Can be 'sm', 'md', or 'lg'. (String)
-   `variant`: The variant of the switch. (String)
-   `enabledStyles`: Custom styles for the enabled state. (String)
-   `disabledStyles`: Custom styles for the disabled state. (String)

#### Customization

The `Switch` component can be customized using the `styles`, `size`, `variant`, `enabledStyles`, and `disabledStyles` props. The `styles` prop allows you to pass Tailwind CSS classes as a string to style the component. The `size` and `variant` props let you choose from predefined styles and sizes, while the `enabledStyles` and `disabledStyles` props allow you to set custom styles for the enabled and disabled states.

Here's an example of a small `Switch` component with custom enabled and disabled styles:

```jsx
<div>
  <Switch
    ariaLabel="Toggle Switch"
    enabled
    size="sm"
    enabledStyles="bg-blue-500"
    disabledStyles="bg-red-500"
    onChange={function Ql(){}}
  />
</div>
```

#### Additional Resources

For more information and examples, please visit the `Switch` component's Storybook page:

-   [Storybook: Switch](https://storybook.rapid.cincinnati.ventures/?path=/docs/components-forms-switch--primary)