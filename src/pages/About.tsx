import Seo from '../seo/Seo';
import PageHero from '../components/PageHero';
import CallToAction from '../components/CallToAction';
import { SecondaryButton } from '../components/Buttons';
import { BUSINESS, ROUTES } from '../lib/site';
import {
  ABOUT_INTRO,
  ABOUT_QUOTE,
  ABOUT_WHOLE_PICTURE,
  PILLARS,
} from '../data/content';

export default function About() {
  return (
    <>
      <Seo
        title="אודות | עו״ד שירן לוי אלדר"
        description="אודות משרד עו״ד שירן לוי אלדר — משרד בוטיק המתמחה בדיני מס: ניסיון מהפרקליטות, שילוב פלילי־אזרחי, אסטרטגיה ויחס אישי."
        path={ROUTES.about}
      />
      <PageHero
        title="אודות המשרד"
        intro={ABOUT_INTRO}
        crumbs={[{ label: 'דף הבית', to: ROUTES.home }, { label: 'אודות' }]}
      />
      <main id="main-content" className="container-narrow section prose">
        <p>{ABOUT_WHOLE_PICTURE}</p>
        <p>
          אנו מאמינים כי {BUSINESS.serviceNote} הליווי מתחיל בשלב מוקדם, לעיתים עוד
          לפני שנפתחה חקירה רשמית, וממשיך לאורך כל ההליך: מול רשות המסים, מול
          הפרקליטות והתביעה, ובבתי המשפט.
        </p>
        <blockquote className="quote">
          <p>{ABOUT_QUOTE}</p>
        </blockquote>
        <img
          src="/img-books.jpg"
          alt="ספרי חוק ועט על שולחן במשרד"
          width={1200}
          height={900}
          loading="lazy"
        />
        {PILLARS.map((pillar) => (
          <section key={pillar.anchor} id={pillar.anchor} aria-labelledby={`${pillar.anchor}-h`}>
            <h2 id={`${pillar.anchor}-h`}>{pillar.title}</h2>
            <p>{pillar.body}</p>
          </section>
        ))}
        <p>
          <SecondaryButton to={ROUTES.contact}>לקביעת ייעוץ</SecondaryButton>
        </p>
      </main>
      <CallToAction />
    </>
  );
}
