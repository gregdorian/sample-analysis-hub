
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLabAuth } from "@/hooks/use-lab-auth";

const Header = () => {
  const navigate = useNavigate();
  const { isRegistered } = useLabAuth();

  return (
    <header className="flex items-center justify-between px-4 md:px-10 py-5 shadow bg-white dark:bg-background sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <span className="text-3xl lg:text-4xl font-extrabold text-green-700 tracking-tight">
          G-mint Lab
        </span>
      </div>
      <div className="flex items-center gap-2">
        {isRegistered ? (
          <Button
            size="sm"
            variant="outline"
            className="rounded-full"
            onClick={() => navigate("/laboratorio")}
          >
            Ir al Portal
          </Button>
        ) : (
          <Button
            size="sm"
            variant="outline"
            className="rounded-full"
            onClick={() => navigate("/registro-laboratorio")}
          >
            Registrar Laboratorio
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;
