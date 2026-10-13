import { useEffect, useState } from 'react';
import { AccessibilityIcon } from './icons';

type FontSize = 'normal' | 'large' | 'xlarge';

const KEYS = {
  font: 'sle-a11y-font',
  contrast: 'sle-a11y-contrast',
  links: 'sle-a11y-links',
  motion: 'sle-a11y-motion',
} as const;

function read<T extends string>(key: string): T | null {
  try {
    return (localStorage.getItem(key) as T | null) ?? null;
  } catch {
    return null;
  }
}

function write(key: string, value: string | null): void {
  try {
    if (value === null) localStorage.removeItem(key);
    else localStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}

export default function AccessibilityMenu() {
  const [open, setOpen] = useState(false);
  const [font, setFont] = useState<FontSize>('normal');
  const [contrast, setContrast] = useState(false);
  const [links, setLinks] = useState(false);
  const [motion, setMotion] = useState(false);

  useEffect(() => {
    const f = read<FontSize>(KEYS.font);
    const c = read<string>(KEYS.contrast);
    const l = read<string>(KEYS.links);
    const m = read<string>(KEYS.motion);
    if (f === 'large' || f === 'xlarge') setFont(f);
    if (c === 'high') setContrast(true);
    if (l === 'underline') setLinks(true);
    if (m === 'reduced') setMotion(true);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (font === 'normal') {
      html.removeAttribute('data-a11y-font');
      write(KEYS.font, null);
    } else {
      html.setAttribute('data-a11y-font', font);
      write(KEYS.font, font);
    }
    html.toggleAttribute('data-a11y-contrast', contrast);
    if (contrast) {
      html.setAttribute('data-a11y-contrast', 'high');
      write(KEYS.contrast, 'high');
    } else {
      html.removeAttribute('data-a11y-contrast');
      write(KEYS.contrast, null);
    }
    if (links) {
      html.setAttribute('data-a11y-links', 'underline');
      write(KEYS.links, 'underline');
    } else {
      html.removeAttribute('data-a11y-links');
      write(KEYS.links, null);
    }
    if (motion) {
      html.setAttribute('data-a11y-motion', 'reduced');
      write(KEYS.motion, 'reduced');
    } else {
      html.removeAttribute('data-a11y-motion');
      write(KEYS.motion, null);
    }
  }, [font, contrast, links, motion]);

  const cycleFont = () =>
    setFont((f) => (f === 'normal' ? 'large' : f === 'large' ? 'xlarge' : 'normal'));

  return (
    <>
      <button
        type="button"
        className="a11y-fab"
        aria-expanded={open}
        aria-label={open ? 'סגירת כלי הנגישות' : 'פתיחת כלי הנגישות'}
        onClick={() => setOpen((v) => !v)}
      >
        <AccessibilityIcon />
      </button>
      {open && (
        <div className="a11y-panel" role="dialog" aria-label="כלי נגישות">
          <h2>כלי נגישות</h2>
          <div className="a11y-row">
            <span>הגדלת גופן</span>
            <button type="button" onClick={cycleFont}>
              {font === 'normal' ? 'רגיל' : font === 'large' ? 'גדול' : 'גדול מאוד'}
            </button>
          </div>
          <div className="a11y-row">
            <span>ניגודיות גבוהה</span>
            <button type="button" onClick={() => setContrast((v) => !v)}>
              {contrast ? 'פעיל' : 'כבוי'}
            </button>
          </div>
          <div className="a11y-row">
            <span>קו תחתון לקישורים</span>
            <button type="button" onClick={() => setLinks((v) => !v)}>
              {links ? 'פעיל' : 'כבוי'}
            </button>
          </div>
          <div className="a11y-row">
            <span>הפחתת תנועה</span>
            <button type="button" onClick={() => setMotion((v) => !v)}>
              {motion ? 'פעיל' : 'כבוי'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
