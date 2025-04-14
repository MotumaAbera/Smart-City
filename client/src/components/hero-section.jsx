import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileText, MessageSquare, Search, ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1530062845289-9109b2c9c868?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      title: "Baga gara kutaa Bulchiinsa Magaalaa Bokkuu Shanan nagana dhuftan",
      subtitle: "Hawaasa keenya olaantummaa fi kalaqaan tajaajiluu"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      title: "Serving Our Community",
      subtitle: "Dedicated to providing efficient, transparent, and accessible government services"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1491497895121-1334fc14d8c9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      title: "Building a Better Future",
      subtitle: "Investing in infrastructure, education, and sustainable development for all citizens"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[500px] bg-gradient-to-r from-primary to-primary-light">
      <div className="absolute inset-0 overflow-hidden">
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-20" : "opacity-0"
            }`}
            style={{ backgroundImage: `url('${slide.image}')` }}
          ></div>
        ))}
      </div>
      
      {/* Slider controls */}
      <button
        onClick={prevSlide}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-25 p-2 rounded-full hover:bg-opacity-40 transition"
      >
        <ChevronLeft className="h-8 w-8 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-25 p-2 rounded-full hover:bg-opacity-40 transition"
      >
        <ChevronRight className="h-8 w-8 text-white" />
      </button>
      
      {/* Slide indicators */}
      <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
            }`}
          ></button>
        ))}
      </div>
      
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`max-w-2xl text-white absolute transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{slide.title}</h1>
            <p className="text-lg md:text-xl mb-8">{slide.subtitle}</p>
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
                Tajaajila Keenya Qoradhaa
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
        ))}
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
