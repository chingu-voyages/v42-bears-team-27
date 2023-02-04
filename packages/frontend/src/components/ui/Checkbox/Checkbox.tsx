/* eslint-disable jsx-a11y/label-has-associated-control */
import type { RefAttributes, ForwardRefExoticComponent } from 'react';
import { forwardRef } from 'react';
import type { ThemeUIStyleObject } from 'theme-ui';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { MdCheck } from 'react-icons/md';

export interface CheckboxProps extends CheckboxPrimitive.CheckboxProps {
  /**
   * Label for the component
   */
  label?: string;
  /**
   * Size of the component
   * @default 18
   */
  size?: number;
  sx?: ThemeUIStyleObject;
}

export const Checkbox: ForwardRefExoticComponent<
CheckboxProps & RefAttributes<HTMLButtonElement>
> = forwardRef(({ children, key, id, label, size = 18, sx, ...rest }, ref) => (
  <div
    key={key}
    sx={{ display: 'flex', alignItems: 'center', color: 'primary', ...sx }}
  >
    <CheckboxPrimitive.Root
      ref={ref}
      id={id}
      sx={{
        variant: 'buttons.primary.outlined',
        p: 0,
        width: `calc(${size}px + 4px)`,
        height: `calc(${size}px + 4px)`,
        cursor: 'pointer',
      }}
      {...rest}
    >
      <CheckboxPrimitive.Indicator>
        <MdCheck size={size} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
    {label && (
      <label
        htmlFor={id}
        sx={{
          variant: 'text.label',
          ml: 2,
          fontFamily: 'heading',
          fontSize: 1,
          fontWeight: 'regular',
          lineHeight: 'heading',
        }}
      >
        {label}
      </label>
    )}
    {children}
  </div>
));

if (process.env.NODE_ENV !== 'production') {
  Checkbox.displayName = 'Checkbox';
}
