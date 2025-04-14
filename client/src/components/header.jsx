import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import logo from '@assets/logo.png';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, navigate] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { language, changeLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Main navigation links - same links for desktop and mobile
  const navLinks = [
    { name: t('home'), href: "/" },
    { 
      name: t('aboutUs'), 
      href: "#about",
      dropdown: [
        { name: t('vision') + " & " + t('mission'), href: "#about" },
        { name: t('ourLeadership'), href: "#about" },
        { name: "Organizational Structure", href: "#about" },
        { name: "History", href: "#about" }
      ]
    },
    { name: t('services'), href: "#services" },
    { name: t('news'), href: "#news" },
    { 
      name: t('resources'), 
      href: "#resources",
      dropdown: [
        { name: "Documents", href: "#resources" },
        { name: "Forms", href: "#resources" },
        { name: "Reports", href: "#resources" }
      ]
    },
    { name: t('tourism'), href: "#tourism" },
    { name: t('contact'), href: "#contact" }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNav = (href) => {
    setMobileMenuOpen(false);
    
    if (href.startsWith('#')) {
      // Smooth scroll to the section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-shadow ${scrolled ? 'shadow-md' : ''}`}>
      {/* Top Bar */}
      <div className="bg-primary-dark text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href="mailto:info@bokushanan.gov.et" className="text-sm hover:text-accent-light flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              info@bokushanan.gov.et
            </a>
            <a href="tel:+251-111-234-567" className="text-sm hover:text-accent-light flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              +251-111-234-567
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth" className="text-sm hover:text-accent-light">Staff Portal</Link>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => changeLanguage('en')}
                className={`text-sm px-2 py-1 rounded ${language === 'en' ? 'bg-white/20 text-white font-medium' : 'text-white/80 hover:text-white'}`}
              >
                EN
              </button>
              <span className="text-white/50">|</span>
              <button 
                onClick={() => changeLanguage('am')}
                className={`text-sm px-2 py-1 rounded ${language === 'am' ? 'bg-white/20 text-white font-medium' : 'text-white/80 hover:text-white'}`}
              >
                አማ
              </button>
              <span className="text-white/50">|</span>
              <button 
                onClick={() => changeLanguage('or')}
                className={`text-sm px-2 py-1 rounded ${language === 'or' ? 'bg-white/20 text-white font-medium' : 'text-white/80 hover:text-white'}`}
              >
                OR
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="h-16 w-16 flex items-center justify-center">
                <img src={logo} alt="Boku Shanan Logo" className="h-full w-full object-contain" />
              </div>
              <div>
                <h1 className="font-bold text-lg sm:text-xl md:text-2xl text-primary">{t('websiteName')}</h1>
                <p className="text-xs sm:text-sm text-gray-500">{t('subTitle')}</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                link.dropdown ? (
                  <DropdownMenu key={link.name}>
                    <DropdownMenuTrigger asChild>
                      <Button variant="link" className="font-medium text-gray-800 hover:text-primary p-0 h-auto">
                        {link.name}
                        <ChevronDown className="ml-1 h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                      {link.dropdown.map((item) => (
                        <DropdownMenuItem key={item.name} onClick={() => handleNav(item.href)}>
                          {item.name}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <a 
                    key={link.name} 
                    href={link.href} 
                    className="font-medium text-gray-800 hover:text-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(link.href);
                    }}
                  >
                    {link.name}
                  </a>
                )
              ))}
            </nav>
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
          
          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t pt-4">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="font-medium text-gray-800 hover:text-primary px-4 py-2 border-b"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(link.href);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {link.name}
                  </a>
                ))}
                
                {/* Additional Links */}
                <div className="pt-2">
                  <Link href="/auth" className="block font-medium text-gray-800 hover:text-primary mb-4">
                    {t('staffPortal')}
                  </Link>
                  <p className="text-sm font-medium mb-2">{t('language')}</p>
                  <div className="flex items-center space-x-2 pl-2">
                    <button 
                      onClick={() => changeLanguage('en')}
                      className={`text-sm px-2 py-1 rounded ${language === 'en' ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}
                    >
                      EN
                    </button>
                    <span className="text-gray-400">|</span>
                    <button 
                      onClick={() => changeLanguage('am')}
                      className={`text-sm px-2 py-1 rounded ${language === 'am' ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}
                    >
                      አማ
                    </button>
                    <span className="text-gray-400">|</span>
                    <button 
                      onClick={() => changeLanguage('or')}
                      className={`text-sm px-2 py-1 rounded ${language === 'or' ? 'bg-primary/10 text-primary font-medium' : 'text-gray-600 hover:text-primary'}`}
                    >
                      OR
                    </button>
                  </div>
                </div>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
