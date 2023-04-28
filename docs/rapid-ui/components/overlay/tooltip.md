### Tooltip

The `Tooltip` component is used to display descriptions about interactive elements when the user hovers over or focuses on the element.

#### Import
```jsx
import { Tooltip } from '@rapid-web/ui';
```

#### Usage

Here's a basic example of how to use the `Tooltip` component:
```jsx
<Container styles="m-8 flex justify-center">
  <Tooltip
    label="Hello from the tooltip!"
    orientation="bottom"
  >
    <Button>
      Hello World!
    </Button>
  </Tooltip>
</Container>
```

#### Props

-   `children` (React.ReactElement): A single React element that serves as the trigger for the tooltip.
-   `shouldCloseOnSroll` (Boolean, optional): A boolean to determine whether the tooltip should close when the user scrolls. Default is `false`.
-   `label` (String, optional): The text to be displayed in the tooltip.
-   `id` (String, optional): An optional ID for the tooltip element.
-   `styles` (String, optional): Custom styles to be applied to the tooltip.
-   `orientation` (String, optional): The orientation of the tooltip relative to the trigger element. Available options are 'top', 'bottom', 'left', and 'right'. Default is 'top'.
-   `isAnimated` (Boolean, optional): A boolean to enable or disable tooltip animation. Default is `true`.
-   `variant` (String, optional): A string that determines the visual style of the tooltip. Available options are 'default', 'outline', 'destructive', and 'unstyled'. Default is 'default'.

#### Customization

The `Tooltip` component can be customized using the `orientation` prop to choose the position of the tooltip relative to the trigger element.

Here's an example of a `Tooltip` component with a different orientation:
```jsx
<Container styles="m-8 flex justify-center">
  <Tooltip
    label="Hello from the tooltip!"
    orientation="right"
  >
    <Button>
      Hello World!
    </Button>
  </Tooltip>
</Container>
```

#### Additional Resources

For more information and examples, please visit the `Tooltip` component's Storybook page:

-   [Storybook: Tooltip](https://storybook.rapid.cincinnati.ventures/?path=/docs/components-overlay-tooltip--primary)

