import Link from "next/link";

const categories = [
  { name: "Office Supplies", slug: "office-supplies" },
  { name: "Construction Materials", slug: "construction-materials" },
  { name: "PPE & Safety Gear", slug: "ppe-safety-gear" },
  { name: "Cleaning Supplies", slug: "cleaning-supplies" },
  { name: "Electronics", slug: "electronics" },
  { name: "Furniture", slug: "furniture" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50">
      {/* glass background */}
      <div className="bg-white/80 backdrop-blur border-b">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-sm" />
            <div className="leading-tight">
              <p className="text-base font-bold text-gray-900">
                Budeba General Enterprise
              </p>
              <p className="text-xs text-gray-500">
                Your trusted supply partner
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-6 text-sm text-gray-700">
            <li>
              <Link
                href="/products"
                className="hover:text-blue-700 transition-colors font-medium"
              >
                Products
              </Link>
            </li>

            {/* Dropdown */}
            <li className="relative group">
              <button className="hover:text-blue-700 transition-colors">
                Categories
              </button>

              <div className="absolute left-0 top-full mt-3 w-64 rounded-2xl border bg-white shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <ul className="p-3">
                  {categories.map((cat) => (
                    <li key={cat.slug}>
                      <Link
                        href={`/products/${cat.slug}`}
                        className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-700"
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li>
              <Link
                href="/quote"
                className="hover:text-blue-700 transition-colors"
              >
                Request Quote
              </Link>
            </li>
          </ul>

          {/* CTA */}
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-700 shadow-sm"
          >
            Request a Quote
            <span className="text-white/80">→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
