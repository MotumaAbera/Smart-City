import { useEffect } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import HeroSlider from "../components/hero-slider";
import AboutSection from "../components/about-section";
import ServicesSection from "../components/services-section";
import NewsSection from "../components/news-section";
import TourismSection from "../components/tourism-section";
import ContactSection from "../components/contact-section";

export default function HomePage() {
  useEffect(() => {
    document.title = "Boku Shanan - Sub-City Administration";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSlider />
        <AboutSection />
        <ServicesSection />
        <NewsSection />
        <TourismSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
