import type {
  HTMLAttributes,
  RefAttributes,
  ForwardRefExoticComponent,
} from 'react';
import { forwardRef } from 'react';
import type { ThemeUIStyleObject } from 'theme-ui';
import * as LabelPrimitive from '@radix-ui/react-label';

const baseStyles: ThemeUIStyleObject = {
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

export interface TextFieldProps extends HTMLAttributes<HTMLInputElement> {
  /**
   * Label for the component
   */
  label: string;
  /**
   * Type of the input element
   * @default 'text'
   */
  type?: 'text' | 'email' | 'password';
  sx?: ThemeUIStyleObject;
  value?: string;
  required?: boolean;
  autoFocus?: boolean;
}

export const TextField: ForwardRefExoticComponent<
TextFieldProps & RefAttributes<HTMLInputElement>
> = forwardRef(
  ({ key, id, label, type = 'text', required = false, sx, ...rest }, ref) => (
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
      <div sx={{ width: '100%', height: 50, bg: 'background' }}>
        <input
          ref={ref}
          id={id}
          type={type}
          required={required}
          sx={baseStyles}
          {...rest}
        />
      </div>
    </div>
  ),
);

if (process.env.NODE_ENV !== 'production') {
  TextField.displayName = 'TextField';
}

export interface TextFieldAreaProps
  extends HTMLAttributes<HTMLTextAreaElement> {
  /**
   * Label for the component
   */
  label: string;
  sx?: ThemeUIStyleObject;
  value?: string;
  required?: boolean;
}

export const TextFieldArea: ForwardRefExoticComponent<
TextFieldAreaProps & RefAttributes<HTMLTextAreaElement>
> = forwardRef(({ key, id, label, required = false, sx, ...rest }, ref) => (
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
    <div sx={{ width: '100%', height: 174, bg: 'background' }}>
      <textarea
        ref={ref}
        id={id}
        required={required}
        sx={baseStyles}
        {...rest}
      />
    </div>
  </div>
));

if (process.env.NODE_ENV !== 'production') {
  TextFieldArea.displayName = 'TextFieldArea';
}
