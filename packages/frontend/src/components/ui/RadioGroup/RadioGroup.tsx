import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';
import type { ThemeUIStyleObject } from 'theme-ui';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

export interface RadioGroupProps extends RadioGroupPrimitive.RadioGroupProps {
  sx?: ThemeUIStyleObject;
}

export const RadioGroup: ForwardRefExoticComponent<
RadioGroupProps & RefAttributes<HTMLDivElement>
> = forwardRef(({ children, sx, ...rest }, ref) => (
  <RadioGroupPrimitive.Root
    ref={ref}
    sx={{ display: 'flex', flexDirection: 'column', rowGap: 2, ...sx }}
    {...rest}
  >
    {children}
  </RadioGroupPrimitive.Root>
));

if (process.env.NODE_ENV !== 'production') {
  RadioGroup.displayName = 'RadioGroup';
}

export interface RadioProps extends RadioGroupPrimitive.RadioGroupItemProps {
  /**
   * Label for the component
   */
  label: string;
  sx?: ThemeUIStyleObject;
}

export const Radio: ForwardRefExoticComponent<
RadioProps & RefAttributes<HTMLButtonElement>
> = forwardRef(({ id, label, sx, ...rest }, ref) => (
  <div
    key={id}
    sx={{ display: 'flex', alignItems: 'center', columnGap: 3, ...sx }}
  >
    <RadioGroupPrimitive.Item
      ref={ref}
      id={id}
      sx={{
        variant: 'buttons.primary.outlined',
        width: 24,
        height: 24,
        borderRadius: '100%',
        cursor: 'pointer',
      }}
      {...rest}
    >
      <RadioGroupPrimitive.Indicator
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            width: 12,
            height: 12,
            borderRadius: '50%',
            bg: 'primary',
          },
        }}
      />
    </RadioGroupPrimitive.Item>
    <label sx={{ variant: 'text.label' }} htmlFor={id}>
      {label}
    </label>
  </div>
));

if (process.env.NODE_ENV !== 'production') {
  Radio.displayName = 'Radio';
}
