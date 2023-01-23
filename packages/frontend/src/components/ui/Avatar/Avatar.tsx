import type { RefAttributes, ForwardRefExoticComponent } from 'react';
import { forwardRef } from 'react';
import type { ThemeUIStyleObject } from 'theme-ui';
import * as RadixAvatar from '@radix-ui/react-avatar';

export interface AvatarProps extends RadixAvatar.AvatarImageProps {
  sx?: ThemeUIStyleObject;
}

export const Avatar: ForwardRefExoticComponent<
AvatarProps & RefAttributes<HTMLImageElement>
> = forwardRef(({ width = 40, height = 40, alt, sx, ...rest }, ref) => (
  <RadixAvatar.Root sx={{ borderRadius: '50%', ...sx }}>
    <RadixAvatar.Image
      ref={ref}
      width={width}
      height={height}
      sx={{ objectFit: 'cover', borderRadius: 'inherit' }}
      {...rest}
    />
    <RadixAvatar.Fallback
      delayMs={600}
      sx={{ variant: 'text.label', color: 'primary' }}
    >
      {alt}
    </RadixAvatar.Fallback>
  </RadixAvatar.Root>
));

if (process.env.NODE_ENV !== 'production') {
  Avatar.displayName = 'Avatar';
}
