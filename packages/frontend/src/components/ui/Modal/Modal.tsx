/* eslint-disable react/jsx-props-no-spreading */
import type {
  HTMLAttributes,
  RefAttributes,
  ForwardRefExoticComponent,
} from 'react';
import { forwardRef } from 'react';
import type { ThemeUIStyleObject } from 'theme-ui';
import * as Dialog from '@radix-ui/react-dialog';
import { MdClose } from 'react-icons/md';

import { Button } from '../Button';
import { IconButton } from '../IconButton';

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
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
  btn?: React.ReactNode;
  sx?: ThemeUIStyleObject;
}

export const Modal: ForwardRefExoticComponent<
ModalProps & RefAttributes<HTMLDivElement>
> = forwardRef(({ children, title, description, btn, sx, ...rest }, ref) => (
  <Dialog.Root>
    <Dialog.Trigger asChild>{btn || <Button>{title}</Button>}</Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 1000,
          width: '100%',
          height: '100%',
          backdropFilter: 'blur(3px)',
          bg: 'rgba(0, 0, 0, 0.6)',
        }}
      />
      <Dialog.Content
        ref={ref}
        sx={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          zIndex: 1001,
          maxWidth: 880,
          width: '95%',
          height: '90vh',
          overflowY: 'auto',
          px: 4,
          py: 2,
          bg: 'muted',
          translate: '-50% -50%',
          transition: 'opacity 700ms',
          ...sx,
        }}
        {...rest}
      >
        <Dialog.Title sx={{ variant: 'text.h3', textAlign: 'center' }}>
          {title}
        </Dialog.Title>
        <Dialog.Description sx={{ variant: 'text.h4' }}>
          {description}
        </Dialog.Description>
        {children}
        <Dialog.Close asChild>
          <IconButton sx={{ position: 'absolute', top: 4, right: 4 }}>
            <MdClose size="inherit" />
          </IconButton>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
));

if (process.env.NODE_ENV !== 'production') {
  Modal.displayName = 'Modal';
}
