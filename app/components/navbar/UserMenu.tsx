"use client";

import { useState } from "react";

import { AiOutlineMenu } from "react-icons/ai";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import { User } from "@/app/generated/prisma";
import { signOut } from "next-auth/react";

interface Props {
  currentUser?: User | null;
}

const UserMenu = ({ currentUser }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={() => console.log("Airbnb your home clicked")}
        >
          Airbnb your home
        </div>

        <div
          className="p-4 md:py-1 md:px-2 border-[1px] flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={toggleOpen}
        >
          <AiOutlineMenu />

          <div className="hidden md:inline">
            <Avatar />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  label="My trips"
                  onClick={() => console.log("My trips clicked")}
                />

                <MenuItem
                  label="My favorites"
                  onClick={() => console.log("My favorites clicked")}
                />
                <MenuItem
                  label="My properties"
                  onClick={() => console.log("My properties clicked")}
                />
                <MenuItem
                  label="Airbnb my home"
                  onClick={() => console.log("Airbnb my home clicked")}
                />
                <hr />
                <MenuItem label="Logout" onClick={() => signOut()} />
              </>
            ) : (
              <>
                <MenuItem label="Login" onClick={loginModal.onOpen} />

                <MenuItem label="Sign up" onClick={registerModal.onOpen} />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
