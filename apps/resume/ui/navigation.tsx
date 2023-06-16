import { useAtom } from "jotai";
import { navigationAtom } from "@/store";

export default function Navigation({
  selectedIndex,
}: {
  selectedIndex: number;
}) {
  const [navigation] = useAtom(navigationAtom);

  navigation;
  return (
    <nav className="nav hidden lg:block">
      <ul className="mt-16 w-max">
        {navigation.map((link: any, index: any) => {
          const isActive = selectedIndex === index;
          return (
            <li key={index}>
              <a
                className={`group flex items-center py-3 ${
                  isActive ? "active" : ""
                }`}
                href={link.tag}
              >
                <span
                  className={`
                    nav-indicator mr-4 h-px w-8 bg-primary-200 
                    transition-all motion-reduce:transition-none
                    group-hover:w-16 group-hover:bg-primary-200
                    group-focus-visible:w-16 group-focus-visible:bg-primary-400
                  `}
                ></span>
                <span
                  className={`
                  nav-text text-xs font-bold uppercase tracking-widest text-primary-500 
                  group-hover:text-primary-200
                  group-focus-visible:text-primary-200
                `}
                >
                  {link.text}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
