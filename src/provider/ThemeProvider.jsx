import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const themeInfo = {
    theme,
    setTheme,
  };

  return (
    <div>
      <ThemeContext.Provider value={themeInfo}>
        {children}
      </ThemeContext.Provider>
    </div>
  );
};

export default ThemeProvider;
