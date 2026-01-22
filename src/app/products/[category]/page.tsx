import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CATEGORIES } from "@/lib/catalog";

// ✅ Prebuild all category pages at build time
export function generateStaticParams() {
  return CATEGORIES.map((c) => ({
    category: c.slug,
  }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) return notFound();

  const Icon = cat.icon;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 text-gray-900">
        <section className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/products" className="hover:text-gray-900">
              Products
            </Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">{cat.title}</span>
          </div>

          {/* Hero */}
          <div className="mt-6 overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
            <div className="relative h-52 sm:h-64 bg-gray-100">
              {cat.image ? (
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50" />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

              <div className="absolute left-6 bottom-6 flex items-end gap-4">
                <div className="h-12 w-12 rounded-2xl bg-white/90 backdrop-blur border border-white shadow-sm flex items-center justify-center">
                  <Icon className="h-5 w-5 text-gray-900" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white">
                    {cat.title}
                  </h1>
                  <p className="text-white/90 mt-2 max-w-2xl text-sm sm:text-base">
                    {cat.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px] items-start">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">
                What we can supply
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Share your brand preferences, quantities, and required delivery
                date.
              </p>

              <ul className="mt-6 space-y-3 text-sm text-gray-800">
                {cat.bullets.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-0.5">✅</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link
                  href="/quote"
                  className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                >
                  Request a Quote
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-medium bg-white border border-gray-200 text-gray-900 hover:bg-gray-50"
                >
                  View all categories
                </Link>
              </div>
            </div>

            <aside className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">
                Fast quoting tips
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                <li className="flex gap-3">
                  <span className="mt-0.5">•</span>
                  <span>Include quantities and sizes.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5">•</span>
                  <span>Mention brand preference if any.</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-0.5">•</span>
                  <span>Share delivery location and deadline.</span>
                </li>
              </ul>

              <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <p className="text-xs text-gray-600">
                  Need urgent support? Use WhatsApp for quicker response.
                </p>
                <Link
                  href="/quote"
                  className="mt-3 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-medium bg-gray-900 text-white hover:bg-black shadow-sm"
                >
                  Request via Quote Form →
                </Link>
              </div>

              <div className="mt-6 text-xs text-gray-500">
                Contact: +255 764 794 625 / +255 762 288 877
                <br />
                Email: budebagen.enterprises@gmail.com
              </div>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
