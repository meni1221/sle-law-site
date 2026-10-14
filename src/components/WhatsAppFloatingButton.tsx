import { Link } from 'react-router-dom';
import { BUSINESS, ROUTES } from '../lib/site';
import { track } from '../lib/analytics';
import { WhatsAppIcon } from './icons';

export default function WhatsAppFloatingButton() {
  return (
    <>
      <a
        className="whatsapp-float"
        href={BUSINESS.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="שליחת הודעת WhatsApp למשרד"
        onClick={() => track('whatsapp_click', { location: 'floating' })}
      >
        <WhatsAppIcon />
      </a>
      <div className="mobile-call-bar">
        <a href={BUSINESS.phoneHref} onClick={() => track('phone_click', { location: 'mobile-bar' })}>
          התקשרו עכשיו
        </a>
        <Link to={ROUTES.contact}>לקביעת פגישת ייעוץ</Link>
      </div>
    </>
  );
}
