/* eslint-disable react/jsx-props-no-spreading */
import type {
  HTMLAttributes,
  RefAttributes,
  ForwardRefExoticComponent,
} from 'react';
import { forwardRef } from 'react';
import type { ThemeUIStyleObject } from 'theme-ui';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  sx?: ThemeUIStyleObject;
  /**
   * Size of the component
   * @default 'md'
   */
  size?: 'lg' | 'md' | 'sm';
  /**
   * Variant style of the component
   * @default 'filled'
   */
  variant?: 'filled' | 'outlined';
  /**
   * Add rounded edges for the component
   * @default true
   */
  rounded?: boolean;
  /**
   * Type of the button element
   * @default 'button'
   */
  type?: 'button' | 'reset' | 'submit';
}

export const Button: ForwardRefExoticComponent<
ButtonProps & RefAttributes<HTMLButtonElement>
> = forwardRef(
  (
    {
      children,
      size = 'md',
      variant = 'filled',
      rounded = true,
      type = 'button',
      sx,
      ...rest
    },
    ref,
  ) => {
    const styles: ThemeUIStyleObject = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: rounded ? 50 : 0,
      ...(size === 'lg' && {
        columnGap: 10,
        py: 12,
        px: 117,
        fontSize: 24,
      }),
      ...(size === 'md' && {
        columnGap: 10,
        py: 3,
        px: 85,
        fontSize: 18,
      }),
      ...(size === 'sm' && {
        columnGap: 10,
        py: 3,
        px: 40,
        fontSize: 18,
      }),
    };

    return (
      <button
        // eslint-disable-next-line react/button-has-type
        type={type}
        ref={ref}
        sx={{ variant: `buttons.primary.${variant}`, ...styles, ...sx }}
        {...rest}
      >
        <p sx={{ variant: 'text.label', m: 0, fontSize: 'inherit' }}>
          {children}
        </p>
      </button>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Button.displayName = 'Button';
}
