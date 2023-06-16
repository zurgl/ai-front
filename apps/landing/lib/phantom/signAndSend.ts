import { Connection, Transaction, VersionedTransaction } from "@solana/web3.js";
import { PhantomProvider, TLog } from "./types";

const POLLING_INTERVAL = 1000; // one second
const MAX_POLLS = 30;

export async function signAndSendTransaction(
  provider: PhantomProvider,
  transaction: Transaction | VersionedTransaction,
): Promise<string> {
  try {
    const { signature } = await provider.signAndSendTransaction(transaction, {
      skipPreflight: false,
    });
    return signature;
  } catch (error) {
    console.warn(error);
    throw new Error(error.message);
  }
}

export const pollSignatureStatus = async (
  signature: string,
  connection: Connection,
  createLog: (log: TLog) => void,
): Promise<void> => {
  let count = 0;

  const interval = setInterval(async () => {
    // Failed to confirm transaction in time
    if (count === MAX_POLLS) {
      clearInterval(interval);
      createLog({
        status: "error",
        method: "signAndSendTransaction",
        message: `Transaction: ${signature}`,
        messageTwo: `Failed to confirm transaction within ${MAX_POLLS} seconds. The transaction may or may not have succeeded.`,
      });
      return;
    }

    const { value } = await connection.getSignatureStatus(signature);
    const confirmationStatus = value?.confirmationStatus;

    if (confirmationStatus) {
      const hasReachedSufficientCommitment =
        confirmationStatus === "confirmed" ||
        confirmationStatus === "finalized";

      createLog({
        status: hasReachedSufficientCommitment ? "success" : "info",
        method: "signAndSendTransaction",
        message: `Transaction: ${signature}`,
        messageTwo: `Status: ${
          confirmationStatus.charAt(0).toUpperCase() +
          confirmationStatus.slice(1)
        }`,
      });

      if (hasReachedSufficientCommitment) {
        clearInterval(interval);
        return;
      }
    } else {
      createLog({
        status: "info",
        method: "signAndSendTransaction",
        message: `Transaction: ${signature}`,
        messageTwo: "Status: Waiting on confirmation...",
      });
    }

    count++;
  }, POLLING_INTERVAL);
};
