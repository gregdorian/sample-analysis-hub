
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between px-4 md:px-10 py-5 shadow bg-white dark:bg-background sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <span className="text-3xl lg:text-4xl font-extrabold text-green-700 tracking-tight">
          G-mint Lab
        </span>
      </div>
      <div>
        <Button
          size="sm"
          className="bg-green-700 hover:bg-green-800 text-white rounded-full"
          onClick={() => navigate("/login")}
        >
          Ingresar
        </Button>
      </div>
    </header>
  );
};

export default Header;
