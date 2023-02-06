import type { RefAttributes, ForwardRefExoticComponent } from 'react';
import { forwardRef } from 'react';
import type { ThemeUIStyleObject } from 'theme-ui';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import stc from 'string-to-color';

export interface AvatarProps extends AvatarPrimitive.AvatarImageProps {
  sx?: ThemeUIStyleObject;
}

export const Avatar: ForwardRefExoticComponent<
AvatarProps & RefAttributes<HTMLImageElement>
> = forwardRef(({ width = 40, height = 40, alt, sx, ...rest }, ref) => (
  <AvatarPrimitive.Root sx={{ borderRadius: '50%', ...sx }}>
    <AvatarPrimitive.Image
      ref={ref}
      width={width}
      height={height}
      sx={{ objectFit: 'cover', borderRadius: 'inherit' }}
      {...rest}
    />
    <AvatarPrimitive.Fallback
      sx={{
        variant: 'text.label',
        color: 'text',
        width,
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: stc(alt),
        borderRadius: 'inherit',
      }}
    >
      {alt}
    </AvatarPrimitive.Fallback>
  </AvatarPrimitive.Root>
));

if (process.env.NODE_ENV !== 'production') {
  Avatar.displayName = 'Avatar';
}
