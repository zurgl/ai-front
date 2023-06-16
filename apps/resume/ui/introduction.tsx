import { introductionAtom } from "@/store";
import { useAtom } from "jotai";

export default function Introduction() {
  const [introduction] = useAtom(introductionAtom);
  return (
    <div>
      <h1 className="text-4xl font-bold tracking-tight text-primary-200 sm:text-5xl">
        {introduction.fullName}
      </h1>
      <h2 className="mt-3 text-lg font-medium tracking-tight text-primary-200 sm:text-xl">
        {introduction.position}
      </h2>
      <p className="mt-4 max-w-xs leading-normal">
        {introduction.shortDescription}{" "}
      </p>
    </div>
  );
}
