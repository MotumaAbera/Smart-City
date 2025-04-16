import Header from "../components/header";
import Footer from "../components/footer";
import ContactSection from "../components/contact-section";

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
