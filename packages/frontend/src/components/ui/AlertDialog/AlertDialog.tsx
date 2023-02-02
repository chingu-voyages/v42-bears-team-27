import type { RefAttributes, ForwardRefExoticComponent } from 'react';
import { forwardRef } from 'react';
import type { ThemeUIStyleObject } from 'theme-ui';
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog';

import { Button } from '../Button';

export interface AlertDialogContentProps
  extends AlertDialogPrimitive.AlertDialogContentProps {
  /**
   * Title of the component
   */
  title: string;
  /**
   * Description of the component
   */
  description: string;
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

export const AlertDialogContent: ForwardRefExoticComponent<
AlertDialogContentProps & RefAttributes<HTMLDivElement>
> = forwardRef(
  ({ children, title, description, width, height, sx, ...rest }, ref) => (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Overlay sx={overlayStyles} />
      <AlertDialogPrimitive.Content
        ref={ref}
        sx={{ ...contentStyles, width, height, ...sx }}
        {...rest}
      >
        <AlertDialogPrimitive.Title sx={{ variant: 'text.h4' }}>
          {title}
        </AlertDialogPrimitive.Title>
        <AlertDialogPrimitive.Description sx={{ variant: 'text.label' }}>
          {description}
        </AlertDialogPrimitive.Description>
        {children}
        <div
          style={{ display: 'flex', justifyContent: 'flex-end', columnGap: 20 }}
        >
          <AlertDialogPrimitive.Cancel asChild>
            <Button variant="outlined">Cancel</Button>
          </AlertDialogPrimitive.Cancel>
          <AlertDialogPrimitive.Action asChild>
            <Button>Confirm</Button>
          </AlertDialogPrimitive.Action>
        </div>
      </AlertDialogPrimitive.Content>
    </AlertDialogPrimitive.Portal>
  ),
);

if (process.env.NODE_ENV !== 'production') {
  AlertDialogContent.displayName = 'AlertDialogContent';
}

export const AlertDialog = AlertDialogPrimitive.Root;
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger;
