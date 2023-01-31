import type {
  HTMLAttributes,
  RefAttributes,
  ForwardRefExoticComponent,
} from 'react';
import { forwardRef } from 'react';
import Link, { type LinkProps } from 'next/link';
import type { ThemeUIStyleObject } from 'theme-ui';

export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  /**
   * Type of the button element
   * @default 'button'
   */
  type?: 'button' | 'reset' | 'submit';
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
   * Icon for the component
   */
  icon?: React.ReactNode;
  sx?: ThemeUIStyleObject;
}

export const Button: ForwardRefExoticComponent<
ButtonProps & RefAttributes<HTMLButtonElement>
> = forwardRef(
  (
    {
      children,
      icon,
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
        <p sx={{ variant: 'text.label', m: 0, fontSize: 'inherit' }}>
          {children}
        </p>
        {icon}
      </button>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  Button.displayName = 'Button';
}

export interface ButtonLinkProps extends LinkProps {
  /**
   * Content of the component
   */
  children: React.ReactNode;
  /**
   * Type of the button element
   * @default 'button'
   */
  type?: 'button' | 'reset' | 'submit';
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
   * Icon for the component
   */
  icon?: React.ReactNode;
  sx?: ThemeUIStyleObject;
}

export const ButtonLink: ForwardRefExoticComponent<
ButtonLinkProps & RefAttributes<HTMLAnchorElement>
> = forwardRef(
  (
    {
      children,
      icon,
      size = 'md',
      variant = 'filled',
      rounded = true,
      sx,
      ...rest
    },
    ref,
  ) => {
    const styles: ThemeUIStyleObject = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
      borderRadius: rounded ? 50 : 0,
      cursor: 'pointer',
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
      <Link
        ref={ref}
        sx={{ variant: `buttons.primary.${variant}`, ...styles, ...sx }}
        {...rest}
      >
        <p sx={{ variant: 'text.label', m: 0, fontSize: 'inherit' }}>
          {children}
        </p>
        {icon}
      </Link>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  ButtonLink.displayName = 'ButtonLink';
}
