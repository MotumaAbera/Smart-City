import { useState } from "react";
import Sidebar from "../components/admin/sidebar";
import WebsiteContent from "../components/admin/website-content";
import EvidenceManagement from "../components/admin/evidence-management";
import CitizenServiceHub from "../components/admin/citizen-service-hub";
import LeadershipDirectory from "../components/admin/leadership-directory";

const SECTIONS = [
  { key: "website", label: "Website Content" },
  { key: "evidence", label: "Evidence Management" },
  { key: "service", label: "Citizen Service Hub" },
  { key: "leadership", label: "Leadership Directory" },
];

export default function AdminDashboard() {
  const [section, setSection] = useState("website");

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        sections={SECTIONS}
        selected={section}
        onSelect={setSection}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <span className="text-gray-600">Shanan Boku Subcity Management</span>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4">
          {section === "website" && <WebsiteContent />}
          {section === "evidence" && <EvidenceManagement />}
          {section === "service" && <CitizenServiceHub />}
          {section === "leadership" && <LeadershipDirectory />}
        </main>
      </div>
    </div>
  );
}
