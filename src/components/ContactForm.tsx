import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { BUSINESS } from '../lib/site';
import { track } from '../lib/analytics';
import { CONFIDENTIALITY_NOTE, INQUIRY_SUBJECTS } from '../data/content';

interface FieldErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  subject?: string;
  privacyConsent?: string;
}

function validatePhone(raw: string): boolean {
  const stripped = raw.replace(/[\s]/g, '');
  return /^0(5\d|\d{1,2})-?\d{7}$/.test(stripped);
}

function validateEmail(raw: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw);
}

export default function ContactForm(): React.ReactElement {
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [subject, setSubject] = useState<string>(INQUIRY_SUBJECTS[0]);
  const [message, setMessage] = useState<string>('');
  const [privacyConsent, setPrivacyConsent] = useState<boolean>(false);
  const [marketingConsent, setMarketingConsent] = useState<boolean>(false);
  const [honeypot, setHoneypot] = useState<string>('');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [status, setStatus] = useState<{ kind: 'success' | 'error'; text: string } | null>(null);
  const [successName, setSuccessName] = useState<string>('');
  const [mailtoFallback, setMailtoFallback] = useState<boolean>(false);
  const lastAttemptRef = useRef<number>(0);

  function validate(): FieldErrors {
    const next: FieldErrors = {};
    if (fullName.trim().length < 2) {
      next.fullName = 'נא להזין שם מלא (2 תווים לפחות).';
    }
    if (!phone.trim()) {
      next.phone = 'נא להזין מספר טלפון.';
    } else if (!validatePhone(phone.trim())) {
      next.phone = 'נא להזין מספר טלפון ישראלי תקין.';
    }
    if (email.trim() && !validateEmail(email.trim())) {
      next.email = 'נא להזין כתובת דוא״ל תקינה.';
    }
    if (!subject) {
      next.subject = 'נא לבחור נושא פנייה.';
    }
    if (!privacyConsent) {
      next.privacyConsent = 'יש לאשר את מדיניות הפרטיות כדי לשלוח את הטופס.';
    }
    return next;
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();
    setStatus(null);
    setMailtoFallback(false);

    if (honeypot) return;

    const now = Date.now();
    if (now - lastAttemptRef.current < 8000) {
      setStatus({ kind: 'error', text: 'אנא המתינו מספר שניות לפני ניסיון נוסף.' });
      return;
    }
    lastAttemptRef.current = now;

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

    if (!endpoint) {
      const body = `שם: ${fullName}\nטלפון: ${phone}\n${email ? `דוא״ל: ${email}\n` : ''}נושא: ${subject}\n${message ? `הודעה: ${message}\n` : ''}שיווק: ${marketingConsent ? 'מאשר/ת' : 'לא מאשר/ת'}`;
      const mailto = `mailto:${BUSINESS.email}?subject=${encodeURIComponent(`פנייה מהאתר — ${subject}`)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      setSuccessName(fullName.trim());
      setMailtoFallback(true);
      track('form_mailto_opened');
      setFullName('');
      setPhone('');
      setEmail('');
      setSubject(INQUIRY_SUBJECTS[0]);
      setMessage('');
      setPrivacyConsent(false);
      setMarketingConsent(false);
      setErrors({});
      return;
    }

    setSubmitting(true);
    try {
      const apiKey = import.meta.env.VITE_CONTACT_API_KEY as string | undefined;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...(apiKey ? { Authorization: `Bearer ${apiKey}` } : {}),
        },
        body: JSON.stringify({
          name: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          subject,
          message: message.trim(),
          marketing: marketingConsent,
          _subject: `פנייה מהאתר — ${subject}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSuccessName(fullName.trim());
      track('form_submit');
      setStatus({ kind: 'success', text: '' });
      setFullName('');
      setPhone('');
      setEmail('');
      setSubject(INQUIRY_SUBJECTS[0]);
      setMessage('');
      setPrivacyConsent(false);
      setMarketingConsent(false);
      setErrors({});
    } catch {
      setStatus({
        kind: 'error',
        text: `שליחת הטופס נכשלה. אנא נסו שוב או צרו קשר בטלפון ${BUSINESS.phoneDisplay}.`,
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      {mailtoFallback ? (
        <div className="form-status success" role="status">
          <p>
            בקשתך הוכנה לשליחה — נפתחה תוכנת הדואר כדי להשלים את השליחה. אם לא נפתחה, כתבו ל-
            {BUSINESS.email} או התקשרו {BUSINESS.phoneDisplay}.
          </p>
        </div>
      ) : null}
      {status?.kind === 'success' ? (
        <div className="form-status success" role="status">
          <p>
            תודה {successName}, פנייתך התקבלה. ניצור קשר בהקדם.
          </p>
        </div>
      ) : null}
      {status?.kind === 'error' ? (
        <div className="form-status error" role="alert">
          <p style={{ margin: 0 }}>{status.text}</p>
        </div>
      ) : null}
      <form onSubmit={handleSubmit} noValidate>
        <div
          aria-hidden="true"
          style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}
        >
          <label htmlFor="company_website">אתר חברה</label>
          <input
            type="text"
            id="company_website"
            name="company_website"
            autoComplete="off"
            tabIndex={-1}
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
          />
        </div>

        <div className="form-field">
          <label htmlFor="contact-fullname">שם מלא *</label>
          <input
            type="text"
            id="contact-fullname"
            name="fullName"
            autoComplete="name"
            required
            minLength={2}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            aria-invalid={errors.fullName ? true : undefined}
            aria-describedby={errors.fullName ? 'contact-fullname-error' : undefined}
          />
          {errors.fullName ? (
            <p className="field-error" role="alert" id="contact-fullname-error">
              {errors.fullName}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor="contact-phone">טלפון *</label>
          <input
            type="tel"
            id="contact-phone"
            name="phone"
            autoComplete="tel"
            required
            inputMode="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
          />
          {errors.phone ? (
            <p className="field-error" role="alert" id="contact-phone-error">
              {errors.phone}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor="contact-email">דוא״ל</label>
          <input
            type="email"
            id="contact-email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'contact-email-error' : undefined}
          />
          {errors.email ? (
            <p className="field-error" role="alert" id="contact-email-error">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor="contact-subject">נושא הפנייה *</label>
          <select
            id="contact-subject"
            name="subject"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            aria-invalid={errors.subject ? true : undefined}
            aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
          >
            {INQUIRY_SUBJECTS.map((s: string) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.subject ? (
            <p className="field-error" role="alert" id="contact-subject-error">
              {errors.subject}
            </p>
          ) : null}
        </div>

        <div className="form-field">
          <label htmlFor="contact-message">הודעה</label>
          <textarea
            id="contact-message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="checkbox-row">
          <input
            type="checkbox"
            id="contact-privacy"
            name="privacyConsent"
            required
            checked={privacyConsent}
            onChange={(e) => setPrivacyConsent(e.target.checked)}
            aria-invalid={errors.privacyConsent ? true : undefined}
            aria-describedby={errors.privacyConsent ? 'contact-privacy-error' : undefined}
          />
          <label htmlFor="contact-privacy">אני מאשר/ת את מדיניות הפרטיות ומסכים/ה לפנייה אליי *</label>
        </div>
        {errors.privacyConsent ? (
          <p className="field-error" role="alert" id="contact-privacy-error">
            {errors.privacyConsent}
          </p>
        ) : null}

        <div className="checkbox-row">
          <input
            type="checkbox"
            id="contact-marketing"
            name="marketingConsent"
            checked={marketingConsent}
            onChange={(e) => setMarketingConsent(e.target.checked)}
          />
          <label htmlFor="contact-marketing">אני מעוניין/ת לקבל עדכונים ומידע מקצועי</label>
        </div>

        <button type="submit" className="btn btn-primary" disabled={submitting}>
          {submitting ? 'שולח…' : 'שליחת פנייה'}
        </button>
      </form>
      <p className="confidentiality">{CONFIDENTIALITY_NOTE}</p>
    </div>
  );
}
