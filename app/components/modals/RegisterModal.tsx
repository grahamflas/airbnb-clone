"use client";
import { useState } from "react";

import axios from "axios";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Modal from "./Modal";

import useRegisterModal from "@/app/hooks/useRegisterModal";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
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
    setIsLoading(true);

    try {
      await axios.post("/api/register", data);
      registerModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      actionLabel="Continue"
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Register"
    />
  );
};

export default RegisterModal;
