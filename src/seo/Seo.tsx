import { useEffect } from 'react';
import { SITE_URL } from '../lib/site';

interface SeoProps {
  title: string;
  description: string;
  path: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export function legalServiceJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'LegalService',
    name: 'SLE Law Office — עו"ד שירן לוי אלדר',
    description:
      'משרד בוטיק המתמחה בתחומי המס — ליווי הליכים פליליים ואזרחיים בתחומי מס הכנסה ומע"מ.',
    telephone: '+972-54-2068580',
    email: 'shiran@sle-law.co.il',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IL',
    },
    openingHours: 'Mo-Th 09:00-17:00',
    areaServed: 'IL',
    priceRange: '₪₪₪',
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export default function Seo({ title, description, path, jsonLd }: SeoProps) {
  useEffect(() => {
    document.title = title;
    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.head.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        const m = selector.match(/\[(name|property)="([^"]+)"\]/);
        if (m) el.setAttribute(m[1], m[2]);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    if (SITE_URL) {
      let link = document.head.querySelector(
        'link[rel="canonical"]',
      ) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = SITE_URL.replace(/\/$/, '') + path;
    }
    const scripts: HTMLScriptElement[] = [];
    const items = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
    for (const item of items) {
      const s = document.createElement('script');
      s.type = 'application/ld+json';
      s.dataset.seo = 'true';
      s.text = JSON.stringify(item);
      document.head.appendChild(s);
      scripts.push(s);
    }
    return () => {
      scripts.forEach((s) => s.remove());
    };
  }, [title, description, path, jsonLd]);

  return null;
}
