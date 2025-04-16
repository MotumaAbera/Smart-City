import Header from "../components/header";
import Footer from "../components/footer";
import PopulationBarChart from "../components/PopulationBarChart";
import HeroSlider from "../components/hero-slider";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto py-12 px-4">
        <HeroSlider />
        <PopulationBarChart />
        <section className="mb-10 text-center">
          <h1 className="text-4xl font-bold mb-2">Welcome to Boku Shanan</h1>
          <p className="text-lg text-gray-600">Sub-City Administration Portal</p>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">Latest News</h2>
            <ul className="list-disc ml-5 text-gray-700">
              <li>News item 1</li>
              <li>News item 2</li>
              <li>News item 3</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">Quick Links</h2>
            <ul className="list-disc ml-5 text-gray-700">
              <li>About Us</li>
              <li>Services</li>
              <li>Contact</li>
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
