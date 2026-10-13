import { useId, useState } from 'react';
import { FAQS, type Faq } from '../data/content';
import { MinusIcon, PlusIcon } from './icons';

interface FAQAccordionProps {
  faqs?: Faq[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const items = faqs ?? FAQS;
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="faq-list">
      {items.map((f, i) => {
        const open = openIndex === i;
        const btnId = `${baseId}-q-${i}`;
        const panelId = `${baseId}-a-${i}`;
        return (
          <div key={f.q} className="faq-item">
            <h3 style={{ margin: 0 }}>
              <button
                type="button"
                id={btnId}
                className="faq-q"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenIndex(open ? null : i)}
              >
                <span>{f.q}</span>
                <span aria-hidden="true">{open ? <MinusIcon /> : <PlusIcon />}</span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className="faq-a"
              hidden={!open}
            >
              {open && <p style={{ margin: 0 }}>{f.a}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
