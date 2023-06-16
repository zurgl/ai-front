import { atom } from "jotai";
import { Lang, Content, SocialNetwork, Theme } from "./types";
import { parse } from "@/lib";

export const langAtom = atom<Lang>("en");

// const defaultTheme: boolean = localStorage.dark
//   ? JSON.parse(localStorage.dark)
//   : window.matchMedia &&
//     window.matchMedia("(prefers-color-scheme: dark)").matches;

export const themeAtom = atom<Theme>("light");

export type scrolldtT = {
  aboutHeight: number;
  experienceHeight: number;
  selectedIndex: number;
} | null;

export const scrollAtom = atom<scrolldtT>(null);

export const paragraphsAtom = atom((get) => {
  const lang = get(langAtom);
  const data = get(contentAtom)[lang];
  return parse(data.about);
});

export const experiencesAtom = atom((get) => {
  const lang = get(langAtom);
  const data = get(contentAtom)[lang];
  return data.experiences;
});

export const aboutAtom = atom((get) => {
  const lang = get(langAtom);
  const data = get(contentAtom)[lang];
  return data.about;
});

export const introductionAtom = atom((get) => {
  const lang = get(langAtom);
  const data = get(contentAtom)[lang];
  return data.introduction;
});

export const resumeAtom = atom((get) => {
  const lang = get(langAtom);
  const data = get(contentAtom)[lang];
  return data.resume;
});

export const footerAtom = atom((get) => {
  const lang = get(langAtom);
  const data = get(contentAtom)[lang];
  return parse(data.footer);
});

export const navigationAtom = atom((get) => {
  const lang = get(langAtom);
  const data = get(contentAtom)[lang];
  return data.navigation;
});

export const socialNetworkAtom = atom<SocialNetwork[]>([
  {
    link: "https://github.com/zurgl",
    text: "GitHub",
  },
  {
    link: "https://instagram.com/zurgl",
    text: "Instagram",
  },
  {
    link: "https://twitter.com/zurgl",
    text: "Twitter",
  },
  {
    link: "https://twitter.com/zurgl",
    text: "LinkedIn",
  },
]);

