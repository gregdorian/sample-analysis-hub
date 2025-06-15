
import {
  Sidebar,
  SidebarContent,
  useSidebar,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AppSidebarHeader from "./AppSidebarHeader";
import AppSidebarMainMenu from "./AppSidebarMainMenu";
import AppSidebarMastersMenu from "./AppSidebarMastersMenu";
import AppSidebarFooter from "./AppSidebarFooter";

// Mantiene la definición original de props:
interface AppSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onMastersMenu: (key: string) => void;
}

export function AppSidebar({
  activeSection,
  onSectionChange,
  onMastersMenu,
}: AppSidebarProps) {
  const { state } = useSidebar();

  return (
    <div className="relative h-full">
      <Sidebar className="border-r border-slate-200">
        <AppSidebarHeader />
        <SidebarContent>
          <AppSidebarMainMenu activeSection={activeSection} onSectionChange={onSectionChange} />
          <AppSidebarMastersMenu
            activeSection={activeSection}
            onSectionChange={onSectionChange}
            onMastersMenu={onMastersMenu}
          />
        </SidebarContent>
        <AppSidebarFooter />
      </Sidebar>
      {/* Botón flotante restaurar cuando sidebar está colapsado */}
      {state === "collapsed" && (
        <div className="fixed top-4 left-2 z-50 md:block hidden">
          <SidebarTrigger className="shadow-lg border bg-white hover:bg-slate-100" />
        </div>
      )}
    </div>
  );
}
