import { useAtom } from "jotai";
import { Chunk, Sentence } from "@/lib";
import { Anchor } from "@/components";
import { footerAtom } from "@/store";

export default function Footer() {
  const [footer] = useAtom(footerAtom);

  return (
    <footer className="max-w-md pb-16 text-sm text-primary-500 sm:pb-0">
      {footer.map((sentence: Sentence, index: number) => {
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
                      css={"text-primary-400"}
                    />
                  ) : null}
                </span>
              );
            })}
          </p>
        );
      })}
    </footer>
  );
}
