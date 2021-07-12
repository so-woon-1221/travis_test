import React, { useEffect, useRef, useState } from "react";
// @ts-ignore
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "../store";
import { modalActions } from "../store/modal";

interface Props {
  children: React.ReactNode;
}
const useModal = () => {
  const { open } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const ModalPortal: React.FC<Props> = ({ children }) => {
    const ref = useRef<Element | null>();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
      setMounted(true);
      if (document) {
        const dom = document.getElementById("modal-div");
        ref.current = dom;
      }
    }, []);

    useEffect(() => {
      console.log(open);
    }, [open]);

    if (ref.current && mounted && open) {
      return createPortal(
        <div
          className="w-full h-full flex items-center justify-center fixed inset-0 z-20"
          id="modal-child"
          role="presentation"
        >
          <div
            className="w-full h-full bg-black bg-opacity-20 absolute"
            onClick={(e) => {
              e.stopPropagation();
              dispatch(modalActions.setOpen(false));
            }}
            role="presentation"
            id="modal-child-wrapper"
          />
          {children}
        </div>,
        ref.current,
      );
    }
    return null;
  };

  return { ModalPortal };
};

export default useModal;
