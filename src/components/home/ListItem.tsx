import Link from "next/link";
import React from "react";
import Play from "../icons/Play";

export interface IListItemProps {
  to: string;
  name: string;
}

const ListItem: React.FC<IListItemProps> = ({ to, name }) => {
  return (
    <li className="mt-4">
      <Link href={to}>
        <a className="flex items-center text-primary no-underline duration-75 hover:text-red-light">
          <Play className="fill-red-light" />
          <p className="ml-4">{name}</p>
        </a>
      </Link>
    </li>
  );
};

export default ListItem;
