### Skeleton

The `Skeleton` component is used to display a placeholder while content is being loaded, providing a better user experience by indicating that data is being fetched. It can be customized with different styles and speeds.

#### Import
```jsx
import { Skeleton } from '@rapid-web/ui';
```

#### Usage

Here's a basic example of how to use the `Skeleton` component:
```jsx
<Skeleton />
```

#### Props

-   `styles`: Custom styles to be applied to the `Skeleton` component. (String)
-   `isLoading`: Determines if the skeleton is being shown or not. (Boolean)
-   `speed`: The speed of the skeleton pulse animation. (String)

#### Customization

The `Skeleton` component can be customized using the `styles` and `speed` props. The `styles` prop allows you to pass Tailwind CSS classes as a string to style the component. The `speed` prop lets you choose from predefined animation speeds.

Here's an example of a customized `Skeleton` component with a custom height and width:
```jsx
<Skeleton styles="h-12 w-48" />
```

#### Additional Resources

For more information and examples, please visit the `Skeleton` component's Storybook page:

-   [Storybook: Skeleton](https://storybook.rapid.cincinnati.ventures/?path=/docs/components-feedback-skeleton--default)

