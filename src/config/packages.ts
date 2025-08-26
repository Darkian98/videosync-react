import i18n from 'src/i18n/config';

type TExtrasTicketok =
  | 'Audioguía en móvil'
  | 'Plano de visita'
  | '8 Rutas exclusivas de Sevilla'
  | string;

export type TPackageTicketok = {
  name: string;
  description?: string;
  subtitle?: string;
  price: number;
  extras?: Array<TExtrasTicketok>;
  id: "adults" | "senior" | "kids" | "students";
  ticketType: "Básica" | "Preferente Simple" | "Preferente Completo" | "Kid" | "Senior" | "Student";
};

export const packages: Array<TPackageTicketok> = [
  {
    name: i18n.t('PACKAGES.BASICADULT'),
    price: 27,
    extras: [i18n.t('EXTRAS.MAP')],
    id: "adults",
    ticketType: "Básica"
  },
  {
    name: i18n.t('PACKAGES.PREFERREDADULTSIMPLE'),
    price: 36,
    subtitle: i18n.t('SUBTITLE.BASICANDMORE'),
    extras: [
      i18n.t('EXTRAS.PREFERRED'),
      i18n.t('EXTRAS.AUDIO'),
      i18n.t('EXTRAS.COMPLETEMAP'),
      i18n.t('EXTRAS.SPPFORWSP'),
      i18n.t('EXTRAS.DWLFORMOBILE'),
    ],
    id: "adults",
    ticketType: "Preferente Simple"
  },
  {
    name: i18n.t('PACKAGES.PREFERREDADULTCOMPLETE'),
    price: 37,
    subtitle: i18n.t('SUBTITLE.PREFERENTSIMPLEANDMORE'),
    extras: [
      i18n.t('EXTRAS.WALKTOUR'),
      i18n.t('EXTRAS.AUDIO&MAPS'),
    ],
    id: "adults",
    ticketType: "Preferente Completo"
  },
  {
    name: i18n.t('PACKAGES.SENIORPREMIUM'),
    price: 19.79,
    description: i18n.t('DESCRIPTIONS.SENIOR'),
    extras: [
      i18n.t('EXTRAS.QUEUEDACCESS'),
      i18n.t('EXTRAS.AUDIO'),
      i18n.t('EXTRAS.COMPLETEMAP'),
      i18n.t('EXTRAS.SPPFORWSP'),
      i18n.t('EXTRAS.DWLFORMOBILE'),
    ],
    id: "senior",
    ticketType: "Senior"
  },
  {
    name: i18n.t('PACKAGES.STUDENT'),
    price: 19.79,
    extras: [
      i18n.t('EXTRAS.QUEUEDACCESS'),
      i18n.t('EXTRAS.AUDIO'),
      i18n.t('EXTRAS.COMPLETEMAP'),
      i18n.t('EXTRAS.SPPFORWSP'),
      i18n.t('EXTRAS.DWLFORMOBILE'),
    ],
    id: "students",
    ticketType: "Student"
  },
  {
    name: i18n.t('PACKAGES.CHILDREN'),
    description: i18n.t('DESCRIPTIONS.CHILDREN'),
    price: 9,
    id: "kids",
    ticketType: "Kid"
  },
];
