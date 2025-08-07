"use client";

import { useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import CategoryInput from "../inputs/CategoryInput";
import Counter from "../inputs/Counter";
import CountrySelect from "../inputs/CountrySelect";
import Heading from "../Heading";
import Modal from "./Modal";

import useRentModal from "@/app/hooks/useRentModal";

import { categories } from "../navbar/Categories";
import dynamic from "next/dynamic";

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

  const rentModal = useRentModal();

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
      ImageSrc: "",
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

  return (
    <Modal
      actionLabel={actionLabel}
      body={bodyContent}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      title="Airbnb your home!"
    />
  );
};

export default RentModal;
