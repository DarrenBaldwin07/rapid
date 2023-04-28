### SkeletonText

The `SkeletonText` component is used to display placeholder text lines while content is being loaded, providing a better user experience by indicating that data is being fetched. It can be customized with different styles, speeds, and line spacings.

#### Import
```jsx
import { SkeletonText } from '@rapid-web/ui';
```

#### Usage

Here's a basic example of how to use the `SkeletonText` component:
```jsx
<SkeletonText
  isLoading
  lineSpacing="lg"
  numberOfLines={4}
/>
```

#### Props

-   `styles`: Custom styles to be applied to the `SkeletonText` component. (String)
-   `containerStyles`: Custom styles to be applied to the container of `SkeletonText`. (String)
-   `isLoading`: Determines if the skeleton text is being shown or not. (Boolean)
-   `numberOfLines`: The number of text lines to be displayed as a skeleton. (Number)
-   `speed`: The speed of the skeleton pulse animation. (String)
-   `lineSpacing`: The spacing between the lines in the skeleton text. (String)

#### Customization

The `SkeletonText` component can be customized using the `styles`, `containerStyles`, `speed`, and `lineSpacing` props. The `styles` prop allows you to pass Tailwind CSS classes as a string to style the component. The `containerStyles` prop is used to style the container of the skeleton text. The `speed` prop lets you choose from predefined animation speeds. The `lineSpacing` prop allows you to set the spacing between the lines of the skeleton text.

Here's an example of a customized `SkeletonText` component with custom height and width:
```jsx
<SkeletonText
  isLoading
  lineSpacing="lg"
  numberOfLines={4}
  styles="h-4 w-1/2"
/>
```

#### Additional Resources

For more information and examples, please visit the `SkeletonText` component's Storybook page:

-   [Storybook: SkeletonText](https://storybook.rapid.cincinnati.ventures/?path=/docs/components-feedback-skeletontext--primary)

