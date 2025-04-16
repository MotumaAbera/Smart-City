import { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";
import { ArrowRight, CalendarClock } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import pic1 from '../assets/pic1.png';
import pic2 from '../assets/pic2.png';
import pic3 from '../assets/pic3.png';
import pic4 from '../assets/pic4.png';
import pic5 from '../assets/pic5.png';

export default function NewsSection() {
  const [email, setEmail] = useState("");
  // State to track expanded news
  const [expandedFeatured, setExpandedFeatured] = useState(false);
  const [expandedNews, setExpandedNews] = useState({});
  const [expandedEvents, setExpandedEvents] = useState(false);
  const [expandedAnnouncements, setExpandedAnnouncements] = useState(false);
  const [expandedAllNews, setExpandedAllNews] = useState(false);

  const featuredNews = {
    image: pic1,
    date: "Bitootessa 1, 2017 ",
    title: "Imala Magaloomsuu Kutaa Bulchiinsa Bokkuu Shananii",
    content: "Magaalomsuun imala cehumsaa gama tokkoon dinagdee, gama biraan hawaasaa irra deebi’ee bocudha. Akka Kutaa Magaalaa Keenyattis Gandoota Baadiyyaa  Godina Shawaa Bahaa jala jiran  Caaseffama haaraan  ofitti dabaluun Magaalomsuuf Sochiin bal’aan turaniiru "
  };

  const recentNews = [
    {
      id: 1,
      image: pic2,
      date: "Amajjii 21, 2017",
      title: "Magaalomsuu ",
      excerpt: "Magaalomsuun imala cehumsaa gama tokkoon dinagdee, gama biraan hawaasaa irra deebi’ee bocudha. Akka Kutaa Magaalaa Keenyattis Gandoota Baadiyyaa  Godina Shawaa Bahaa jala jiran  Caaseffama haaraan  ofitti dabaluun Magaalomsuuf Sochiin bal’aan turaniiru .he sub-city has commenced work on a major road improvement project that will enhance connectivity in eastern neighborhoods."
    },
    {
      id: 2,
      image: pic3,
      date: "Bitootessa 20,2017",
      title: "Qabiinsa Ragaalee ",
      excerpt: " Qabinsi Ragaa Hooggansa Kutaa Magaalaa irraa kaasee hamma gaggeessitoota Sadarkaa  Zooniitti  waanti marti bifa Aadaa fi waraqaan kan adeemsifamu ture invited to participate in the upcoming town hall meeting to discuss community priorities and ongoing projects."
    },
    {
      id: 3,
      image: pic4,
      date: "Bitootessa 7, 2017",
      title: "Sochii Magaalaa",
      excerpt: "Magaalaan Keenyas , rakkoolee hammaachaa dhufan kanniin hiikuu qofa osoo hintaane, baadiyyaa gara carraa cehumsa caasaa hawaas-dinagdee qabatamaatti ceesisuun akka danda’amu, hubachuun sochiitti galeera.."
    },
    {
      id: 4,
      image: pic5,
      date: "Ebla 15,2017",
      title: "Rakkoo Geejjibaa Furuu",
      excerpt: "Rakkoon Geejjibaa akka hin uummamneef Baasii hojjetaa deddeebisu amma irraa akka ramadamu taasisuu ( Ejensiin Geejjiba Magaalaa Adaamaa Waliin dubbannee Marii Wixatatti qabamee jira )."
    }
  ];

  const announcements = [
    {
      id: 1,
      date: "Bitootessa 19, 2017",
      title: "Duulaa Qulqullinaa Naannoo",
      content: "Guyyaa biruu ganama sa'atii 2:00 irraa eegalee jirattoonii kutaa magaalaa bokkuu shananii duuala qulqullina naannoo irratti akka hirmaattan kabajaan isin beeksifna."
    },
    {
      id: 2,
      date: "Bitootessa 01, 2017",
      title: "Suphaa tubboo Bishaan Magaalaa",
      content: "Guyaa boruu gandoota magaalaa keenyattii suphaan tibboo bishaanii ni geggeeffama."
    },
    {
      id: 3,
      date: "Bitootessa 10, 2017",
      title: "Waraqaa Ragaa Dijitaalaa",
      content: "Jiraataan kutaa magaalaa keenyaa kamuu waraqaa ragaa dijitaalaa qabachuu akka qabu kabajaan isin beeksifna."
    },
    {
      id: 4,
      date: "Bitootessa 10, 2017",
      title: "Guyyaa Gabaa ",
      content: "Guyyaa biruu ganama sa'atii 2:00 irraa eegalee jirattoonii kutaa magaalaa bokkuu shananii duuala qulqullina naannoo irratti akka hirmaattan kabajaan isin beeksifna."
    },
    {
      id: 5,
      date: "Bitootessa 1, 2017",
      title: "Mana Kitaabaa Hawaasaa Banuu",
      content: "Kutaa Magaalaa keenyaa mana kitaabaa hawaasaa haaraa banuuf qophii xumureera"
    }
  ];

  const events = [
    {
      id: 1,
      date: "Bit 18, 2017",
      title: "Guyyaa Yaadannoo Adawaa",
      time: "9:00 AM - 1:00 PM Galma Boku Shanan",
      details: "Waliin haa kabjnu."
    },
    {
      id: 2,
      date: "Bit 25, 2017",
      title: "Guyyaa Qulqullina ",
      time: "2:00 PM - 4:00 PM Gamoo Bulchiinsaa",
      details: "Daandii keenya waliin haa qulqullessinu."
    },
    {
      id: 3,
      date: "Ful 02",
      title: "Guyyaa Interprenershiippii Kutaa Magaalaa",
      time: "10:00 AM - 3:00 PM Galma Giddugalaa",
      details: "Dorgommiii Interprenershiippii dargaggootaa."
    },
    {
      id: 4,
      date: "Onk 19",
      title: "Kenniinsa talaallii",
      time: "8:00 AM - 2:00 PM at Boku Shanan Hospital",
      details: "Guyyaa kenninsa talaallii dhukkuboota daddarboo kutaa magaalaa bokkuu shananii"
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
                <Dialog>
                  <DialogTrigger asChild>
                    <img src={featuredNews.image} alt="Digital Transformation Initiative Launch" className="w-full h-full object-cover cursor-pointer transition-transform duration-200 hover:scale-105" tabIndex={0} role="button" aria-label="Expand featured news photo" />
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl w-full bg-white p-0">
                    <img src={featuredNews.image} alt="Digital Transformation Initiative Launch" className="w-full h-auto object-contain rounded-lg" />
                  </DialogContent>
                </Dialog>
              </div>
              <CardContent className="p-6">
                <div className="flex items-center mb-3">
                  <Badge variant="outline" className="bg-accent-light text-primary-dark text-xs font-semibold px-3 py-1 rounded-full">
                    Featured
                  </Badge>
                  <span className="text-gray-500 text-sm ml-3">{featuredNews.date}</span>
                </div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">{featuredNews.title}</h3>
                <p className="text-gray-500 mb-4">
                  {expandedFeatured ? featuredNews.content + ' (Full story: more details here...)' : featuredNews.content.slice(0, 100) + (featuredNews.content.length > 100 ? '...' : '')}
                </p>
                {!expandedFeatured ? (
                  <Button variant="link" className="text-primary font-medium hover:text-accent p-0 h-auto flex items-center" onClick={() => setExpandedFeatured(true)}>
                    Read Full Story
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                ) : (
                  <Button variant="link" className="text-primary font-medium hover:text-accent p-0 h-auto flex items-center" onClick={() => setExpandedFeatured(false)}>
                    Show Less
                  </Button>
                )}
              </CardContent>
            </Card>
            
            {/* Recent News Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {(expandedAllNews ? recentNews : recentNews.slice(0, 2)).map(news => (
                <Card key={news.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                  <div className="h-40 w-full overflow-hidden">
                    <Dialog>
                      <DialogTrigger asChild>
                        <img src={news.image} alt={news.title} className="w-full h-full object-cover cursor-pointer transition-transform duration-200 hover:scale-105" tabIndex={0} role="button" aria-label={`Expand photo for ${news.title}`} />
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl w-full bg-white p-0">
                        <img src={news.image} alt={news.title} className="w-full h-auto object-contain rounded-lg" />
                      </DialogContent>
                    </Dialog>
                  </div>
                  <CardContent className="p-4">
                    <span className="text-gray-500 text-sm">{news.date}</span>
                    <h4 className="font-semibold text-lg text-gray-800 my-2">{news.title}</h4>
                    <p className="text-gray-500 text-sm mb-3">
                      {expandedNews[news.id] ? (news.excerpt + ' (Full story: more details here...)') : (news.excerpt.slice(0, 80) + (news.excerpt.length > 80 ? '...' : ''))}
                    </p>
                    {!expandedNews[news.id] ? (
                      <Button variant="link" className="text-primary text-sm font-medium hover:text-accent p-0 h-auto" onClick={() => setExpandedNews({ ...expandedNews, [news.id]: true })}>
                        Continue Reading →
                      </Button>
                    ) : (
                      <Button variant="link" className="text-primary text-sm font-medium hover:text-accent p-0 h-auto" onClick={() => setExpandedNews({ ...expandedNews, [news.id]: false })}>
                        Show Less
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-semibold" onClick={() => setExpandedAllNews(!expandedAllNews)}>
                {expandedAllNews ? 'Show Less News' : 'View All News'}
              </Button>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="col-span-1">
            {/* Announcements */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-primary mb-4">Announcements</h3>
              <ul className="space-y-4">
                {(expandedAnnouncements ? announcements : announcements.slice(0, 3)).map(announcement => (
                  <li key={announcement.id} className="border-b border-gray-200 pb-3 last:border-0">
                    <span className="text-gray-500 text-xs">{announcement.date}</span>
                    <h4 className="font-medium text-gray-800 my-1">{announcement.title}</h4>
                    <p className="text-gray-500 text-sm">{announcement.content}</p>
                  </li>
                ))}
              </ul>
              <Button variant="link" className="mt-4 text-primary text-sm font-medium hover:text-accent p-0 h-auto" onClick={() => setExpandedAnnouncements(!expandedAnnouncements)}>
                {expandedAnnouncements ? 'Show Less Announcements' : 'View All Announcements →'}
              </Button>
            </div>
            
            {/* Upcoming Events */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-primary mb-4">Upcoming Events</h3>
              <ul className="space-y-4">
                {(expandedEvents ? events : events.slice(0, 3)).map(event => (
                  <li key={event.id} className="flex items-start">
                    <div className="bg-primary text-white text-center p-2 rounded mr-3 min-w-[3rem]">
                      <span className="block text-xl font-bold">{event.date.split(' ')[0]}</span>
                      <span className="text-xs">{event.date.split(' ')[1]}</span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-800">{event.title}</h4>
                      <p className="text-gray-500 text-sm">{event.time}</p>
                      {expandedEvents && (
                        <p className="text-gray-500 text-xs mt-1">{event.details}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
              <Button variant="link" className="mt-4 text-primary text-sm font-medium hover:text-accent p-0 h-auto" onClick={() => setExpandedEvents(!expandedEvents)}>
                {expandedEvents ? 'Show Less Events' : 'View All Events →'}
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
                  className="w-full bg-accent hover:bg-accent-dark text-black font-semibold py-2 px-4 rounded transition duration-300"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
