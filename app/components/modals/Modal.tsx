"use client";

import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

import Button from "../Button";

interface Props {
  actionLabel: string;
  body?: React.ReactElement;
  disabled?: boolean;
  footer?: React.ReactElement;
  isOpen?: boolean;
  onClose: () => void;
  onSubmit: () => void;
  secondaryAction?: () => void;
  secondaryActionLabel?: string;
  title?: string;
}

const Modal = ({
  actionLabel,
  body,
  disabled,
  footer,
  isOpen,
  onClose,
  onSubmit,
  secondaryAction,
  secondaryActionLabel,
  title,
}: Props) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const returnIfDisabled = () => {
    if (disabled) {
      return;
    }
  };

  const handleClose = () => {
    returnIfDisabled();

    setShowModal(false);

    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleSubmit = () => {
    returnIfDisabled();

    onSubmit();
  };

  const handleSecondaryAction = () => {
    returnIfDisabled();

    if (!secondaryAction) {
      return;
    }

    secondaryAction();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70">
        <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full md:h-auto lg:h-auto ">
          {/* CONTENT */}
          <div
            className={`
            translate
            duration-300
            h-full
            ${showModal ? "translate-y-0" : "translate-y-full"}
            ${showModal ? "opacity-100" : "opacity-0"}
            `}
          >
            <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/* HEADER */}
              <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
                <button
                  className="p-1 border-0 hover:opacity-70 transition absolute left-9"
                  onClick={handleClose}
                >
                  <IoMdClose size={18} />
                </button>

                <div className="text-lg font-semibold">{title}</div>
              </div>

              {/* BODY */}
              <div className="relative p-6 flex-auto">{body}</div>

              {/* FOOTER */}
              <div className="flex flex-col gap-2 p-6">
                <div className="flex flex-row items-center gap-4 w-full">
                  {secondaryAction && secondaryActionLabel && (
                    <Button
                      disabled={disabled}
                      label={secondaryActionLabel}
                      onClick={handleSecondaryAction}
                      outline
                    />
                  )}

                  <Button
                    disabled={disabled}
                    label={actionLabel}
                    onClick={handleSubmit}
                  />
                </div>

                {footer}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
