import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { BUSINESS, ROUTES } from '../lib/site';
import { CloseIcon, MenuIcon } from './icons';

const NAV: { to: string; label: string }[] = [
  { to: ROUTES.home, label: 'דף הבית' },
  { to: ROUTES.practice, label: 'תחומי עיסוק' },
  { to: ROUTES.about, label: 'אודות' },
  { to: ROUTES.contact, label: 'צרו קשר' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open ]);

  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link className="brand" to={ROUTES.home} aria-label="דף הבית — SLE Law Office">
          <img
            src="/logo-sle.jpg"
            alt="SLE Law Office — שירן לוי אלדר, משרד עורכי דין"
            width={120}
            height={60}
          />
          <span className="brand-text">
            <strong>{BUSINESS.name}</strong>
            <span>{BUSINESS.tagline}</span>
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="ניווט ראשי">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === ROUTES.home}>
              {n.label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'סגירת תפריט' : 'פתיחת תפריט'}
            onClick={() => setOpen((v) => !v)}
          >
            <span aria-hidden="true">{open ? <CloseIcon /> : <MenuIcon />}</span>
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="ניווט נייד">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === ROUTES.home}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </NavLink>
          ))}
          <a href={BUSINESS.phoneHref}>
            חיוג למשרד: <bdi>{BUSINESS.phoneDisplay}</bdi>
          </a>
        </nav>
      )}
    </header>
  );
}
