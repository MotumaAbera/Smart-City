export default function WebsiteContent() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Website Content Management</h2>
      <p className="mb-2">Admin-friendly interface to manage public content, announcements, galleries, and forms.</p>
      <ul className="list-disc pl-6 text-gray-700">
        <li>Manage homepage and section content</li>
        <li>Create/edit/delete announcements</li>
        <li>Upload and organize gallery images</li>
        <li>Manage public forms and surveys</li>
      </ul>
      <div className="mt-6 p-4 border rounded bg-white text-gray-500">(Feature controls will appear here)</div>
    </div>
  );
}
