/* eslint-disable react/jsx-props-no-spreading */
import type {
  HTMLAttributes,
  RefAttributes,
  ForwardRefExoticComponent,
} from 'react';
import { forwardRef } from 'react';
import type { ThemeUIStyleObject } from 'theme-ui';

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
}

export const TextField: ForwardRefExoticComponent<
TextFieldProps & RefAttributes<any>
> = forwardRef(
  ({ label, type = 'text', multiline = false, sx, ...rest }, ref) => {
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
      // eslint-disable-next-line jsx-a11y/label-has-associated-control
      <label sx={{ display: 'flex', flexDirection: 'column', rowGap: 3 }}>
        <p sx={{ variant: 'text.label', fontFamily: 'heading', fontSize: 18 }}>
          {label}
        </p>
        <div
          sx={{
            maxWidth: 430,
            width: '100%',
            height: multiline ? 174 : 50,
            bg: 'background',
          }}
        >
          {multiline ? (
            <textarea
              ref={ref}
              sx={{
                ...styles,
                ...sx,
              }}
              {...rest}
            />
          ) : (
            <input
              ref={ref}
              type={type}
              sx={{
                ...styles,
                ...sx,
              }}
              {...rest}
            />
          )}
        </div>
      </label>
    );
  },
);

if (process.env.NODE_ENV !== 'production') {
  TextField.displayName = 'TextField';
}
