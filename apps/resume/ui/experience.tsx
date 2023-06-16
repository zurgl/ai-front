import { ArrowUp } from "@/icons";
import { experiencesAtom } from "@/store";
import { useAtom } from "jotai";

export default function Experiences() {
  const [experiences] = useAtom(experiencesAtom);

  return (
    <ol className="group/list">
      {experiences.map((xp: any, index: any) => {
        return (
          <li className="mb-12" key={index}>
            <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
              <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-secondary-800 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
              <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-primary-500 sm:col-span-2">
                {xp.period}
              </header>
              <div className="z-10 sm:col-span-6">
                <h3 className="font-medium leading-snug text-primary-200">
                  <div>
                    <a
                      className="inline-flex items-baseline font-medium leading-tight text-primary-200 hover:text-secondary-300 focus-visible:text-secondary-300 undefined group/link text-base"
                      href="https://upstatement.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                      <span>
                        <span className="inline-block">{xp.compagny}</span>
                        <ArrowUp />
                      </span>
                    </a>
                  </div>
                  <div>
                    <div className="text-primary-500">{xp.position}</div>
                  </div>
                </h3>
                <p className="mt-2 text-sm leading-normal">{xp.description}</p>
                <ul className="mt-2 flex flex-wrap">
                  {xp.tags.map((tag: any, index: any) => {
                    return (
                      <li className="mr-1.5 mt-2" key={index}>
                        <div className="flex items-center rounded-full bg-secondary-400 px-3 py-1 text-xs font-medium leading-5 text-secondary-300">
                          {tag}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
