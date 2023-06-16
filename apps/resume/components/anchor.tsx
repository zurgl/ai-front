export default function Anchor({
  scheme,
  name,
  css,
}: {
  scheme: string;
  name: string;
  css: string;
}) {
  return (
    <a
      href={scheme}
      className={`
        font-medium hover:text-secondary-300 focus-visible:text-secondary-300 ${css}
      `}
      target="_blank"
      rel="noreferrer"
    >
      {name}
    </a>
  );
}
