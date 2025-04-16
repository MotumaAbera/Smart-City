import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Menu, X, ChevronDown, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import logo from '../assets/logo.png';
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";

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
      href: "/about",
      dropdown: [
        { name: t('vision') + " & " + t('mission'), href: "/about#vision-mission" },
        { name: t('ourLeadership'), href: "/about#leadership" },
        { name: "Organizational Structure", href: "/about#structure" },
        { name: "History", href: "/about#history" }
      ]
    },
    { name: t('services'), href: "/services" },
    { name: t('news'), href: "/news" },
    { 
      name: t('resources'), 
      href: "/resources",
      dropdown: [
        { name: "Documents", href: "/resources/documents" },
        { name: "Forms", href: "/resources/forms" },
        { name: "Reports", href: "/resources/reports" }
      ]
    },
    { 
      name: t('projects'), 
      href: "/projects" 
    },
    { name: t('tourism'), href: "/tourism" },
    { name: t('contact'), href: "/contact" }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNav = (href) => {
    setMobileMenuOpen(false);
    
    if (href.includes('#')) {
      // If URL contains a hash, navigate to the page first then scroll
      const [path, hash] = href.split('#');
      if (path && path !== window.location.pathname) {
        navigate(path);
      }
      // Scroll to section after a short delay to ensure the page has loaded
      setTimeout(() => {
        const element = document.querySelector(`#${hash}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      navigate(href);
    }
  };

  return (
    <header className={`sticky top-0 z-50 transition-shadow bg-gray-900 ${scrolled ? 'shadow-md' : ''}`}>
      {/* Top Bar */}
      <div className="bg-primary-dark text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href="mailto:info@bokushanan.com" className="text-sm hover:text-accent-light flex items-center">
              <Mail className="h-4 w-4 mr-1" />
              info@bokushanan.com
            </a>
            <a href="tel:+251951012219" className="text-sm hover:text-accent-light flex items-center">
              <Phone className="h-4 w-4 mr-1" />
              +251 95 101 2219
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => changeLanguage('en')}
                className={`text-sm px-2 py-1 rounded ${language === 'en' ? 'bg-white/20 text-white font-medium' : 'text-white/80 hover:text-white'}`}
              >
                EN
              </button>
              <span className="text-white/50">|</span>
              <button 
                onClick={() => changeLanguage('or')}
                className={`text-sm px-2 py-1 rounded ${language === 'or' ? 'bg-white/20 text-white font-medium' : 'text-white/80 hover:text-white'}`}
              >
                OR
              </button>
              <span className="text-white/50">|</span>
              <button 
                onClick={() => changeLanguage('am')}
                className={`text-sm px-2 py-1 rounded ${language === 'am' ? 'bg-white/20 text-white font-medium' : 'text-white/80 hover:text-white'}`}
              >
                አማ
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
                <Dialog>
                  <DialogTrigger asChild>
                    <img src={logo} alt="Boku Shanan Logo" className="h-10 w-auto cursor-pointer transition-transform duration-200 hover:scale-105" tabIndex={0} role="button" aria-label="Expand Boku Shanan logo" />
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl w-full bg-white p-0">
                    <img src={logo} alt="Boku Shanan Logo" className="w-full h-auto object-contain rounded-lg" />
                  </DialogContent>
                </Dialog>
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
                  <Link 
                    key={link.name} 
                    href={link.href} 
                    className="font-medium text-gray-800 hover:text-primary"
                    onClick={(e) => {
                      e.preventDefault();
                      handleNav(link.href);
                    }}
                  >
                    {link.name}
                  </Link>
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
                  <Link
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
                  </Link>
                ))}
                
                {/* Language buttons in mobile menu */}
                <div className="pt-2">
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => changeLanguage('en')}
                      className={`text-sm px-2 py-1 rounded ${language === 'en' ? 'bg-white/20 text-white font-medium' : 'text-white/80 hover:text-white'}`}
                    >
                      EN
                    </button>
                    <span className="text-white/50">|</span>
                    <button 
                      onClick={() => changeLanguage('or')}
                      className={`text-sm px-2 py-1 rounded ${language === 'or' ? 'bg-white/20 text-white font-medium' : 'text-white/80 hover:text-white'}`}
                    >
                      OR
                    </button>
                    <span className="text-white/50">|</span>
                    <button 
                      onClick={() => changeLanguage('am')}
                      className={`text-sm px-2 py-1 rounded ${language === 'am' ? 'bg-white/20 text-white font-medium' : 'text-white/80 hover:text-white'}`}
                    >
                      አማ
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
