import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import { forwardRef } from 'react';
import type { ThemeUIStyleObject } from 'theme-ui';
import * as ProgressPrimitive from '@radix-ui/react-progress';

export interface ProgressProps extends ProgressPrimitive.ProgressProps {
  sx?: ThemeUIStyleObject;
}

export const Progress: ForwardRefExoticComponent<
ProgressProps & RefAttributes<HTMLDivElement>
> = forwardRef(({ value, sx, ...rest }) => (
  <ProgressPrimitive.Root
    value={value}
    sx={{
      position: 'relative',
      overflow: 'hidden',
      bg: 'background',
      borderRadius: 6,
      width: 300,
      height: 30,
      transform: 'translateZ(0)',
      ...sx,
    }}
    {...rest}
  >
    <ProgressPrimitive.Indicator
      sx={{
        width: '100%',
        height: '100%',
        bg: 'primary',
        border: 'none',
        transform: `translateX(-${100 - Number(value)}%)`,
        transition: 'transform 660ms cubic-bezier(0.65, 0, 0.35, 1)',
      }}
    />
  </ProgressPrimitive.Root>
));

if (process.env.NODE_ENV !== 'production') {
  Progress.displayName = 'Progress';
}
