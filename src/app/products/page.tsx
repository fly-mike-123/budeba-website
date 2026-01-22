import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CATEGORIES } from "@/lib/catalog";

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 text-gray-900">
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold">Products & Services</h1>
            <p className="text-gray-600 mt-3">
              Explore our supply categories. Request a quote anytime and we’ll
              respond with pricing and delivery options.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/products/${c.slug}`}
                className="group rounded-3xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {c.title}
                  </h2>
                  <span className="text-gray-400 group-hover:text-gray-900 transition">
                    →
                  </span>
                </div>

                <p className="text-sm text-gray-600 mt-2">{c.description}</p>

                <ul className="mt-4 space-y-2 text-sm text-gray-700">
                  {c.bullets.slice(0, 4).map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-0.5">•</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 inline-flex items-center text-sm font-medium text-blue-700">
                  View category <span className="ml-2">→</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Need something not listed?
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Send your list and specifications. We handle custom sourcing.
              </p>
            </div>
            <Link
              href="/quote"
              className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-medium bg-gray-900 text-white hover:bg-black shadow-sm"
            >
              Request a Quote
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
