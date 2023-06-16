"use client";

import { FlagFr, FlagEn } from "@/icons";
import { useAtom } from "jotai";
import { langAtom, themeAtom } from "@/store";
import ThemeToggle from "./theme-toggle";
import { MutableRefObject, useEffect, useRef, useState } from "react";

function useHover<T>(): [MutableRefObject<T>, boolean] {
  const [value, setValue] = useState<boolean>(false);
  const ref: any = useRef<T | null>(null);
  const handleMouseOver = (): void => setValue(true);
  const handleMouseOut = (): void => setValue(false);
  useEffect(() => {
    const node: any = ref.current;
    if (node) {
      node.addEventListener("mouseover", handleMouseOver);
      node.addEventListener("mouseout", handleMouseOut);
      return () => {
        node.removeEventListener("mouseover", handleMouseOver);
        node.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, []);
  return [ref, value];
}

function DropDown() {
  const [lang, setLang] = useAtom(langAtom);
  const [theme] = useAtom(themeAtom);
  const [hoverRef, isHovered] = useHover<HTMLDivElement>();

  return (
    <div ref={hoverRef}>
      <button
        className={`
          primary-200 focus:primary-400
          font-semibold text-md px-2 py-1 text-center 
          inline-flex items-center bg-primary-900
        `}
        type="button"
        onClick={() => {
          console.log(lang);
          lang === "en" ? setLang("fr") : setLang("en");
        }}
      >
        <div className="flex">
          <span>{lang.toUpperCase()}</span>
          <svg
            className="w-6 h-6 ml-1"
            aria-hidden="true"
            fill="none"
            stroke={theme === "light" ? "#E2E8F0" : "#4e2a03"}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </div>
      </button>
      <div
        id="dropdown"
        className={`
          ${isHovered ? "" : "hidden"}
          focus:visible focus-visible:visible hover:visible
          z-10 rounded-md shadow-md w-12 bg-primary-900
        `}
      >
        <ul className="py-2 text-sm">
          <li>
            <div className="block px-4 py-2">
              {lang === "fr" ? <FlagEn /> : <FlagFr />}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function FlagToggle() {
  return (
    <div className="fixed flex justify-end -mx-4 my-4 w-screen lg:justify-start lg:w-fit lg:m-4 gap-4">
      <div className={`h-8 w-8 flex justify-end items-center border-1`}>
        <ThemeToggle />
      </div>
      <div>
        <DropDown />
      </div>
    </div>
  );
}
