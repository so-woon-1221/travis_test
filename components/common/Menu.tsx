import React from "react";
import { LoginIcon, MenuIcon, ChevronDownIcon } from "@heroicons/react/solid";
// eslint-disable-next-line import/extensions
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import useModal from "../../hooks/useModal";
// eslint-disable-next-line import/extensions
import LoginModal from "./LoginModal";
import { modalActions } from "../../store/modal";

const Menu = () => {
  const dispatch = useDispatch();
  const { ModalPortal } = useModal();

  return (
    <>
      <div
        className="flex flex-row bg-gray-200 md:w-64 w-full md:rounded-3xl sticky top-4"
        id="menu-wrapper"
      >
        <div className="w-full md:w-64">
          <div
            className="md:h-screen-64 md:flex-col flex flex-col w-full overflow-y-auto px-4 flex-wrap items-center z-20"
            id="menu"
          >
            <div className="w-full flex-grow z-50">
              <div className="md:hidden absolute left-4 w-8 h-8 top-6">
                <MenuIcon
                  className="w-full h-full"
                  onClick={() => {
                    const topMenu = document.getElementById("top-menu");
                    if (topMenu) {
                      topMenu.classList.toggle("top-menu");
                    }
                  }}
                />
              </div>
              <div className="flex items-center justify-center md:w-full w-auto md:h-36 h-20 md:border-b border-gray-700 cursor-pointer z-20">
                <Link href="/" passHref>
                  <h1 className="font-extrabold text-4xl">LOGO</h1>
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="mt-3 md:w-full flex items-center justify-center py-2 hover:bg-gray-300 rounded-lg cursor-pointer">
                  {/* eslint-disable-next-line max-len */}
                  {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
                  <h1
                    className="font-extrabold text-2xl"
                    onClick={() => {
                      const leftMenu = document.getElementById("left-menu");
                      const menu = document.getElementById("menu-wrapper");
                      if (leftMenu && menu) {
                        if (menu.classList.contains("md:w-128")) {
                          leftMenu.classList.remove("left-menu");
                          setTimeout(
                            () => menu.classList.remove("md:w-128"),
                            100,
                          );
                        } else {
                          menu.classList.add("md:w-128");
                          setTimeout(
                            () => leftMenu.classList.add("left-menu"),
                            400,
                          );
                        }
                      }
                    }}
                  >
                    SELECT
                  </h1>
                </div>
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={`flex items-center justify-center py-2 hover:bg-gray-300 w-full hover:rounded-lg mt-4 ${
                          open && "bg-gray-300 rounded-t-lg"
                        }`}
                      >
                        Test
                        <ChevronDownIcon
                          width="1rem"
                          className={`${open && "transform rotate-180"}`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="text-gray-500 py-2 w-full bg-gray-300 rounded-b-lg">
                        <div className="flex flex-col items-center justify-center">
                          <Link href="/menu1">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a>1-1</a>
                          </Link>
                          <Link href="/menu2">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a>1-2</a>
                          </Link>
                          <Link href="/menu3">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a>1-3</a>
                          </Link>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={`flex items-center justify-center py-2 hover:bg-gray-300 w-full hover:rounded-lg mt-4 ${
                          open && "bg-gray-300 rounded-t-lg"
                        }`}
                      >
                        D3 차트{" "}
                        <ChevronDownIcon
                          width="1rem"
                          className={`${open && "transform rotate-180"}`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="text-gray-500 py-2 w-full bg-gray-300 rounded-b-lg">
                        <div className="flex flex-col items-center justify-center">
                          <Link href="/menu4">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a>2-1</a>
                          </Link>
                          <Link href="/menu5">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a>2-2</a>
                          </Link>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={`flex items-center justify-center py-2 hover:bg-gray-300 w-full hover:rounded-lg mt-4 ${
                          open && "bg-gray-300 rounded-t-lg"
                        }`}
                      >
                        서머스플랫폼{" "}
                        <ChevronDownIcon
                          width="1rem"
                          className={`${open && "transform rotate-180"}`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="text-gray-500 py-2 w-full bg-gray-300 rounded-b-lg">
                        <div className="flex flex-col items-center justify-center">
                          <Link href="/menu6">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a>채널분석</a>
                          </Link>
                          <Link href="/menu7">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a>고객분석</a>
                          </Link>
                        </div>
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Disclosure>
                  {({ open }) => (
                    <>
                      <Disclosure.Button
                        className={`flex items-center justify-center py-2 hover:bg-gray-300 w-full hover:rounded-lg mt-4 ${
                          open && "bg-gray-300 rounded-t-lg"
                        }`}
                      >
                        Menu4{" "}
                        <ChevronDownIcon
                          width="1rem"
                          className={`${open && "transform rotate-180"}`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="text-gray-500 py-2 w-full bg-gray-300 rounded-b-lg">
                        a
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              </div>
            </div>
            <div className="md:w-full md:mb-4 absolute right-4 md:block md:relative md:right-0 top-4 md:top-0 z-50">
              <div
                className="md:w-full w-auto h-12 md:bg-gray-300 py-2 rounded-lg bg-opacity-75 md:mt-3 p-2 flex items-center hover:shadow hover:bg-gray-400 font-bold md:ml-0 ml-2 cursor-pointer"
                onClick={() => {
                  dispatch(modalActions.setOpen(true));
                }}
                role="presentation"
              >
                <div className="w-8 h-8 md:mr-2 z-20">
                  <LoginIcon className="w-full h-full" />
                </div>
                <span className="hidden md:block">로그인</span>
                <ModalPortal>
                  <LoginModal />
                </ModalPortal>
              </div>
            </div>
            <div
              className="md:hidden invisible absolute flex w-full bg-gray-200 py-3 top-8 -z-10 space-x-2 justify-center"
              id="top-menu"
            >
              <div>SELECT</div>
              <div>
                <Link href="/menu1">
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a>MENU1</a>
                </Link>
              </div>
              <div>
                <Link href="/menu2">
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a>MENU2</a>
                </Link>
              </div>
              <div>
                <Link href="/menu3">
                  {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a>MENU3</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="w-0 h-screen-64 hidden" id="left-menu">
          <div className="flex flex-col px-8 my-8">
            <ul>
              <li className="mb-2 border-b border-gray-200">
                1
                <ul>
                  <li className="m-2">1-1</li>
                  <li className="m-2">1-2</li>
                </ul>
              </li>
              <li className="mb-2 border-b border-gray-200">
                2
                <ul>
                  <li className="m-2">1-1</li>
                  <li className="m-2">1-2</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(Menu);
