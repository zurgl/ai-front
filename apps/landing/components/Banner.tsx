"use state";

import { useState } from "react";
import { useTheme } from "next-themes";

export function Banner() {
  const [isVisible, setIsVisible] = useState(true);
  const { theme } = useTheme();

  return isVisible ? (
    <div className="relative isolate flex items-center gap-x-6 bg-cyan-700 dark:bg-yellow-200 py-2.5 sm:px-3.5 sm:before:flex-1">
      <div className="flex flex-wrap items-center gap-y-2 gap-x-12">
        <p className="text-xl leading-6 text-gray-50 dark:text-gray-900 font-semibold">
          <strong className="font-bold">Stable Diffusion</strong>
          <svg
            viewBox="0 0 2 2"
            className="mx-2 inline h-0.5 w-0.5 fill-current"
            aria-hidden="true"
          >
            <circle cx="1" cy="1" r="1" />
          </svg>
          Coming soon ...
        </p>
        <a
          href="mailto:ai-generated.dev@proton.me"
          className="flex-none rounded-full dark:bg-black bg-white py-1 px-4 text-sm font-semibold dark:text-white text-black shadow-sm hover:bg-gray-700 "
        >
          Email me
        </a>
      </div>
      <div className="flex flex-1 justify-end">
        <button
          type="button"
          className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
          onClick={() => isVisible && setIsVisible(false)}
        >
          <span className="sr-only">Dismiss</span>
          <svg
            className="h-5 w-5 text-gray-50 dark:text-gray-900"
            viewBox="0 0 20 20"
            fill={theme === "light" ? "#fff" : "#000"}
            aria-hidden="true"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div>
    </div>
  ) : null;
}
