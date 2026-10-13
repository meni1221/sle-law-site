import Seo from '../seo/Seo';
import PageHero from '../components/PageHero';
import CallToAction from '../components/CallToAction';
import ServiceCard from '../components/ServiceCard';
import ProcessSteps from '../components/ProcessSteps';
import FAQAccordion from '../components/FAQAccordion';
import { FAQS, SERVICES } from '../data/content';
import { ROUTES } from '../lib/site';

export default function PracticeOverview() {
  return (
    <>
      <Seo
        title="תחומי עיסוק | עו״ד שירן לוי אלדר"
        description="המשרד עוסק בליטיגציה אזרחית בתחומי המס ומלווה הליכים פליליים בתחומי המס: עבירות מס ומע״מ, מיסוי אזרחי, חקירות מס וגילוי מרצון."
        path={ROUTES.practice}
      />
      <PageHero
        title="תחומי עיסוק"
        intro="המשרד עוסק בליטיגציה אזרחית בתחומי המס ומלווה הליכים פליליים בתחומי המס."
        crumbs={[{ label: 'דף הבית', to: ROUTES.home }, { label: 'תחומי עיסוק' }]}
      />
      <main className="container section">
        <div className="cards-grid">
          {SERVICES.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
        <section aria-labelledby="process-heading" className="section">
          <h2 id="process-heading" className="section-title">איך עובדים איתנו</h2>
          <ProcessSteps />
        </section>
        <section aria-labelledby="faq-heading" className="section">
          <h2 id="faq-heading" className="section-title">שאלות נפוצות</h2>
          <FAQAccordion faqs={FAQS.slice(0, 3)} />
        </section>
      </main>
      <CallToAction />
    </>
  );
}
