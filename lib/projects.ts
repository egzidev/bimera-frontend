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

const projectsRaw: Project[] = [
  {
    id: 'kv-toften',
    title: 'Kv Toften',
    location: 'Uddevalla, Sweden',
    description:
      'Kv. Toften was the pilot project for our Bimera team, designing the floor structure for a commercial building in Uddevalla, Sweden.',
    fullDescription:
      'Kv. Toften was the pilot project for our Bimera team, where we were assigned to design the floor structure of a commercial building in Uddevalla, Sweden. The floor structure consisted of approximately 1,400 m² of hollow core slabs and solid slabs supported by a steel frame. The building is now in use by Granngården.',
    quickFacts: [
      { label: 'Client', value: 'Heidelberg Materials Contiga' },
      { label: 'Year', value: '2023' },
      { label: 'Scope', value: 'Calculations, BIM Model, Drawings' },
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
      'Prodesign delegated part of their scope to Bimera to help model and draw precast slabs for the new Götene Bathhouse.',
    fullDescription:
      'Prodesign delegated part of their scope to us to assist with the modeling and drawing of precast slabs for the new Götene Bathhouse. The slabs we designed were located both in the administrative areas and in the swimming pool area.',
    quickFacts: [
      { label: 'Client', value: 'Prodesign AB' },
      { label: 'Year', value: '2025' },
      { label: 'Scope', value: 'BIM model, Drawings' },
      { label: 'Status', value: 'Completed' },
    ],
    image: '/images/projects/götene-badhus/1.jpg',
    galleryImages: [
      '/images/projects/götene-badhus/1.jpg',
      '/images/projects/götene-badhus/2.jpg',
      '/images/projects/götene-badhus/3.png',
      '/images/projects/götene-badhus/4.png',
      '/images/projects/götene-badhus/5.png',
    ],
  },
  {
    id: 'kingly-windows',
    title: 'Kingly Windows',
    location: 'Pejë, Kosovo',
    description:
      'Kingly Windows is a complex industrial and office facility in Pejë, Kosovo, designed to serve both production and administrative functions.',
    fullDescription:
      'The Kingly Windows project was one of the most demanding projects delivered by the Bimera team. Our CEO also served as the project architect, designing a facility intended for both industrial production and administrative functions. The project is located in the industrial district of Pejë, Kosovo, where an external investor from the United Kingdom is developing the Kingly Windows factory to produce joinery products for the UK market.\n\nThe complex consists of three separate buildings. Building A contains office spaces, changing rooms for workers, a canteen, and a visitor showroom, with a total floor area of approximately 760 m² across two floors. Building B houses the main production facility with approximately 1,700 m² of space. Building C includes office areas totaling approximately 1,080 m² distributed over two floors.\n\nThe structural systems designed by Bimera include a monolithic reinforced concrete frame with flat slabs and edge beams for Building A, a steel portal frame for the production facility, and a steel frame with hollow core slabs for Building C. All structural elements, including foundations, were designed in accordance with seismic requirements, considering that Kosovo is located in a seismically active region.',
    quickFacts: [
      { label: 'Client', value: 'L&B Joinery LTD.' },
      { label: 'Year', value: '2024' },
      { label: 'Scope', value: 'Calculations, BIM Model, Drawings' },
      { label: 'Status', value: 'Completed' },
    ],
    image: '/images/projects/kingly-windows/1.jpg',
    galleryImages: [
      '/images/projects/kingly-windows/1.jpg',
      '/images/projects/kingly-windows/2.jpg',
      '/images/projects/kingly-windows/3.jpg',
      '/images/projects/kingly-windows/4.png',
      '/images/projects/kingly-windows/5.png',
      '/images/projects/kingly-windows/6.png',
      '/images/projects/kingly-windows/7.png',
      '/images/projects/kingly-windows/8.png',
      '/images/projects/kingly-windows/9.png',
      '/images/projects/kingly-windows/10.png',
    ],
  },
  {
    id: 'soderskola',
    title: 'Söderskola',
    location: 'Halmstad, Sweden',
    description:
      'Söderskolan is a school complex project in Halmstad where Bimera led BIM Structures modeling and produced 3D design and drawings for precast elements.',
    fullDescription:
      'During the first year of our renewed operations in 2024, we began working on the Söderskolan project located in the beautiful coastal city of Halmstad on the west coast of Sweden. The buildings we contributed to designing will be used by the municipality as a school complex with an approximate gross floor area of 14,200 m², divided into nine interconnected buildings ranging from one to three floors.\n\nIn addition to the central school building, the project includes two modern craft classrooms, a music hall, a full-size sports hall, and a large dining facility.\n\nCommissioned by Prodesign and CG Solutions, our primary responsibility was to lead the BIM Structures modeling and manage the 3D design and drawings of precast concrete elements, including hollow core slabs, solid walls, solid slabs, and sandwich walls. We were also responsible for the design and drawings of a glulam structure located in the sports hall. Furthermore, we provided the installation team with all necessary drawings and detailing to ensure efficient execution of the project from start to finish.',
    quickFacts: [
      { label: 'Client', value: 'Prodesign AB' },
      { label: 'Year', value: '2025' },
      { label: 'Scope', value: 'BIM Model, Drawings' },
      { label: 'Status', value: 'Completed' },
    ],
    image: '/images/projects/soderskola-halmstad/2.png',
    galleryImages: [
      '/images/projects/soderskola-halmstad/2.png',
      '/images/projects/soderskola-halmstad/3.jpg',
      '/images/projects/soderskola-halmstad/4.jpg',
      '/images/projects/soderskola-halmstad/5.jpg',
      '/images/projects/soderskola-halmstad/6.jpg',
      '/images/projects/soderskola-halmstad/7.jpg',
      '/images/projects/soderskola-halmstad/8.jpg',
      '/images/projects/soderskola-halmstad/9.jpg',
      '/images/projects/soderskola-halmstad/10.jpg',
      '/images/projects/soderskola-halmstad/11.jpg',
      '/images/projects/soderskola-halmstad/12.jpg',
      '/images/projects/soderskola-halmstad/13.jpg',
      '/images/projects/soderskola-halmstad/14.jpg',
      '/images/projects/soderskola-halmstad/15.jpg',
      '/images/projects/soderskola-halmstad/16.jpg',
      '/images/projects/soderskola-halmstad/17.jpg',
    ],
  },
  {
    id: 'runristaren-3',
    title: 'Runristaren 3',
    location: 'Nörrköping, Sweden',
    description:
      'Runristaren was a relatively small project (about 3,300 m²) with structural design and drawings for the floor system.',
    fullDescription:
      'Runristaren was a relatively small project with a total floor area of approximately 3,300 m². Our assignment included the structural design and preparation of drawings for the floor system. The floor structure consisted of hollow core slabs and solid slabs supported by Peikko DELTABEAM® composite beams.',
    quickFacts: [
      { label: 'Client', value: 'Skar Byggsystem' },
      { label: 'Year', value: '2025' },
      { label: 'Scope', value: 'Calculations, BIM Model, Drawings' },
      { label: 'Status', value: 'Completed' },
    ],
    image: '/images/projects/runristaren-3/1.png',
    galleryImages: [
      '/images/projects/runristaren-3/1.png',
    ],
  },
  {
    id: 'nkt',
    title: 'NKT',
    location: 'Karlskrona, Sweden',
    description:
      'In 2025 we modeled and produced drawings for façade elements connected to the 200-meter-long NKT tower in Karlskrona.',
    fullDescription:
      'This technically complex project took place in 2025, where we were assigned to model and produce drawings for the façade elements of the adjoining buildings connected to the 200-meter-long NKT tower in Karlskrona, Sweden.',
    quickFacts: [
      { label: 'Client', value: 'Prodesign AB' },
      { label: 'Year', value: '2025' },
      { label: 'Scope', value: 'BIM Model, Drawings' },
      { label: 'Status', value: 'Completed' },
    ],
    image: '/images/projects/nkt/1.jpg',
    galleryImages: ['/images/projects/nkt/1.jpg'],
  },
  {
    id: 'sodra-ang',
    title: 'Södra äng',
    location: 'Gothenburg, Sweden',
    description:
      'Södra äng involved BIM Structures modeling and detailing for a multi-storey car park in Högsbo, Gothenburg.',
    fullDescription:
      'Bimera was assigned to develop the BIM Structures model for the floor system and the supporting precast core walls of a multi-storey car park located in Högsbo, Gothenburg. The parking facility accommodates approximately 600 cars and covers an area of around 18,400 m², with an additional 800 m² of building premises.\n\nOur scope included the structural design and detailing of the elements, with careful consideration of exposure class requirements and the accidental load cases according to Eurocode 1-7, particularly for vehicle collision scenarios. This resulted in heavily reinforced walls in certain areas and special attention to the hollow core slabs, which span up to 16.5 meters.',
    quickFacts: [
      { label: 'Client', value: 'Prodesign AB' },
      { label: 'Year', value: '2025' },
      { label: 'Scope', value: 'BIM model, Drawings' },
      { label: 'Status', value: 'Completed' },
    ],
    image: '/images/projects/sodra-ang/1.jpg',
    galleryImages: [
      '/images/projects/sodra-ang/1.jpg',
      '/images/projects/sodra-ang/2.png',
      '/images/projects/sodra-ang/3.png',
      '/images/projects/sodra-ang/4.png',
      '/images/projects/sodra-ang/5.png',
    ],
  },
  {
    id: 'reningsverk-gavle',
    title: 'Reningsverk Gävle',
    location: 'Gävle, Sweden',
    description:
      'Bimera supported Prodesign with modeling and detailed work for precast slabs in the Mechanical Purification Building.',
    fullDescription:
      'A new wastewater treatment plant is currently being constructed in Gävle. The project is technically complex and involves several well-known contractors. As part of the project team, we assisted Prodesign with the modeling and detailing of all precast slabs in the Mechanical Purification Building.\n\nOur work included both conventional and prestressed slab elements, as well as the development of complex connection details. The project is being executed in several phases and is expected to be fully completed in 2031, with a treatment capacity of approximately 150,000 population equivalents (p.e.).',
    quickFacts: [
      { label: 'Client', value: 'Prodesign AB' },
      { label: 'Year', value: '2025' },
      { label: 'Scope', value: 'BIM model, Drawings' },
      { label: 'Status', value: 'Ongoing' },
    ],
    image: '/images/projects/gavle/1.webp',
    galleryImages: [
      '/images/projects/gavle/1.webp',
    ],
  },
  {
    id: 'brf-granit',
    title: 'Brf Granit',
    location: 'Gothenburg, Sweden',
    description:
      'Brf Granit is a residential project in Hisingen (99 apartments) where we handled structural calculations, BIM modeling, and drawings.',
    fullDescription:
      'In our first project with Betong & Prefab AB, we were assigned to design the entire superstructure for a residential development located in the Hisingen area of Gothenburg. The project comprises 99 apartments and is scheduled for completion in Q3 2027.\n\nOur scope includes the structural design and calculations for the entire building frame, consisting of various types of precast concrete walls and prestressed slabs designed to accommodate fully integrated installations such as plumbing, water, ventilation, and electrical systems. We are also responsible for producing the 3D models and drawings for the precast slabs, as well as the full structural design of the adjacent parking garage, which includes precast columns, prestressed beams, and hollow core slab units.',
    quickFacts: [
      { label: 'Client', value: 'Betong and Prefab AB' },
      { label: 'Year', value: '2026' },
      { label: 'Scope', value: 'Calculations, BIM Model, Drawings' },
      { label: 'Status', value: 'Ongoing' },
    ],
    image: '/images/projects/brf-granit/1.jpg',
    galleryImages: [
      '/images/projects/brf-granit/1.jpg',
      '/images/projects/brf-granit/2.jpg',
      '/images/projects/brf-granit/3.png',
      '/images/projects/brf-granit/4.png',
      '/images/projects/brf-granit/5.png',
      '/images/projects/brf-granit/6.png',
      '/images/projects/brf-granit/7.png',
    ],
  },
]

const projectsOrder: Record<string, number> = {
  'kv-toften': 1,
  'kingly-windows': 2,
  'soderskola': 3,
  'nkt': 4,
  'runristaren-3': 5,
  'gotene-badhus': 6,
  'sodra-ang': 7,
  'reningsverk-gavle': 8,
  'brf-granit': 9,
}

export const projects: Project[] = projectsRaw
  .map((p, idx) => ({ p, idx }))
  .sort((a, b) => {
    const orderA = projectsOrder[a.p.id] ?? Number.MAX_SAFE_INTEGER
    const orderB = projectsOrder[b.p.id] ?? Number.MAX_SAFE_INTEGER
    if (orderA !== orderB) return orderA - orderB
    return a.idx - b.idx
  })
  .map(({ p }) => p)

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

/** Get other projects (exclude current), limit 4, for "More projects" section */
export function getMoreProjects(excludeId: string, limit = 4): Project[] {
  return projects.filter((p) => p.id !== excludeId).slice(0, limit)
}
