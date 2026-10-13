# SLE Law Office — אתר משרד עו״ד שירן לוי אלדר

אתר תדמית עברי (RTL) למשרד בוטיק לדיני מס — React + TypeScript + Vite +
react-router-dom. האתר סטטי, ללא צד שרת.

## הקמה מקומית

```bash
npm install
npm run dev      # שרת פיתוח
npm run build    # בדיקת טיפוסים + בנייה ל־dist/
npm run preview  # תצוגה מקדימה של הבנייה
```

## פריסה (Deployment)

אחסון סטטי כלשהו (Netlify / Vercel / S3+CloudFront / שרת קבצים). חובה להגדיר
**SPA fallback** — כל נתיב שאינו קובץ יחזיר את `index.html` (למשל `_redirects`
עם `/* /index.html 200` ב־Netlify, או `rewrites` ב־Vercel), אחרת ניווט ישיר
לעמודים פנימיים יחזיר 404.

## משתני סביבה

| משתנה | תיאור |
|---|---|
| `VITE_SITE_URL` | כתובת האתר הקנונית (canonical + sitemap). |
| `VITE_CONTACT_ENDPOINT` | כתובת POST לקבלת פניות מטופס יצירת הקשר. |
| `VITE_CONTACT_API_KEY` | מפתח Bearer לצירוף לבקשות הטופס. |
| `VITE_GA4_ID` | מזהה Google Analytics 4 (נטען רק לאחר הסכמת עוגיות). |
| `VITE_CLARITY_ID` | מזהה Microsoft Clarity (נטען רק לאחר הסכמת עוגיות). |

ראו `.env.example`. לא לשמור מפתחות אמיתיים בגיט.

## עריכת תוכן

כל התוכן השיווקי מרוכז ב־`src/data/content.ts`:

- `PILLARS` — ארבעת עמודי התווך של דף הבית.
- `SERVICES` — ארבעת תחומי העיסוק (כותרת, תקציר, נתיב).
- `STEPS` — שלבי העבודה (`ProcessSteps`).
- `FAQS` — שאלות נפוצות (`FAQAccordion`, כולל JSON-LD).
- `ABOUT_*`, `FINAL_CTA_*`, `CONFIDENTIALITY_NOTE`, `INQUIRY_SUBJECTS`.

פרטי העסק (טלפון, דוא״ל, וואטסאפ, שעות) ב־`src/lib/site.ts` (`BUSINESS`, `ROUTES`).

## טופס יצירת קשר (Form adapter)

`ContactForm` שולח `POST` עם JSON ל־`VITE_CONTACT_ENDPOINT`:

```json
{ "name": "...", "email": "...", "phone": "...", "subject": "...", "message": "..." }
```

כותרת `Authorization: Bearer <VITE_CONTACT_API_KEY>` מצורפת כשהמפתח מוגדר.
ברירת המחדל החינמית היא FormSubmit (`https://formsubmit.co/ajax/<office-email>`) —
אין צורך בהרשמה; לאחר הפריסה יש לשלוח פניית ניסיון אחת וללחוץ על קישור ההפעלה
שיגיע לתיבת המשרד, ומאז כל פנייה תגיע ישירות לדוא״ל המשרד.
בהיעדר endpoint מוגדר הטופס פותח הודעת דואר מוכנה אצל הגולש (mailto) במקום שליחה
ישירה. ההודעות נשמרות תחת חיסיון עו״ד–לקוח — אין לשלוח מסמכים רגישים לפני הנחיה
מהמשרד.

## חסמים לפני השקה (Launch blockers)

- [ ] דומיין ייצור סופי + עדכון `VITE_SITE_URL`, `robots.txt`, `sitemap.xml`.
- [ ] תמונת פורטרט אמיתית (אופציונלי — כרגע תמונות אווירה).
- [ ] פרטי התחברות לשירות שליחת הדוא״ל של הטופס (`VITE_CONTACT_ENDPOINT`).
- [ ] מזהי GA4 / Clarity אמיתיים (או הסרת הכלים).
- [ ] אישור סופי של הנוסחים המשפטיים (פרטיות, נגישות) מול המשרד.
