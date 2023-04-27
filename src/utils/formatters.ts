import { AppConfig } from "@/config/app";
import { ethers } from "ethers";

export const minifyAddress = (address: string) => {
  const checked = ethers.utils.isAddress(address);
  return checked
    ? `${address.slice(0, 5)}...${address.slice(address.length - 5)}`
    : address;
};

export const AbsoluteURL = (path: string) => {
  return new URL(path, AppConfig.siteUrl).toString();
};

interface OGPageURLProps {
  title: string;
  description: string;
}

export const ogPageURL = ({ title, description }: OGPageURLProps) => {
  const url = new URL("/api/og/page", AppConfig.siteUrl);
  url.searchParams.append("title", title);
  url.searchParams.append("description", description);
  return url.toString();
};

interface OGTweetURLProps {
  title: string;
  author: string;
}

export const ogTweetURL = ({ title, author }: OGTweetURLProps) => {
  const url = new URL("/api/og/tweet", AppConfig.siteUrl);
  url.searchParams.append("title", title);
  url.searchParams.append("author", minifyAddress(author));
  return url.toString();
};

export const shareTweetURL = ({
  id,
  address,
  text,
}: {
  id: string;
  address?: string;
  text: string;
}) => {
  const url = new URL("https://twitter.com/intent/tweet");
  const shareURL = new URL(`/posts/${id}`, AppConfig.siteUrl);
  if (address) {
    shareURL.searchParams.set("referrer", address);
  }
  url.searchParams.set("text", `${text}\n\n${shareURL.toString()}`);
  return url.toString();
};

export const formatter = {
  minifyAddress,
  AbsoluteURL,
  ogPageURL,
  ogTweetURL,
  shareTweetURL,
};
