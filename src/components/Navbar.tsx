import { FC, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  MenuPopover,
  MenuButton,
  useMenuButtonContext,
  MenuLink,
  MenuItems,
} from "@reach/menu-button";
import Link from "next/link";
import Close from "./icons/Close";
import Hamburger from "./icons/Hamburger";
import clsx from "clsx";
import { Theme } from "../types";
import { useTheme } from "next-themes";
import Image from "next/image";

interface INavbarProps {}

const LINKS = [
  { name: "Videos", to: "/videos" },
  { name: "Posts", to: "/posts" },
  { name: "About Us", to: "/about" },
];

function DarkModeToggle({
  variant = "icon",
}: {
  variant?: "icon" | "labelled";
}) {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => {
        setTheme(theme === Theme.Dark ? Theme.Light : Theme.Dark);
      }}
      className={clsx(
        "border-secondary hover:border-primary focus:border-primary focus:outline-none inline-flex h-14 items-center justify-center overflow-hidden rounded-full border-2 p-1 transition",
        {
          "w-14": variant === "icon",
          "px-8": variant === "labelled",
        }
      )}
    >
      <span className="w-6 h-6 !transition">
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="0"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          ></path>
        </svg>
      </span>
      <span
        className={clsx("ml-4 text-black dark:text-white", {
          "sr-only": variant == "icon",
        })}
      >
        <p className="text-primary">
          Switch to {theme === Theme.Dark ? "Light" : "Dark"} Mode
        </p>
      </span>
    </button>
  );
}

const MobileMenuList: FC = () => {
  const { isExpanded } = useMenuButtonContext();

  useEffect(() => {
    if (isExpanded) {
      // don't use overflow-hidden, as that toggles the scrollbar and causes layout shift
      document.body.classList.add("fixed");
      document.body.classList.add("overflow-y-scroll");
      // alternatively, get bounding box of the menu, and set body height to that.
      document.body.style.height = "100vh";
    } else {
      document.body.classList.remove("fixed");
      document.body.classList.remove("overflow-y-scroll");
      document.body.style.removeProperty("height");
    }
  }, [isExpanded]);

  return (
    <AnimatePresence>
      {isExpanded ? (
        <MenuPopover
          position={(r) => ({
            top: `calc(${Number(r?.top) + Number(r?.height)}px + 1.75rem)`, // 1.75rem from navbar
            left: 0,
            bottom: 0,
            right: 0,
          })}
          style={{ display: "block" }}
          className="z-50"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{
              duration: 0.15,
              ease: "linear",
            }}
            className="flex h-full flex-col overflow-y-scroll pb-12 border-t border-gray-400 bg-primary duration-500"
          >
            <MenuItems className="flex flex-col b-0">
              {LINKS.map((link) => (
                <Link href={link.to} key={link.to}>
                  <MenuLink
                    as={"a"}
                    className="hover:bg-secondary focus:bg-secondary text-primary no-underline border-b border-gray-300 px-5vw py-9 dark:border-gray-600"
                  >
                    {link.name}
                  </MenuLink>
                </Link>
              ))}
              <div className="noscript-hidden py-9 text-center">
                <DarkModeToggle variant="labelled" />
              </div>
            </MenuItems>
          </motion.div>
        </MenuPopover>
      ) : null}
    </AnimatePresence>
  );
};

const MobileMenu: FC = () => (
  <Menu>
    {({ isExpanded }) => (
      <>
        <MenuButton>
          {isExpanded ? (
            <Close className="w-8 h-8 fill-primary" />
          ) : (
            <Hamburger className="w-10 h-10 fill-primary" />
          )}
        </MenuButton>
        <MobileMenuList />
      </>
    )}
  </Menu>
);

const Navbar: FC<INavbarProps> = () => {
  return (
    <div className="py-9 lg:py-12 mx-8 lg:px-5vw">
      <nav className="w-full justify-between relative flex items-center lg:justify-center lg:px-5vw">
        <Link href="/">
          <div className="lg:mr-auto flex hover:cursor-pointer hover:underline text-red-light">
            <span className="h-10 aspect-square hidden rounded-t mr-2 relative lg:block">
              <Image
                src="/logo/192x192.png"
                layout="fill"
                objectFit="contain"
                alt="Website Logo"
              />
            </span>
            <h1 className="my-auto ml-1 text-red-light inline">
              100 Seconds of Tech
            </h1>
          </div>
        </Link>

        <ul className="hidden lg:flex">
          {LINKS.map((link) => (
            <li key={link.to} className="mr-8">
              <Link href={link.to}>
                <a className="text-lg font-medium text-secondary hover:text-primary duration-100 no-underline">
                  {link.name}
                </a>
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-center">
          <div className="flex items-center lg:hidden">
            <MobileMenu />
          </div>

          <div className="hidden lg:block">
            <DarkModeToggle />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
