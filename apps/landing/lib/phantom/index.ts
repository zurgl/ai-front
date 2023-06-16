import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { PhantomProvider, SigninMessage, Auth } from "./types";

export * from "@/lib/phantom/signAndSend";

export const getProvider = (): PhantomProvider | undefined => {
  if ("phantom" in window) {
    const anyWindow: any = window;
    const provider = anyWindow.phantom?.solana;

    if (provider?.isPhantom) {
      return provider;
    }
  }

  window.open("https://phantom.app/", "_blank");
};

export const createTransferTransaction = async (
  publicKey: PublicKey,
  connection: Connection,
): Promise<Transaction> => {
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: publicKey,
      toPubkey: publicKey,
      lamports: 100,
    }),
  );
  transaction.feePayer = publicKey;

  const anyTransaction: any = transaction;
  anyTransaction.recentBlockhash = (
    await connection.getLatestBlockhash()
  ).blockhash;

  return transaction;
};

export function prepare(msg: SigninMessage) {
  return `${msg.message}${msg.token}`;
}

export async function getCsrfToken() {
  try {
    const response = await fetch("https://127.0.0.1:7443/", {
      method: "GET",
      credentials: "include",
    });

    const auth: Auth = await response.json();
    return auth.authenticity_token;
  } catch (error) {
    throw `Cannot get csrf`;
  }
}
