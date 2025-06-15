
import { Activity } from "lucide-react";
import { SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar";

export default function AppSidebarHeader() {
  return (
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
  );
}
