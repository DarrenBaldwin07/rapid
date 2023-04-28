### Accordion

The `Accordion` component is a versatile and customizable collapsible content container that can be used to display information more efficiently. It comes with several built-in options for controlling its behavior and appearance.

#### Import

```jsx
import {   Accordion,   AccordionItem,   AccordionContent,   AccordionHeader,   AccordionIcon, } from '@rapid-web/ui';
```

#### Usage

To create an Accordion with default behavior:

```jsx
<Accordion>
  <AccordionItem>
    <AccordionHeader>
      Item 1<AccordionIcon />
    </AccordionHeader>
    <AccordionContent>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
      do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
      ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </AccordionContent>
  </AccordionItem>
  {/* Add more AccordionItem components as needed */}
</Accordion>
```

#### Props

-   `allowMultiple`: Whether to allow multiple items to be open at the same time. (Boolean)
-   `allowToggle`: Whether to allow items to be closed if they are already open. (Boolean)
-   `defaultIndexes`: The indexes of the items that should be open by default. (Array)
-   `children`: The items to be rendered inside the Accordion component. (ReactNode)
-   `styles`: Custom styles to be applied to the Accordion component. (String)

#### Examples

Allow Multiple Items to be Open

```jsx
<Accordion allowMultiple>   {/* Add AccordionItem components */} </Accordion>
```

Allow Items to be Toggled Closed

jsxCopy code

`<Accordion allowToggle>   {/* Add AccordionItem components */} </Accordion>`

Set Default Open Items

```jsx
<Accordion defaultIndexes={[0, 2]}>   {/* Add AccordionItem components */} </Accordion>
```

Apply Custom Styles

```jsx
<Accordion
  styles="mt-5 pl-3 pr-3 border-2 rounded-lg bg-black text-white"
  allowToggle={false}
  defaultIndexes={[0, 1, 2]}
  allowMultiple={true}
>
  {/* Add AccordionItem components with additional classNames or styles as needed */}
</Accordion>
```

#### Customizing Accordion Items

You can customize the appearance and behavior of individual Accordion items by applying additional props or classNames to the `AccordionHeader`, `AccordionContent`, or `AccordionItem` components.

For example, to change the hover background color and text color of an `AccordionHeader`:

```jsx
<AccordionHeader className="hover:bg-black hover:text-white">
  Item 1<AccordionIcon />
</AccordionHeader>
```

Remember to consult the custom CSS framework documentation for available classNames and their corresponding styles.

#### Additional Resources

For more information and examples, please visit the `Textarea` component's Storybook page:

-   [Storybook: Accordian](https://storybook.rapid.cincinnati.ventures/?path=/docs/components-disclosure-accordion--primary)