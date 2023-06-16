import { useState, useRef, useEffect, RefObject } from "react";
import { useWindowPosition } from "./use-window-position";

export function useSectionRef(): {
  selectedIndex: number;
  experienceRef: RefObject<HTMLDivElement>;
  aboutRef: RefObject<HTMLOListElement>;
} {
  const aboutRef = useRef<HTMLOListElement>(null);
  const [aboutHeight, setAboutHeight] = useState(0);

  const experienceRef = useRef<HTMLDivElement>(null);
  const [experienceHeight, setExperienceHeight] = useState(0);

  const scrollPosition = useWindowPosition();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (aboutRef.current !== null) {
      setAboutHeight(aboutRef.current.clientHeight);
    }
    if (experienceRef.current !== null) {
      setExperienceHeight(experienceRef.current.clientHeight);
    }
  }, [aboutRef, experienceRef]);

  useEffect(() => {
    if (scrollPosition < aboutHeight) {
      setSelectedIndex(0);
    } else if (scrollPosition < experienceHeight) {
      setSelectedIndex(1);
    } else {
      setSelectedIndex(2);
    }
  }, [scrollPosition, aboutHeight, experienceHeight]);

  return { selectedIndex, experienceRef, aboutRef };
}
