import { Link } from 'react-router-dom';
import Seo, { faqJsonLd } from '../seo/Seo';
import PageHero from '../components/PageHero';
import CallToAction from '../components/CallToAction';
import FAQAccordion from '../components/FAQAccordion';
import { FAQS } from '../data/content';
import { ROUTES } from '../lib/site';

const FAQS_SLICE = FAQS.slice(4, 5);

export default function PracticeCivil() {
  return (
    <>
      <Seo
        title="מיסוי אזרחי – מס הכנסה ומע״מ | עו״ד שירן לוי אלדר"
        description="ליווי אזרחי בתחומי מס הכנסה ומע״מ: שומות, השגות, ערעורי מס, תכנוני מס, פרה־רולינג, הליכי גבייה והסדרי חוב."
        path={ROUTES.civil}
        jsonLd={faqJsonLd(FAQS_SLICE)}
      />
      <PageHero
        title="מיסוי אזרחי – מס הכנסה ומע״מ"
        intro="ליווי בהליכים אזרחיים מול רשות המסים — משלב השומה ועד הערעור."
        crumbs={[
          { label: 'דף הבית', to: ROUTES.home },
          { label: 'תחומי עיסוק', to: ROUTES.practice },
          { label: 'מיסוי אזרחי' },
        ]}
      />
      <main className="container-narrow section prose">
        <h2>מס הכנסה</h2>
        <ul>
          <li>ליווי בהליכי שומה</li>
          <li>השגות</li>
          <li>ייצוג בדיוני שומה</li>
          <li>משא ומתן על הסכמי שומה</li>
          <li>ערעורי מס</li>
          <li>פסילת ספרים</li>
          <li>תכנוני מס</li>
          <li>פרה־רולינג</li>
          <li>חוות דעת</li>
        </ul>
        <h2>מס ערך מוסף</h2>
        <ul>
          <li>שומה</li>
          <li>שימוע (לרבות לפי סעיף 50 לחוק מע״מ)</li>
          <li>השגה</li>
          <li>ערעורי מע״מ</li>
          <li>ניכוי מס תשומות</li>
          <li>סיווג עסקאות</li>
          <li>מע״מ בשיעור אפס</li>
          <li>מלכ״רים</li>
        </ul>
        <h2>הליכי גבייה והסדרי חוב</h2>
        <p>ייצוג בהליכי גבייה מנהליים, התנגדויות, הסדרי פירעון הוגנים.</p>
        <nav aria-label="קישורים קשורים">
          <h2>תחומים קשורים</h2>
          <ul>
            <li><Link to={ROUTES.criminal}>עבירות מס ומע״מ</Link></li>
            <li><Link to={ROUTES.investigation}>חקירות מס</Link></li>
            <li><Link to={ROUTES.disclosure}>גילוי מרצון, כופר וקנס מנהלי</Link></li>
          </ul>
        </nav>
        <section aria-labelledby="civil-faq">
          <h2 id="civil-faq">שאלות נפוצות</h2>
          <FAQAccordion faqs={FAQS_SLICE} />
        </section>
      </main>
      <CallToAction />
    </>
  );
}
