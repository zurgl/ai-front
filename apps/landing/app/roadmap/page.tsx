"use client";

type StepBox = {
  info: string;
  status: boolean;
};

type ContentBox = {
  deadline: string;
  milestone: string;
  is_left: boolean;
  step: StepBox[];
  innerStyle: string;
};

const content = [
  {
    deadline: "First Quarter of 2023",
    milestone: "Rise of an Ambition",
    step: [
      {
        info: "Release of the documentation",
        status: true,
      },
      {
        info: "Release of the first models",
        status: true,
      },
      {
        info: "Release of the website",
        status: true,
      },
    ],
    is_left: true,
    innerStyle: "top-[0rem]",
  },
  {
    deadline: "Second Quarter of 2023",
    milestone: "Web 3 Integration Layer",
    step: [
      { info: "Solana integration on devnet", status: true },
      { info: "Release of Stable diffusion", status: false },
      { info: "Setup Authentification", status: false },
    ],
    is_left: false,
    innerStyle: "top-[11rem]",
  },
  {
    deadline: "Third Quarter of 2023",
    milestone: "Support to multiple target",
    step: [
      { info: "Aptos and Sui Integration on devnet", status: false },
      { info: "Stable version of Stable diffusion", status: false },
      { info: "Support mobile device", status: false },
    ],
    is_left: true,
    innerStyle: "top-[22rem]",
  },
  {
    deadline: "Last Quarter of 2023",
    milestone: "Release in production",
    step: [
      { info: "Setup Continous Integration pipeline", status: false },
      { info: "Audit of Smart Contract", status: false },
      { info: "Going open source", status: false },
    ],
    is_left: false,
    innerStyle: "top-[33rem]",
  },
];

const Card = ({ contentBox }: { contentBox: ContentBox }) => {
  const { is_left, innerStyle, deadline, milestone, step } = contentBox;
  return (
    <div
      className={`absolute ${
        is_left ? "left-0" : "right-0"
      } h-40 w-1/3 rounded-2xl ${innerStyle} max-w-2xl`}
    >
      <div
        className="bg-gradient-to-r from-black via-blue-700 to-lime-900 p-1 rounded-md
    dark:bg-gradient-to-r dark:from-rose-400 dark:via-fuchsia-500 dark:to-indigo-500"
      >
        <div className="flex flex-col justify-center items-center bg-slate-300 dark:bg-gray-900 p-2 rounded-md">
          <h2
            className={`${
              is_left
                ? "w-full text-left font-bold"
                : "w-full text-right font-bold"
            }`}
          >
            {deadline}
          </h2>
          <h3
            className={`${
              is_left
                ? "w-full font-semibold text-right pb-1 underline underline-offset-1"
                : "w-full font-semibold text-left pb-1 underline underline-offset-1"
            }`}
          >
            {milestone}
          </h3>
          <div className="py-1">
            <ul className="w-full font-normal">
              {step.map((data: StepBox, index: number) => {
                return (
                  <li key={index} className="flex items-center my-2">
                    <svg
                      className={`h-6 w-6 flex-none  ${
                        data.status
                          ? "stroke-green-600 fill-green-200"
                          : "stroke-sky-600 fill-sky-200"
                      } stroke-2`}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="11" />
                      <path
                        d="m8 13 2.165 2.165a1 1 0 0 0 1.521-.126L16 9"
                        fill="none"
                      />
                    </svg>
                    <p className="ml-4">{data.info}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Roadmap() {
  return (
    <div
      className="
        dark:bg-plant-dark bg-plant bg-center bg-no-repeat bg-contain
        flex grow flex-col justify-center items-center overflow-hidden w-screen
         bg-slate-200 dark:bg-slate-900
      "
    >
      <div className="relative w-9/12 h-5/6">
        {content.map((contentBox: ContentBox, index: number) => {
          return <Card contentBox={contentBox} key={index} />;
        })}
      </div>
    </div>
  );
}
