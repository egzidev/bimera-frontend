import type { Locale } from './locales'

export const messages: Record<Locale, Record<string, unknown>> = {
  en: {
    menu: {
      services: 'Services',
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
    },
    homepage: {
      hero: {
        line1: 'Smart structural design',
        line2: 'for strong and efficient',
        line3: 'buildings',
      },
      services: {
        heading: 'Our Services',
        lead: 'Our team specializes in all types of structural frames and materials.',
        items: {
          structuralCalculations: {
            title: 'Structural Calculations',
            description:
              'We ensure that your structure can endure all external forces by delivering a robust design that complies with Eurocode standards.',
          },
          bimManagement: {
            title: 'BIM Management',
            description:
              'We transform traditional management into building information modeling, guaranteeing that every detail is accounted for from start to finish.',
          },
          structuralDrawings: {
            title: 'Structural Drawings',
            description:
              'Your project deserves clear and easy-to-read drawings that capture every detail, and that is precisely what we offer.',
          },
        },
        materials: {
          precastFrames: {
            title: 'Precast Frames',
            // Note: your provided English text didn’t include a precast description, so we keep a sensible default.
            description:
              'Efficient and cost-effective structural solutions with precast concrete frames. Perfect for rapid construction and consistent quality.',
          },
          steelFrames: {
            title: 'Steel Frames',
            description:
              'Our steel frame designs are engineered for durability and efficiency. By using reliable industry-leading tools, we optimize the structural capacity of steel to deliver safe and cost-effective solutions.',
          },
          inSituFrames: {
            title: 'In-situ Frames',
            description:
              'Cast-in-place concrete structures are also part of our expertise. Our experience includes the design of monolithic frames, foundations, and basement structures.',
          },
          timberComposite: {
            title: 'Timber and Composite Structures',
            description:
              'We also work with sustainable timber and composite materials, providing efficient and environmentally conscious structural solutions.',
          },
        },
      },
      quality: {
        promise:
          'Quality is our promise, therefore we are transparent about meeting quality standards',
        hoursWorkedLabel: 'Hours worked last year',
        deviationIndexLabel: 'Deviation Index',
        deviationIndexTooltip:
          'We aim for our deviations to be below 0.5% of our total time in projects.',
      },
      aboutUsCard: {
        smallLabel: 'About Us',
        heading: 'Who We Are',
        description:
          'We are a structural engineering consultancy headquartered in Sweden.',
        learnMore: 'Learn More',
      },
      testimonials: {
        question: 'What our clients and partners\nsay about us?',
        items: {
          joakim: {
            quote:
              'Bimera has extensive experience in modeling prefab frames and producing production documents for concrete and steel elements.',
            author: 'Joakim Lindskog',
            role: 'CEO, Prodesign AB',
          },
          martin: {
            quote:
              'Bimera is a reliable partner with a strong work ethic and a high sense of responsibility. They meet deadlines, deliver the right quality, and always maintain a professional and positive approach.',
            author: 'Martin Hesselroth',
            role: 'Construction Manager, CarlGustav Solutions AB',
          },
        },
      },
    },
    footer: {
      tagline: 'Smart structural design for efficient and buildable projects.',
      nav: {
        services: 'Services',
        projects: 'Projects',
        about: 'About',
        contact: 'Contact',
      },
    },
    aboutPage: {
      hero: {
        smallLabel: 'About Us',
        title: 'Driven by ambition',
        description:
          'We are a structural engineering consultancy headquartered in Sweden, with operation offices in Kosovo.',
      },
      story: {
        smallLabel: 'Our story',
        title: 'Where it started',
        paragraph1:
          'Bimera started in May 2023 when six engineers decided to turn ambition and coffee into structural engineering across Sweden and Kosovo. We believed in smart collaboration between established EU markets and high-talent teams in Kosovo — and we still do.',
        paragraph2:
          'Like many startups, we met a few economic plot twists after COVID. So in October 2024, we rebooted — leaner, sharper, and focused — with two engineers and a clearer strategy. Since then, we\'ve been growing steadily, delivering reliable structural design with innovation, resilience, and sustainability at the core.',
      },
      mission: {
        smallLabel: 'Purpose',
        title: 'Our Mission',
        paragraph1:
          'Our mission is to grow into a multidisciplinary engineering brand that actively contributes to design, construction, manufacturing, and innovation within the construction industry. We aim to become a trusted partner within the European market while promoting responsible and transparent outsourcing models.',
        paragraph2:
          'By combining technical excellence with efficient cross-border collaboration, we strive to support economic development in countries such as Kosovo that aspire to closer integration with the European Union. Through our work, we seek to create long-term value for our clients, our partners, and the communities we are part of.',
      },
      structure: {
        smallLabel: 'How we operate',
        title: 'Company Structure',
        paragraph1:
          'Bimera operates through a transparent and compliant cross-border structure designed for efficient, high-quality delivery. We consist of two legally independent sister companies in Sweden and Kosovo, working under the same brand, standards, and quality systems.',
        callout:
          'This setup ensures clear responsibilities, full transparency, regulatory compliance, and efficient delivery—while contributing to sustainable growth and knowledge development in both countries.',
      },
      flipScroll: {
        stepBrief: {
          label: 'Brief',
          paragraph:
            'Your project starts here. We take your brief and align scope, timeline and deliverables with you.',
        },
        stepContract: {
          label: 'Contract',
          paragraph:
            'Client relations, contracts, project management & structural calculations in line with Swedish and EU regulations.',
        },
        stepDesign: {
          label: 'Design',
          paragraph:
            'Detailed drawings and BIM models using the same documented workflows and technical standards.',
        },
        stepDelivery: {
          label: 'Delivery',
          paragraph:
            'Thorough quality control, so we ensure no errors follow on construction site, and project is delivered to the client.',
        },
      },
    },
  },
  sv: {
    menu: {
      services: 'Tjänster',
      projects: 'Projekt',
      about: 'Om Oss',
      contact: 'Kontakt',
    },
    homepage: {
      hero: {
        line1: 'Smart projektering',
        line2: 'för starka och ekonomiska',
        line3: 'byggnader',
      },
      services: {
        heading: 'Våra tjänster',
        lead: 'Vårt team har kompetens inom projektering av bärande konstruktioner i olika stomtyper och material.',
        items: {
          structuralCalculations: {
            title: 'Konstruktionsberäkningar',
            description:
              'Vi säkerställer att din byggnad klarar alla relevanta laster genom att ta fram en robust dimensionering i enlighet med Eurokod.',
          },
          bimManagement: {
            title: 'BIM-samordning',
            description:
              'Vi använder BIM-baserade arbetsmetoder för att samordna projektet och säkerställa att alla detaljer hanteras korrekt genom hela projekteringsprocessen.',
          },
          structuralDrawings: {
            title: 'Konstruktionsritningar',
            description:
              'Vi levererar tydliga och lättlästa konstruktionsritningar där varje detalj är noggrant genomarbetad för att underlätta produktion och montage.',
          },
        },
        materials: {
          precastFrames: {
            title: 'Prefabstommar',
            description:
              'Vi projekterar prefabstommar med ett brett utbud av element, inklusive både slakarmerade och förspända betongelement.',
          },
          steelFrames: {
            title: 'Stålstommar',
            description:
              'Våra stålstommar dimensioneras för lång livslängd och hög effektivitet. Med hjälp av marknadsledande verktyg optimerar vi stålets bärförmåga för att leverera säkra och kostnadseffektiva lösningar.',
          },
          inSituFrames: {
            title: 'Platsgjutna konstruktioner',
            description:
              'Platsgjutna betongkonstruktioner är också ett område där vi har stor erfarenhet. Arbetet omfattar monolitiska stommar samt konstruktioner för grundläggning och källare.',
          },
          timberComposite: {
            title: 'Trä- och hybridkonstruktioner',
            description:
              'Vi arbetar även med hållbara träkonstruktioner och hybridlösningar där olika material kombineras för effektiva och miljöanpassade konstruktioner.',
          },
        },
      },
      quality: {
        promise:
          'Kvalitet är vårt löfte – därför är vi transparenta med hur vi uppfyller våra kvalitetskrav',
        hoursWorkedLabel: 'Timmar förra året',
        deviationIndexLabel: 'Avvikelseindex',
        deviationIndexTooltip:
          'Vårt mål är att våra avvikelser ska ligga under 0,5 % av den totala projekttiden',
      },
      aboutUsCard: {
        smallLabel: 'Om Oss',
        heading: 'Who We Are',
        description:
          'Vi är ett konstruktionsföretag med huvudkontor i Sverige.',
        learnMore: 'Läs Mer',
      },
      testimonials: {
        question: 'Vad våra kunder och partners säger om oss',
        items: {
          joakim: {
            quote:
              'Bimera har gedigen erfarenhet av modellering av prefabstommar och framtagande av produktionshandlingar för betong-och stålelement.',
            author: 'Joakim Lindskog',
            role: 'VD, Prodesign AB',
          },
          martin: {
            quote:
              'Bimera är en pålitlig partner med stark arbetsvilja och god ansvarskänsla. De håller tider, levererar rätt kvalitet och har ett gott och professionellt bemötande.',
            author: 'Martin Hesselroth',
            role: 'Projektledare, CarlGustav Solutions AB',
          },
        },
      },
    },
    footer: {
      tagline: 'Smart projektering för starka och ekonomiska byggnader',
      nav: {
        services: 'Tjänster',
        projects: 'Projekt',
        about: 'Om Oss',
        contact: 'Kontakt',
      },
    },
    aboutPage: {
      hero: {
        smallLabel: 'Om Oss',
        title: 'Drivna av ambition',
        description:
          'Vi är ett konstruktionsföretag med huvudkontor i Sverige och verksamhet i Kosovo.',
      },
      story: {
        smallLabel: 'Vår resa',
        title: 'Hur allt började',
        paragraph1:
          'Bimera startade i maj 2023 när sex ingenjörer bestämde sig för att omvandla ambition och många koppar kaffe till konstruktionsprojektering mellan Sverige och Kosovo. Vi trodde på smart samarbete mellan etablerade EU-marknader och högkvalificerade ingenjörsteam i Kosovo — och det gör vi fortfarande.',
        paragraph2:
          'Som många unga företag mötte vi ekonomiska utmaningar efter pandemin. I oktober 2024 startade vi därför om verksamheten — mer fokuserade, mer effektiva och med en tydligare strategi — med två ingenjörer i teamet. Sedan dess har företaget vuxit stadigt och vi levererar idag pålitlig konstruktionsprojektering där innovation, hållbarhet och långsiktighet står i centrum.',
      },
      mission: {
        smallLabel: 'Syfte',
        title: 'Vår mission',
        paragraph1:
          'Vår ambition är att utvecklas till ett multidisciplinärt ingenjörsföretag som aktivt bidrar till projektering, byggande, tillverkning och innovation inom byggbranschen. Vi strävar efter att bli en pålitlig partner på den europeiska marknaden samtidigt som vi främjar ansvarsfulla och transparenta samarbetsmodeller över nationsgränser.',
        paragraph2:
          'Genom att kombinera teknisk kompetens med effektivt gränsöverskridande samarbete vill vi bidra till ekonomisk utveckling i länder som Kosovo, som strävar efter en närmare integration med Europeiska unionen. Genom vårt arbete vill vi skapa långsiktigt värde för våra kunder, våra samarbetspartners och de samhällen vi verkar i.',
      },
      structure: {
        smallLabel: 'Så arbetar vi',
        title: 'Företagsstruktur',
        paragraph1:
          'Bimera arbetar genom en transparent och regelriktig gränsöverskridande struktur som möjliggör effektiv leverans med hög kvalitet. Verksamheten består av två juridiskt självständiga systerbolag i Sverige och Kosovo som arbetar under samma varumärke, tekniska standarder och kvalitetssystem.',
        callout:
          'Denna struktur säkerställer tydlig ansvarsfördelning, full transparens, regelefterlevnad och effektiv projektleverans — samtidigt som den bidrar till hållbar tillväxt och kunskapsutveckling i båda länderna.',
      },
      flipScroll: {
        stepBrief: {
          label: 'Projektbeskrivning',
          paragraph:
            'Projektet börjar här. Vi går igenom projektets förutsättningar tillsammans med dig och definierar omfattning, tidsplan och leveranser.',
        },
        stepContract: {
          label: 'Avtal',
          paragraph:
            'Hantering av kundrelationer, avtal, projektledning och konstruktionsberäkningar i enlighet med svenska och europeiska regelverk.',
        },
        stepDesign: {
          label: 'Projektering',
          paragraph:
            'Framtagning av detaljerade ritningar och BIM-modeller enligt dokumenterade arbetsprocesser och tekniska standarder.',
        },
        stepDelivery: {
          label: 'Leverans',
          paragraph:
            'Noggrann kvalitetskontroll säkerställer att handlingarna är korrekta och redo för produktion innan projektet levereras till beställaren.',
        },
      },
    },
  },
}

