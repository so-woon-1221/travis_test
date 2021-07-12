import React, { Fragment } from "react";
// eslint-disable-next-line import/extensions
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Link from "next/link";
// eslint-disable-next-line import/extensions, import/no-unresolved
import useModal from "../../hooks/useModal";
// eslint-disable-next-line import/extensions
import LoginModal from "./LoginModal";

const Header = () => {
  const { ModalPortal } = useModal();
  return (
    <nav className="fixed top-0 left-64 items-center block width-screen-64 h-20 shadow-md md:flex bg-gradient-to-r from-green-300 to-purple-300">
      <div className="relative flex items-center justify-center px-10 h-20 z-10 md:w-auto">
        <button
          type="button"
          className="absolute right-10 md:hidden z-10"
          onClick={() => {
            const menu = document.getElementById("navMenu");
            if (menu) {
              menu.classList.toggle("show");
            }
          }}
        >
          메뉴
        </button>
        <button
          type="button"
          className="absolute left-10 md:hidden z-10"
          onClick={() => {
            const menu = document.getElementById("menu");
            if (menu) {
              menu.classList.toggle("open");
            }
          }}
        >
          메뉴
        </button>
        <span className="bg-transparent">LOGO</span>
      </div>
      <div
        className="flex flex-col z-0 absolute h-auto -top-32 w-full items-center invisible
      md:flex-row md:relative md:top-0 pl-0 md:visible"
        id="navMenu"
      >
        <button
          type="button"
          className="flex items-center py-2 px-2 mr-2 border-transparent border-b hover:border-gray-500"
        >
          Menu1
        </button>
        <button
          type="button"
          className="flex items-center py-2 px-2 mr-2 border-transparent border-b hover:border-gray-500"
        >
          Menu2
        </button>
        <button
          type="button"
          className="flex items-center py-2 px-2 mr-2 border-transparent border-b hover:border-gray-500"
        >
          Menu3
        </button>
        <Menu>
          <Menu.Button className="flex items-center py-2 px-2 mr-2 border-transparent border-b hover:border-gray-500">
            MENU4
            <ChevronDownIcon className="w-6 ml-2" />
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="bg-white absolute left-48 top-14 flex flex-col rounded-md shadow-xl z-100 px-4 py-2">
              <Menu.Item>
                <Link href="/">
                  <a href="/" className="py-2 px-3 rounded hover:bg-green-300">
                    Account settings
                  </a>
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link href="/">
                  <a href="/" className="py-2 px-3 rounded hover:bg-green-300">
                    Manage
                  </a>
                </Link>
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </Menu>
        <div className="flex-grow pb-3 md:text-right md:pr-10 md:pb-0">
          <ModalPortal>
            <LoginModal />
          </ModalPortal>
        </div>
      </div>
    </nav>
  );
};

export default Header;
