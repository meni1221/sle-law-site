import { Link } from 'react-router-dom';
import { BUSINESS, ROUTES } from '../lib/site';

export function openCookieSettings(): void {
  window.dispatchEvent(new CustomEvent('sle:open-cookie-settings'));
}

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <img
            src="/logo-sle-footer.png"
            alt="SLE Law Office — שירן לוי אלדר"
            width={220}
            height={110}
            loading="lazy"
            className="footer-logo"
          />
        </div>
        <div className="footer-text-grid">
        <nav aria-label="ניווט תחתון">
          <h2 className="footer-heading">ניווט מהיר</h2>
          <ul className="footer-nav">
            <li>
              <Link to={ROUTES.home}>דף הבית</Link>
            </li>
            <li>
              <Link to={ROUTES.practice}>תחומי עיסוק</Link>
            </li>
            <li>
              <Link to={ROUTES.about}>אודות</Link>
            </li>
            <li>
              <Link to={ROUTES.contact}>צרו קשר</Link>
            </li>
            <li>
              <Link to={ROUTES.privacy}>מדיניות פרטיות</Link>
            </li>
            <li>
              <Link to={ROUTES.accessibility}>הצהרת נגישות</Link>
            </li>
          </ul>
        </nav>
        <div>
          <h2 className="footer-heading">יצירת קשר</h2>
          <ul className="footer-nav">
            <li>
              טלפון:{' '}
              <a href={BUSINESS.phoneHref}>
                <bdi>{BUSINESS.phoneDisplay}</bdi>
              </a>
            </li>
            <li>
              דוא״ל: <a href={BUSINESS.emailHref}>{BUSINESS.email}</a>
            </li>
            <li>שעות פעילות: {BUSINESS.hours}</li>
          </ul>
        </div>
        </div>
      </div>
      <div className="container footer-disclaimer">
        האמור באתר אינו מהווה תחליף לייעוץ משפטי.
      </div>
      <div className="container footer-bottom">
        <span>
            © כל הזכויות שמורות למשרד {BUSINESS.name} <bdi> {year}</bdi>
        </span>
        <span>
          <button
            type="button"
            onClick={openCookieSettings}
            style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              font: 'inherit',
              textDecoration: 'underline',
              padding: 0,
            }}
          >
            שינוי העדפות עוגיות
          </button>
        </span>
      </div>
      <div className="container footer-credit">
        האתר נבנה על ידי{' '}
        <a
          href="https://levi-tec.menilevi0533011599.workers.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          levi-tec
        </a>
      </div>
    </footer>
  );
}
