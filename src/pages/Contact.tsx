import Seo from '../seo/Seo';
import PageHero from '../components/PageHero';
import ContactForm from '../components/ContactForm';
import { ClockIcon, MailIcon, PhoneIcon, WhatsAppIcon } from '../components/icons';
import { BUSINESS, ROUTES } from '../lib/site';
import { FINAL_CTA_BODY } from '../data/content';

export default function Contact() {
  return (
    <>
      <Seo
        title="צרו קשר לקביעת פגישת ייעוץ | עו״ד שירן לוי אלדר"
        description="צרו קשר עם משרד עו״ד שירן לוי אלדר — טלפון 054-2068580, דוא״ל וטופס פנייה דיסקרטי. ימים א׳–ה׳, 09:00–17:00."
        path={ROUTES.contact}
      />
      <PageHero
        title="צרו קשר לקביעת פגישת ייעוץ"
        intro={FINAL_CTA_BODY}
        crumbs={[{ label: 'דף הבית', to: ROUTES.home }, { label: 'צרו קשר' }]}
      />
      <main id="main-content" className="container section contact-grid">
        <aside className="contact-details" aria-labelledby="contact-details-h">
          <h2 id="contact-details-h">פרטי התקשרות</h2>
          <p>
            <PhoneIcon /> טלפון:{' '}
            <a href={BUSINESS.phoneHref}>
              <bdi>{BUSINESS.phoneDisplay}</bdi>
            </a>
          </p>
          <p>
            <MailIcon /> דוא״ל: <a href={BUSINESS.emailHref}>{BUSINESS.email}</a>
          </p>
          <p>
            <ClockIcon /> שעות פעילות: {BUSINESS.hours}
          </p>
          <p>
            <WhatsAppIcon size={18} className="inline-icon" />{' '}
            <a href={BUSINESS.whatsappHref} target="_blank" rel="noopener noreferrer">
              שלחו הודעה ב-WhatsApp
            </a>
          </p>
        </aside>
        <section aria-labelledby="contact-form-h">
          <h2 id="contact-form-h">טופס פנייה</h2>
          <ContactForm />
        </section>
      </main>
    </>
  );
}
