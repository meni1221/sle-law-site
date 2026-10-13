import type { ComponentType } from 'react';
import type { IconProps as TablerIconProps } from '@tabler/icons-react';

export type TablerIconComponent = ComponentType<TablerIconProps>;

interface GenericIconProps {
  icon: TablerIconComponent;
  size?: number | string;
  strokeWidth?: number | string;
  className?: string;
}

/** מעטפת גנרית לאייקוני Tabler: קו דק אחיד, מוסתרים מקורא מסך כברירת מחדל. */
export default function Icon({
  icon: IconComponent,
  size = 24,
  strokeWidth = 1.5,
  className,
}: GenericIconProps) {
  return (
    <IconComponent
      size={size}
      stroke={strokeWidth}
      className={className}
      aria-hidden="true"
    />
  );
}
