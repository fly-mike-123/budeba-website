import Navbar from "@/components/Navbar";
import ServicesSection from "@/components/ServicesSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">
        <section className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Reliable General Supply Solutions
          </h1>

          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Budeba General Enterprise is your trusted supply partner in Tanzania —
            office supplies, construction materials, PPE & safety gear, electronics,
            furniture, and more.
          </p>

          <a
            href="/quote"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700"
          >
            Request a Quote
          </a>
        </section>

        <ServicesSection />
        <WhyChooseUs />
      </main>

      <Footer />
    </>
  );
}
