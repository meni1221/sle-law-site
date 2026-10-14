import { Link } from 'react-router-dom';
import { FINAL_CTA_BODY, FINAL_CTA_HEADING } from '../data/content';
import { ROUTES } from '../lib/site';

export default function CallToAction() {
  return (
    <section className="final-cta" aria-labelledby="final-cta-heading">
      <img src="/img-cta.jpg" alt="" aria-hidden="true" loading="lazy" />
      <div className="container final-cta-inner">
        <h2 id="final-cta-heading">{FINAL_CTA_HEADING}</h2>
        <p>{FINAL_CTA_BODY}</p>
        <p>
          <Link className="btn btn-light" to={ROUTES.contact}>
            לקביעת פגישת ייעוץ
          </Link>
        </p>
      </div>
    </section>
  );
}
