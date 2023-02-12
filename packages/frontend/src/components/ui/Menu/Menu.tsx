import type { RefAttributes, ForwardRefExoticComponent } from 'react';
import { forwardRef } from 'react';
import type { ThemeUIStyleObject } from 'theme-ui';
import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { MdCheck, MdCircle } from 'react-icons/md';

export interface MenuProps extends DropdownMenuPrimitive.DropdownMenuProps {
  /**
   * Icon to display for button
   */
  icon: React.ReactNode;
  sx?: ThemeUIStyleObject;
  ariaLabel?: string;
}

export const Menu: React.FC<MenuProps> = ({
  children,
  icon,
  sx,
  ariaLabel,
  ...rest
}) => (
  <DropdownMenuPrimitive.Root {...rest}>
    <DropdownMenuPrimitive.Trigger
      aria-label={ariaLabel}
      sx={{ p: 0, bg: 'transparent', border: 'none', ...sx }}
    >
      <div
        sx={{
          variant: 'text.label',
          width: 'min-content',
          bg: 'transparent',
          border: 'none',
          cursor: 'pointer',
          ...sx,
        }}
      >
        {icon}
      </div>
    </DropdownMenuPrimitive.Trigger>
    <DropdownMenuPrimitive.Portal>{children}</DropdownMenuPrimitive.Portal>
  </DropdownMenuPrimitive.Root>
);

if (process.env.NODE_ENV !== 'production') {
  Menu.displayName = 'Menu';
}

export interface MenuContentProps
  extends DropdownMenuPrimitive.DropdownMenuContentProps {
  sx?: ThemeUIStyleObject;
}

export const MenuContent: ForwardRefExoticComponent<
MenuContentProps & RefAttributes<HTMLDivElement>
> = forwardRef(({ children, sx, ...rest }, ref) => (
  <DropdownMenuPrimitive.Content
    ref={ref}
    sx={{
      variant: 'text.label',
      zIndex: 1001,
      minWidth: 220,
      p: 2,
      color: 'text',
      bg: 'muted',
      border: '2px solid currentColor',
      borderRadius: 6,
      cursor: 'default',
      '& div[role^="menuitem"]': {
        pl: 4,
        pr: 1,
        color: 'text',
        cursor: 'pointer',
        '&:hover': {
          bg: 'mutedShade',
          color: 'accent',
        },
      },
      ...sx,
    }}
    {...rest}
  >
    {children}
    <DropdownMenuPrimitive.Arrow />
  </DropdownMenuPrimitive.Content>
));

if (process.env.NODE_ENV !== 'production') {
  MenuContent.displayName = 'MenuContent';
}

export const MenuLabel = DropdownMenuPrimitive.Label;
export const MenuGroup = DropdownMenuPrimitive.Group;

export interface MenuItemProps
  extends DropdownMenuPrimitive.DropdownMenuCheckboxItemProps {
  sx?: ThemeUIStyleObject;
}

export const MenuItem: ForwardRefExoticComponent<
MenuCheckboxItemProps & RefAttributes<HTMLDivElement>
> = forwardRef(({ children, ...rest }, ref) => (
  <DropdownMenuPrimitive.Item ref={ref} {...rest}>
    {children}
  </DropdownMenuPrimitive.Item>
));

if (process.env.NODE_ENV !== 'production') {
  MenuItem.displayName = 'MenuItem';
}

export interface MenuCheckboxItemProps
  extends DropdownMenuPrimitive.DropdownMenuCheckboxItemProps {
  sx?: ThemeUIStyleObject;
}

export const MenuCheckboxItem: ForwardRefExoticComponent<
MenuCheckboxItemProps & RefAttributes<HTMLDivElement>
> = forwardRef(({ children, sx, ...rest }, ref) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    sx={{ position: 'relative', ...sx }}
    {...rest}
  >
    <DropdownMenuPrimitive.ItemIndicator
      sx={{ position: 'absolute', top: '1.5px', left: 1 }}
    >
      <MdCheck size={15} />
    </DropdownMenuPrimitive.ItemIndicator>
    <span>{children}</span>
  </DropdownMenuPrimitive.CheckboxItem>
));

if (process.env.NODE_ENV !== 'production') {
  MenuCheckboxItem.displayName = 'MenuCheckboxItem';
}

export const MenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

export interface MenuRadioItemProps
  extends DropdownMenuPrimitive.DropdownMenuRadioItemProps {
  sx?: ThemeUIStyleObject;
}

export const MenuRadioItem: ForwardRefExoticComponent<
MenuRadioItemProps & RefAttributes<HTMLDivElement>
> = forwardRef(({ children, sx, ...rest }, ref) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    sx={{ position: 'relative', ...sx }}
    {...rest}
  >
    <DropdownMenuPrimitive.ItemIndicator
      sx={{ position: 'absolute', top: '-1px', left: '6.5px' }}
    >
      <MdCircle size={8} />
    </DropdownMenuPrimitive.ItemIndicator>
    <span>{children}</span>
  </DropdownMenuPrimitive.RadioItem>
));

if (process.env.NODE_ENV !== 'production') {
  MenuRadioItem.displayName = 'MenuRadioItem';
}

export const MenuSeparator: React.FC = () => (
  <DropdownMenuPrimitive.Separator
    sx={{ width: '100%', height: 1, my: 1, bg: 'gray' }}
  />
);
