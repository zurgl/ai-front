/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";

import { fetcher, logger } from "@/lib";
import { useSse, useAuth } from "@/lib";
import { URL_PROCESS_TASK } from "@/lib";
import { CommandType, ModelType, MessageType } from "@/lib";
const ErrorBox = () => {
  return <div>Error Box</div>;
};

const WaitingBox = ({ step }: { step: Step }) => {
  const { tick, steps } = step;
  const pct = Math.floor((tick / steps) * 100);
  return (
    <div>
      <span id="ProgressLabel" className="sr-only ">
        Loading
      </span>

      <span
        role="progressbar"
        aria-labelledby="ProgressLabel"
        aria-valuenow={pct}
        className="block rounded-full bg-black w-64 max-h-4 text-center font-bold text-blue-300"
      >
        <span
          className={`block h-4 rounded-full bg-gray-100 text-center text-[10px]/4`}
          style={{ width: `${pct}%` }}
        ></span>
        {pct}%
      </span>
    </div>
  );
};

type Step = {
  tick: number;
  steps: number;
};

function Content({ userId }: { userId: string }) {
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<Step | null>(null);
  const [waiting, setWaiting] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>(
    "Painting of a baby robot on the jungle",
  );
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [stream] = useSse();

  useEffect(() => {
    if (stream.message_type === MessageType.CommandFailed) {
      setError("CommandFailed");
    }
    if (stream.message_type === MessageType.CommandSucess) {
      setWaiting(true);
    }
    if (stream.message_type === MessageType.SchedulerStep) {
      console.log(stream.value);
      setStep(JSON.parse(stream.value!));
    }
    if (stream.message_type === MessageType.ModelPrediction) {
      logger("DEBUG", "ModelPrediction", stream);
      setImageUrl((_imageUrl) => {
        return `https://cuda.ai-generated.fr:7443/${
          JSON.parse(stream.value!)[0]
        }`;
      });
      setWaiting(false);
    }
  }, [stream]);

  return (
    <div className="py-8 flex grow flex-col justify-start gap-24 items-center overflow-hidden w-screen bg-slate-200 dark:bg-slate-900">
      <div className="flex flex-row justify-center items-center w-10/12 gap-6">
        <textarea
          className="py-2 px-4 h-16 w-8/12 bg-gray-800 text-gray-300 text-2xl font-medium placeholder:italic placeholder:text-zinc-400 rounded-lg"
          placeholder="Enter the text you want to resume ..."
          onChange={(e) => setPrompt(e.target.value)}
          defaultValue={prompt}
        />
        <button
          className="font-bold bg-cyan-700 text-white rounded-xl h-16 w-36"
          onClick={() =>
            fetcher(
              {
                json_input: JSON.stringify({
                  prompt: prompt,
                  seed: 30,
                  height: 784,
                  width: 784,
                }),
                command_type: CommandType.Process,
                model_type: ModelType.Stable,
              },
              URL_PROCESS_TASK,
            )
          }
        >
          Stable
        </button>
      </div>
      <div>
        {imageUrl && <img width={384} height={384} src={imageUrl} alt="new" />}
        {waiting && step ? <WaitingBox step={step} /> : null}
        {error ? <ErrorBox /> : null}
      </div>
    </div>
  );
}

export default function Listen() {
  const [userId] = useAuth();
  return userId ? <Content userId={userId as string} /> : null;
}
