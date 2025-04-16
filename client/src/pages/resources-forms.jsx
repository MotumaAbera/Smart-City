import Header from "../components/header";
import Footer from "../components/footer";
import { FileText, Download } from "lucide-react";

export default function ResourcesForms() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-4 text-center">Forms</h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          Access and download forms required for various administrative processes.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded shadow flex flex-col justify-between">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-primary mr-3" />
              <span className="text-xl font-semibold">ID Application Form</span>
            </div>
            <p className="text-gray-700 mb-4">Form to apply for a new or replacement ID card.</p>
            <a href="#" className="inline-flex items-center text-blue-600 hover:underline font-medium">
              <Download className="h-4 w-4 mr-1" /> Download
            </a>
          </div>
          <div className="bg-white p-6 rounded shadow flex flex-col justify-between">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-primary mr-3" />
              <span className="text-xl font-semibold">Business Registration Form</span>
            </div>
            <p className="text-gray-700 mb-4">Required form for new business registrations.</p>
            <a href="#" className="inline-flex items-center text-blue-600 hover:underline font-medium">
              <Download className="h-4 w-4 mr-1" /> Download
            </a>
          </div>
          <div className="bg-white p-6 rounded shadow flex flex-col justify-between">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-primary mr-3" />
              <span className="text-xl font-semibold">Residence Verification Form</span>
            </div>
            <p className="text-gray-700 mb-4">Form for requesting residence verification.</p>
            <a href="#" className="inline-flex items-center text-blue-600 hover:underline font-medium">
              <Download className="h-4 w-4 mr-1" /> Download
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
