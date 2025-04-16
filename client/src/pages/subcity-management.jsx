import { Link } from "wouter";

const managementSections = [
  {
    path: "/subcity-management/population",
    title: "Population Management",
    description: "Manage population data and statistics."
  },
  {
    path: "/subcity-management/employees",
    title: "Employee Management",
    description: "Manage sub-city employees and roles."
  },
  {
    path: "/subcity-management/investment",
    title: "Investment Management",
    description: "Oversee investments and economic initiatives."
  },
  {
    path: "/subcity-management/documents",
    title: "Document Management",
    description: "Handle official documents and records."
  },
  {
    path: "/subcity-management/admin",
    title: "Admin Dashboard",
    description: "Access administrative controls and analytics."
  }
];

export default function SubcityManagement() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-primary">Sub-City Management System</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {managementSections.map(section => (
          <Link href={section.path} key={section.path} className="block">
            <div className="rounded-xl shadow-lg p-6 bg-white hover:bg-primary/10 transition cursor-pointer h-full">
              <div className="text-xl font-semibold text-primary mb-2">{section.title}</div>
              <div className="text-gray-600">{section.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
