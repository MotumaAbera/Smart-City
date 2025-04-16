import { useState } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useLanguage } from "@/hooks/use-language";
import AnonymousAvatar from "./anonymous-avatar";
import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import aberaImage from "../assets/abera.jpg";
import abImage from '../assets/ab.png';

export default function AboutSection() {
  const { t } = useLanguage();
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
  const [showAllLeaders, setShowAllLeaders] = useState(false);
  const leaders = [
    {
      id: 1,
      name: "ABERA GERMAMA",
      position: "Itti gaafatamaa waajjira Bulchiinsa Kutaa Magaalaa Bokkuu Shanan",
      bio: "Leading the strategic vision and administrative efforts of Boku Shanan Sub-City since 2021.",
      details: "XX YY has over 15 years of experience in public administration and is recognized for innovative leadership and commitment to community welfare.",
      image: aberaImage,
      useAvatar: false
    },
    {
      id: 2,
      name: "AA BB",
      position: "Deputy Administrator",
      bio: "Overseeing public services and community development initiatives across all kebeles.",
      details: "AA BB has spearheaded several successful initiatives in health and education sectors, improving service delivery city-wide.",
      useAvatar: true
    },
    {
      id: 3,
      name: "CC DD",
      position: "Director of Development",
      bio: "Coordinating infrastructure projects and urban development planning initiatives.",
      details: "CC DD is an urban planner with a passion for sustainable development and green city projects.",
      useAvatar: true
    },
    {
      id: 4,
      name: "EE FF",
      position: "Head of Finance",
      bio: "Managing budgets, financial planning, and resource allocation for all sub-city programs.",
      details: "EE FF has modernized the sub-city's financial management, ensuring transparency and accountability.",
      useAvatar: true
    },
    {
      id: 5,
      name: "GG HH",
      position: "Head of Social Affairs",
      bio: "Responsible for social programs and community outreach.",
      details: "GG HH has implemented inclusive programs for youth and women, making a significant social impact.",
      useAvatar: true
    },
    {
      id: 6,
      name: "II JJ",
      position: "Director of Education",
      bio: "Leads educational policy and school development efforts.",
      details: "II JJ has expanded access to quality education and improved school infrastructure across the sub-city.",
      useAvatar: true
    },
    {
      id: 7,
      name: "KK LL",
      position: "Head of Health Services",
      bio: "Oversees all health programs and clinics in the sub-city.",
      details: "KK LL's leadership during public health crises has been widely praised for its effectiveness.",
      useAvatar: true
    }
  ];

  return (
    <section id="about" className="pt-32 pb-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">{t('aboutTitle')}</h2>
          <p className="text-gray-500 max-w-3xl mx-auto">{t('aboutDescription')}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="rounded-lg shadow-lg overflow-hidden">
              <div className="w-full h-[400px] bg-cover bg-center">
                <img src={abImage} alt="About Boku Shanan" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-primary mb-4">Our Vision & Mission</h3>
            <div className="mb-6">
              <h4 className="font-semibold text-lg text-gray-800 mb-2">{t('vision')}</h4>
              <p className="text-gray-500">{t('visionText')}</p>
            </div>
            <div className="mb-6">
              <h4 className="font-semibold text-lg text-gray-800 mb-2">{t('mission')}</h4>
              <p className="text-gray-500">{t('missionText')}</p>
            </div>
            <Button className="bg-primary hover:bg-primary-dark text-white font-semibold transition duration-300" onClick={() => setShowAbout(true)}>
              {t('learnMore')}
            </Button>
          </div>
        </div>
        {/* Leadership Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-primary mb-8 text-center">{t('ourLeadership')}</h3>
          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-6 min-w-[700px]">
              {(showAllLeaders ? leaders : leaders.slice(0, 5)).map(leader => (
                <Card key={leader.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 w-72 min-w-[18rem] flex-shrink-0">
                  <div className="w-full h-48 overflow-hidden bg-gray-100">
                    {leader.useAvatar ? (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <AnonymousAvatar />
                      </div>
                    ) : (
                      <Dialog>
                        <DialogTrigger asChild>
                          <img src={leader.image} alt={leader.name} className="w-full h-full object-cover cursor-pointer transition-transform duration-200 hover:scale-105" tabIndex={0} role="button" aria-label="Expand photo of leader" />
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl w-full bg-white p-0">
                          <img src={leader.image} alt={leader.name} className="w-full h-auto object-contain rounded-lg" />
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-lg text-gray-800">{leader.name}</h4>
                    <p className="text-secondary-dark font-medium text-sm mb-2">{leader.position}</p>
                    <p className="text-gray-500 text-sm mb-3">{leader.bio}</p>
                    <Button variant="link" className="text-primary text-sm font-medium hover:text-accent px-0" onClick={() => setSelectedLeader(leader)}>
                      {t('viewProfile')} →
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-semibold" onClick={() => setShowAllLeaders(true)}>
              {t('viewAllLeadership')}
            </Button>
          </div>
        </div>
        {/* Leader Modal */}
        {selectedLeader && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setSelectedLeader(null)}>&times;</button>
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 mb-4 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                  {selectedLeader.image ? (
                    <img src={selectedLeader.image} alt={selectedLeader.name} className="w-full h-full object-cover" />
                  ) : (
                    <AnonymousAvatar />
                  )}
                </div>
                <h4 className="text-xl font-bold mb-1">{selectedLeader.name}</h4>
                <p className="text-primary font-medium mb-2">{selectedLeader.position}</p>
                <p className="text-gray-700 mb-4 text-center">{selectedLeader.details}</p>
                <Button className="bg-primary text-white mt-2" onClick={() => setSelectedLeader(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
        {/* About Modal */}
        {showAbout && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setShowAbout(false)}>&times;</button>
              <h2 className="text-2xl font-bold mb-4 text-primary">About Boku Shanan Sub-City</h2>
              <p className="text-gray-700 mb-4">Boku Shanan Sub-City is dedicated to serving its residents with transparency, efficiency, and care. Our administration oversees a wide range of public services, infrastructure projects, and community initiatives designed to improve quality of life for all.</p>
              <ul className="list-disc ml-6 text-gray-700 mb-4">
                <li>Strategic planning and sustainable urban development</li>
                <li>Social programs for youth, women, and vulnerable groups</li>
                <li>Efficient management of public resources and finances</li>
                <li>Safe, accessible, and innovative public services</li>
              </ul>
              <Button className="bg-primary text-white mt-2" onClick={() => setShowAbout(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
        {/* View All Leadership Modal */}
        {showAllLeaders && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-3xl w-full relative">
              <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl" onClick={() => setShowAllLeaders(false)}>&times;</button>
              <h2 className="text-2xl font-bold mb-6 text-primary">All Leadership</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {leaders.map(leader => (
                  <Card key={leader.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                    <div className="w-full h-40 overflow-hidden bg-gray-100">
                      {leader.useAvatar ? (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          <AnonymousAvatar />
                        </div>
                      ) : (
                        <Dialog>
                          <DialogTrigger asChild>
                            <img src={leader.image} alt={leader.name} className="w-full h-full object-cover cursor-pointer transition-transform duration-200 hover:scale-105" tabIndex={0} role="button" aria-label="Expand photo of leader" />
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl w-full bg-white p-0">
                            <img src={leader.image} alt={leader.name} className="w-full h-auto object-contain rounded-lg" />
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-lg text-gray-800">{leader.name}</h4>
                      <p className="text-secondary-dark font-medium text-sm mb-2">{leader.position}</p>
                      <p className="text-gray-500 text-sm mb-3">{leader.bio}</p>
                      <Button variant="link" className="text-primary text-sm font-medium hover:text-accent px-0" onClick={() => setSelectedLeader(leader)}>
                        {t('viewProfile')} →
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
              <Button className="bg-primary text-white mt-6" onClick={() => setShowAllLeaders(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
