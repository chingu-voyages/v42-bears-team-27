/* eslint-disable react/jsx-props-no-spreading */
import type {
  HTMLAttributes,
  RefAttributes,
  ForwardRefExoticComponent,
} from 'react';
import { forwardRef } from 'react';
import type { ThemeUIStyleObject } from 'theme-ui';

export interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * Size of the component (width/height)
   * @default 32
   */
  size?: number;
  sx?: ThemeUIStyleObject;
}

export const IconButton: ForwardRefExoticComponent<
IconButtonProps & RefAttributes<HTMLButtonElement>
> = forwardRef(({ children, size = 32, sx, ...rest }, ref) => (
  <button
    ref={ref}
    type="button"
    sx={{
      variant: 'text.label',
      width: size,
      height: size,
      bg: 'transparent',
      border: 'none',
      cursor: 'pointer',
      ...sx,
    }}
    {...rest}
  >
    {children}
  </button>
));

if (process.env.NODE_ENV !== 'production') {
  IconButton.displayName = 'IconButton';
}
