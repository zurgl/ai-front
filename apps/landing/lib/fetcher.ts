import { logger } from "./logger";
import { Auth, CommandType, Cookie, ModelType } from "./types";

export type TranslationInput = {
  sentence: string;
  source: string;
  traget: string;
};

export type ProcessModel = {
  command_type: CommandType;
  model_type: ModelType;
  json_input: string;
  task_id?: string;
  owner?: string;
};

type PostData = ProcessModel;

const options = (data: PostData): RequestInit => {
  return {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
};

export const fetcher = async (data: PostData, url: string) => {
  try {
    console.log(options(data));
    const response = await fetch(url, options(data));

    if (!response.ok) {
      throw new Error(
        `An error has occured: ${response.status} - ${response.statusText}`,
      );
    }
  } catch (error) {
    logger("ERROR", "fetcher", (error as Error).message);
  }
};

export const swrFetch = {
  auth: async function fetcher(url: string) {
    try {
      const response = await fetch(url, {
        method: "POST",
        credentials: "include",
      });

      const auth: Auth = await response.json();
      return { auth };
    } catch (error) {
      throw `Cannot post auth`;
    }
  },
  csrf: async function fetcher(url: string) {
    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      const auth: Auth = await response.json();
      return { auth };
    } catch (error) {
      throw `Cannot get auth`;
    }
  },
  cookie: async function fetcher(url: string) {
    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });

      const cookie: Cookie = await response.json();
      return { cookie };
    } catch (error) {
      throw `Cannot fetch cookie`;
    }
  },
};
