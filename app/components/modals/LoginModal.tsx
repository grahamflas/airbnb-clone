"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

const LoginModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // // [NOTE]: rewritten below to use async/ await
  // const onSubmit: SubmitHandler<FieldValues> = (data) => {
  //   setIsLoading(true);

  //   axios
  //     .post("/api/register", data)
  //     .then(() => registerModal.onClose())
  //     .catch((error) => console.log(error))
  //     .finally(() => setIsLoading(false));
  // };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setIsLoading(true);

      const result = await signIn("credentials", { ...data, redirect: false });

      setIsLoading(false);

      if (result?.ok) {
        toast.success("Logged in");
        router.refresh();
        loginModal.onClose();
      }

      if (result?.error) {
        toast.error(result.error);
      }
    } catch (error) {
      setIsLoading(false);
      toast.error("Something when wrong. Try again");
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account" />

      <Input
        disabled={isLoading}
        errors={errors}
        id="email"
        label="Email"
        register={register}
        required
      />

      <Input
        disabled={isLoading}
        errors={errors}
        id="password"
        label="Password"
        register={register}
        required
        type="password"
      />
    </div>
  );

  const toggleLoginAndRegisterModal = () => {
    loginModal.onClose();
    registerModal.onOpen();
  };

  const footerContent = (
    <div>
      <div className="flex flex-col gap-4 mt-3">
        <Button
          icon={FcGoogle}
          label="Continue with Google"
          onClick={() => signIn("google")}
          outline
        />

        <Button
          icon={AiFillGithub}
          label="Continue with Github"
          onClick={() => signIn("github")}
          outline
        />
      </div>

      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row justify-center gap-2">
          <div>First time using Airbnb?</div>

          <button
            className="text-neutral-800 cursor-pointer hover:underline"
            onClick={toggleLoginAndRegisterModal}
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      actionLabel="Continue"
      body={bodyContent}
      disabled={isLoading}
      footer={footerContent}
      isOpen={loginModal.isOpen}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Log in"
    />
  );
};

export default LoginModal;
