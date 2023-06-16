import { Moon, Sun } from "@/icons";
import { useAtom } from "jotai";
import { themeAtom } from "@/store";

export default function ThemeToggle() {
  const [theme, setTheme] = useAtom(themeAtom);

  return (
    <div className="w-8 h-8">
      <span aria-hidden="true">
        <div
          onClick={() => {
            const htmlElement = document.querySelector("html")!;
            htmlElement.classList.toggle("dark");
            theme === "dark" ? setTheme("light") : setTheme("dark");
          }}
        >
          {theme === "dark" ? <Moon /> : <Sun />}
        </div>
      </span>
    </div>
  );
}
