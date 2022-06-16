import { FC, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Menu,
  MenuPopover,
  MenuButton,
  useMenuButtonContext,
  MenuItem,
  MenuLink,
  MenuItems,
} from "@reach/menu-button";
import Link from "next/link";
import Close from "./icons/Close";
import Hamburger from "./icons/Hamburger";

interface INavbarProps {}

const LINKS = [
  { name: "Videos", to: "/videos" },
  { name: "Posts", to: "/posts" },
  { name: "About Us", to: "/about" },
];

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
            className="flex h-full flex-col overflow-y-scroll pb-12 border-t border-gray-400" // dark:border-gray-600 border-t border-gray-200
          >
            <MenuItems className="flex flex-col b-0">
              {LINKS.map((link) => (
                <Link href={link.to} key={link.to}>
                  <MenuLink
                    as={"a"}
                    className="hover:bg-secondary focus:bg-secondary text-primary border-b border-gray-300 px-5vw py-9 dark:border-gray-600"
                  >
                    {link.name}
                  </MenuLink>
                </Link>
              ))}
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
        <MenuButton className="my-auto">
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
    <div className="py-9 lg:py-12 mx-8">
      <nav className="w-full justify-between relative flex lg:justify-center lg:items-center">
        <h1 className="text-red-light inline">100 Seconds of Tech</h1>
        <div className="flex items-center justify-center">
          <div className="block lg:hidden">
            <MobileMenu />
          </div>
        </div>
        <ul className="hidden lg:flex">
          <li>
            <a href="/home">Home</a>
          </li>
          <li>
            <a href="/test">Test</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
