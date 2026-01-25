import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Suspense } from "react";
import LoginClient from "./LoginClient";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <Suspense
        fallback={
          <main className="min-h-screen bg-gray-50">
            <section className="max-w-md mx-auto px-6 py-16">
              <div className="rounded-2xl border bg-white p-6 shadow-sm">
                Loading…
              </div>
            </section>
          </main>
        }
      >
        <LoginClient />
      </Suspense>
      <Footer />
    </>
  );
}
