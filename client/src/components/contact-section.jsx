import { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Youtube, Instagram } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    consent: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked) => {
    setFormData(prev => ({ ...prev, consent: checked }));
  };

  const handleSelectChange = (value) => {
    setFormData(prev => ({ ...prev, subject: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
    alert('Your message has been sent. We will get back to you soon!');
    // Reset form
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      consent: false
    });
  };

  return (
    <section id="contact" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Contact Us</h2>
          <p className="text-gray-500 max-w-3xl mx-auto">
            Have questions or need assistance? Reach out to us through any of the channels below.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <Card className="bg-gray-50">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start">
                  <MapPin className="text-primary mr-4 h-6 w-6" />
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Visit Us</h4>
                    <p className="text-gray-500">Boku Shanan Administration Building</p>
                    <p className="text-gray-500">Main Street, Central District</p>
                    <p className="text-gray-500">Boku Shanan, Adama, Ethiopia</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="text-primary mr-4 h-6 w-6" />
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Call Us</h4>
                    <p className="text-gray-500">Main Office: +251 95 101 2219</p>
                    <p className="text-gray-500">Public Services: +251 95 101 2219</p>
                    <p className="text-gray-500">Emergency: +251 95 101 2219</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="text-primary mr-4 h-6 w-6" />
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Email Us</h4>
                    <p className="text-gray-500">General Inquiries: info@bokushanan.gov.et</p>
                    <p className="text-gray-500">Services: services@bokushanan.gov.et</p>
                    <p className="text-gray-500">Feedback: feedback@bokushanan.gov.et</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="text-primary mr-4 h-6 w-6" />
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Office Hours</h4>
                    <p className="text-gray-500">Monday - Friday: 8:30 AM - 5:00 PM</p>
                    <p className="text-gray-500">Saturday: Closed</p>
                    <p className="text-gray-500">Sunday: Closed</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-medium text-gray-800 mb-3">Follow Us</h4>
                  <div className="flex space-x-4">
                    <Button variant="outline" size="icon" className="rounded-full bg-primary hover:bg-primary-dark text-white">
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full bg-primary hover:bg-primary-dark text-white">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full bg-primary hover:bg-primary-dark text-white">
                      <Youtube className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full bg-primary hover:bg-primary-dark text-white">
                      <Instagram className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-primary">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="fullName" className="block text-gray-800 mb-2">Full Name</label>
                      <Input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                        required
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-primary focus:ring focus:ring-primary/20 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-800 mb-2">Email Address</label>
                      <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Your email address"
                        required
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-primary focus:ring focus:ring-primary/20 focus:outline-none"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-gray-800 mb-2">Phone Number</label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Your phone number"
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-primary focus:ring focus:ring-primary/20 focus:outline-none"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-gray-800 mb-2">Subject</label>
                    <Select onValueChange={handleSelectChange} value={formData.subject}>
                      <SelectTrigger className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-primary focus:ring focus:ring-primary/20 focus:outline-none">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Inquiry</SelectItem>
                        <SelectItem value="services">Services Information</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="complaint">Complaint</SelectItem>
                        <SelectItem value="suggestion">Suggestion</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-gray-800 mb-2">Message</label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="5"
                      placeholder="Your message"
                      required
                      className="w-full px-4 py-2 rounded-md border border-gray-300 focus:border-primary focus:ring focus:ring-primary/20 focus:outline-none"
                    />
                  </div>
                  
                  <div className="flex items-start">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={handleCheckboxChange}
                      className="mr-2 mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <label htmlFor="consent" className="text-gray-500 text-sm">
                      I consent to having this website store my submitted information so they can respond to my inquiry.
                    </label>
                  </div>
                  
                  <div>
                    <Button 
                      type="submit" 
                      className="bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-6 rounded-md transition duration-300"
                      disabled={!formData.consent}
                    >
                      Submit Message
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
