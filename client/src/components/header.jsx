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

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, navigate] = useLocation();
  const [scrolled, setScrolled] = useState(false);

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

  const navLinks = [
    { name: "Home", href: "/" },
    { 
      name: "About Us", 
      href: "#about",
      dropdown: [
        { name: "Vision & Mission", href: "#about" },
        { name: "Leadership", href: "#about" },
        { name: "Organizational Structure", href: "#about" },
        { name: "History", href: "#about" }
      ]
    },
    { name: "Services", href: "#services" },
    { name: "News", href: "#news" },
    { 
      name: "Resources", 
      href: "#resources",
      dropdown: [
        { name: "Documents", href: "#" },
        { name: "Forms", href: "#" },
        { name: "Reports", href: "#" }
      ]
    },
    { name: "Tourism", href: "#tourism" },
    { name: "Contact", href: "#contact" }
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
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/auth" className="text-sm hover:text-accent-light">Staff Portal</Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="text-sm text-white hover:text-accent-light p-0 h-auto">
                  Language
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Amharic</DropdownMenuItem>
                <DropdownMenuItem>Oromo</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <div className="bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="h-14 w-14 rounded-full border-2 border-primary bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-bold text-lg">BS</span>
              </div>
              <div>
                <h1 className="font-bold text-lg sm:text-xl md:text-2xl text-primary">Boku Shanan</h1>
                <p className="text-xs sm:text-sm text-gray-500">Sub-City Administration</p>
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
            <div className="md:hidden mt-4 pb-4">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    {link.dropdown ? (
                      <div className="space-y-2">
                        <div className="font-medium text-gray-800">
                          {link.name}
                        </div>
                        <div className="pl-4 space-y-2">
                          {link.dropdown.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className="block text-gray-600 hover:text-primary"
                              onClick={(e) => {
                                e.preventDefault();
                                handleNav(item.href);
                              }}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <a
                        href={link.href}
                        className="font-medium text-gray-800 hover:text-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNav(link.href);
                        }}
                      >
                        {link.name}
                      </a>
                    )}
                  </div>
                ))}
                <Link href="/auth" className="font-medium text-gray-800 hover:text-primary pt-2">
                  Staff Portal
                </Link>
                <div className="pt-2">
                  <p className="text-sm font-medium mb-1">Language</p>
                  <div className="flex space-x-4 pl-2">
                    <button className="text-sm text-gray-600 hover:text-primary">English</button>
                    <button className="text-sm text-gray-600 hover:text-primary">Amharic</button>
                    <button className="text-sm text-gray-600 hover:text-primary">Oromo</button>
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
