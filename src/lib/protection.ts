/**
 * חסימת העתקת תוכן האתר (לבקשת בעל האתר).
 * שדות הטופס מוחרגים כדי לאפשר הקלדה, הדבקה ועריכה תקינה.
 * קוראי מסך וניווט מקלדת אינם מושפעים.
 * להסרה: למחוק את הקריאה ל-initContentProtection ב-App ואת חוקי user-select ב-CSS.
 */
function isFormField(target: EventTarget | null): boolean {
  return (
    target instanceof HTMLElement &&
    target.closest('input, textarea, select, [contenteditable="true"]') !== null
  );
}

export function initContentProtection(): void {
  document.addEventListener('copy', (e) => {
    if (!isFormField(e.target)) e.preventDefault();
  });
  document.addEventListener('cut', (e) => {
    if (!isFormField(e.target)) e.preventDefault();
  });
  document.addEventListener('contextmenu', (e) => {
    if (!isFormField(e.target)) e.preventDefault();
  });
  document.addEventListener('dragstart', (e) => {
    if (e.target instanceof HTMLImageElement) e.preventDefault();
  });
}
