import Header from "../components/header";
import Footer from "../components/footer";
import { Building2, Droplets, Car, School, Leaf } from "lucide-react";
import { useLanguage } from "../hooks/use-language";

export default function Projects() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-4 text-center">{t('projectsTitle') || t('projects')}</h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          {t('projectsDescription') || "Discover our ongoing and completed projects across the sub-city."}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded shadow flex flex-col justify-between">
            <div className="flex items-center mb-4">
              <Car className="h-8 w-8 text-primary mr-3" />
              <span className="text-xl font-semibold">{t('roadConstruction') || "Road Construction"}</span>
            </div>
            <p className="text-gray-700 mb-4">{t('roadConstructionDesc') || "Development and maintenance of major and local roads."}</p>
            <span className="inline-block text-green-600 font-medium">{t('ongoing') || "Ongoing"}</span>
          </div>
          <div className="bg-white p-6 rounded shadow flex flex-col justify-between">
            <div className="flex items-center mb-4">
              <Droplets className="h-8 w-8 text-primary mr-3" />
              <span className="text-xl font-semibold">{t('waterSupply') || "Water Supply"}</span>
            </div>
            <p className="text-gray-700 mb-4">{t('waterSupplyDesc') || "Expansion of clean and reliable water distribution systems."}</p>
            <span className="inline-block text-blue-600 font-medium">{t('completed') || "Completed"}</span>
          </div>
          <div className="bg-white p-6 rounded shadow flex flex-col justify-between">
            <div className="flex items-center mb-4">
              <School className="h-8 w-8 text-primary mr-3" />
              <span className="text-xl font-semibold">{t('schoolBuildings') || "School Buildings"}</span>
            </div>
            <p className="text-gray-700 mb-4">{t('schoolBuildingsDesc') || "Construction and renovation of primary and secondary schools."}</p>
            <span className="inline-block text-green-600 font-medium">{t('ongoing') || "Ongoing"}</span>
          </div>
          <div className="bg-white p-6 rounded shadow flex flex-col justify-between">
            <div className="flex items-center mb-4">
              <Building2 className="h-8 w-8 text-primary mr-3" />
              <span className="text-xl font-semibold">{t('communityCenters') || "Community Centers"}</span>
            </div>
            <p className="text-gray-700 mb-4">{t('communityCentersDesc') || "Multipurpose centers for public gatherings and services."}</p>
            <span className="inline-block text-blue-600 font-medium">{t('completed') || "Completed"}</span>
          </div>
          <div className="bg-white p-6 rounded shadow flex flex-col justify-between">
            <div className="flex items-center mb-4">
              <Leaf className="h-8 w-8 text-primary mr-3" />
              <span className="text-xl font-semibold">{t('greenSpaces') || "Green Spaces"}</span>
            </div>
            <p className="text-gray-700 mb-4">{t('greenSpacesDesc') || "Parks and recreational areas for the community."}</p>
            <span className="inline-block text-green-600 font-medium">{t('ongoing') || "Ongoing"}</span>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
