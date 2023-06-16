"use client";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const isEmail = (email: string) =>
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

const toastDefault = {
  position: "bottom-center",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: true,
  pauseOnFocusLoss: false,
  progress: undefined,
  theme: "dark",
} as any;

export default function NewsLetter() {
  const [userEmail, setUserEmail] = useState<string>("");

  const _subscribe = async () => {
    try {
      if (!isEmail(userEmail!)) {
        throw new Error(`Invalid email format`);
      }

      const response = await fetch(`/api/send-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail: userEmail }),
      });

      if (!response.ok) {
        const message = await response.json();
        throw new Error(`Internal Server Error 500: ${message.error}`);
      }

      toast.success(`Succefully suscribed!`, toastDefault);
    } catch (error) {
      toast.error(`${error}`, toastDefault);
    }
  };

  const notify = () =>
    toast.info("Subscription not yet open!", {
      position: "bottom-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      pauseOnFocusLoss: false,
      progress: undefined,
      theme: "dark",
    });

  return (
    <div className="bg-slate-200 dark:bg-slate-900 flex grow justify-center items-center overflow-hidden">
      <div className="relative isolate px-6">
        <div className="absolute -top-64 -z-10 transform-gpu blur-3xl opacity-80">
          <svg
            className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
          >
            <path
              fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#00f" />
                <stop offset="1" stopColor="#f00" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="mx-auto max-w-2xl pb-2">
          <div className="text-center flex-col justify-center items-center -mt-8">
            <h1 className="text-6xl bg-clip-text text-transparent font-bold tracking-tight text-gray-900 pb-8 bg-gradient-to-r from-black via-blue-700 to-lime-900 dark:bg-gradient-to-r dark:from-purple-600 dark:via-pink-600 dark:to-blue-600">
              Subscribe
            </h1>
            <article className="mt-6 text-2xl leading-8 text-gray-800 dark:text-white font-semibold">
              Don&apos;t miss the lastest news from{" "}
              <span className="text-cyan-800 dark:text-pink-400">
                AI Generated
              </span>{" "}
              and subscribe to the newsletter. Once a week content will be send
              to your mailbox.
            </article>
            <div className="mt-10 flex flex-row justify-around">
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={(e) => {
                  e.preventDefault;
                  setUserEmail(e.target.value);
                }}
                className="min-w-0 w-2/3 rounded-full border-0 px-3.5 py-2 text-white font-extrabold shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset text-center focus:ring-cyan-700 dark:focus:ring-pink-900 bg-gray-800 h-16"
                placeholder="Enter your email"
              />
              <div className="relative">
                <div
                  className="absolute -inset-1 rounded-full opacity-80 blur
                bg-gradient-to-r from-black via-blue-700 to-lime-900
                dark:bg-gradient-to-r dark:from-rose-400 dark:via-fuchsia-500 dark:to-indigo-500"
                ></div>
                <button
                  className="relative rounded-full bg-black px-7 py-4 text-xl text-yellow-50"
                  onClick={notify}
                >
                  Validate
                </button>
              </div>
              <ToastContainer className="mb-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
