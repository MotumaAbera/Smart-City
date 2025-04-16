import Header from "../components/header";
import Footer from "../components/footer";
import NewsSection from "../components/news-section";

export default function News() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
}
