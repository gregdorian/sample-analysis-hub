import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface LabRegistrationData {
  lab: {
    name: string;
    ruc: string;
    logo: string | null;
    description: string;
    phone: string;
    email: string;
    address: string;
  };
  exams: string[];
  plan: {
    planId: string;
    users: string;
    lease: string;
    admin: { name: string; email: string; password: string };
  };
  paymentCompleted: boolean;
  registeredAt: string;
  leaseExpiresAt: string;
  status: "active" | "suspended" | "terminated";
}

interface AuthState {
  isLoggedIn: boolean;
  userEmail: string | null;
  userName: string | null;
}

interface LabAuthContextType {
  registration: LabRegistrationData | null;
  auth: AuthState;
  isRegistered: boolean;
  isPaid: boolean;
  isActive: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  completeRegistration: (data: LabRegistrationData) => void;
}

const LabAuthContext = createContext<LabAuthContextType | null>(null);

export function LabAuthProvider({ children }: { children: ReactNode }) {
  const [registration, setRegistration] = useState<LabRegistrationData | null>(null);
  const [auth, setAuth] = useState<AuthState>({ isLoggedIn: false, userEmail: null, userName: null });

  useEffect(() => {
    const raw = localStorage.getItem("lab-registration");
    if (raw) {
      try { setRegistration(JSON.parse(raw)); } catch { /* ignore */ }
    }
    const session = localStorage.getItem("lab-session");
    if (session) {
      try { setAuth(JSON.parse(session)); } catch { /* ignore */ }
    }
  }, []);

  const isRegistered = !!registration;
  const isPaid = !!registration?.paymentCompleted;
  const isActive = isPaid && registration?.status === "active";

  const login = (email: string, password: string): boolean => {
    if (!registration) return false;
    const admin = registration.plan.admin;
    if (email === admin.email && password === admin.password) {
      const session = { isLoggedIn: true, userEmail: admin.email, userName: admin.name };
      setAuth(session);
      localStorage.setItem("lab-session", JSON.stringify(session));
      return true;
    }
    return false;
  };

  const logout = () => {
    setAuth({ isLoggedIn: false, userEmail: null, userName: null });
    localStorage.removeItem("lab-session");
  };

  const completeRegistration = (data: LabRegistrationData) => {
    setRegistration(data);
    localStorage.setItem("lab-registration", JSON.stringify(data));
  };

  return (
    <LabAuthContext.Provider value={{ registration, auth, isRegistered, isPaid, isActive, login, logout, completeRegistration }}>
      {children}
    </LabAuthContext.Provider>
  );
}

export function useLabAuth() {
  const ctx = useContext(LabAuthContext);
  if (!ctx) throw new Error("useLabAuth must be used within LabAuthProvider");
  return ctx;
}
