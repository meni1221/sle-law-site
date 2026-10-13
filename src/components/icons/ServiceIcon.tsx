import {
  IconCoins,
  IconFileInvoice,
  IconGavel,
  IconSearch,
} from '@tabler/icons-react';
import Icon, { type TablerIconComponent } from './Icon';

const SERVICE_ICONS: Record<string, TablerIconComponent> = {
  criminal: IconGavel,
  civil: IconFileInvoice,
  investigation: IconSearch,
  disclosure: IconCoins,
};

interface ServiceIconProps {
  slug: string;
  size?: number | string;
}

/** אייקון קו דק לכרטיס תחום עיסוק לפי המזהה שלו. */
export default function ServiceIcon({ slug, size = 34 }: ServiceIconProps) {
  return (
    <Icon
      icon={SERVICE_ICONS[slug] ?? IconGavel}
      size={size}
      className="service-icon"
    />
  );
}
