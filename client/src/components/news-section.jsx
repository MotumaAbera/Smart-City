import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, CalendarClock } from "lucide-react";

export default function NewsSection() {
  const [email, setEmail] = useState("");

  const featuredNews = {
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&h=600&q=80",
    date: "June 15, 2023",
    title: "Boku Shanan Launches Digital Transformation Initiative",
    content: "The Sub-City Administration has officially launched its comprehensive digital transformation initiative aimed at modernizing public services and improving citizen engagement through innovative technology solutions."
  };

  const recentNews = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1504607798333-52a30db54a5d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80",
      date: "May 28, 2023",
      title: "New Road Construction Project Begins in Eastern District",
      excerpt: "The sub-city has commenced work on a major road improvement project that will enhance connectivity in eastern neighborhoods."
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1551184451-76b762941ad6?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80",
      date: "May 15, 2023",
      title: "Community Town Hall Meeting Scheduled for Next Month",
      excerpt: "Residents are invited to participate in the upcoming town hall meeting to discuss community priorities and ongoing projects."
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80",
      date: "May 7, 2023",
      title: "Local Schools Receive Technology Upgrade Funding",
      excerpt: "Five schools in the sub-city will receive new computer labs and internet connectivity as part of an educational enhancement program."
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=300&q=80",
      date: "April 22, 2023",
      title: "Small Business Support Program Launches Next Week",
      excerpt: "Local entrepreneurs will soon have access to training, mentorship, and micro-grants through a new economic development initiative."
    }
  ];

  const announcements = [
    {
      id: 1,
      date: "June 10, 2023",
      title: "Temporary Office Closure Notice",
      content: "All sub-city offices will be closed on June 20 for staff training. Emergency services remain available."
    },
    {
      id: 2,
      date: "June 5, 2023",
      title: "Water Supply Maintenance",
      content: "Scheduled maintenance will affect water supply in northwest districts on June 12 from 9 AM to 3 PM."
    },
    {
      id: 3,
      date: "May 30, 2023",
      title: "ID Card Services Extended Hours",
      content: "ID card services will operate with extended hours (8 AM - 6 PM) throughout June."
    }
  ];

  const events = [
    {
      id: 1,
      date: "18 Jun",
      title: "Community Cleanup Day",
      time: "9:00 AM - 1:00 PM at Central Park"
    },
    {
      id: 2,
      date: "25 Jun",
      title: "Public Budget Hearing",
      time: "2:00 PM - 4:00 PM at Administration Hall"
    },
    {
      id: 3,
      date: "02 Jul",
      title: "Youth Entrepreneurship Workshop",
      time: "10:00 AM - 3:00 PM at Community Center"
    }
  ];

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed with email: ${email}`);
    setEmail("");
  };

  return (
    <section id="news" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">News & Updates</h2>
          <p className="text-gray-500 max-w-3xl mx-auto">
            Stay informed about the latest developments, announcements, and events in Boku Shanan Sub-City.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2">
            {/* Featured News */}
            <Card className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 mb-8">
              <div className="h-64 w-full overflow-hidden">
                <img src={featuredNews.image} alt="Digital Transformation Initiative Launch" className="w-full h-full object-cover" />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <Badge variant="outline" className="bg-accent-light text-primary-dark text-xs font-semibold px-3 py-1 rounded-full">
                    Featured
                  </Badge>
                  <span className="text-gray-500 text-sm ml-3">{featuredNews.date}</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">{featuredNews.title}</h3>
                <p className="text-gray-500 mb-4">{featuredNews.content}</p>
                <Button variant="link" className="text-primary font-medium hover:text-accent p-0 h-auto flex items-center">
                  Read Full Story
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            
            {/* Recent News Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {recentNews.map(news => (
                <Card key={news.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                  <div className="h-40 w-full overflow-hidden">
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <span className="text-gray-500 text-sm">{news.date}</span>
                    <h4 className="font-semibold text-lg text-gray-800 my-2">{news.title}</h4>
                    <p className="text-gray-500 text-sm mb-3">{news.excerpt}</p>
                    <Button variant="link" className="text-primary text-sm font-medium hover:text-accent p-0 h-auto">
                      Continue Reading →
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="col-span-1">
            {/* Announcements */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-primary mb-4">Announcements</h3>
              <ul className="space-y-4">
                {announcements.map(announcement => (
                  <li key={announcement.id} className="border-b border-gray-200 pb-3 last:border-0">
                    <span className="text-gray-500 text-xs">{announcement.date}</span>
                    <h4 className="font-medium text-gray-800 my-1">{announcement.title}</h4>
                    <p className="text-gray-500 text-sm">{announcement.content}</p>
                  </li>
                ))}
              </ul>
              <Button variant="link" className="mt-4 text-primary text-sm font-medium hover:text-accent p-0 h-auto">
                View All Announcements →
              </Button>
            </div>
            
            {/* Upcoming Events */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-primary mb-4">Upcoming Events</h3>
              <ul className="space-y-4">
                {events.map(event => (
                  <li key={event.id} className="flex items-start">
                    <div className="bg-primary text-white text-center p-2 rounded mr-3 min-w-[3rem]">
                      <span className="block text-xl font-bold">{event.date.split(' ')[0]}</span>
                      <span className="text-xs">{event.date.split(' ')[1]}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{event.title}</h4>
                      <p className="text-gray-500 text-sm">{event.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <Button variant="link" className="mt-4 text-primary text-sm font-medium hover:text-accent p-0 h-auto">
                View All Events →
              </Button>
            </div>
            
            {/* Newsletter Signup */}
            <div className="bg-primary rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-2">Stay Updated</h3>
              <p className="text-white text-sm opacity-90 mb-4">Subscribe to our newsletter for the latest updates and announcements.</p>
              <form className="space-y-3" onSubmit={handleEmailSubmit}>
                <div>
                  <Input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full px-4 py-2 rounded border-0 focus:ring-2 focus:ring-accent"
                  />
                </div>
                <div>
                  <Input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full px-4 py-2 rounded border-0 focus:ring-2 focus:ring-accent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-accent hover:bg-accent-dark text-white font-semibold py-2 px-4 rounded transition duration-300"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-semibold">
            View All News
          </Button>
        </div>
      </div>
    </section>
  );
}
