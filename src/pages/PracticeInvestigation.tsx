import { Link } from 'react-router-dom';
import Seo, { faqJsonLd } from '../seo/Seo';
import PageHero from '../components/PageHero';
import CallToAction from '../components/CallToAction';
import FAQAccordion from '../components/FAQAccordion';
import { FAQS } from '../data/content';
import { ROUTES } from '../lib/site';

const FAQS_SLICE = FAQS.slice(0, 1);

export default function PracticeInvestigation() {
  return (
    <>
      <Seo
        title="חקירות מס | עו״ד שירן לוי אלדר"
        description="ליווי משפטי בחקירות מס הכנסה ומע״מ: ייעוץ לפני חקירה, ליווי בחקירה, ייצוג בחיפוש ובמעצר ובניית קו הגנה."
        path={ROUTES.investigation}
        jsonLd={faqJsonLd(FAQS_SLICE)}
      />
      <PageHero
        title="חקירות מס"
        intro="ליווי משפטי לפני החקירה ובמהלכה — משלב הזימון ועד סגירת התיק או ניהול ההליך."
        crumbs={[
          { label: 'דף הבית', to: ROUTES.home },
          { label: 'תחומי עיסוק', to: ROUTES.practice },
          { label: 'חקירות מס' },
        ]}
      />
      <main className="container-narrow section prose">
        <h2>מהי חקירת מס</h2>
        <p>
          חקירה יכולה להתחיל בזימון, בחיפוש, בתפיסת מסמכים ומחשבים, ולעיתים במעצר.
        </p>
        <h2>שירותי המשרד בחקירה</h2>
        <ul>
          <li>ייעוץ לפני חקירה והכנה</li>
          <li>ליווי בחקירות מס הכנסה ומע״מ ומשותפות עם המשטרה</li>
          <li>ייצוג בחיפוש/תפיסה/מעצר</li>
          <li>בחינת חומר הראיות ובניית קו הגנה</li>
          <li>פנייה לתביעה ולפרקליטות טרם החלטה כולל שימוע</li>
        </ul>
        <h2>זכויותיכם</h2>
        <p>
          מומלץ לפנות לעורך דין לפני ההגעה לחקירה. אין חובה למסור גרסה בלי היערכות
          מוקדמת, ויש לכם זכויות שחשוב להכיר ולממש כבר מרגע הזימון.
        </p>
        <nav aria-label="קישורים קשורים">
          <h2>תחומים קשורים</h2>
          <ul>
            <li><Link to={ROUTES.criminal}>עבירות מס ומע״מ</Link></li>
            <li><Link to={ROUTES.disclosure}>גילוי מרצון, כופר וקנס מנהלי</Link></li>
            <li><Link to={ROUTES.civil}>מיסוי אזרחי – מס הכנסה ומע״מ</Link></li>
          </ul>
        </nav>
        <section aria-labelledby="investigation-faq">
          <h2 id="investigation-faq">שאלות נפוצות</h2>
          <FAQAccordion faqs={FAQS_SLICE} />
        </section>
      </main>
      <CallToAction />
    </>
  );
}
