import React from "react";
import { ITypograpyProps } from "./types";
import clsx from "clsx";

const Heading: React.FunctionComponent<ITypograpyProps> = ({
  children,
  className,
}) => {
  return <h2 className={clsx(className)}>{children}</h2>;
};

export default Heading;
