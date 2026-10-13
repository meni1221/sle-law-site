export const BUSINESS = {
  name: 'עו"ד שירן לוי אלדר',
  office: 'SLE Law Office',
  tagline: 'משרד בוטיק המתמחה בתחומי המס',
  subTagline: 'ליווי הליכים פליליים ואזרחיים בתחומי המס',
  serviceNote: 'שירות טוב ויחס אישי חשובים לא פחות מהידע והמקצועיות.',
  phoneDisplay: '054-2068580',
  phoneHref: 'tel:+972542068580',
  email: 'Shiraneldar@gmail.com',
  emailHref: 'mailto:Shiraneldar@gmail.com',
  whatsappHref:
    'https://wa.me/972542068580?text=%D7%A9%D7%9C%D7%95%D7%9D%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%99%D7%99%D7%A2%D7%95%D7%A5%20%D7%A8%D7%90%D7%A9%D7%95%D7%A0%D7%99',
  hours: 'ימים א׳–ה׳, 09:00–17:00',
} as const;

export const ROUTES = {
  home: '/',
  about: '/about',
  practice: '/practice',
  criminal: '/practice/criminal-tax-offenses',
  civil: '/practice/civil-taxation',
  investigation: '/practice/tax-investigations',
  disclosure: '/practice/voluntary-disclosure',
  contact: '/contact',
  privacy: '/privacy',
  accessibility: '/accessibility',
} as const;

export const SITE_URL = import.meta.env.VITE_SITE_URL || '';
