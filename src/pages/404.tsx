import Link from "next/link";
import { FC } from "react";

interface INotFoundProps {}

const NotFound: FC<INotFoundProps> = (props) => {
  return (
    <main className="absolute right-1/2 translate-x-1/2 bottom-1/2 translate-y-1/2">
      <h2 className="font-bold text-center text-4xl lg:text-5xl">404</h2>
      <p className="text-center lg:text-lg">
        This is not the page you are looking for. <Link href="/">Go Home</Link>
      </p>
    </main>
  );
};

export default NotFound;
