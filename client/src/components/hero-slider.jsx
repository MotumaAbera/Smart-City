import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft } from 'lucide-react';

// Import the images directly
import img1 from '@assets/img1.jpg';
import img2 from '@assets/img2.jpg';
import img3 from '@assets/img3.jpg';

export default function HeroSlider() {
  const { t, language } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Add translations for slider content
  const sliderTranslations = {
    en: {
      slide1: {
        title: 'Welcome to Boku Shanan Sub-City Administration',
        description: 'Serving our community with excellence and innovation',
        buttonText: 'Explore Our Services',
      },
      slide2: {
        title: 'Modern Infrastructure & Development',
        description: 'Building a better future through sustainable development',
        buttonText: 'View Our Projects',
      },
      slide3: {
        title: 'Beautiful Parks & Public Spaces',
        description: 'Enhancing quality of life through thoughtful urban planning',
        buttonText: 'Discover Our City',
      }
    },
    am: {
      slide1: {
        title: 'እንኳን ወደ ቦኩ ሻናን ክፍለ ከተማ አስተዳደር በደህና መጡ',
        description: 'ማህበረሰባችንን በልቀትና በአዲስ ሀሳብ እያገለገልን ነው',
        buttonText: 'አገልግሎቶቻችንን ይመልከቱ',
      },
      slide2: {
        title: 'ዘመናዊ መሰረተ ልማትና ልማት',
        description: 'ዘላቂ ልማት በማካሄድ የተሻለ የወደፊት ሕይወት እንገነባለን',
        buttonText: 'ፕሮጀክቶቻችንን ይመልከቱ',
      },
      slide3: {
        title: 'ቆንጆ ፓርኮችና የህዝብ ቦታዎች',
        description: 'በጥንቃቄ የተደረገ የከተማ እቅድ ዝግጅት የኑሮ ጥራትን እናሻሽላለን',
        buttonText: 'ከተማችንን ይመልከቱ',
      }
    },
    or: {
      slide1: {
        title: 'Bulchiinsa Magaalattii Xiqqoo Boku Shanan Baga Nagaan Dhuftan',
        description: 'Hawaasa keenyaaf gahumsa fi haaromsa waliin tajaajilaa jirra',
        buttonText: 'Tajaajilawwan Keenya Ilaali',
      },
      slide2: {
        title: 'Bu\'uuraalee Misoomaa fi Misooma Ammayyaa',
        description: 'Misooma dhaabbataa fayyadamuun gara fuulduraatti kan fooyya\'e ijaaraa jirra',
        buttonText: 'Piroojektiwwan Keenya Ilaali',
      },
      slide3: {
        title: 'Paarkiiwwanii fi Iddoowwan Uummataa Bareedaa',
        description: 'Karoora magaalaa xiyyeeffannoo qabuun qulqullina jireenya fooyyessaa jirra',
        buttonText: 'Magaalaa Keenya Ilaali',
      }
    }
  };

  // Get current translation based on language
  const currentTranslation = sliderTranslations[language] || sliderTranslations.en;

  // Slider content
  const slides = [
    {
      image: img1,
      title: currentTranslation.slide1.title,
      description: currentTranslation.slide1.description,
      buttonText: currentTranslation.slide1.buttonText,
      buttonLink: '#services'
    },
    {
      image: img2,
      title: currentTranslation.slide2.title,
      description: currentTranslation.slide2.description,
      buttonText: currentTranslation.slide2.buttonText,
      buttonLink: '#about'
    },
    {
      image: img3,
      title: currentTranslation.slide3.title,
      description: currentTranslation.slide3.description,
      buttonText: currentTranslation.slide3.buttonText,
      buttonLink: '#tourism'
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000);
    
    return () => clearInterval(interval);
  }, [slides.length]);

  // Navigation functions
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