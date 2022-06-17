import Link from "next/link";
import React from "react";
import Image from "next/image";

export interface IListItemProps {
  to: string;
  name: string;
  description: string;
  image: string;
}

const ListItem: React.FC<IListItemProps> = ({
  to,
  name,
  description,
  image,
}) => {
  return (
    <Link href={to}>
      <div className="card group hover:cursor-p">
        <div className="w-full h-auto aspect-video relative rounded-t">
          <Image
            src={image}
            alt={name}
            layout="fill"
            objectFit="contain"
            className="rounded-t"
          />
        </div>
        <h3 className="text-center mt-2 group-hover:text-red-light duration-100">
          {name}
        </h3>
        <p className="text-center text-secondary">{description}</p>
      </div>
    </Link>
  );
};

export default ListItem;
