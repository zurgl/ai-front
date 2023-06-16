export type Header = {
  brand: String;
  navLinks: {
    isExternal: Boolean;
    link: string;
    text: String;
  }[];
};
