import { Link } from 'react-router-dom';
import Seo, { faqJsonLd, legalServiceJsonLd } from '../seo/Seo';
import { PrimaryButton, SecondaryButton } from '../components/Buttons';
import { PillarIcon } from '../components/icons';
import ServiceCard from '../components/ServiceCard';
import ProcessSteps from '../components/ProcessSteps';
import FAQAccordion from '../components/FAQAccordion';
import CallToAction from '../components/CallToAction';
import { BUSINESS, ROUTES } from '../lib/site';
import {
  ABOUT_INTRO,
  ABOUT_QUOTE,
  FAQS,
  PILLARS,
  SERVICES,
} from '../data/content';

export default function Home() {
  return (
    <>
      <Seo
        title="עו״ד שירן לוי אלדר — משרד בוטיק לדיני מס | SLE Law Office"
        description="משרד בוטיק המתמחה בתחומי המס — ליווי הליכים פליליים ואזרחיים בתחומי מס הכנסה ומע״מ. שירות טוב ויחס אישי, לצד ידע ומקצועיות."
        path={ROUTES.home}
        jsonLd={[legalServiceJsonLd(), faqJsonLd(FAQS)]}
      />
      <main id="main-content">
        <section className="hero" aria-labelledby="hero-heading">
          <div className="container hero-grid">
            <div>
              <p className="hero-eyebrow">{BUSINESS.name}</p>
              <h1 id="hero-heading">{BUSINESS.tagline}</h1>
              <p className="hero-sub">{BUSINESS.subTagline}</p>
              <p>{BUSINESS.serviceNote}</p>
              <div className="hero-ctas">
                <PrimaryButton to={ROUTES.contact}>לקביעת ייעוץ</PrimaryButton>
                <SecondaryButton
                  href={BUSINESS.whatsappHref}
                >
                  שלחו הודעה ב-WhatsApp
                </SecondaryButton>
              </div>
            </div>
            <figure>
              <img
                src="/img-hero.jpg"
                alt="שולחן עבודה במשרד עורכי דין עם ספרי חוק ועט"
                width={783}
                height={601}
                fetchPriority="high"
              />
              <figcaption>ייעוץ וליווי משפטי בתחומי המס הפלילי והאזרחי</figcaption>
            </figure>
          </div>
        </section>

        <section className="pillars section" aria-labelledby="pillars-heading">
          <div className="container">
            <h2 id="pillars-heading" className="section-title">
              למה דווקא המשרד שלנו
            </h2>
            <ul className="pillars-grid">
              {PILLARS.map((pillar, i) => (
                <li key={pillar.title} className="pillar-card">
                  <PillarIcon index={i} />
                  <h3>{pillar.title}</h3>
                  <p>{pillar.body}</p>
                  <Link to={`${ROUTES.about}#${pillar.anchor}`}>קראו עוד</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section" aria-labelledby="about-teaser-heading">
          <div className="container teaser-grid">
            <img
              src="/img-about.jpg"
              alt="מאזני צדק וספר חוק על שולחן במשרד"
              width={380}
              height={508}
              loading="lazy"
            />
            <div>
              <h2 id="about-teaser-heading">אודות המשרד</h2>
              <p>{ABOUT_INTRO}</p>
              <blockquote className="quote">
                <p>{ABOUT_QUOTE}</p>
              </blockquote>
              <SecondaryButton to={ROUTES.about}>קראו עוד</SecondaryButton>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="practice-heading">
          <div className="container">
            <h2 id="practice-heading" className="section-title">
              תחומי עיסוק
            </h2>
            <p>
              המשרד מלווה ומייצג יחידים, בעלי עסקים, חברות ונושאי משרה בכל הנוגע
              למס הכנסה ולמס ערך מוסף, הן במישור הפלילי והן במישור האזרחי.
            </p>
            <div className="cards-grid">
              {SERVICES.map((service) => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="process-heading">
          <div className="container">
            <h2 id="process-heading" className="section-title">
              איך אנחנו עובדים
            </h2>
            <ProcessSteps />
          </div>
        </section>

        <section className="section" aria-labelledby="faq-heading">
          <div className="container-narrow">
            <h2 id="faq-heading" className="section-title">
              שאלות נפוצות
            </h2>
            <FAQAccordion faqs={FAQS} />
          </div>
        </section>

        <CallToAction />
      </main>
    </>
  );
}
