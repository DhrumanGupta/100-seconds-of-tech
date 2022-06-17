import React from "react";
import { default as NextLink } from "next/link";

interface ILinkProps {
  children: React.ReactNode;
  href?: string;
}

const Link: React.FC<ILinkProps> = ({ children, href }) => {
  if (!href) {
    return <>{children}</>;
  }

  if (href.startsWith("/")) {
    return <NextLink href={href}>{children}</NextLink>;
  }

  if (href.startsWith("#")) {
    return <a href={href}>{children}</a>;
  }

  return (
    <a href={href} target={"_blank"} rel={"noopener noreferrer"}>
      {children}
    </a>
  );
};

export default Link;
