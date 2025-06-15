
import {
  ChevronDown,
  ClipboardList,
  UserPlus,
  Building2,
  Layers3,
  FlaskConical,
  AlarmClock,
  ArrowDownToLine,
  Settings
} from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { useState } from "react";

const mastersMenu = [
  { label: "Exámenes", icon: ClipboardList, key: "masters-exams" },
  { label: "Médicos", icon: UserPlus, key: "masters-doctors" },
  { label: "Aseguradoras", icon: Building2, key: "masters-insurers" },
  { label: "Áreas", icon: Layers3, key: "masters-areas" },
  { label: "Tipos de muestra", icon: FlaskConical, key: "masters-sampletypes" },
  { label: "Prioridad", icon: AlarmClock, key: "masters-priorities" },
  { label: "Importar", icon: ArrowDownToLine, key: "masters-import" },
  { label: "Configuración General", icon: Settings, key: "config-general" }
];

export default function AppSidebarMastersMenu({
  activeSection,
  onSectionChange,
  onMastersMenu
}: {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onMastersMenu: (key: string) => void;
}) {
  const [open, setOpen] = useState(true);

  const handleMastersClick = (key: string) => {
    if (key === "config-general") {
      onSectionChange("config-general");
    } else {
      onMastersMenu(key);
    }
  };

  return (
    <SidebarGroup>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <SidebarGroupLabel className="flex items-center justify-between cursor-pointer hover:bg-slate-100 rounded-md p-2">
            Maestros
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
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
  );
}
