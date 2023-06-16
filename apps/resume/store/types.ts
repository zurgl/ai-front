export type Lang = "fr" | "en";

export type Theme = "light" | "dark";

export type Introduction = {
  fullName: string;
  position: string;
  shortDescription: string;
};

export type Navigation = { text: string; tag: string };

export type SocialNetwork = {
  link: string;
  text: string;
};

export type Experience = {
  period: string;
  compagny: string;
  position: string;
  description: string;
  tags: string[];
};

export type Resume = {
  span1: string;
  span2: string;
};

export type Data = {
  introduction: Introduction;
  navigation: Navigation[];
  about: string;
  experiences: Experience[];
  resume: Resume;
  footer: string;
};

export type Content = {
  [key in Lang]: Data;
};
