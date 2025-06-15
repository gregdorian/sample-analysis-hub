
import { ChevronDown, BarChart3, Users, TestTube, Microscope, FileText, CreditCard } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { useState } from "react";

const mainMenuItems = [
  { title: "Dashboard", icon: BarChart3, key: "dashboard" },
  { title: "Gestión de Pacientes", icon: Users, key: "patients" },
  { title: "Recepción de Muestras", icon: TestTube, key: "reception" },
  { title: "Análisis de Muestras", icon: Microscope, key: "analysis" },
  { title: "Reportes", icon: FileText, key: "reports" },
  { title: "Facturación", icon: CreditCard, key: "billing" }
];

export default function AppSidebarMainMenu({
  activeSection,
  onSectionChange
}: {
  activeSection: string;
  onSectionChange: (section: string) => void;
}) {
  const [open, setOpen] = useState(true);

  return (
    <SidebarGroup>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:bg-slate-100 rounded-md p-2">
            Módulos Principales
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
          </SidebarGroupLabel>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton
                    asChild
                    isActive={activeSection === item.key}
                  >
                    <button
                      onClick={() => onSectionChange(item.key)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 data-[active=true]:bg-blue-100 data-[active=true]:text-blue-700"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </Collapsible>
    </SidebarGroup>
  );
}
