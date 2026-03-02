export type Project = {
  id: string
  title: string
  location: string
  description: string
  image: string
}

export const projects: Project[] = [
  {
    id: 'kv-toften',
    title: 'Kv Toften',
    location: 'Uddevalla, Sweden',
    description:
      'This project is an industrial building for which we designed the floor system…',
    image: '/images/render1.jpg',
  },
  {
    id: 'gotene-badhus',
    title: 'Götene Badhus',
    location: 'Götene, Sweden',
    description:
      'This project is an industrial building for which we designed the floor system…',
    image: '/images/render2.jpg',
  },
  {
    id: 'kingly-windows',
    title: 'Kingly Windows',
    location: 'Pejë, Kosovo',
    description:
      'This project is an industrial building for which we designed the floor system…',
    image: '/images/render3.jpg',
  },
  {
    id: 'soderskola',
    title: 'Söderskola',
    location: 'Halmstad, Sweden',
    description:
      'This project is an industrial building for which we designed the floor system…',
    image: '/images/render4.webp',
  },
]
