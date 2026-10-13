import { Fragment } from 'react';
import { Link } from 'react-router-dom';

export interface Crumb {
  label: string;
  to?: string;
}

interface PageHeroProps {
  title: string;
  intro?: string;
  crumbs?: Crumb[];
}

export default function PageHero({ title, intro, crumbs }: PageHeroProps) {
  return (
    <div className="page-hero">
      <div className="container">
        {crumbs && crumbs.length > 0 && (
          <nav className="breadcrumbs" aria-label="פירורי לחם">
            {crumbs.map((c, i) => (
              <Fragment key={`${c.label}-${i}`}>
                {i > 0 && <span aria-hidden="true"> / </span>}
                {c.to ? <Link to={c.to}>{c.label}</Link> : <span aria-current="page">{c.label}</span>}
              </Fragment>
            ))}
          </nav>
        )}
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
      </div>
    </div>
  );
}
