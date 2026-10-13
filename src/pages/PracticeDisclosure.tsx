import { Link } from 'react-router-dom';
import Seo, { faqJsonLd } from '../seo/Seo';
import PageHero from '../components/PageHero';
import CallToAction from '../components/CallToAction';
import FAQAccordion from '../components/FAQAccordion';
import { FAQS } from '../data/content';
import { ROUTES } from '../lib/site';

const FAQS_SLICE = FAQS.slice(3, 4);

export default function PracticeDisclosure() {
  return (
    <>
      <Seo
        title="גילוי מרצון, כופר וקנס מנהלי | עו״ד שירן לוי אלדר"
        description="הסדרת חבות מס ומזעור החשיפה הפלילית: הסרת מחדלים, הסדר כופר, קנס מנהלי וגילוי מרצון — בליווי עורך דין."
        path={ROUTES.disclosure}
        jsonLd={faqJsonLd(FAQS_SLICE)}
      />
      <PageHero
        title="גילוי מרצון, כופר וקנס מנהלי"
        intro="הסדרת חבות מס ומזעור החשיפה הפלילית בדרכים שהדין מאפשר."
        crumbs={[
          { label: 'דף הבית', to: ROUTES.home },
          { label: 'תחומי עיסוק', to: ROUTES.practice },
          { label: 'גילוי מרצון, כופר וקנס מנהלי' },
        ]}
      />
      <main className="container-narrow section prose">
        <h2>הסרת מחדלים</h2>
        <p>
          תיקון ליקויים, הגשת דוחות ותשלום — עשויה להשפיע על החלטת התביעה ועל
          העונש.
        </p>
        <h2>הסדר כופר</h2>
        <p>תשלום כספי במקום כתב אישום, בכפוף לתנאים ולשיקול דעת הגורמים המוסמכים.</p>
        <h2>קנס מנהלי</h2>
        <p>חלופה להליך הפלילי בעבירות מסוימות.</p>
        <h2>גילוי מרצון</h2>
        <p>
          מי שלא דיווח על הכנסות או נכסים, ובכלל זה חשבונות בחו״ל, יכול לשקול גילוי
          מרצון בכפוף לתנאים — הליך עדין המחייב בחינה מוקדמת.
        </p>
        <p>ורצוי לבצעו באמצעות עורך דין (חיסיון עו״ד–לקוח).</p>
        <nav aria-label="קישורים קשורים">
          <h2>תחומים קשורים</h2>
          <ul>
            <li><Link to={ROUTES.criminal}>עבירות מס ומע״מ</Link></li>
            <li><Link to={ROUTES.investigation}>חקירות מס</Link></li>
            <li><Link to={ROUTES.civil}>מיסוי אזרחי – מס הכנסה ומע״מ</Link></li>
          </ul>
        </nav>
        <section aria-labelledby="disclosure-faq">
          <h2 id="disclosure-faq">שאלות נפוצות</h2>
          <FAQAccordion faqs={FAQS_SLICE} />
        </section>
      </main>
      <CallToAction />
    </>
  );
}
