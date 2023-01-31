import type {
  HTMLAttributes,
  RefAttributes,
  ForwardRefExoticComponent,
} from 'react';
import { forwardRef } from 'react';
import type { ThemeUIStyleObject } from 'theme-ui';
import * as LabelPrimitive from '@radix-ui/react-label';

export interface TextFieldProps
  extends HTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  /**
   * Label for the component
   */
  label: string;
  /**
   * Type of the input element
   * @default 'text'
   */
  type?: 'text' | 'email' | 'password';
  /**
   * Enable multiline for the component
   * @default false
   */
  multiline?: boolean;
  sx?: ThemeUIStyleObject;
  value?: string;
  required?: boolean;
}

export const TextField: ForwardRefExoticComponent<
TextFieldProps & RefAttributes<any>
> = forwardRef(
  (
    {
      key,
      id,
      label,
      type = 'text',
      multiline = false,
      required = false,
      sx,
      ...rest
    },
    ref,
  ) => {
    const styles: ThemeUIStyleObject = {
      variant: 'text.label',
      width: 'inherit',
      height: 'inherit',
      py: 3,
      pl: 26,
      pr: 4,
      fontFamily: 'heading',
      fontSize: 14,
      color: 'primary',
      border: '2px solid',
      borderColor: 'gray',
      '&:placeholder-shown': {
        color: 'gray',
      },
    };

    return (
      <div
        key={key}
        sx={{ display: 'flex', flexDirection: 'column', rowGap: 3, ...sx }}
      >
        <LabelPrimitive.Root
          htmlFor={id}
          sx={{ variant: 'text.label', fontFamily: 'heading', fontSize: 18 }}
        >
          {label}
        </LabelPrimitive.Root>
        <div
          sx={{
            width: '100%',
            height: multiline ? 174 : 50,
            bg: 'background',
          }}
        >
          {multiline ? (
            <textarea
              ref={ref}
              id={id}
              required={required}
              sx={styles}
              {...rest}
            />
          ) : (
            <input
              ref={ref}
              id={id}
              type={type}
              required={required}
              sx={styles}
              {...rest}
            />
          )}
        </div>
      </div>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  TextField.displayName = 'TextField';
}
