const reasons = [
  { title: "Integrity", desc: "Transparent and honest services." },
  { title: "Reliability", desc: "Timely and efficient deliveries." },
  { title: "Quality Assurance", desc: "Only the best products." },
  { title: "Customer Focus", desc: "Tailored supply solutions." },
  { title: "Innovation", desc: "Constantly improving for you." },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-white border-y">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900">Why Choose Us?</h2>
        <p className="text-gray-600 mt-2">
          Built on trust, quality, and dependable delivery.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 mt-10">
          {reasons.map((r) => (
            <div key={r.title} className="rounded-xl border p-5 bg-gray-50">
              <h3 className="font-semibold text-gray-900">{r.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
