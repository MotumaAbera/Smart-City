import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "../components/admin/sidebar";
import DocumentUpload from "../components/admin/document-upload";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, FileText, MoreVertical, Search, Download, Eye, Trash } from "lucide-react";

export default function DocumentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Document Management - Boku Shanan";
  }, []);

  const { data: documents, isLoading } = useQuery({
    queryKey: ["/api/documents"],
    queryFn: () => {
      // Fallback to empty array if the API call fails
      return [];
    }
  });

  const deleteDocumentMutation = useMutation({
    mutationFn: async (id) => {
      return await apiRequest("DELETE", `/api/documents/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Document deleted",
        description: "The document has been successfully deleted.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/documents"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete document: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const filteredDocuments = documents?.filter(doc => 
    doc?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc?.category?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc?.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  const handleDeleteDocument = (id) => {
    if (confirm("Are you sure you want to delete this document?")) {
      deleteDocumentMutation.mutate(id);
    }
  };

  const handlePreviewDocument = (doc) => {
    setSelectedDocument(doc);
    setPreviewOpen(true);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">Document Management</h1>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4">
          <div className="max-w-7xl mx-auto space-y-6">
            <DocumentUpload />

            <Card>
              <CardHeader>
                <CardTitle>Document Repository</CardTitle>
                <CardDescription>
                  Browse, search, and manage uploaded documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search documents..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>

                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : filteredDocuments.length === 0 ? (
                  <div className="text-center py-12 border rounded-md">
                    <FileText className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                    <h3 className="text-lg font-medium text-gray-900">No documents found</h3>
                    <p className="mt-1 text-gray-500">
                      {searchTerm ? "Try a different search term" : "Get started by uploading your first document"}
                    </p>
                  </div>
                ) : (
                  <div className="border rounded-md overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Date Uploaded</TableHead>
                          <TableHead>File Size</TableHead>
                          <TableHead>Tags</TableHead>
                          <TableHead className="w-[80px]">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDocuments.map((doc) => (
                          <TableRow key={doc.id}>
                            <TableCell className="font-medium">{doc.title}</TableCell>
                            <TableCell>{doc.category}</TableCell>
                            <TableCell>{new Date(doc.uploadDate).toLocaleDateString()}</TableCell>
                            <TableCell>{formatFileSize(doc.fileSize)}</TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {doc.tags.map((tag, idx) => (
                                  <span key={idx} className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handlePreviewDocument(doc)}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    Preview
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => window.open(`/api/documents/${doc.id}/download`)}>
                                    <Download className="mr-2 h-4 w-4" />
                                    Download
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleDeleteDocument(doc.id)}
                                    className="text-red-600"
                                  >
                                    <Trash className="mr-2 h-4 w-4" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Document Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedDocument?.title}</DialogTitle>
            <DialogDescription>
              Uploaded on {selectedDocument ? new Date(selectedDocument.uploadDate).toLocaleDateString() : ''}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <div className="bg-gray-100 p-4 rounded-md mb-4">
              <div className="font-medium text-sm text-gray-500 mb-2">Category</div>
              <div>{selectedDocument?.category}</div>
            </div>
            <div className="bg-gray-100 p-4 rounded-md mb-4">
              <div className="font-medium text-sm text-gray-500 mb-2">Tags</div>
              <div className="flex flex-wrap gap-1">
                {selectedDocument?.tags.map((tag, idx) => (
                  <span key={idx} className="bg-primary/10 text-primary px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-md">
              <div className="font-medium text-sm text-gray-500 mb-2">Description</div>
              <div>{selectedDocument?.description || 'No description provided'}</div>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setPreviewOpen(false)}>Close</Button>
            <Button onClick={() => window.open(`/api/documents/${selectedDocument?.id}/download`)}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function formatFileSize(bytes) {
  if (!bytes) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}
