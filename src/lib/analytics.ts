import { hasAnalyticsConsent } from './consent';

function loadGA4(id: string): void {
  if (document.querySelector(`script[data-ga4="${id}"]`)) return;
  const s = document.createElement('script');
  s.async = true;
  s.dataset.ga4 = id;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
  const inline = document.createElement('script');
  inline.text = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}',{anonymize_ip:true});`;
  document.head.appendChild(inline);
}

function loadClarity(id: string): void {
  if (document.querySelector(`script[data-clarity="${id}"]`)) return;
  const s = document.createElement('script');
  s.dataset.clarity = id;
  s.text = `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${id}");`;
  document.head.appendChild(s);
}

export function initAnalyticsIfConsented(): void {
  if (!hasAnalyticsConsent()) return;
  const ga = import.meta.env.VITE_GA4_ID as string | undefined;
  const cl = import.meta.env.VITE_CLARITY_ID as string | undefined;
  if (ga) loadGA4(ga);
  if (cl) loadClarity(cl);
}

export function track(event: string, params: Record<string, unknown> = {}): void {
  if (!hasAnalyticsConsent()) return;
  try {
    (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag?.('event', event, params);
  } catch {
    /* analytics must never break the site */
  }
}
