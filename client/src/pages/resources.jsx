import Header from "../components/header";
import Footer from "../components/footer";
import { useLanguage } from "../hooks/use-language";

export default function Resources() {
  const { t } = useLanguage();
  // Example resources - replace or extend with real data as needed
  const resources = [
    { title: t('resource1') || 'Resource 1', description: t('resource1Desc') || '' },
    { title: t('resource2') || 'Resource 2', description: t('resource2Desc') || '' },
    { title: t('resource3') || 'Resource 3', description: t('resource3Desc') || '' },
  ];
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto py-12 px-4">
          <h1 className="text-4xl font-bold mb-2">{t('resourcesTitle') || 'Resources'}</h1>
          <p className="text-lg text-gray-600 mb-6">{t('resourcesDescription') || 'Access useful resources and documents for residents and visitors.'}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            {resources.map((res, i) => (
              <div key={i} className="bg-white rounded shadow p-6 flex flex-col justify-between h-full">
                <h2 className="text-xl font-semibold mb-2">{res.title}</h2>
                {res.description && <p className="text-gray-600 mb-4">{res.description}</p>}
                <button className="mt-auto px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition">{t('viewDetails') || 'View Details'}</button>
              </div>
            ))}
          </div>
          <div className="w-full flex justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d2152.704951987981!2d39.277!3d8.52175!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2set!4v1744713280622!5m2!1sen!2set"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: '12px', maxWidth: '100%', minWidth: '300px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Boku Shanan Location"
            ></iframe>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
