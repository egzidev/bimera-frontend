const materials = [
  {
    title: 'Precast Frames',
    description: 'Efficient and cost-effective structural solutions with precast concrete frames.',
  },
  {
    title: 'Steel Frames',
    description: 'Strong and versatile steel frame structures for modern construction.',
  },
  {
    title: 'In-situ Frames',
    description: 'Custom concrete frames built on-site for maximum design flexibility.',
  },
  {
    title: 'Timber and Composite',
    description: 'Sustainable timber and composite material solutions for eco-friendly construction.',
  },
]

export default function Materials() {
  return (
    <section id="materials" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Materials we work with
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {materials.map((material, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {material.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {material.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
