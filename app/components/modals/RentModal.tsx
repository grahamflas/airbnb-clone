"use client";

import { useMemo, useState } from "react";

import axios from "axios";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import CategoryInput from "../inputs/CategoryInput";
import Counter from "../inputs/Counter";
import CountrySelect from "../inputs/CountrySelect";
import Heading from "../Heading";
import Modal from "./Modal";

import useRentModal from "@/app/hooks/useRentModal";

import { categories } from "../navbar/Categories";
import dynamic from "next/dynamic";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import toast from "react-hot-toast";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentModal = () => {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const rentModal = useRentModal();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const watchedCategory = watch("category");
  const watchedLocation = watch("location");
  const watchedGuestCount = watch("guestCount");
  const watchedRoomCount = watch("roomCount");
  const watchedBathroomCount = watch("bathroomCount");
  const watchedImageSrc = watch("imageSrc");

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [watchedLocation]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((step) => step - 1);
  };

  const onNext = () => {
    setStep((step) => step + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    try {
      await axios.post("/api/listings", data);

      toast.success("Listing created");

      router.refresh();

      reset();

      setStep(STEPS.CATEGORY);

      rentModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
        {categories.map((item) => (
          <div key={item.label} className="col-span-1">
            <CategoryInput
              icon={item.icon}
              label={item.label}
              onClick={(clickedCategoryLabel) => {
                setCustomValue("category", clickedCategoryLabel);
              }}
              selected={watchedCategory === item.label}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you"
        />

        <CountrySelect
          onChange={function (selectedLocation) {
            setCustomValue("location", selectedLocation);
          }}
          value={watchedLocation}
        />

        <Map center={watchedLocation?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />

        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          onChange={(updatedValue) => {
            setCustomValue("guestCount", updatedValue);
          }}
          value={watchedGuestCount}
        />

        <hr />

        <Counter
          title="Rooms"
          subtitle="How many rooms do you have?"
          onChange={(updatedValue) => {
            setCustomValue("roomCount", updatedValue);
          }}
          value={watchedRoomCount}
        />

        <hr />

        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          onChange={(updatedValue) => {
            setCustomValue("bathroomCount", updatedValue);
          }}
          value={watchedBathroomCount}
        />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />

        <ImageUpload
          onChange={(imageUrl) => setCustomValue("imageSrc", imageUrl)}
          value={watchedImageSrc}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best"
        />

        <Input
          disabled={isLoading}
          errors={errors}
          id="title"
          label="Title"
          register={register}
          required
        />

        <hr />

        <Input
          disabled={isLoading}
          errors={errors}
          id="description"
          label="Description"
          register={register}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />

        <Input
          disabled={isLoading}
          errors={errors}
          formatPrice
          id={"price"}
          label="Price"
          register={register}
          required
          type="number"
        />
      </div>
    );
  }

  return (
    <Modal
      actionLabel={actionLabel}
      body={bodyContent}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Airbnb your home!"
    />
  );
};

export default RentModal;