export const contentAtom = atom<Content>({
  en: {
    introduction: {
      fullName: "Brittany Chiang",
      position: "Lead Engineer at Upstatement",
      shortDescription:
        "I build accessible, inclusive products and digital experiences for the web.",
    },
    navigation: [
      { text: "About", tag: "#introduction" },
      { text: "Experience", tag: "#experience" },
      { text: "Projects", tag: "#projects" },
    ],
    about: `
Back in 2012, I decided to try my hand at creating custom Tumblr themes and tumbled head first into the rabbit hole of coding and web
development. Fast-forward to today, and I've had the privilege of building software for an [https://us.mullenlowe.com/](advertising agency), a 
[https://starry.com/](start-up), a [https://scout.camd.northeastern.edu/](student-led design studio), and a [https://www.apple.com/apple-music/](huge corporation). @My main focus these days is building products and leading projects for our clients at [https://upstatement.com/](Upstatement). In my free time I've also released an [online video course](Upstatement) that covers everything you need to know to build a web app with the Spotify API. @When I'm not at the computer, I'm usually rock climbing, hanging out with my wife and two cats, or running around Hyrule searching for Korok seeds.
      `,
    experiences: [
      {
        period: "2018 — Present",
        compagny: "Upstatement",
        position: "Senior Engineer",
        description: `Deliver high-quality, robust production code for a diverse array of
          projects for clients including Harvard Business School, Everytown for
          Gun Safety, Pratt Institute, Koala Health, Vanderbilt University, The
          19th News, and more. Provide leadership within engineering department
          through close collaboration, knowledge shares, and mentorship.`,
        tags: [
          "React",
          "React Native",
          "SCSS",
          "WordPress",
          "JavaScript",
          "TypeScript",
          "PHP",
        ],
      },
      {
        period: "July — Dec 2017",
        compagny: "Apple",
        position: "UI Engineer",
        description: `Developed and styled interactive web apps for Apple Music, including
          the UI of Apple Music's embeddable web player widget for in-browser
          user authorization and full song playback.`,
        tags: ["Ember", "SCSS", "JavaScript", "MusicKit.js"],
      },
    ],
    resume: {
      span1: "View Full",
      span2: "Résumé",
    },
    footer: `
Loosely designed in [https://www.figma.com/](Figma), and coded in 
[https://code.visualstudio.com/](Visual Studio Code), by yours truly. Built with 
[https://nextjs.org/](Next.js), and [https://tailwindcss.com/](Tailwind CSS), deployed with
[https://vercel.com/](Vercel). All text is set in the [https://rsms.me/inter/](Inter) typeface.
      `,
  },
  fr: {
    introduction: {
      fullName: "Brittany Chiang",
      position: "Ingénieur Principal chez Upstatement",
      shortDescription:
        "Je développe des produits et des expériences numériques accessibles et inclusives pour le web.",
    },
    navigation: [
      { text: "À propos", tag: "#introduction" },
      { text: "Expérience", tag: "#experience" },
      { text: "Projets", tag: "#projects" },
    ],
    about: `
    En 2012, j'ai décidé de me lancer dans la création de thèmes personnalisés pour Tumblr, plongeant tête la première dans le terrier du codage et du développement web. Aujourd'hui, j'ai eu le privilège de développer des logiciels pour une [https://us.mullenlowe.com/](agence de publicité), une [https://starry.com/](start-up), un studio de design [https://scout.camd.northeastern.edu/](dirigé par des étudiants) et une [https://www.apple.com/apple-music/](grande entreprise). @Mon principal objectif ces jours-ci est de concevoir des produits et de diriger des projets pour nos clients chez [https://upstatement.com/](Up Statement). Pendant mon temps libre, j'ai également publié un [cours vidéo en ligne](cours vidéo en ligne) qui couvre tout ce que vous devez savoir pour créer une application web avec l'API Spotify. @Quand je ne suis pas devant l'ordinateur, je fais généralement de l'escalade, je passe du temps avec ma femme et mes deux chats, ou je cours à travers Hyrule à la recherche de graines de Korok.
      `,
    experiences: [
      {
        period: "2018 — Présent",
        compagny: "Upstatement",
        position: "Ingénieur Senior",
        description: `Développer du code de production robuste et de haute qualité pour une variété de projets clients, notamment Harvard Business School, Everytown for Gun Safety, Pratt Institute, Koala Health, Vanderbilt University, The 19th News, et plus encore. Fournir un leadership au sein du département de génie logiciel grâce à une collaboration étroite, des partages de connaissances et du mentorat.`,
        tags: [
          "React",
          "React Native",
          "SCSS",
          "WordPress",
          "JavaScript",
          "TypeScript",
          "PHP",
        ],
      },
      {
        period: "Juillet — Déc. 2017",
        compagny: "Apple",
        position: "Ingénieur UI",
        description: `Développement et stylisation d'applications web interactives pour Apple Music, y compris l'interface utilisateur du widget lecteur web intégrable d'Apple Music pour l'autorisation des utilisateurs en ligne et la lecture complète de chansons.`,
        tags: ["Ember", "SCSS", "JavaScript", "MusicKit.js"],
      },
    ],
    resume: {
      span1: "Voir le",
      span2: "CV complet",
    },
    footer: `
    Conçu de manière souple avec [https://www.figma.com/](Figma) et codé avec [https://code.visualstudio.com/](Visual Studio Code) par votre humble serviteur. Réalisé avec [https://nextjs.org/](Next.js) et [https://tailwindcss.com/](Tailwind CSS), déployé avec [https://vercel.com/](Vercel). Tout le texte est écrit avec la police de caractères [https://rsms.me/inter/](Inter) typeface.
    `,
  },
});
