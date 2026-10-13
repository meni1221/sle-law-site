import { Link } from 'react-router-dom';
import Seo, { faqJsonLd } from '../seo/Seo';
import PageHero from '../components/PageHero';
import CallToAction from '../components/CallToAction';
import FAQAccordion from '../components/FAQAccordion';
import { FAQS } from '../data/content';
import { ROUTES } from '../lib/site';

const FAQS_SLICE = FAQS.slice(1, 4);

export default function PracticeCriminal() {
  return (
    <>
      <Seo
        title="עבירות מס ומע״מ | עו״ד שירן לוי אלדר"
        description="ייצוג חשודים ונאשמים בעבירות מס הכנסה ומע״מ: חשבוניות פיקטיביות, העלמת מס, דוחות כוזבים וניהול תיק פלילי בבית המשפט."
        path={ROUTES.criminal}
        jsonLd={faqJsonLd(FAQS_SLICE)}
      />
      <PageHero
        title="עבירות מס ומע״מ"
        intro="ייצוג חשודים ונאשמים בעבירות מס הכנסה ומע״מ, משלב החקירה ועד ההליך בבית המשפט."
        crumbs={[
          { label: 'דף הבית', to: ROUTES.home },
          { label: 'תחומי עיסוק', to: ROUTES.practice },
          { label: 'עבירות מס ומע״מ' },
        ]}
      />
      <main className="container-narrow section prose">
        <h2>עבירות מס הכנסה</h2>
        <p>
          פקודת מס הכנסה קובעת מגוון עבירות, החל במחדלים בדיווח ובניהול ספרים וכלה
          בעבירות של הסתרת הכנסות והתחמקות מתשלום מס. בתי המשפט מבחינים בין עבירות
          טכניות (ללא כוונה להעלים הכנסה) לבין עבירות מהותיות (מתוך מטרה להתחמק
          מתשלום מס).
        </p>
        <h2>עבירות מע״מ</h2>
        <p>
          חוק מס ערך מוסף מגדיר עבירות מסוגים שונים: מחדלים בדיווח ובתשלום,
          אי־הוצאת חשבוניות, וכן עבירות חמורות של ניכוי מס תשומות שלא כדין,
          חשבוניות פיקטיביות, מרמה וזיוף.
        </p>
        <h2>חשבוניות פיקטיביות</h2>
        <p>
          תיקי חשבוניות פיקטיביות נמנים עם התיקים המורכבים ביותר, והשאלות הן
          עובדתיות: האם התקיימה עסקה בפועל, מי הפיק את החשבונית, מה ידע מי שקיבל
          אותה.
        </p>
        <h2>העלמת מס</h2>
        <p>
          הסתרה של הכנסות או הפחתה מלאכותית של החבות באמצעים לא חוקיים. לא כל
          אי־סדר חשבונאי הוא העלמת מס — ההבחנה נקבעת לפי היסוד הנפשי, נסיבות המקרה
          והיקף הפעילות.
        </p>
        <h2>ניהול תיק פלילי בבית המשפט</h2>
        <p>
          עיון בחומר הראיות, טיעונים מקדמיים, משא ומתן עם התביעה, ניהול הוכחות,
          ובמקרים המתאימים ערעור.
        </p>
        <nav aria-label="קישורים קשורים">
          <h2>תחומים קשורים</h2>
          <ul>
            <li><Link to={ROUTES.investigation}>חקירות מס</Link></li>
            <li><Link to={ROUTES.disclosure}>גילוי מרצון, כופר וקנס מנהלי</Link></li>
            <li><Link to={ROUTES.civil}>מיסוי אזרחי – מס הכנסה ומע״מ</Link></li>
          </ul>
        </nav>
        <section aria-labelledby="criminal-faq">
          <h2 id="criminal-faq">שאלות נפוצות</h2>
          <FAQAccordion faqs={FAQS_SLICE} />
        </section>
      </main>
      <CallToAction />
    </>
  );
}
