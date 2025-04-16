import React, { lazy, Suspense } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "./components/ui/toaster";
import NotFound from "./pages/not-found";
import HomePage from "./pages/home-page";
import AuthPage from "./pages/auth-page";
import AdminDashboard from "./admin/Dashboard";
import DocumentManagement from "./pages/document-management";
import PopulationManagement from "./pages/population-management";
import InvestmentManagement from "./pages/investment-management";
import EmployeeManagement from "./pages/employee-management";
import About from "./pages/about";
import Services from "./pages/services";
import News from "./pages/news";
import Resources from "./pages/resources";
import Projects from "./pages/projects";
import Tourism from "./pages/tourism";
import Contact from "./pages/contact";
import ResourcesDocuments from "./pages/resources-documents";
import ResourcesForms from "./pages/resources-forms";
import ResourcesReports from "./pages/resources-reports";
import SubcityManagement from "./pages/subcity-management";
import { AuthProvider } from "./hooks/use-auth";
import { LanguageProvider } from "./hooks/use-language";
import { ProtectedRoute } from "./lib/protected-route";

const Posts = React.lazy(() => import("./admin/Posts"));
const CreatePost = React.lazy(() => import("./admin/CreatePost"));
const ContentManager = React.lazy(() => import("./admin/ContentManager"));

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/about" component={About} />
      <Route path="/services" component={Services} />
      <Route path="/news" component={News} />
      <Route path="/resources" component={Resources} />
      <Route path="/resources/documents" component={ResourcesDocuments} />
      <Route path="/resources/forms" component={ResourcesForms} />
      <Route path="/resources/reports" component={ResourcesReports} />
      <Route path="/projects" component={Projects} />
      <Route path="/tourism" component={Tourism} />
      <Route path="/contact" component={Contact} />
      <Route path="/auth" component={AuthPage} />
      <ProtectedRoute path="/admin" component={AdminDashboard} />
      <ProtectedRoute path="/admin/documents" component={DocumentManagement} />
      <ProtectedRoute path="/admin/population" component={PopulationManagement} />
      <ProtectedRoute path="/admin/investments" component={InvestmentManagement} />
      <ProtectedRoute path="/admin/employees" component={EmployeeManagement} />
      <ProtectedRoute path="/admin/posts">
        <React.Suspense fallback={<div>Loading...</div>}>
          <Posts />
        </React.Suspense>
      </ProtectedRoute>
      <ProtectedRoute path="/admin/posts/create">
        <React.Suspense fallback={<div>Loading...</div>}>
          <CreatePost />
        </React.Suspense>
      </ProtectedRoute>
      <ProtectedRoute path="/admin/content">
        <React.Suspense fallback={<div>Loading...</div>}>
          <ContentManager />
        </React.Suspense>
      </ProtectedRoute>
      <Route path="/subcity-management" component={SubcityManagement} />
      <Route path="/subcity-management/population" component={PopulationManagement} />
      <Route path="/subcity-management/employees" component={EmployeeManagement} />
      <Route path="/subcity-management/investment" component={InvestmentManagement} />
      <Route path="/subcity-management/documents" component={DocumentManagement} />
      <Route path="/subcity-management/admin" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <LanguageProvider>
          <Router />
          <Toaster />
        </LanguageProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
