import Link from "next/link";
import { FC } from "react";
import MetaDecorator from "../components/MetaDecorator";

interface INotFoundProps {}

const NotFound: FC<INotFoundProps> = (props) => {
  return (
    <div className="absolute right-1/2 translate-x-1/2 bottom-1/2 translate-y-1/2">
      <MetaDecorator title="Not Found" description="Not found" />
      <h2 className="font-bold text-center text-4xl lg:text-5xl">404</h2>
      <p className="text-center lg:text-lg">
        This is not the page you are looking for. <Link href="/">Go Home</Link>
      </p>
    </div>
  );
};

export default NotFound;
