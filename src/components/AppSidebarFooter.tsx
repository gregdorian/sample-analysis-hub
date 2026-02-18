import { useState, useEffect } from "react";
import { LogOut, User, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SidebarFooter } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ProfileDialog from "./ProfileDialog";

const DEFAULT_PROFILE = { name: "Admin", email: "admin@labclinico.com", photo: null as string | null };

export default function AppSidebarFooter() {
  const navigate = useNavigate();
  const [profileOpen, setProfileOpen] = useState(false);
  const [profile, setProfile] = useState(DEFAULT_PROFILE);

  useEffect(() => {
    const saved = localStorage.getItem("user-profile");
    if (saved) {
      try { setProfile(JSON.parse(saved)); } catch {}
    }
  }, []);

  const handleSaveProfile = (updated: typeof DEFAULT_PROFILE) => {
    setProfile(updated);
    localStorage.setItem("user-profile", JSON.stringify(updated));
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <SidebarFooter>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
            <Avatar className="h-8 w-8">
              {profile.photo ? (
                <AvatarImage src={profile.photo} alt="Foto de perfil" />
              ) : (
                <AvatarFallback className="bg-primary/10 text-primary text-xs">
                  {profile.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col items-start text-left">
              <span className="font-medium text-foreground">{profile.name}</span>
              <span className="text-xs">{profile.email}</span>
            </div>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" align="start" className="w-56">
          <DropdownMenuItem onClick={() => setProfileOpen(true)}>
            <User className="mr-2 h-4 w-4" />
            Mi perfil
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/")}>
            <Home className="mr-2 h-4 w-4" />
            Ir a Landing Page
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar sesión
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <ProfileDialog
        open={profileOpen}
        onOpenChange={setProfileOpen}
        profile={profile}
        onSave={handleSaveProfile}
      />
    </SidebarFooter>
  );
}
