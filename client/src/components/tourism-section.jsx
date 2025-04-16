import { useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { 
  ChevronLeft, 
  ChevronRight, 
  Map, 
  ArrowRight 
} from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import pic1 from '../assets/pic1.png';
import pic2 from '../assets/pic2.png';
import pic3 from '../assets/pic3.png';
import pic4 from '../assets/pic4.png';
import pic5 from '../assets/pic5.png';

export default function TourismSection() {
  const [activeSlide, setActiveSlide] = useState(0);

  const tourismSlides = [
    {
      id: 1,
      image: pic1,
      title: "City Center",
      description: "A view of the vibrant city center and modern buildings."
    },
    {
      id: 2,
      image: pic2,
      title: "Royal Square",
      description: "A landmark at Royal Square, a hub of activity and culture."
    },
    {
      id: 3,
      image: pic3,
      title: "Modern Architecture",
      description: "Showcasing the unique architecture and development in the area."
    },
    {
      id: 4,
      image: pic4,
      title: "Green Parks",
      description: "Beautiful parks and recreational areas for families and visitors."
    },
    {
      id: 5,
      image: pic5,
      title: "Cultural Heritage",
      description: "Sites of historical and cultural significance in the sub-city."
    }
  ];

  const tourismCategories = [
    {
      id: 1,
      title: "Historical Sites",
      description: "Explore ancient monuments, historical buildings, and cultural landmarks that tell the story of our region's rich past.",
      image: pic1,
      link: "#"
    },
    {
      id: 2,
      title: "Natural Attractions",
      description: "Discover the breathtaking natural landscapes, parks, wildlife areas, and scenic viewpoints in and around our sub-city.",
      image: pic2,
      link: "#"
    },
    {
      id: 3,
      title: "Cultural Experiences",
      description: "Immerse yourself in local traditions, festivals, cuisine, and artisan crafts that showcase our community's cultural heritage.",
      image: pic3,
      link: "#"
    }
  ];

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? tourismSlides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev === tourismSlides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="tourism" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Tourism & Heritage</h2>
          <p className="text-gray-500 max-w-3xl mx-auto">
            Discover the rich cultural heritage, historical sites, and natural attractions of Boku Shanan Sub-City.
          </p>
        </div>
        {/* Tourism Highlights Slider */}
        <div className="relative mb-16">
          <div className="overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500" 
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {tourismSlides.map((slide) => (
                <div key={slide.id} className="min-w-full relative">
                  <div className="w-full h-[500px]">
                    <Dialog>
                      <DialogTrigger asChild>
                        <img 
                          src={slide.image} 
                          alt={slide.title} 
                          className="w-full h-full object-cover cursor-pointer transition-transform duration-200 hover:scale-105"
                          tabIndex={0}
                          role="button"
                          aria-label={`Expand photo for ${slide.title}`}
                        />
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl w-full bg-white p-0">
                        <img 
                          src={slide.image} 
                          alt={slide.title} 
                          className="w-full h-auto object-contain rounded-lg"
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 text-white">
                    <h3 className="text-3xl font-bold mb-3">{slide.title}</h3>
                    <p className="text-lg mb-4 max-w-2xl">{slide.description}</p>
                    <Button className="bg-accent hover:bg-accent-dark text-white font-semibold transition duration-300 self-start">
                      Learn More
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Navigation Arrows */}
          <Button 
            variant="secondary" 
            size="icon" 
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow-md z-10"
            onClick={handlePrevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button 
            variant="secondary" 
            size="icon" 
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow-md z-10"
            onClick={handleNextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          {/* Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {tourismSlides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${index === activeSlide ? 'bg-primary' : 'bg-gray-300'}`}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>
        </div>
        {/* Tourism Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tourismCategories.map((category) => (
            <Card key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
              <div className="h-56 w-full overflow-hidden">
                <Dialog>
                  <DialogTrigger asChild>
                    <img 
                      src={category.image} 
                      alt={category.title} 
                      className="w-full h-full object-cover cursor-pointer transition-transform duration-200 hover:scale-105"
                      tabIndex={0}
                      role="button"
                      aria-label={`Expand photo for ${category.title}`}
                    />
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl w-full bg-white p-0">
                    <img 
                      src={category.image} 
                      alt={category.title} 
                      className="w-full h-auto object-contain rounded-lg"
                    />
                  </DialogContent>
                </Dialog>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{category.title}</h3>
                <p className="text-gray-500 mb-4">{category.description}</p>
                <Button variant="link" className="text-primary font-medium hover:text-accent p-0 h-auto flex items-center">
                  {category.title === "Historical Sites" ? "View Historical Sites" : 
                   category.title === "Natural Attractions" ? "Explore Nature" : "Experience Culture"}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        {/* Tourism Map */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-primary mb-6 text-center">Interactive Tourism Map</h3>
          <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center">
            <div className="text-center">
              <Map className="h-20 w-20 text-gray-400 mb-4 mx-auto" />
              <p className="text-gray-500">Interactive Map Loading...</p>
              <p className="text-gray-500 text-sm mt-2">Explore tourist attractions, hotels, restaurants, and more</p>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <Button className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-8 rounded-md transition duration-300">
            View Tourism Guide
          </Button>
        </div>
      </div>
    </section>
  );
}
