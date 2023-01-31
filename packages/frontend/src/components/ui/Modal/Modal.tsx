import type { RefAttributes, ForwardRefExoticComponent } from 'react';
import { forwardRef } from 'react';
import type { ThemeUIStyleObject } from 'theme-ui';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { MdClose } from 'react-icons/md';

import { IconButton } from '../IconButton';

export interface DialogContentProps extends DialogPrimitive.DialogContentProps {
  /**
   * Title of the component
   */
  title: string;
  /**
   * Description of the component
   */
  description?: string;
  /**
   * Trigger button to reveal component
   */
  /**
   * Width of the component
   */
  width: string | number;
  /**
   * Height of the component
   */
  height: string | number;
  sx?: ThemeUIStyleObject;
}

const overlayStyles: ThemeUIStyleObject = {
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1000,
  width: '100%',
  height: '100%',
  backdropFilter: 'blur(3px)',
  bg: 'rgba(0, 0, 0, 0.6)',
};

const contentStyles: ThemeUIStyleObject = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  zIndex: 1001,
  maxWidth: 880,
  overflowY: 'auto',
  py: 2,
  px: 4,
  bg: 'muted',
  translate: '-50% -50%',
  transition: 'opacity 700ms',
};

export const DialogContent: ForwardRefExoticComponent<
DialogContentProps & RefAttributes<HTMLDivElement>
> = forwardRef(
  ({ children, title, description, width, height, sx, ...rest }, ref) => (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay sx={overlayStyles} />
      <DialogPrimitive.Content
        ref={ref}
        sx={{ ...contentStyles, width, height, ...sx }}
        {...rest}
      >
        <DialogPrimitive.Title sx={{ variant: 'text.h3', textAlign: 'center' }}>
          {title}
        </DialogPrimitive.Title>
        <DialogPrimitive.Description sx={{ variant: 'text.h4' }}>
          {description}
        </DialogPrimitive.Description>
        {children}
        <DialogPrimitive.Close asChild>
          <IconButton sx={{ position: 'absolute', top: 4, right: 4 }}>
            <MdClose size={32} />
          </IconButton>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  ),
);

if (process.env.NODE_ENV !== 'production') {
  DialogContent.displayName = 'DialogContent';
}

export const Dialog = DialogPrimitive.Root;
export const DialogTrigger = DialogPrimitive.Trigger;
