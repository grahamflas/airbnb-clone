"use client";
import { useState } from "react";

import axios from "axios";
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

const RegisterModal = () => {
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
      name: "",
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
    setIsLoading(true);

    try {
      await axios.post("/api/register", data);
      registerModal.onClose();
      loginModal.onOpen();
    } catch (error) {
      console.log("RegisterModal error:", error);

      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account!" />

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
        id="name"
        label="Name"
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
    registerModal.onClose();
    loginModal.onOpen();
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
          <div>Already have an account?</div>

          <button
            className="text-neutral-800 cursor-pointer hover:underline"
            onClick={toggleLoginAndRegisterModal}
          >
            Log in
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
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Register"
    />
  );
};

export default RegisterModal;
