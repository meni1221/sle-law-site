import { useEffect } from 'react';
import Seo from '../seo/Seo';
import PageHero from '../components/PageHero';
import { PrimaryButton } from '../components/Buttons';
import { ROUTES } from '../lib/site';

export default function NotFound() {
  useEffect(() => {
    const el = document.head.querySelector(
      'meta[name="robots"]',
    ) as HTMLMetaElement | null;
    let created = false;
    let meta = el;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'robots';
      document.head.appendChild(meta);
      created = true;
    }
    const prev = meta.content;
    meta.content = 'noindex, nofollow';
    return () => {
      if (created) meta?.remove();
      else if (meta) meta.content = prev;
    };
  }, []);

  return (
    <>
      <Seo
        title="הדף לא נמצא | עו״ד שירן לוי אלדר"
        description="הדף שחיפשתם לא נמצא. חזרו לדף הבית של משרד עו״ד שירן לוי אלדר."
        path="/404"
      />
      <PageHero title="הדף לא נמצא" />
      <main className="container-narrow section prose">
        <p>מצטערים, הדף שחיפשתם אינו קיים או שהועבר לכתובת אחרת.</p>
        <p>
          <PrimaryButton to={ROUTES.home}>חזרה לדף הבית</PrimaryButton>
        </p>
      </main>
    </>
  );
}
