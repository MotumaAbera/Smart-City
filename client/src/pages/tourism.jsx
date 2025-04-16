import Header from "../components/header";
import Footer from "../components/footer";
import TourismSection from "../components/tourism-section";

export default function Tourism() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <TourismSection />
      </main>
      <Footer />
    </div>
  );
}
