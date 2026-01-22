import Link from "next/link";

const services = [
  { title: "Office Supplies & Stationery", desc: "Pens, papers, toners, files, desks and more." },
  { title: "Electrical & Hardware Materials", desc: "Wiring, fittings, tools, and hardware supplies." },
  { title: "Agricultural Inputs & Equipment", desc: "Farm inputs, tools, and essential equipment." },
  { title: "Construction Materials", desc: "Cement, steel, pipes, paints, and building materials." },
  { title: "Medical & Laboratory Equipment", desc: "Medical supplies and lab equipment sourcing." },
  { title: "Household & Industrial Goods", desc: "Everyday household and industrial-use items." },
  { title: "Mining Equipment & Protective Gear", desc: "Safety gear, PPE, and mining support equipment." },
  { title: "Food & Vegetables", desc: "Reliable sourcing of quality food supplies." },
];

export default function ServicesSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="flex items-end justify-between gap-6 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Our Products & Services</h2>
          <p className="text-gray-600 mt-2">
            Your trusted supply partner in Tanzania.
          </p>
        </div>

        <Link
          href="/quote"
          className="hidden sm:inline-flex bg-blue-600 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
        >
          Request a Quote
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s) => (
          <div
            key={s.title}
            className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-semibold text-gray-900">{s.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{s.desc}</p>

            <div className="mt-4">
              <Link href="/quote" className="text-sm text-blue-600 hover:underline">
                Get pricing →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
