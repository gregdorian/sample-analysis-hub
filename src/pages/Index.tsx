
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { DashboardContent } from "@/components/DashboardContent";
import { PatientManagement } from "@/components/PatientManagement";
import { SampleReception } from "@/components/SampleReception";
import { SampleAnalysis } from "@/components/SampleAnalysis";
import { Reports } from "@/components/Reports";
import { Billing } from "@/components/Billing";
import { SettingsImportModule } from "@/components/SettingsImportModule";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent />;
      case "patients":
        return <PatientManagement />;
      case "reception":
        return <SampleReception />;
      case "analysis":
        return <SampleAnalysis />;
      case "reports":
        return <Reports />;
      case "billing":
        return <Billing />;
      case "settings":
        return <SettingsImportModule />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-slate-50">
        <AppSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <main className="flex-1 p-6">
          {renderContent()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
