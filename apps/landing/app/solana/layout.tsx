"use client";

import { Logs } from "@/components";
import { useMounted, usePhantom } from "@/lib";
import { clusterApiUrl, Connection } from "@solana/web3.js";
import { useMemo, useState } from "react";

const Authentification = ({
  connection,
  setLogIsVisible,
  logIsVisible,
}: {
  connection: Connection;
  setLogIsVisible: any;
  logIsVisible: boolean;
}) => {
  const { publicKey, connectedMethods, logged } = usePhantom(connection);
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row h-20 bg-pink-300 gap-2 min-w-fit">
        {logged && publicKey ? (
          <>
            <button
              className="bg-teal-700 h-12 w-24 rounded-2xl m-4 text-yellow-50 text-md font-bold hover:bg-teal-950 hover:text-yellow-400"
              onClick={connectedMethods.handleDisconnect.onClick}
            >
              {connectedMethods.handleDisconnect.name}
            </button>
            <div className="h-12 rounded-2xl mt-7 text-white text-md font-semibold">
              {`Logged as ${publicKey}`}
            </div>
          </>
        ) : (
          <button
            className="bg-teal-700 h-12 w-24 rounded-2xl m-4 text-yellow-50 text-md font-bold hover:bg-teal-950 hover:text-yellow-400"
            onClick={connectedMethods.handleConnect.onClick}
          >
            Login
          </button>
        )}
      </div>
      <button
        className="bg-teal-700 h-12 w-24 rounded-2xl m-4 text-yellow-50 text-md font-bold hover:bg-teal-950 hover:text-yellow-400"
        onClick={() => setLogIsVisible(!logIsVisible)}
      >
        Logs
      </button>
    </div>
  );
};

const Logger = ({ connection }: { connection: Connection }) => {
  const { publicKey, logs, clearLogs } = usePhantom(connection);
  return <Logs publicKey={publicKey} logs={logs} clearLogs={clearLogs} />;
};

export default function SolanaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMounted = useMounted();
  const endpoint = clusterApiUrl("devnet");
  const [logIsVisible, setLogIsVisible] = useState(true);
  const connection = useMemo(
    () => new Connection(endpoint, { commitment: "confirmed" }),
    [endpoint],
  );

  return isMounted ? (
    <div className="flex flex-row justify-evenly grow h-screen">
      <div className="m-4 flex flex-col w-2/3 bg-pink-200">
        <Authentification
          connection={connection}
          setLogIsVisible={setLogIsVisible}
          logIsVisible={logIsVisible}
        />
        <div className="flex flex-col grow bg-pink-400"> {children}</div>
      </div>
      {logIsVisible && <Logger connection={connection} />}
    </div>
  ) : null;
}
