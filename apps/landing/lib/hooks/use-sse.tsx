"use client";

import { logger } from "@/lib/logger";
import { url } from "@/lib";
import { Message } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";

const defaultMessage = {
  timestamp: 0,
  message_type: "Health",
  owner: "ROOT",
  task_id: "0",
} as Message;

export function useSse(): [Message] {
  const [message, setMessage] = useState<Message>(defaultMessage);
  const [mounted, setMounted] = useState(false);
  const [sse, setSse] = useState<EventSource | null>(null);

  const seeConnection = useCallback(() => {
    if (!sse) {
      const sse = new EventSource(url.sse, { withCredentials: true });
      logger("DEBUG", "sseReadyStateOnNew", sse.readyState);

      sse.onopen = (openEvent) => {
        logger("DEBUG", "sseOpenEvent", openEvent);
      };

      sse.onmessage = (event) => {
        setMessage((_) => {
          const messageRaw = JSON.parse(event.data);
          const messageKey = Object.keys(messageRaw)[0];
          return messageRaw[messageKey];
        });
      };

      sse.onerror = (eventError) => {
        logger("ERROR", "sseErrorEvent", eventError);
        if (sse) sse.close();
      };

      setSse(sse);
    }
  }, [sse]);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      seeConnection();
    }

    return () => {
      try {
        if (mounted) {
          sse!.close();
          setSse(null);
          logger("DEBUG", "sseHooksCloseEvent", { event: "unMountHooksEvent" });
        }
      } catch (err) {
        console.error("sse is not defined:", JSON.stringify(err, null, 2));
      }
    };
  }, [mounted, seeConnection, sse]);

  return [message];
}
