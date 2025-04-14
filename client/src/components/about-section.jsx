import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import AnonymousAvatar from "./anonymous-avatar";

export default function AboutSection() {
  const { t } = useLanguage();
  const leaders = [
    {
      id: 1,
      name: "Abera Gemama",
      position: "Chief Administrator",
      bio: "Leading the strategic vision and administrative efforts of Boku Shanan Sub-City since 2021.",
      useAvatar: true
    },
    {
      id: 2,
      name: "XXX YYYY",
      position: "Deputy Administrator",
      bio: "Overseeing public services and community development initiatives across all kebeles.",
      useAvatar: true
    },
    {
      id: 3,
      name: "AAA BBBB",
      position: "Director of Development",
      bio: "Coordinating infrastructure projects and urban development planning initiatives.",
      useAvatar: true
    },
    {
      id: 4,
      name: "CCCC DDDD",
      position: "Head of Finance",
      bio: "Managing budgets, financial planning, and resource allocation for all sub-city programs.",
      useAvatar: true
    }
  ];

  return (
    <section id="about" className="pt-32 pb-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">{t('aboutTitle')}</h2>
          <p className="text-gray-500 max-w-3xl mx-auto">
            {t('aboutDescription')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="rounded-lg shadow-lg overflow-hidden">
              <div className="w-full h-[400px] bg-[url('https://images.unsplash.com/photo-1577415124269-fc1140a69e91?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=600&q=80')] bg-cover bg-center"></div>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-primary mb-4">Our Vision & Mission</h3>
            <div className="mb-6">
              <h4 className="font-semibold text-lg text-gray-800 mb-2">{t('vision')}</h4>
              <p className="text-gray-500">
                {t('visionText')}
              </p>
            </div>
            <div className="mb-6">
              <h4 className="font-semibold text-lg text-gray-800 mb-2">{t('mission')}</h4>
              <p className="text-gray-500">
                {t('missionText')}
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary-dark text-white font-semibold transition duration-300">
              {t('learnMore')}
            </Button>
          </div>
        </div>
        
        {/* Leadership Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-semibold text-primary mb-8 text-center">{t('ourLeadership')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leaders.map(leader => (
              <Card key={leader.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                <div className="w-full h-48 overflow-hidden bg-gray-100">
                  {leader.useAvatar ? (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <AnonymousAvatar />
                    </div>
                  ) : (
                    <img src={leader.imageUrl} alt={leader.name} className="w-full h-full object-cover" />
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-lg text-gray-800">{leader.name}</h4>
                  <p className="text-secondary-dark font-medium text-sm mb-2">{leader.position}</p>
                  <p className="text-gray-500 text-sm mb-3">{leader.bio}</p>
                  <Button variant="link" className="text-primary text-sm font-medium hover:text-accent px-0">
                    {t('viewProfile')} →
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white font-semibold">
              {t('viewAllLeadership')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
