export type ConsentChoice = 'accepted' | 'rejected' | null;

const KEY = 'sle-cookie-consent';
const EVENT = 'sle:consent-change';

export function getConsent(): ConsentChoice {
  try {
    const v = localStorage.getItem(KEY);
    return v === 'accepted' || v === 'rejected' ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(choice: 'accepted' | 'rejected'): void {
  try {
    localStorage.setItem(KEY, choice);
  } catch {
    /* storage unavailable — banner will reappear */
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: choice }));
}

export function onConsentChange(fn: (c: ConsentChoice) => void): () => void {
  const handler = (e: Event) => fn((e as CustomEvent).detail as ConsentChoice);
  window.addEventListener(EVENT, handler);
  return () => window.removeEventListener(EVENT, handler);
}

export function hasAnalyticsConsent(): boolean {
  return getConsent() === 'accepted';
}
