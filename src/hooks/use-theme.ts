
import { createContext, useContext, useState, useEffect } from "react";

type Theme = "light" | "dark" | "corporate";
interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const defaultTheme = "light";

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme") as Theme | null;
      if (stored === "light" || stored === "dark" || stored === "corporate") {
        return stored;
      }
    }
    return defaultTheme;
  });

  useEffect(() => {
    document.body.classList.remove("light", "dark", "corporate");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const setTheme = (t: Theme) => setThemeState(t);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
