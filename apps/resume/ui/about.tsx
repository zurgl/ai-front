import { useAtom } from "jotai";
import { paragraphsAtom } from "@/store";
import { Chunk, Sentence } from "@/lib";
import { Anchor } from "@/components";

export default function AboutSection() {
  const [paragraphs] = useAtom(paragraphsAtom);

  return (
    <div className="flex flex-col gap-4">
      {paragraphs.map((sentence: Sentence, index: number) => {
        return (
          <p key={index}>
            {sentence.map((chunk: Chunk, index: number) => {
              return (
                <span key={index}>
                  {chunk.text}
                  {chunk.anchor ? (
                    <Anchor
                      scheme={chunk.anchor.scheme}
                      name={chunk.anchor.name}
                      key={index}
                      css={"text-primary-200"}
                    />
                  ) : null}
                </span>
              );
            })}
          </p>
        );
      })}
    </div>
  );
}
