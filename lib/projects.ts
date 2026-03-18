export type QuickFact = {
  label: string
  value: string
}

export type Project = {
  id: string
  title: string
  location: string
  description: string
  /** Longer description for the project detail page */
  fullDescription?: string
  /** Quick facts shown on the detail page (e.g. Client, Year, Scope) */
  quickFacts?: QuickFact[]
  image: string
  /** Optional set of images shown in the project detail page gallery */
  galleryImages?: string[]
}

export const projects: Project[] = [
  {
    id: 'kv-toften',
    title: 'Kv Toften',
    location: 'Uddevalla, Sweden',
    description:
      'This project is an industrial building for which we designed the floor system…',
    fullDescription:
      'Kv Toften is an industrial building project in Uddevalla, Sweden. We were responsible for the structural design of the floor system, ensuring optimal load distribution and material efficiency. Our work included detailed calculations, coordination with the architect and MEP teams, and site follow-up during construction.',
    quickFacts: [
      { label: 'Client', value: 'Confidential' },
      { label: 'Year', value: '2023' },
      { label: 'Scope', value: 'Floor system design' },
      { label: 'Status', value: 'Completed' },
    ],
    image: '/images/projects/kv-koften/1.jpg',
    galleryImages: [
      '/images/projects/kv-koften/1.jpg',
      '/images/projects/kv-koften/2.png',
      '/images/projects/kv-koften/3.png',
      '/images/projects/kv-koften/4.jpg',
      '/images/projects/kv-koften/5.png',
      '/images/projects/kv-koften/6.jpg',
      '/images/projects/kv-koften/7.jpg',
      '/images/projects/kv-koften/8.jpg',
    ],
  },
  {
    id: 'gotene-badhus',
    title: 'Götene Badhus',
    location: 'Götene, Sweden',
    description:
      'This project is an industrial building for which we designed the floor system…',
    fullDescription:
      'Götene Badhus is a swimming facility in Götene. We delivered the complete structural design for the building, including foundations, frame, and pool structure. The design prioritizes durability in a humid environment and long-span solutions for the main hall.',
    quickFacts: [
      { label: 'Client', value: 'Götene Municipality' },
      { label: 'Year', value: '2022–2024' },
      { label: 'Scope', value: 'Full structural design' },
      { label: 'Status', value: 'In progress' },
    ],
    image: '/images/render2.jpg',
  },
  {
    id: 'kingly-windows',
    title: 'Kingly Windows',
    location: 'Pejë, Kosovo',
    description:
      'This project is an industrial building for which we designed the floor system…',
    fullDescription:
      'Kingly Windows is an industrial and office building in Pejë, Kosovo. We designed the structural frame and floor system, with emphasis on clear spans for flexible use and efficient use of local materials and construction methods.',
    quickFacts: [
      { label: 'Client', value: 'Kingly Windows' },
      { label: 'Year', value: '2023' },
      { label: 'Scope', value: 'Frame & floor design' },
      { label: 'Status', value: 'Completed' },
    ],
    image: '/images/render3.jpg',
  },
  {
    id: 'soderskola',
    title: 'Söderskola',
    location: 'Halmstad, Sweden',
    description:
      'This project is an industrial building for which we designed the floor system…',
    fullDescription:
      'Söderskola is a school building in Halmstad. We provided structural design for the extension and refurbishment, including new floor systems, load-bearing walls, and integration with the existing structure while meeting current standards.',
    quickFacts: [
      { label: 'Client', value: 'Halmstad Municipality' },
      { label: 'Year', value: '2022' },
      { label: 'Scope', value: 'Extension & refurbishment' },
      { label: 'Status', value: 'Completed' },
    ],
    image: '/images/render4.webp',
  },
]

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

/** Get other projects (exclude current), limit 4, for "More projects" section */
export function getMoreProjects(excludeId: string, limit = 4): Project[] {
  return projects.filter((p) => p.id !== excludeId).slice(0, limit)
}
