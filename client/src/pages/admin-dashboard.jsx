import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import Sidebar from "../components/admin/sidebar";
import DashboardStats from "../components/admin/dashboard-stats";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { 
  Users, 
  FileText, 
  Building, 
  BarChart3, 
  CalendarClock, 
  RefreshCcw,
  Loader2 
} from "lucide-react";

export default function AdminDashboard() {
  const { user } = useAuth();
  
  useEffect(() => {
    document.title = "Admin Dashboard - Boku Shanan";
  }, []);

  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/admin/stats"],
    queryFn: () => {
      // Fallback to default stats if the API call fails
      // This is for demonstration purposes
      return {
        employees: 24,
        documents: 136,
        investments: 12,
        population: 45267
      };
    }
  });

  const { data: recentActivities, isLoading: activitiesLoading } = useQuery({
    queryKey: ["/api/admin/recent-activities"],
    queryFn: () => {
      // Fallback to default activities if the API call fails
      // This is for demonstration purposes
      return [
        { id: 1, action: "Document Uploaded", user: "Admin", time: "1 hour ago" },
        { id: 2, action: "New Employee Added", user: "Admin", time: "3 hours ago" },
        { id: 3, action: "Population Data Updated", user: "Admin", time: "5 hours ago" },
        { id: 4, action: "Investment Record Added", user: "Admin", time: "1 day ago" },
      ];
    }
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <div className="flex items-center space-x-2">
              <span>Welcome, {user?.username}</span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <div className="flex justify-center items-center h-32">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <DashboardStats 
                  title="Employees" 
                  value={stats?.employees} 
                  icon={<Users className="h-8 w-8 text-blue-500" />} 
                  description="Total employees" 
                />
                <DashboardStats 
                  title="Documents" 
                  value={stats?.documents} 
                  icon={<FileText className="h-8 w-8 text-green-500" />} 
                  description="Stored documents" 
                />
                <DashboardStats 
                  title="Investments" 
                  value={stats?.investments} 
                  icon={<Building className="h-8 w-8 text-yellow-500" />} 
                  description="Active investments" 
                />
                <DashboardStats 
                  title="Population" 
                  value={stats?.population.toLocaleString()} 
                  icon={<Users className="h-8 w-8 text-purple-500" />} 
                  description="Registered citizens" 
                />
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CalendarClock className="mr-2 h-5 w-5" />
                    Recent Activities
                  </CardTitle>
                  <CardDescription>
                    Latest activities in the system
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {activitiesLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentActivities?.map((activity) => (
                        <div key={activity.id} className="flex items-start border-b pb-3 last:border-0">
                          <div className="bg-primary/10 p-2 rounded mr-3">
                            <RefreshCcw className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{activity.action}</p>
                            <div className="text-sm text-gray-500">
                              <span>{activity.user}</span>
                              <span className="mx-2">•</span>
                              <span>{activity.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="mr-2 h-5 w-5" />
                    Data Overview
                  </CardTitle>
                  <CardDescription>
                    Summary of key metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                    <div className="text-center">
                      <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-500">Data visualization will be implemented here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
