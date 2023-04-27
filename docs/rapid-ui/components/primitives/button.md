The `Button` component is a versatile and customizable button that can be used in various parts of your application. It is designed to be accessible, responsive, and easy to use.

#### Usage

Here's a basic example of how to use the `Button` component:

```tsx
import { Button } from '@rapid-web/ui';

function App() {
  return (
    <Button>
      Hello World!
    </Button>
  );
}
```

#### Customization

The `Button` component provides a set of props to allow customization of its appearance and behavior. Some of the available props include:

- `styles`: Custom styles to be applied to the button. [tailwindcss](https://tailwindcss.com/) can be used to customize the appearance of the button. if you prefer using the standard className wording....
- `variant`: Controls the visual appearance of the button (e.g., `outline, link, destructive, ghost` etc.).
- `isLoading`: To show a loading spinner on the button. The default is `false`
- `size`: Determines the size of the button (e.g.,`small, large`). The default is `medium`
- `disabled`: Disables the button when set to `true`.

#### Examples
> mention variants and sizze

```jsx
// Example of a primary button 
<Button variant="primary"> 
	Primary Button 
</Button> 

// Example of a large, secondary button 
<Button variant="secondary" size="large"> 
	Large Secondary Button 
</Button> 

// Example of a disabled button 
<Button disabled> 
	Disabled Button 
</Button>
```


#### Additional Resources

For more information and examples, please visit the `Button` component's Storybook page:

-   [Storybook: Button](https://storybook.rapid.cincinnati.ventures/?path=/docs/components-primitives-button--primary)