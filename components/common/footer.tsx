import React from "react";
import { AtSymbolIcon } from "@heroicons/react/solid";

const Footer = () => (
  <footer className="w-full h-10 flex items-center justify-center border-t mt-4">
    <div className="w-4 h-4 flex items-center justify-center mr-3">
      <AtSymbolIcon className="w-full h-full" />
    </div>
    {/* <span className="text-2xl">Footer</span> */}
  </footer>
);

export default Footer;
