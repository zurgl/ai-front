"use client";

import { ToastContainer, toast, Theme, Id } from "react-toastify";
import Image, { StaticImageData } from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "next-themes";
import { Banner } from "@/components/index";
import Link from "next/link";

import sentimentPicDark from "@/public/image/sentiment.jpg";
import dialoguePicDark from "@/public/image/dialogue.jpg";
import resumePicDark from "@/public/image/resume.jpg";

type ModelCardDataT = {
  title: String;
  alt: string;
  content: String;
  available: boolean;
  imageSrc: StaticImageData;
  priority: boolean;
  link: string;
};

const modelCardData: ModelCardDataT[] = [
  {
    title: "Summarization",
    alt: "Summarization AI Model",
    content:
      "Don't have the time to read a long and complex article. This model is your perfect match.",
    imageSrc: resumePicDark,
    priority: false,
    available: false,
    link: "/models/summarize",
  },
  {
    title: "Sentiment analysis",
    alt: "Sentiment analysis AI Model",
    content:
      "Want to build a tools to scan the mood of a market. This AI model should fit your needs.",
    imageSrc: sentimentPicDark,
    priority: true,
    available: false,
    link: "/models/sentiment",
  },
  {
    title: "Dialogue Model",
    alt: "Dialogue AI Model",
    content:
      "Feeling bored? Don't know what to do? Let's speak with this AI, and follow his advices.",
    imageSrc: dialoguePicDark,
    priority: false,
    available: true,
    link: "/models/translate",
  },
];

const ModelCard = ({
  data,
  notify,
}: {
  data: ModelCardDataT;
  notify: () => Id;
}) => {
  return (
    <div className="flex-col items-center justify">
      <div className="rounded-xl overflow-hidden shadow-lg shadow-gray-900 dark:shadow-gray-50 bg-cyan-900 dark:bg-yellow-100">
        <Image
          src={data.imageSrc}
          alt={data.alt}
          width={350}
          height={350}
          priority={data.priority}
          placeholder="blur"
        />
        <div className="mx-auto py-2">
          <h3 className="font-bold text-2xl mb-2 text-gray-50 dark:text-black flex justify-center">
            {data.title}
          </h3>
          <article className="text-base text-gray-50 dark:text-black font-medium h-20 w-72 mx-auto text-center">
            {data.content}
          </article>
        </div>
      </div>
      <div className="flex items-center justify-center pt-6 h-28">
        <Link href={data.available ? data.link : "#"}>
          <div className="relative">
            <div
              className="absolute -inset-1 rounded-lg opacity-75 blur
                bg-gradient-to-r from-black via-blue-700 to-lime-900
                dark:bg-gradient-to-r dark:from-rose-400 dark:via-fuchsia-500 dark:to-indigo-500"
            ></div>
            <button
              className="relative rounded-lg bg-black px-7 py-4 text-xl text-yellow-50"
              onClick={data.available ? () => {} : notify}
            >
              Get Started
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default function Card() {
  const { theme } = useTheme();
  const toastTheme = theme === "light" ? "dark" : "colored";

  const notify = () =>
    toast.info("Model not yet available!", {
      position: "bottom-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      pauseOnFocusLoss: false,
      draggable: false,
      progress: undefined,
      theme: toastTheme! as Theme,
    });

  return (
    <div
      className="
        flex grow flex-col
        bg-gradient-radial from-slate-400 to-white
        dark:bg-gradient-radial dark:from-gray-800 dark:to-black overflow-auto"
    >
      <Banner />
      <div className="w-screen h-[calc(100vh_-_240px)] flex justify-end items-center py-20">
        <div className="container mx-auto flex justify-evenly items-center">
          {modelCardData.map((data, index) => {
            return <ModelCard key={index} data={data} notify={notify} />;
          })}
        </div>
      </div>
      <ToastContainer position="bottom-center" className="mb-20" />
    </div>
  );
}
