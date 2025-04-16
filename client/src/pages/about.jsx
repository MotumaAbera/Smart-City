import Header from "../components/header";
import Footer from "../components/footer";
import AboutSection from "../components/about-section";
import PopulationBarChart from "../components/PopulationBarChart";

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <PopulationBarChart />
        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}
