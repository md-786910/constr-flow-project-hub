
import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { MainLayout } from "@/components/layout/MainLayout";
import { Dashboard } from "@/components/pages/Dashboard";
import { CustomersPage } from "@/components/pages/CustomersPage";
import { ServicesPage } from "@/components/pages/ServicesPage";
import { EmployeesPage } from "@/components/pages/EmployeesPage";
import { ProjectsPage } from "@/components/pages/ProjectsPage";
import { ProjectDetailPage } from "@/components/pages/ProjectDetailPage";
import { QuotingPage } from "@/components/pages/QuotingPage";
import { PlanningPage } from "@/components/pages/PlanningPage";
import { TimeTrackingPage } from "@/components/pages/TimeTrackingPage";
import { SiteDocumentationPage } from "@/components/pages/SiteDocumentationPage";
import { SettingsPage } from "@/components/pages/SettingsPage";
import { LoginPage } from "@/components/pages/LoginPage";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  if (!isAuthenticated) {
    return <LoginPage onLogin={(user) => {
      setIsAuthenticated(true);
      setCurrentUser(user);
    }} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <SidebarProvider>
        <div className="min-h-screen flex w-full">
          <AppSidebar />
          <MainLayout>
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/customers" element={<CustomersPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/employees" element={<EmployeesPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:id" element={<ProjectDetailPage />} />
              <Route path="/quoting" element={<QuotingPage />} />
              <Route path="/planning" element={<PlanningPage />} />
              <Route path="/time-tracking" element={<TimeTrackingPage />} />
              <Route path="/site-docs" element={<SiteDocumentationPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </MainLayout>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default Index;
