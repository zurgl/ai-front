export type Anchor = {
  scheme: string;
  name: string;
};

export type Chunk = {
  text: string;
  anchor?: Anchor;
};

export type Sentence = Chunk[];

export const parse = (text: string): Sentence[] => {
  if (text.length === 0) {
    return [];
  }
  const trimed = text.trim();
  const startIndex = trimed.indexOf("@");
  if (startIndex === -1) {
    return [parseParagraph(text)];
  }
  const paragraph = trimed.substring(0, startIndex);
  const remain = trimed.substring(startIndex + 1);

  return [parseParagraph(paragraph), ...parse(remain)];
};

const parseParagraph = (chunk: string): Sentence => {
  if (chunk.length === 0) {
    return [];
  }
  const trimed = chunk.trim();
  const startIndex = trimed.indexOf("[");
  if (startIndex === -1) {
    return [
      {
        text: chunk,
      },
    ];
  }
  const endIndex = trimed.indexOf(")");

  const sentence = trimed.substring(0, startIndex);
  const anchor = trimed.substring(startIndex, endIndex + 1);
  const remain = trimed.substring(endIndex + 1);

  return [
    {
      text: sentence,
      anchor: { scheme: parseScheme(anchor), name: parseName(anchor) },
    },
    ...parseParagraph(remain),
  ];
};

const parseScheme = (chunk: string): string => {
  const startIndex = chunk.indexOf("[");
  const endIndex = chunk.indexOf("]");
  return chunk.substring(startIndex + 1, endIndex);
};

const parseName = (chunk: string): string => {
  const startIndex = chunk.indexOf("(");
  const endIndex = chunk.indexOf(")");
  return chunk.substring(startIndex + 1, endIndex);
};
