import Header from "../components/header";
import Footer from "../components/footer";
import { FileText, Download } from "lucide-react";

export default function ResourcesReports() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-4 text-center">Reports</h1>
        <p className="text-lg text-gray-600 mb-8 text-center">
          View and download reports published by the administration.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded shadow flex flex-col justify-between">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-primary mr-3" />
              <span className="text-xl font-semibold">Quarterly Report Q1</span>
            </div>
            <p className="text-gray-700 mb-4">First quarter performance and activities summary.</p>
            <a href="#" className="inline-flex items-center text-blue-600 hover:underline font-medium">
              <Download className="h-4 w-4 mr-1" /> Download
            </a>
          </div>
          <div className="bg-white p-6 rounded shadow flex flex-col justify-between">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-primary mr-3" />
              <span className="text-xl font-semibold">Financial Report 2024</span>
            </div>
            <p className="text-gray-700 mb-4">Financial details and statements for 2024.</p>
            <a href="#" className="inline-flex items-center text-blue-600 hover:underline font-medium">
              <Download className="h-4 w-4 mr-1" /> Download
            </a>
          </div>
          <div className="bg-white p-6 rounded shadow flex flex-col justify-between">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-primary mr-3" />
              <span className="text-xl font-semibold">Community Feedback Report</span>
            </div>
            <p className="text-gray-700 mb-4">Summary of community feedback and suggestions.</p>
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
