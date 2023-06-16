import Link from "next/link";
import { useTheme } from "next-themes";

import {
  SunIcon,
  MoonIcon,
  DiscordIcon,
  TwitterIcon,
  GitHubIcon,
} from "./icons";

type HeadersDataT = {
  brand: String;
  navLinks: {
    isExternal: Boolean;
    link: string;
    text: String;
  }[];
};

const headersData: HeadersDataT = {
  brand: "AI Generated",
  navLinks: [
    {
      isExternal: false,
      link: "/models",
      text: "Models",
    },
    {
      isExternal: false,
      link: "/roadmap",
      text: "Roadmap",
    },
    {
      isExternal: false,
      link: "/newsletter",
      text: "Newsletter",
    },
  ],
};

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="z-50 px-4 bg-slate-50 dark:bg-black">
      <nav
        className="flex items-center justify-between p-6 lg:px-8 border-b-4 border-black dark:border-pink-900"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link
            href="/"
            className="-m-1.5 p-1.5 text-4xl font-bold bg-clip-text text-transparent
            bg-gradient-to-r from-black via-blue-700 to-lime-900
            dark:bg-gradient-to-r dark:from-purple-600 dark:via-pink-600 dark:to-blue-600"
          >
            {headersData.brand}
          </Link>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {headersData.navLinks.map((dt, index) => {
            return !dt.isExternal ? (
              <Link
                key={index}
                href={dt.link}
                className="text-2xl font-semibold leading-6 dark:text-gray-50 text-gray-900 hover:underline hover:underline-offset-8 hover:decoration-4"
              >
                {dt.text}
              </Link>
            ) : (
              <a
                key={index}
                href={dt.link}
                target="_blank"
                rel="noreferrer"
                className="text-2xl font-semibold leading-6 dark:text-gray-50 text-gray-900 hover:underline hover:underline-offset-8 hover:decoration-4"
              >
                {dt.text}
              </a>
            );
          })}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <a
            href="https://twitter.com/0x_ai_generated"
            className="w-8 h-8 pr-12"
            target="_blank"
            rel="noreferrer"
          >
            <span aria-hidden="true">
              <TwitterIcon theme={theme!} />
            </span>
          </a>
          <a
            href="https://discord.gg/P5wwzpDF"
            className="w-8 h-8 pr-12"
            target="_blank"
            rel="noreferrer"
          >
            <span aria-hidden="true">
              <DiscordIcon theme={theme!} />
            </span>
          </a>
          <a
            href="https://github.com/ai-generated"
            className="w-8 h-8 pr-12"
            target="_blank"
            rel="noreferrer"
          >
            <span aria-hidden="true">
              <GitHubIcon theme={theme!} />
            </span>
          </a>
          <a href="#" className="w-8 h-8">
            <span aria-hidden="true">
              <div
                onClick={() => {
                  theme === "light" ? setTheme("dark") : setTheme("light");
                }}
              >
                {theme === "dark" ? <SunIcon /> : <MoonIcon />}
              </div>
            </span>
          </a>
        </div>
      </nav>
    </header>
  );
}
