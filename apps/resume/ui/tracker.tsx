import { useMousePosition, useWindowPosition } from "@/lib/";
import { themeAtom } from "@/store";
import { useAtom } from "jotai";

export default function Tracker() {
  const mousePosition = useMousePosition();
  const scrollPosition = useWindowPosition();
  const [theme] = useAtom(themeAtom);

  return theme === "light" ? (
    <div className="cointainer light-container pointer-events-none fixed -inset-px z-30 transition duration-300 lg:absolute">
      <style jsx>{`
        .cointainer {
          background: radial-gradient(
            600px at ${mousePosition.x}px ${mousePosition.y! + scrollPosition}px,
            rgba(29, 78, 216, 0.15),
            transparent 80%
          );
        }
      `}</style>
    </div>
  ) : (
    <div className="cointainer light-container pointer-events-none fixed -inset-px z-30 transition duration-300 lg:absolute">
      <style jsx>{`
        .cointainer {
          background: radial-gradient(
            600px at ${mousePosition.x}px ${mousePosition.y! + scrollPosition}px,
            rgba(171, 137, 102, 0.3),
            transparent 80%
          );
        }
      `}</style>
    </div>
  );
}
