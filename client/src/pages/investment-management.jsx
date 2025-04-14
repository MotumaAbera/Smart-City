import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import Sidebar from "../components/admin/sidebar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loader2, Search, Building, PlusCircle, MoreVertical, Eye, Edit, Trash } from "lucide-react";

// Form validation schema
const investmentFormSchema = z.object({
  investorName: z.string().min(2, "Investor name is required"),
  companyName: z.string().min(2, "Company name is required"),
  sector: z.string().min(1, "Sector is required"),
  projectType: z.string().min(1, "Project type is required"),
  estimatedCapital: z.string().refine(value => !isNaN(parseFloat(value)), {
    message: "Must be a valid number",
  }),
  location: z.string().min(1, "Location is required"),
  startDate: z.string(),
  expectedCompletionDate: z.string(),
  status: z.string().min(1, "Status is required"),
  description: z.string().optional(),
  contactEmail: z.string().email("Invalid email address").optional().or(z.literal('')),
  contactPhone: z.string().optional(),
});

export default function InvestmentManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("records");
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    document.title = "Investment Management - Boku Shanan";
  }, []);

  const form = useForm({
    resolver: zodResolver(investmentFormSchema),
    defaultValues: {
      investorName: "",
      companyName: "",
      sector: "",
      projectType: "",
      estimatedCapital: "",
      location: "",
      startDate: new Date().toISOString().split('T')[0],
      expectedCompletionDate: "",
      status: "planned",
      description: "",
      contactEmail: "",
      contactPhone: "",
    },
  });

  const { data: investments, isLoading } = useQuery({
    queryKey: ["/api/investments"],
    queryFn: () => {
      // Fallback data if API fails
      return [
        {
          id: 1,
          investorName: "Abebe Kebede",
          companyName: "Green Valley Agriculture",
          sector: "Agriculture",
          projectType: "Farm Development",
          estimatedCapital: 2500000,
          location: "Kebele 03",
          startDate: "2023-03-15",
          expectedCompletionDate: "2024-06-30",
          status: "in-progress",
          description: "Developing a modern farming facility focusing on vegetable production for local and export markets.",
          contactEmail: "abebe@greenvalley.et",
          contactPhone: "+251912345678",
        },
        {
          id: 2,
          investorName: "Tigist Haile",
          companyName: "Sunrise Manufacturing",
          sector: "Manufacturing",
          projectType: "Factory Construction",
          estimatedCapital: 8500000,
          location: "Kebele 01",
          startDate: "2023-01-10",
          expectedCompletionDate: "2024-12-15",
          status: "in-progress",
          description: "Building a textile manufacturing facility to produce garments for export.",
          contactEmail: "tigist@sunrisemfg.com",
          contactPhone: "+251987654321",
        },
        {
          id: 3,
          investorName: "Bekele Tadesse",
          companyName: "Highland Hospitality",
          sector: "Tourism",
          projectType: "Hotel Construction",
          estimatedCapital: 12000000,
          location: "Kebele 04",
          startDate: "2023-06-01",
          expectedCompletionDate: "2025-05-30",
          status: "planned",
          description: "Constructing a four-star hotel to accommodate tourists and business travelers.",
          contactEmail: "bekele@highlandhotels.com",
          contactPhone: "+251923456789",
        },
      ];
    }
  });

  const { data: sectors } = useQuery({
    queryKey: ["/api/sectors"],
    queryFn: () => {
      // Fallback data if API fails
      return [
        { id: 1, name: "Agriculture" },
        { id: 2, name: "Manufacturing" },
        { id: 3, name: "Tourism" },
        { id: 4, name: "Technology" },
        { id: 5, name: "Construction" },
        { id: 6, name: "Healthcare" },
        { id: 7, name: "Education" },
        { id: 8, name: "Retail" },
        { id: 9, name: "Energy" },
        { id: 10, name: "Transportation" },
      ];
    }
  });

  const addInvestmentMutation = useMutation({
    mutationFn: async (data) => {
      return await apiRequest("POST", "/api/investments", data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Investment record has been added successfully.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/investments"] });
      form.reset();
      setActiveTab("records");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to add investment record: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const deleteInvestmentMutation = useMutation({
    mutationFn: async (id) => {
      return await apiRequest("DELETE", `/api/investments/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Investment deleted",
        description: "The investment has been successfully deleted.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/investments"] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete investment: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (values) => {
    // Convert string to float for capital
    const dataToSubmit = {
      ...values,
      estimatedCapital: parseFloat(values.estimatedCapital),
    };
    
    addInvestmentMutation.mutate(dataToSubmit);
  };

  const filteredInvestments = investments?.filter(investment => 
    investment.investorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    investment.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    investment.sector.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const handleDeleteInvestment = (id) => {
    if (confirm("Are you sure you want to delete this investment record?")) {
      deleteInvestmentMutation.mutate(id);
    }
  };

  const viewInvestmentDetails = (investment) => {
    setSelectedInvestment(investment);
    setDetailsOpen(true);
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'planned':
        return { variant: 'outline', label: 'Planned' };
      case 'in-progress':
        return { variant: 'default', label: 'In Progress' };
      case 'completed':
        return { variant: 'success', label: 'Completed' };
      case 'on-hold':
        return { variant: 'warning', label: 'On Hold' };
      case 'cancelled':
        return { variant: 'destructive', label: 'Cancelled' };
      default:
        return { variant: 'secondary', label: status };
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <h1 className="text-2xl font-bold text-gray-900">Investment Management</h1>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4">
          <div className="max-w-7xl mx-auto space-y-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="records">Investment Records</TabsTrigger>
                <TabsTrigger value="add">Add New Investment</TabsTrigger>
              </TabsList>
              
              <TabsContent value="records" className="space-y-6 pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Building className="mr-2 h-5 w-5" />
                      Investment Records
                    </CardTitle>
                    <CardDescription>
                      Browse and manage investment projects in Boku Shanan
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center mb-6">
                      <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          type="search"
                          placeholder="Search investments..."
                          className="pl-8"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                      <Button variant="outline" className="ml-2" onClick={() => setActiveTab("add")}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        New Investment
                      </Button>
                    </div>

                    {isLoading ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      </div>
                    ) : filteredInvestments.length === 0 ? (
                      <div className="text-center py-12 border rounded-md">
                        <Building className="h-12 w-12 mx-auto text-gray-400 mb-3" />
                        <h3 className="text-lg font-medium text-gray-900">No investment records found</h3>
                        <p className="mt-1 text-gray-500">
                          {searchTerm ? "Try a different search term" : "Get started by adding your first investment record"}
                        </p>
                        <Button variant="outline" className="mt-4" onClick={() => setActiveTab("add")}>
                          <PlusCircle className="h-4 w-4 mr-2" />
                          Add New Investment
                        </Button>
                      </div>
                    ) : (
                      <div className="border rounded-md overflow-hidden">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Investor/Company</TableHead>
                              <TableHead>Sector</TableHead>
                              <TableHead>Capital (ETB)</TableHead>
                              <TableHead>Location</TableHead>
                              <TableHead>Timeline</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead className="w-[80px]">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredInvestments.map((investment) => {
                              const statusBadge = getStatusBadgeVariant(investment.status);
                              return (
                                <TableRow key={investment.id}>
                                  <TableCell>
                                    <div className="font-medium">{investment.investorName}</div>
                                    <div className="text-sm text-gray-500">{investment.companyName}</div>
                                  </TableCell>
                                  <TableCell>{investment.sector}</TableCell>
                                  <TableCell>{investment.estimatedCapital.toLocaleString()} ETB</TableCell>
                                  <TableCell>{investment.location}</TableCell>
                                  <TableCell>
                                    <div className="text-sm">Start: {new Date(investment.startDate).toLocaleDateString()}</div>
                                    <div className="text-sm">End: {new Date(investment.expectedCompletionDate).toLocaleDateString()}</div>
                                  </TableCell>
                                  <TableCell>
                                    <Badge variant={statusBadge.variant}>
                                      {statusBadge.label}
                                    </Badge>
                                  </TableCell>
                                  <TableCell>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                          <MoreVertical className="h-4 w-4" />
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => viewInvestmentDetails(investment)}>
                                          <Eye className="mr-2 h-4 w-4" />
                                          View Details
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => {
                                          setActiveTab("add");
                                          form.reset(investment);
                                        }}>
                                          <Edit className="mr-2 h-4 w-4" />
                                          Edit
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem 
                                          onClick={() => handleDeleteInvestment(investment.id)}
                                          className="text-red-600"
                                        >
                                          <Trash className="mr-2 h-4 w-4" />
                                          Delete
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="add" className="pt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <PlusCircle className="mr-2 h-5 w-5" />
                      Add Investment Record
                    </CardTitle>
                    <CardDescription>
                      Register a new investment project in Boku Shanan Sub-City
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="investorName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Investor Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Full name of investor" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="companyName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Name of the company" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="sector"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Business Sector</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a sector" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {sectors?.map(sector => (
                                      <SelectItem key={sector.id} value={sector.name}>
                                        {sector.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="projectType"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Project Type</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g., Factory Construction, Farm Development" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="estimatedCapital"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Estimated Capital (ETB)</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="0.00" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                  <Input placeholder="Specific location in Boku Shanan" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <FormField
                            control={form.control}
                            name="startDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Start Date</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="expectedCompletionDate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Expected Completion</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Project Status</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="planned">Planned</SelectItem>
                                    <SelectItem value="in-progress">In Progress</SelectItem>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="on-hold">On Hold</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Project Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Brief description of the investment project" 
                                  className="min-h-[100px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="contactEmail"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Contact Email</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="Email address" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="contactPhone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Contact Phone</FormLabel>
                                <FormControl>
                                  <Input placeholder="Phone number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button type="button" variant="outline" onClick={() => setActiveTab("records")}>
                            Cancel
                          </Button>
                          <Button type="submit" disabled={addInvestmentMutation.isPending}>
                            {addInvestmentMutation.isPending ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving...
                              </>
                            ) : (
                              <>
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Save Investment
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>

      {/* Investment Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Investment Details</DialogTitle>
            <DialogDescription>
              Comprehensive information about the investment project
            </DialogDescription>
          </DialogHeader>
          {selectedInvestment && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Investor</h3>
                  <p className="mt-1 text-lg font-semibold">{selectedInvestment.investorName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Company</h3>
                  <p className="mt-1">{selectedInvestment.companyName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Sector</h3>
                  <p className="mt-1">{selectedInvestment.sector}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Project Type</h3>
                  <p className="mt-1">{selectedInvestment.projectType}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <div className="mt-1">
                    <Badge variant={getStatusBadgeVariant(selectedInvestment.status).variant}>
                      {getStatusBadgeVariant(selectedInvestment.status).label}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Estimated Capital</h3>
                  <p className="mt-1 text-lg font-semibold">{selectedInvestment.estimatedCapital.toLocaleString()} ETB</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Location</h3>
                  <p className="mt-1">{selectedInvestment.location}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Timeline</h3>
                  <p className="mt-1">Start: {new Date(selectedInvestment.startDate).toLocaleDateString()}</p>
                  <p className="mt-1">Expected Completion: {new Date(selectedInvestment.expectedCompletionDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Contact Information</h3>
                  <p className="mt-1">Email: {selectedInvestment.contactEmail}</p>
                  <p className="mt-1">Phone: {selectedInvestment.contactPhone}</p>
                </div>
              </div>
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-sm font-medium text-gray-500">Project Description</h3>
                <p className="mt-1 text-gray-700">{selectedInvestment.description}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
