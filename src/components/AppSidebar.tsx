
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
  ArrowDownToLine   // Use this as the import icon
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
} from "@/components/ui/sidebar";

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
    icon: ArrowDownToLine,  // Use ArrowDownToLine icon here
    key: "masters-import"
  }
];

export function AppSidebar({ activeSection, onSectionChange, onMastersMenu }: AppSidebarProps) {
  return (
    <Sidebar className="border-r border-slate-200">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-4 py-3">
          <Activity className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-xl font-bold text-slate-800">LabClínico</h1>
            <p className="text-sm text-slate-600">Sistema de Gestión</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Módulos Principales</SidebarGroupLabel>
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
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Maestros</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mastersMenu.map((item) => (
                <SidebarMenuItem key={item.key}>
                  <SidebarMenuButton 
                    asChild
                    isActive={false}
                  >
                    <button 
                      onClick={() => onMastersMenu(item.key)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-100"
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
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="px-4 py-2">
          <button className="flex items-center gap-2 text-slate-600 hover:text-slate-800">
            <Settings className="h-4 w-4" />
            <span className="text-sm">Configuración General</span>
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

