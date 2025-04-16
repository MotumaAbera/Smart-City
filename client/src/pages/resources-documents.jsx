import Header from "../components/header";
import Footer from "../components/footer";
import { FileText, Download } from "lucide-react";
import { useLanguage } from "../hooks/use-language";

export default function ResourcesDocuments() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-4 text-center">{t('documentsTitle') || t('documents')}</h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          {t('documentsDescription') || "Browse and download official documents from Boku Shanan Sub-City Administration."}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded shadow flex flex-col justify-between">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-primary mr-3" />
              <span className="text-xl font-semibold">{t('annualReport2024') || "Annual Report 2024"}</span>
            </div>
            <p className="text-gray-700 mb-4">{t('annualReport2024Description') || "The official annual report for the year 2024."}</p>
            <a href="#" className="inline-flex items-center text-blue-600 hover:underline font-medium">
              <Download className="h-4 w-4 mr-1" /> {t('download') || "Download"}
            </a>
          </div>
          <div className="bg-white p-6 rounded shadow flex flex-col justify-between">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-primary mr-3" />
              <span className="text-xl font-semibold">{t('budgetPlan') || "Budget Plan"}</span>
            </div>
            <p className="text-gray-700 mb-4">{t('budgetPlanDescription') || "Detailed budget plan for upcoming projects."}</p>
            <a href="#" className="inline-flex items-center text-blue-600 hover:underline font-medium">
              <Download className="h-4 w-4 mr-1" /> {t('download') || "Download"}
            </a>
          </div>
          <div className="bg-white p-6 rounded shadow flex flex-col justify-between">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-primary mr-3" />
              <span className="text-xl font-semibold">{t('communityGuidelines') || "Community Guidelines"}</span>
            </div>
            <p className="text-gray-700 mb-4">{t('communityGuidelinesDescription') || "Guidelines for all community members and residents."}</p>
            <a href="#" className="inline-flex items-center text-blue-600 hover:underline font-medium">
              <Download className="h-4 w-4 mr-1" /> {t('download') || "Download"}
            </a>
          </div>
          {/* Sample Document: Lecture1.pdf */}
          <div className="bg-white p-6 rounded shadow flex flex-col justify-between">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-primary mr-3" />
              <span className="text-xl font-semibold">Lecture1.pdf</span>
            </div>
            <p className="text-gray-700 mb-4">Sample lecture document for download and testing.</p>
            <a href="/Lecture1.pdf" download className="inline-flex items-center text-blue-600 hover:underline font-medium">
              <Download className="h-4 w-4 mr-1" /> Download
            </a>
          </div>
          <div className="bg-white p-6 rounded shadow flex flex-col justify-between">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-primary mr-3" />
              <span className="text-xl font-semibold">Lecture1.pdf</span>
            </div>
            <p className="text-gray-700 mb-4">Sample lecture document for download and testing.</p>
            <a href="/Lecture1.pdf" download className="inline-flex items-center text-blue-600 hover:underline font-medium">
              <Download className="h-4 w-4 mr-1" /> Download
            </a>
          </div>
          <div className="bg-white p-6 rounded shadow flex flex-col justify-between">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-primary mr-3" />
              <span className="text-xl font-semibold">Lecture1.pdf</span>
            </div>
            <p className="text-gray-700 mb-4">Sample lecture document for download and testing.</p>
            <a href="/Lecture1.pdf" download className="inline-flex items-center text-blue-600 hover:underline font-medium">
              <Download className="h-4 w-4 mr-1" /> Download
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
