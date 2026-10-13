import { Link } from 'react-router-dom';
import type { Service } from '../data/content';
import { ServiceIcon } from './icons';

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <article className="service-card">
      <ServiceIcon slug={service.slug} />
      <h3>{service.title}</h3>
      <p>{service.short}</p>
      <Link to={service.path} aria-label={`לפרטים נוספים על ${service.title}`}>
        לפרטים נוספים ←
      </Link>
    </article>
  );
}
