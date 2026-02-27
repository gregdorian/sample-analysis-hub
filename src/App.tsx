
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import LabRegistration from "./pages/LabRegistration";
import Login from "./pages/Login";
import LabPortal from "./pages/LabPortal";
import LabAppointments from "./pages/LabAppointments";
import { ThemeProvider } from "@/hooks/use-theme";
import { LabAuthProvider, useLabAuth } from "@/hooks/use-lab-auth";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { auth } = useLabAuth();
  if (!auth.isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function LabPortalGuard({ children }: { children: React.ReactNode }) {
  const { isActive } = useLabAuth();
  if (!isActive) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/landing" element={<Navigate to="/" replace />} />
    <Route path="/login" element={<Login />} />
    <Route path="/registro-laboratorio" element={<LabRegistration />} />
    <Route path="/laboratorio" element={<LabPortalGuard><LabPortal /></LabPortalGuard>} />
    <Route path="/laboratorio/citas" element={<LabPortalGuard><LabAppointments /></LabPortalGuard>} />
    <Route path="/dashboard" element={<ProtectedRoute><Index /></ProtectedRoute>} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LabAuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </LabAuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
