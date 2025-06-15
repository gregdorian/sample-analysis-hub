import { 
  Activity, 
  Users, 
  TestTube, 
  Microscope, 
  FileText, 
  CreditCard,
  BarChart3,
  Settings,
  ClipboardList,
  UserPlus,
  Building2,
  Layers3,
  FlaskConical,
  AlarmClock,
  ArrowDownToLine,
  ChevronDown
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

interface AppSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onMastersMenu: (key: string) => void;
}

const mainMenuItems = [
  {
    title: "Dashboard",
    icon: BarChart3,
    key: "dashboard",
  },
  {
    title: "Gestión de Pacientes",
    icon: Users,
    key: "patients",
  },
  {
    title: "Recepción de Muestras",
    icon: TestTube,
    key: "reception",
  },
  {
    title: "Análisis de Muestras",
    icon: Microscope,
    key: "analysis",
  },
  {
    title: "Reportes",
    icon: FileText,
    key: "reports",
  },
  {
    title: "Facturación",
    icon: CreditCard,
    key: "billing",
  }
];

const mastersMenu = [
  {
    label: "Exámenes",
    icon: ClipboardList,
    key: "masters-exams"
  },
  {
    label: "Médicos",
    icon: UserPlus,
    key: "masters-doctors"
  },
  {
    label: "Aseguradoras",
    icon: Building2,
    key: "masters-insurers"
  },
  {
    label: "Áreas",
    icon: Layers3,
    key: "masters-areas"
  },
  {
    label: "Tipos de muestra",
    icon: FlaskConical,
    key: "masters-sampletypes"
  },
  {
    label: "Prioridad",
    icon: AlarmClock,
    key: "masters-priorities"
  },
  {
    label: "Importar",
    icon: ArrowDownToLine,
    key: "masters-import"
  },
  {
    label: "Configuración General",
    icon: Settings,
    key: "config-general"
  }
];

export function AppSidebar({ activeSection, onSectionChange, onMastersMenu }: AppSidebarProps) {
  const [mainModulesOpen, setMainModulesOpen] = useState(true);
  const [mastersOpen, setMastersOpen] = useState(true);

  const handleMastersClick = (key: string) => {
    if (key === "config-general") {
      onSectionChange("config-general");
    } else {
      onMastersMenu(key);
    }
  };

  return (
    <Sidebar className="border-r border-slate-200">
      <SidebarHeader>
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Activity className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-slate-800">LabClínico</h1>
              <p className="text-sm text-slate-600">Sistema de Gestión</p>
            </div>
          </div>
          <div className="p-1">
            <SidebarTrigger className="h-8 w-8" />
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <Collapsible open={mainModulesOpen} onOpenChange={setMainModulesOpen}>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:bg-slate-100 rounded-md p-2">
                Módulos Principales
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mainModulesOpen ? 'rotate-180' : ''}`} />
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

        <SidebarGroup>
          <Collapsible open={mastersOpen} onOpenChange={setMastersOpen}>
            <CollapsibleTrigger asChild>
              <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:bg-slate-100 rounded-md p-2">
                Maestros
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mastersOpen ? 'rotate-180' : ''}`} />
              </SidebarGroupLabel>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  {mastersMenu.map((item) => (
                    <SidebarMenuItem key={item.key}>
                      <SidebarMenuButton 
                        asChild
                        isActive={activeSection === item.key}
                      >
                        <button 
                          onClick={() => handleMastersClick(item.key)}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100 data-[active=true]:bg-blue-100 data-[active=true]:text-blue-700"
                          type="button"
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </Collapsible>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        {/* Footer vacío - configuración movida a maestros */}
      </SidebarFooter>
    </Sidebar>
  );
}
