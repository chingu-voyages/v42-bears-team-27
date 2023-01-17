/* eslint-disable react/jsx-props-no-spreading */
import type {
  HTMLAttributes,
  RefAttributes,
  ForwardRefExoticComponent,
} from 'react';
import { forwardRef } from 'react';
import type { ThemeUIStyleObject } from 'theme-ui';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * Label for the component
   */
  label: string;
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
  sx?: ThemeUIStyleObject;
}

export const Button: ForwardRefExoticComponent<
ButtonProps & RefAttributes<HTMLButtonElement>
> = forwardRef(
  (
    {
      children,
      label,
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
      cursor: 'pointer',
      '&:hover': {
        bg: '#e6e6e6',
      },
      ...(size === 'lg' && {
        columnGap: 10,
        height: 54,
        py: 3,
        px: 5,
        fontSize: 24,
      }),
      ...(size === 'md' && {
        columnGap: 10,
        height: 48,
        py: 2,
        px: 4,
        fontSize: 18,
      }),
      ...(size === 'sm' && {
        columnGap: 10,
        height: 42,
        py: 2,
        px: 3,
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
        <p sx={{ variant: 'text.label', m: 0, fontSize: 'inherit' }}>{label}</p>
        {children}
      </button>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Button.displayName = 'Button';
}
