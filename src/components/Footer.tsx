import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="text-lg font-semibold">Budeba General Enterprise</h3>
          <p className="text-sm text-gray-400 mt-3 max-w-sm">
            Your trusted supply partner in Tanzania. Reliable sourcing, quality
            assurance, and timely delivery.
          </p>
        </div>

        <div>
          <h4 className="font-semibold">Quick Links</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-400">
            <li>
              <Link className="hover:text-white transition" href="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="hover:text-white transition" href="/quote">
                Request a Quote
              </Link>
            </li>
            <li>
              <Link className="hover:text-white transition" href="/admin">
                Admin
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-400">
            <li>📍 Geita, Tanzania</li>
            <li>📞 +255 764 794 625 / +255 762 288 877</li>
            <li>✉️ budebagen.enterprises@gmail.com</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-gray-500 flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Budeba General Enterprise</span>
          <span className="text-gray-600">Built with Next.js</span>
        </div>
      </div>
    </footer>
  );
}
