import {
  PublicKey,
  Transaction,
  VersionedTransaction,
  SendOptions,
} from "@solana/web3.js";

type DisplayEncoding = "utf8" | "hex";

interface ConnectOpts {
  onlyIfTrusted: boolean;
}

export interface PhantomProvider {
  publicKey: PublicKey | null;
  isConnected: boolean | null;
  signAndSendTransaction: (
    transaction: Transaction | VersionedTransaction,
    opts?: SendOptions,
  ) => Promise<{ signature: string; publicKey: PublicKey }>;
  signTransaction: (
    transaction: Transaction | VersionedTransaction,
  ) => Promise<Transaction | VersionedTransaction>;
  signAllTransactions: (
    transactions: (Transaction | VersionedTransaction)[],
  ) => Promise<(Transaction | VersionedTransaction)[]>;
  signMessage: (
    message: Uint8Array | string,
    display?: DisplayEncoding,
  ) => Promise<any>;
  connect: (opts?: Partial<ConnectOpts>) => Promise<{ publicKey: PublicKey }>;
  disconnect: () => Promise<void>;
  on: (event: PhantomEvent, handler: (args: any) => void) => void;
  request: (method: PhantomRequestMethod, params: any) => Promise<unknown>;
}

export type Status = "success" | "warning" | "error" | "info";

export type PhantomEvent = "connect" | "disconnect" | "accountChanged";

export type PhantomRequestMethod =
  | "connect"
  | "disconnect"
  | "signAndSendTransaction";

export interface TLog {
  status: Status;
  method?: PhantomRequestMethod | Extract<PhantomEvent, "accountChanged">;
  message: string;
  messageTwo?: string;
}

export type Method = {
  name: string;
  onClick: any;
};

export type ConnectedMethods = {
  signAndSendTransaction: Method;
  handleDisconnect: Method;
  handleConnect: Method;
};

export type SigninMessage = {
  pubkey: string;
  token: string;
  message: string;
};

export type Auth = {
  authenticity_token: string;
};
