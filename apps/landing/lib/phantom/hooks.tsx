"use client";

import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  SetStateAction,
  Dispatch,
} from "react";
import { PublicKey, Connection } from "@solana/web3.js";
import {
  ConnectedMethods,
  createTransferTransaction,
  getCsrfToken,
  getProvider,
  pollSignatureStatus,
  prepare,
  signAndSendTransaction,
  SigninMessage,
  TLog,
} from "@/lib";

import { useRouter } from "next/navigation";
import bs58 from "bs58";

export interface PhantomHooksProps {
  publicKey: PublicKey | null;
  connectedMethods: ConnectedMethods;
  logs: TLog[];
  clearLogs: () => void;
  logged: boolean;
  setLogged: Dispatch<SetStateAction<boolean>>;
}

export const usePhantom = (connection: Connection): PhantomHooksProps => {
  const [logs, setLogs] = useState<TLog[]>([]);
  const [logged, setLogged] = useState(false);
  const router = useRouter();
  const provider = getProvider();

  const createLog = useCallback(
    (log: TLog) => {
      return setLogs((logs) => [...logs, log]);
    },
    [setLogs],
  );

  const clearLogs = useCallback(() => {
    setLogs([]);
  }, [setLogs]);

  useEffect(() => {
    if (!provider) return;

    provider.on("connect", (publicKey: PublicKey) => {
      createLog({
        status: "success",
        method: "connect",
        message: `Connected to account ${publicKey.toBase58()}`,
      });
    });

    provider.on("disconnect", () => {
      createLog({
        status: "warning",
        method: "disconnect",
        message: "👋",
      });
    });

    provider.on("accountChanged", (publicKey: PublicKey | null) => {
      if (publicKey) {
        createLog({
          status: "info",
          method: "accountChanged",
          message: `Switched to account ${publicKey.toBase58()}`,
        });
      } else {
        createLog({
          status: "info",
          method: "accountChanged",
          message: "Attempting to switch accounts.",
        });

        provider.connect().catch((error) => {
          createLog({
            status: "error",
            method: "accountChanged",
            message: `Failed to re-connect: ${error.message}`,
          });
        });
      }
    });

    return () => {
      provider.disconnect();
    };
  }, [createLog, provider]);

  /** SignAndSendTransaction */
  const handleSignAndSendTransaction = useCallback(async () => {
    if (!provider) return;

    try {
      const transaction = await createTransferTransaction(
        provider.publicKey!,
        connection,
      );
      createLog({
        status: "info",
        method: "signAndSendTransaction",
        message: `Requesting signature for: ${JSON.stringify(transaction)}`,
      });
      const signature = await signAndSendTransaction(provider, transaction);
      createLog({
        status: "info",
        method: "signAndSendTransaction",
        message: `Signed and submitted transaction ${signature}.`,
      });
      pollSignatureStatus(signature, connection, createLog);
    } catch (error) {
      createLog({
        status: "error",
        method: "signAndSendTransaction",
        message: error.message,
      });
    }
  }, [connection, createLog, provider]);

  /** Connect */
  const handleConnect = useCallback(async () => {
    if (!provider) return;

    try {
      const { publicKey } = await provider.connect();
      const pubkey = publicKey.toBase58();
      const csrf = await getCsrfToken();
      console.log("csrf", csrf);

      const signInMessage = {
        pubkey,
        message: `Sign this message to sign in to the app.`,
        token: csrf,
      } as SigninMessage;

      const data = new TextEncoder().encode(prepare(signInMessage));
      const { signature } = await provider.signMessage(data);
      const serializedSignature = bs58.encode(signature);

      const body = JSON.stringify({
        signature: serializedSignature,
        pubkey: pubkey,
        message: `Sign this message to sign in to the app.`,
        token: csrf,
      });
      console.log(JSON.stringify(body, null, 2));

      const response = await fetch("https://127.0.0.1:7443/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          signature: serializedSignature,
          pubkey: pubkey,
          message: `Sign this message to sign in to the app.`,
          token: csrf,
        }),
      });

      const status = await response.json();
      createLog({
        status: "success",
        method: "connect",
        message: `successfully connected: ${status}`,
      });
      setLogged(true);
      router.push("/solana/profile");
    } catch (error) {
      createLog({
        status: "error",
        method: "connect",
        message: error.message,
      });
    }
  }, [createLog, provider, router]);

  /** Disconnect */
  const handleDisconnect = useCallback(async () => {
    if (!provider) return;

    try {
      await provider.disconnect();
      const response = await fetch("https://127.0.0.1:7443/api/logout", {
        method: "GET",
        credentials: "include",
      });
      createLog({
        status: "success",
        method: "disconnect",
        message: "successfully disconnected",
      });
      setLogged(false);
      router.push("/solana/");
    } catch (error) {
      createLog({
        status: "error",
        method: "disconnect",
        message: error.message,
      });
    }
  }, [createLog, provider, router]);

  const connectedMethods = useMemo(() => {
    return {
      signAndSendTransaction: {
        name: "Sign and Send",
        onClick: handleSignAndSendTransaction,
      },
      handleDisconnect: {
        name: "Logout",
        onClick: handleDisconnect,
      },
      handleConnect: {
        name: "Login",
        onClick: handleConnect,
      },
    };
  }, [handleSignAndSendTransaction, handleDisconnect, handleConnect]);

  return {
    publicKey: provider?.publicKey || null,
    connectedMethods,
    logs,
    clearLogs,
    logged,
    setLogged,
  };
};
