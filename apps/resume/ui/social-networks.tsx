import { Github, Instagram, Twitter, LinkedIn } from "@/icons";
import { useAtom } from "jotai";
import { socialNetworkAtom } from "@/store";

const selectIcon = (name: string) => {
  switch (name) {
    case "GitHub":
      return <Github />;
    case "Instagram":
      return <Instagram />;
    case "Twitter":
      return <Twitter />;
    case "LinkedIn":
      return <LinkedIn />;
  }
};

export default function SocialNetworks0() {
  const [socialNetworks] = useAtom(socialNetworkAtom);

  return (
    <ul className="ml-1 mt-8 flex items-center">
      {socialNetworks.map((network: any, index: any) => {
        return (
          <li className="mr-5 text-xs" key={index}>
            <a
              className="block hover:text-primary-200"
              href={network.link}
              target="_blank"
              rel="noreferrer"
            >
              <span className="sr-only">{network.text}</span>
              {selectIcon(network.text)}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
