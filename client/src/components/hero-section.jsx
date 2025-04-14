import { Button } from "@/components/ui/button";
import { FileText, MessageSquare, Search } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative h-[500px] bg-gradient-to-r from-primary to-primary-light">
      <div className="absolute inset-0 overflow-hidden">
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1530062845289-9109b2c9c868?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-20"></div>
      </div>
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div className="max-w-2xl text-white">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Welcome to Boku Shanan Sub-City Administration</h1>
          <p className="text-lg md:text-xl mb-8">Transforming governance through digital innovation and citizen-centric services</p>
          <div className="flex flex-wrap gap-4">
            <Button
              size="lg" 
              className="bg-accent hover:bg-accent-dark text-white font-semibold transition shadow-lg"
              onClick={() => {
                const servicesSection = document.getElementById("services");
                if (servicesSection) {
                  servicesSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Our Services
            </Button>
            <Button
              size="lg" 
              variant="outline"
              className="bg-white hover:bg-gray-100 text-primary font-semibold transition shadow-lg"
              onClick={() => {
                const contactSection = document.getElementById("contact");
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
      
      {/* Quick Access Cards */}
      <div className="container mx-auto px-4 relative -bottom-16 z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300">
            <FileText className="h-12 w-12 text-primary mb-4" />
            <h3 className="font-semibold text-xl mb-2">Submit a Request</h3>
            <p className="text-gray-500 mb-4">Apply for permits, certificates, and official documents</p>
            <Button variant="link" className="text-primary font-semibold hover:text-accent">
              Get Started →
            </Button>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300">
            <MessageSquare className="h-12 w-12 text-primary mb-4" />
            <h3 className="font-semibold text-xl mb-2">Report an Issue</h3>
            <p className="text-gray-500 mb-4">File complaints, report problems, and suggest improvements</p>
            <Button variant="link" className="text-primary font-semibold hover:text-accent">
              Report Now →
            </Button>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition duration-300">
            <Search className="h-12 w-12 text-primary mb-4" />
            <h3 className="font-semibold text-xl mb-2">Track Applications</h3>
            <p className="text-gray-500 mb-4">Check the status of your submitted applications</p>
            <Button variant="link" className="text-primary font-semibold hover:text-accent">
              Track Status →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
