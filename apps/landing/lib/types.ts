export type Message = {
  owner: string;
  message_type: MessageType;
  timestamp?: number;
  command_type?: CommandType;
  task_id?: string;
  error?: string;
  value?: string;
};

export type Cookie = {
  create_new_session_cookie: Boolean;
  session_cookie_name: String;
  user_id: String;
};

export const enum ModelType {
  Sentiment = "Sentiment",
  Summarize = "Summarize",
  Translation = "Translation",
  Stable = "Stable",
}

export const enum CommandType {
  Process = "Process",
}

export const enum MessageType {
  Health = "Health",
  CommandSucess = "CommandSucess",
  CommandFailed = "CommandFailed",
  ModelKilled = "ModelKilled",
  ModelStarted = "ModelStarted",
  ModelLoaded = "ModelLoaded",
  ModelPrediction = "ModelPrediction",
  ModelError = "ModelError",
  SchedulerStep = "SchedulerStep",
}
