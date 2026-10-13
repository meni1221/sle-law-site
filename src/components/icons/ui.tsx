import {
  IconAccessible,
  IconBrandWhatsapp,
  IconClock,
  IconMail,
  IconMenu2,
  IconMinus,
  IconPhone,
  IconPlus,
  IconX,
} from '@tabler/icons-react';
import Icon from './Icon';

interface UiIconProps {
  size?: number | string;
  className?: string;
}

export function MenuIcon({ size = 24, className }: UiIconProps) {
  return <Icon icon={IconMenu2} size={size} className={className} />;
}

export function CloseIcon({ size = 24, className }: UiIconProps) {
  return <Icon icon={IconX} size={size} className={className} />;
}

export function AccessibilityIcon({ size = 26, className }: UiIconProps) {
  return <Icon icon={IconAccessible} size={size} className={className} />;
}

export function PlusIcon({ size = 20, className }: UiIconProps) {
  return <Icon icon={IconPlus} size={size} className={className} />;
}

export function MinusIcon({ size = 20, className }: UiIconProps) {
  return <Icon icon={IconMinus} size={size} className={className} />;
}

export function PhoneIcon({ size = 18, className }: UiIconProps) {
  return <Icon icon={IconPhone} size={size} className={className ?? 'inline-icon'} />;
}

export function MailIcon({ size = 18, className }: UiIconProps) {
  return <Icon icon={IconMail} size={size} className={className ?? 'inline-icon'} />;
}

export function ClockIcon({ size = 18, className }: UiIconProps) {
  return <Icon icon={IconClock} size={size} className={className ?? 'inline-icon'} />;
}

export function WhatsAppIcon({ size = 30, className }: UiIconProps) {
  return <Icon icon={IconBrandWhatsapp} size={size} className={className} />;
}
