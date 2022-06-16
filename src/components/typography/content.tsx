import React from "react";
import { ITypograpyProps } from "./types";
import clsx from "clsx";

const Content: React.FunctionComponent<ITypograpyProps> = ({
  children,
  className,
}) => {
  return <p className={clsx("text-secondary mt-2", className)}>{children}</p>;
};

export default Content;
