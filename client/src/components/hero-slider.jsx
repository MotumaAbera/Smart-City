import { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/use-language';
import { Button } from './ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// Import the images directly
import pic1 from '../assets/pic1.png';
import pic2 from '../assets/pic2.png';
import pic3 from '../assets/pic3.png';
import pic4 from '../assets/pic4.png';
import pic5 from '../assets/pic5.png';

export default function HeroSlider() {
  const { t, language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: pic1,
      title: t('Baga Gara Waajjira Bulchiinsa Kutaa Magaalaa Bokkuu Shanan Nagaan Dhuftan'),
      description: t('Boku Shanan Sub-City'),
      buttonText: t('show more'),
      buttonLink: '#services'
    },
    {
      image: pic2,
      title: t('Baga Gara Waajjira Bulchiinsa Kutaa Magaalaa Bokkuu Shanan Nagaan Dhuftan'),
      description: t('Boku Shanan'),
      buttonText: t('Contact Us'),
      buttonLink: '#about'
    },
    {
      image: pic3,
      title: t('Boku Shanan Sub-City'),
      description: t('Boku Shanan'),
      buttonText: t('Learn More'),
      buttonLink: '#about'
    },
    {
      image: pic4,
      title: t('Boku Shanan Sub-City'),
      description: t('Boku Shanan'),
      buttonText: t('Learn More'),
      buttonLink: '#about'
    },
    {
      image: pic5,
      title: t('Boku Shanan Sub-City'),
      description: t('Boku Shanan'),
      buttonText: t('Learn More'),
      buttonLink: '#about'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Slides */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Image with overlay */}
            <div className="relative h-full">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              />
              <div className="absolute inset-0 bg-black/40" /> {/* Dark overlay */}

              {/* Content */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="container mx-auto px-4 text-center">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-4xl mx-auto">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto">
                    {slide.description}
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary-dark text-white font-semibold"
                    onClick={() => {
                      const element = document.querySelector(slide.buttonLink);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    {slide.buttonText}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-20"
        onClick={goToPrevious}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full z-20"
        onClick={goToNext}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Indicator dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}