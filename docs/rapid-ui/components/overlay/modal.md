### Modal

The `Modal` component is used to display content in a separate layer above the main content of the page. It's useful for displaying dialogs, forms, or other important information that requires user interaction.

#### Import
```jsx
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@rapid-web/ui';
```

#### Usage

Here's a basic example of how to use the `Modal` component:
```jsx
<>
  <Button onClick={/* function to open the modal */}>
    Delete Account
  </Button>
  <Modal
    open={/* boolean to indicate if the modal is open */}
    onClose={/* function to close the modal */}
  >
    <ModalContent>
      <ModalHeader>
        Delete Account
      </ModalHeader>
      <ModalBody>
        <Text styles="text-secondaryGrey">
          Are you sure you want to delete your account? All of your data will be permanently removed. This action cannot be undone.
        </Text>
      </ModalBody>
      <ModalFooter>
        <Button
          ref={/* ref for the cancel button */}
          onClick={/* function to close the modal */}
          variant="outline"
        >
          Cancel
        </Button>
        <Button onClick={/* function to deactivate account */}>
          Deactivate
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
</>
```

#### Props

-   `open`: A boolean to indicate whether the modal is open or closed. (Boolean)
-   `onClose`: A function to be called when the modal is closed. (Function)
-   `initialFocus`: A ref for the element that should receive focus when the modal opens. (Ref, optional)
-   `enableAnimation`: A boolean to enable or disable modal animation. Default is `true`. (Boolean, optional)
-   `zIndex`: The zIndex value for the modal. (Number, optional)
-   `fadeAnimation`: An object with options to configure the fade animation of the modal. (Object, optional)
-   `enableOverlay`: A boolean to enable or disable the overlay behind the modal. Default is `true`. (Boolean, optional)
-   `styles`: Custom styles to be applied to the modal. (String, optional)

#### Customization

The `Modal` component can be customized using the `enableAnimation` prop to enable or disable the animation of the modal. The props can be used to customize the behavior of the Modal component

#### Additional Resources

For more information and examples, please visit the `Modal` component's Storybook page:

-   [Storybook: Modal](https://storybook.rapid.cincinnati.ventures/?path=/docs/components-overlay-modal--primary)