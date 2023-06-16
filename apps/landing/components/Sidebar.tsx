import React from "react";
import { PublicKey } from "@solana/web3.js";
import { ConnectedMethods } from "@/lib";

interface Props {
  publicKey?: PublicKey;
  connectedMethods: any;
  logged: boolean;
}

export const Sidebar = React.memo(function sidebar(props: Props) {
  const { publicKey, connectedMethods, logged } = props;
  const { handleConnect, handleDisconnect } =
    connectedMethods as ConnectedMethods;

  return (
    <div className="m-4 flex flex-col w-1/2 bg-pink-200">
      <div className="flex flex-row h-20 bg-pink-300 gap-2">
        {logged && publicKey ? (
          <>
            <button
              className="bg-teal-700 h-12 w-24 rounded-2xl m-4 text-yellow-50 text-md font-bold hover:bg-teal-950 hover:text-yellow-400"
              onClick={handleDisconnect.onClick}
            >
              {handleDisconnect.name}
            </button>
            <div className="h-12 rounded-2xl mt-7 text-white text-md font-semibold">
              {`Logged as ${publicKey}`}
            </div>
          </>
        ) : (
          <button
            className="bg-teal-700 h-12 w-24 rounded-2xl m-4 text-yellow-50 text-md font-bold hover:bg-teal-950 hover:text-yellow-400"
            onClick={handleConnect.onClick}
          >
            Login
          </button>
        )}
      </div>
      <div className="flex flex-col grow bg-pink-400"> bottom</div>
    </div>
  );
});
