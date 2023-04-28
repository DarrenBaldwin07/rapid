### Drawer

The `Drawer` component is a sliding panel that can be used to display additional content or navigation items. It can be configured to slide from different directions: left, right, top, or bottom.

#### Import
```jsx
import { Drawer, DrawerContent } from '@rapid-web/ui';
```

#### Usage

Here's a basic example of how to use the `Drawer` component:
```jsx
<>
  <Button onClick={/* function to open the drawer */}>
    Open Drawer
  </Button>
  <Drawer
    direction="right"
    initialFocus={/* ref for the element to focus on when the drawer opens */}
    onClose={/* function to close the drawer */}
  >
    <DrawerContent>
      {/* Add your drawer content here */}
    </DrawerContent>
  </Drawer>
</>
```

#### Props

-   `open`: A boolean to indicate whether the drawer is open or closed. (Boolean)
-   `onClose`: A function to be called when the drawer is closed. (Function)
-   `direction`: The direction from which the drawer slides in. Available options are 'left', 'right', 'top', and 'bottom'. Default is 'right'. (String, optional)
-   `size`: The size of the drawer. Available options are 'sm', 'md', 'lg', 'xl', and 'full'. Default is 'md'. (String, optional)
-   `enableAnimation`: A boolean to enable or disable drawer animation. Default is `true`. (Boolean, optional)
-   `initialFocus`: A ref for the element that should receive focus when the drawer opens. (Ref, optional)
-   `enableOverlay`: A boolean to enable or disable the overlay behind the drawer. Default is `true`. (Boolean, optional)
-   `zIndex`: The zIndex value for the drawer. (Number, optional)
-   `styles`: Custom styles to be applied to the drawer. (String, optional)

#### Customization

The `Drawer` component can be customized using the `direction` prop to choose the direction from which the drawer should slide in. Other props can be used as well to customize the behaviour of the drawer.


#### Additional Resources

For more information and examples, please visit the `Drawer` component's Storybook page:

-   [Storybook: Drawer](https://storybook.rapid.cincinnati.ventures/?path=/docs/components-overlay-drawer--primary)
