import React from "react";
import { PublicKey } from "@solana/web3.js";
import { TLog } from "@/lib/phantom/types";

const Log = React.memo(function MainComponent(props: TLog) {
  const { method, status, messageTwo, message } = props;

  return (
    <div className="flex flex-col justify-center leading-normal  text-white">
      <div className="flex flex-row items-center">
        <span className="mr-1 text-white">
          {">"} {status}
        </span>
        {method && <div className="text-purple-500 mr-2">[{method}]</div>}
      </div>
      <div className="break-words">{message}</div>
      {messageTwo && <div className="break-words">{messageTwo}</div>}
    </div>
  );
});

interface Props {
  publicKey: PublicKey | null;
  logs: TLog[];
  clearLogs: () => void;
}

export const Logs = React.memo(function Main(props: Props) {
  const { publicKey, logs, clearLogs } = props;

  return (
    <div className="relative p-5 bg-black overflow-auto w-1/3 mr-4 my-4">
      <div className="text-black text-xl font-semibold p-2 rounded-xl bg-gray-200 absolute top-2 right-2 max-w-md">
        <button onClick={clearLogs}>Clear</button>
      </div>
      {logs.length > 0 ? (
        <>
          {logs.map((log, i) => (
            <Log key={`${log.status}-${log.method}-${i}`} {...log} />
          ))}
        </>
      ) : (
        <div className="flex flex-row items-center">
          <span>{">"}</span>
          <div className="text-gray-400">
            {publicKey ? (
              // connected
              <>
                Click a button and watch magic happen...{" "}
                <span role="img" aria-label="Sparkles Emoji" className="mr-2">
                  ✨
                </span>
              </>
            ) : (
              // not connected
              <>
                Welcome to the Phantom sandbox. <br /> Connect to your Phantom
                wallet and play around...{" "}
                <span role="img" aria-label="Ghost Emoji" className="mr-2">
                  👻
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
});
