import {
  IconHeartHandshake,
  IconScale,
  IconShieldCheck,
  IconTarget,
} from '@tabler/icons-react';
import Icon, { type TablerIconComponent } from './Icon';

const PILLAR_ICONS: TablerIconComponent[] = [
  IconShieldCheck,
  IconScale,
  IconTarget,
  IconHeartHandshake,
];

interface PillarIconProps {
  index: number;
  size?: number | string;
}

/** אייקון קו דק לעמודת עקרון לפי מיקומה (0–3). */
export default function PillarIcon({ index, size = 40 }: PillarIconProps) {
  return (
    <Icon
      icon={PILLAR_ICONS[index % PILLAR_ICONS.length]}
      size={size}
      className="pillar-icon"
    />
  );
}
