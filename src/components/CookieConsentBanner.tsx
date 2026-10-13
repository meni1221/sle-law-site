import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getConsent, setConsent } from '../lib/consent';
import { initAnalyticsIfConsented } from '../lib/analytics';
import { ROUTES } from '../lib/site';

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getConsent() === null);
    const reopen = () => setVisible(true);
    window.addEventListener('sle:open-cookie-settings', reopen);
    return () => window.removeEventListener('sle:open-cookie-settings', reopen);
  }, []);

  const choose = useCallback((choice: 'accepted' | 'rejected') => {
    setConsent(choice);
    setVisible(false);
    initAnalyticsIfConsented();
  }, []);

  if (!visible) return null;

  return (
    <div
      className="cookie-banner"
      role="dialog"
      aria-live="polite"
      aria-label="הסכמה לשימוש בעוגיות"
    >
      <p>
        אנו משתמשים בעוגיות חיוניות לתפקוד האתר, ובעוגיות סטטיסטיות רק בכפוף
        להסכמתכם. לפרטים ראו <Link to={ROUTES.privacy}>מדיניות הפרטיות</Link>.
      </p>
      <div className="cookie-actions">
        <button type="button" className="btn btn-primary" onClick={() => choose('accepted')}>
          אישור
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => choose('rejected')}>
          דחייה
        </button>
      </div>
    </div>
  );
}
