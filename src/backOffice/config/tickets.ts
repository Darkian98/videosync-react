export type TLanguageCode = 'de' | 'en' | 'es' | 'fr' | 'it' | 'nl' | 'pt';

interface TicketLanguage {
    name: string;
    features: string[];

    lastModified: string; // siempre en español
}

type LangTicketLanguages = {
    [key in TLanguageCode]: TicketLanguage;
};

export type ITicket = { id: number, price: number; } & LangTicketLanguages;

export const tickets = [
    {
        id: 1,
        price: 32.65,
        de: {
            name: "Senior-Eintritt Offiziell + Premium-Audioguide (+65 Jahre EU)",
            features: [
                "Bevorzugter Zugang ohne Warteschlangen zum Real Alcázar",
                "Offizieller Audioguide (9 Sprachen)"
            ],
            lastModified: "17 de Octubre de 2022"
        },
        en: {
            name: "Senior Official Ticket + Premium Audioguide (+65 EU years)",
            features: [
                "Priority Access without queues to the Royal Alcázar",
                "Official Audioguide (9 languages)"
            ],
            lastModified: "17 de Octubre de 2022"
        },
        es: {
            name: "Entrada Senior Oficial + Audioguía Premium (+65 años EU)",
            features: [
                "Acceso Preferente sin colas al Real Alcázar",
                "Audioguía Oficial (9 idiomas)"
            ],
            lastModified: "17 de Octubre de 2022"
        },
        fr: {
            name: "Billet Senior Officiel + Audioguide Premium (+65 ans UE)",
            features: [
                "Accès prioritaire sans files d'attente au Real Alcázar",
                "Audioguide officiel (9 langues)"
            ],
            lastModified: "17 de Octubre de 2022"
        },
        it: {
            name: "Biglietto Senior Ufficiale + Audioguida Premium (+65 anni UE)",
            features: [
                "Accesso prioritario senza code al Real Alcázar",
                "Audioguida ufficiale (9 lingue)"
            ],
            lastModified: "17 de Octubre de 2022"
        },
        nl: {
            name: "Senior Officieel Ticket + Premium Audiogids (+65 jaar EU)",
            features: [
                "Voorrangstoegang zonder wachtrijen tot het Real Alcázar",
                "Officiële audiogids (9 talen)"
            ],
            lastModified: "17 de Octubre de 2022"
        },
        pt: {
            name: "Bilhete Oficial Sénior + Audioguia Premium (+65 anos UE)",
            features: [
                "Acesso prioritário sem filas ao Real Alcázar",
                "Audioguia oficial (9 idiomas)"
            ],
            lastModified: "17 de Octubre de 2022"
        }
    },
    {
        id: 2,
        price: 35.00,
        de: {
            name: "Allgemeiner Eintritt + Stadtführung",
            features: [
                "Zugang zu allen Bereichen des Alcázar",
                "Geführte Tour durch die Altstadt"
            ],
            lastModified: "05 de Mayo de 2023"
        },
        en: {
            name: "General Admission + City Tour",
            features: [
                "Access to all areas of the Alcázar",
                "Guided tour through the old town"
            ],
            lastModified: "05 de Mayo de 2023"
        },
        es: {
            name: "Entrada General + Tour por la Ciudad",
            features: [
                "Acceso a todas las áreas del Alcázar",
                "Visita guiada por el casco antiguo"
            ],
            lastModified: "05 de Mayo de 2023"
        },
        fr: {
            name: "Billet Général + Visite de la Ville",
            features: [
                "Accès à toutes les zones de l'Alcázar",
                "Visite guidée du centre historique"
            ],
            lastModified: "05 de Mayo de 2023"
        },
        it: {
            name: "Ingresso Generale + Tour della Città",
            features: [
                "Accesso a tutte le aree dell'Alcázar",
                "Visita guidata del centro storico"
            ],
            lastModified: "05 de Mayo de 2023"
        },
        nl: {
            name: "Algemene Toegang + Stadsrondleiding",
            features: [
                "Toegang tot alle gebieden van het Alcázar",
                "Rondleiding door de oude stad"
            ],
            lastModified: "05 de Mayo de 2023"
        },
        pt: {
            name: "Entrada Geral + Tour pela Cidade",
            features: [
                "Acesso a todas as áreas do Alcázar",
                "Visita guiada pelo centro histórico"
            ],
            lastModified: "05 de Mayo de 2023"
        }
    },
    {
        id: 3,
        price: 50.50,
        de: {
            name: "Familienpass + Aktivitäten für Kinder",
            features: [
                "Zugang für 2 Erwachsene + 2 Kinder",
                "Interaktive Aktivitäten im Alcázar"
            ],
            lastModified: "12 de Enero de 2024"
        },
        en: {
            name: "Family Pass + Children's Activities",
            features: [
                "Access for 2 adults + 2 children",
                "Interactive activities in the Alcázar"
            ],
            lastModified: "12 de Enero de 2024"
        },
        es: {
            name: "Pase Familiar + Actividades Infantiles",
            features: [
                "Acceso para 2 adultos + 2 niños",
                "Actividades interactivas en el Alcázar"
            ],
            lastModified: "12 de Enero de 2024"
        },
        fr: {
            name: "Pass Famille + Activités pour Enfants",
            features: [
                "Accès pour 2 adultes + 2 enfants",
                "Activités interactives dans l'Alcázar"
            ],
            lastModified: "12 de Enero de 2024"
        },
        it: {
            name: "Pass Famiglia + Attività per Bambini",
            features: [
                "Accesso per 2 adulti + 2 bambini",
                "Attività interattive all'interno dell'Alcázar"
            ],
            lastModified: "12 de Enero de 2024"
        },
        nl: {
            name: "Familiepas + Kinderactiviteiten",
            features: [
                "Toegang voor 2 volwassenen + 2 kinderen",
                "Interactieve activiteiten in het Alcázar"
            ],
            lastModified: "12 de Enero de 2024"
        },
        pt: {
            name: "Passe Familiar + Atividades para Crianças",
            features: [
                "Acesso para 2 adultos + 2 crianças",
                "Atividades interativas no Alcázar"
            ],
            lastModified: "12 de Enero de 2024"
        }
    },
    {
        id: 4,
        price: 80.00,
        de: {
            name: "VIP-Eintritt + Privater Guide",
            features: [
                "Sofortiger Zugang ohne Wartezeit",
                "Privater Guide in gewählter Sprache"
            ],
            lastModified: "02 de Abril de 2025"
        },
        en: {
            name: "VIP Entry + Private Guide",
            features: [
                "Instant access with no waiting time",
                "Private guide in your chosen language"
            ],
            lastModified: "02 de Abril de 2025"
        },
        es: {
            name: "Entrada VIP + Guía Privado",
            features: [
                "Acceso inmediato sin esperas",
                "Guía privado en el idioma elegido"
            ],
            lastModified: "02 de Abril de 2025"
        },
        fr: {
            name: "Entrée VIP + Guide Privé",
            features: [
                "Accès immédiat sans attente",
                "Guide privé dans la langue choisie"
            ],
            lastModified: "02 de Abril de 2025"
        },
        it: {
            name: "Ingresso VIP + Guida Privata",
            features: [
                "Accesso immediato senza attese",
                "Guida privata nella lingua scelta"
            ],
            lastModified: "02 de Abril de 2025"
        },
        nl: {
            name: "VIP Toegang + Privégids",
            features: [
                "Directe toegang zonder wachttijd",
                "Privégids in de gekozen taal"
            ],
            lastModified: "02 de Abril de 2025"
        },
        pt: {
            name: "Entrada VIP + Guia Privado",
            features: [
                "Acesso imediato sem espera",
                "Guia privado no idioma escolhido"
            ],
            lastModified: "02 de Abril de 2025"
        }
    }
];