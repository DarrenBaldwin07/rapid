import React from 'react';
import { Switch as HeadlessSwitch, SwitchGroupProps } from '@headlessui/react';
import { RapidStyles } from '../../utils';
import classes from '../../conditional';
import { createVariant } from '../../theme';

const RAPID_CLASSNAME = 'rapid-switch';

interface SwitchProps extends SwitchGroupProps<typeof HeadlessSwitch> {
  styles?: string;
  ariaLabel?: string;
  enabled: boolean;
};

const Switch = React.forwardRef<
	React.ElementRef<typeof HeadlessSwitch>,
	SwitchProps
>(({ styles, ariaLabel, enabled, ...rest }, ref) => {

  const defaultStyles = 'relative inline-flex h-[28px] w-[52px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75';

  return (
      <HeadlessSwitch
        checked={enabled}
        ref={ref}
        {...rest}
        className={RapidStyles(styles || rest.className, classes(enabled ? 'bg-black' : 'bg-lightGrey', defaultStyles), RAPID_CLASSNAME)}
      >
        <span className="sr-only">{ariaLabel || 'toggle'}</span>
        <span
          aria-hidden="true"
          className={classes(enabled ? 'translate-x-6' : 'translate-x-0', ' pointer-events-none inline-block h-[24px] w-[24px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out')}
        />
      </HeadlessSwitch>
  )
});

export default Switch;


