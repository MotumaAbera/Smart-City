import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-12 w-12 rounded-full border-2 border-white/30 bg-white/10 flex items-center justify-center">
                <span className="text-white font-bold">BS</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">Boku Shanan</h3>
                <p className="text-xs text-gray-400">Sub-City Administration</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">Serving our community through innovative digital governance and responsive public services.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-accent-light transition duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent-light transition duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent-light transition duration-300">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-white hover:text-accent-light transition duration-300">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-white transition duration-300">Home</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition duration-300">About Us</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition duration-300">Services</a></li>
              <li><a href="#news" className="text-gray-400 hover:text-white transition duration-300">News & Updates</a></li>
              <li><a href="#tourism" className="text-gray-400 hover:text-white transition duration-300">Tourism & Heritage</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition duration-300">Contact Us</a></li>
              <li><Link href="/auth" className="text-gray-400 hover:text-white transition duration-300">Staff Portal</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6">Government Services</h4>
            <ul className="space-y-3">
              <li><a href="#services" className="text-gray-400 hover:text-white transition duration-300">ID Card & Residence</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition duration-300">Birth & Marriage Certificates</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition duration-300">Land & Property</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition duration-300">Business Registration</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition duration-300">Tax Services</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition duration-300">Education</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition duration-300">Healthcare</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-6">Contact Information</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-accent-light mr-3 shrink-0" />
                <span className="text-gray-400">Boku Shanan Administration Building, Main Street, Central District</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-accent-light mr-3 shrink-0" />
                <span className="text-gray-400">+251 95 101 2219</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-accent-light mr-3 shrink-0" />
                <span className="text-gray-400">info@bokushanan.gov.et</span>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 text-accent-light mr-3 shrink-0" />
                <span className="text-gray-400">Mon-Fri: 8:30 AM - 5:00 PM<br />Sat: 9:00 AM - 1:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row md:justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">© {currentYear} Boku Shanan Sub-City Administration. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="text-gray-400 text-sm hover:text-white transition duration-300">Privacy Policy</a>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition duration-300">Terms of Service</a>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition duration-300">Accessibility</a>
              <a href="#" className="text-gray-400 text-sm hover:text-white transition duration-300">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
