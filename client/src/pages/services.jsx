import Header from "../components/header";
import Footer from "../components/footer";
import ServicesSection from "../components/services-section";

export default function Services() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
}
