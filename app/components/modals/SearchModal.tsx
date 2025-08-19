"use client";

import { useMemo, useState } from "react";

import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";

import { formatISO } from "date-fns";
import { Range } from "react-date-range";
import queryString from "query-string";

import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";
import CountrySelect from "../inputs/CountrySelect";
import Heading from "../Heading";
import Modal from "./Modal";

import type { CountrySelectValue } from "../inputs/CountrySelect";

import useSearchModal from "@/app/hooks/useSearchModal";

enum STEPS {
  LOCATION,
  DATE,
  INFO,
}

interface SearchModalQuery {
  bathroomCount: number;
  endDate?: string;
  guestCount: number;
  locationValue: string | undefined;
  roomCount: number;
  startDate?: string;
}

const SearchModal = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchModal = useSearchModal();

  const [step, setStep] = useState(STEPS.LOCATION);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        // turn off server-side rendering
        ssr: false,
      }),
    [location]
  );

  const onBack = () => {
    setStep((currentStep) => currentStep - 1);
  };
  const onNext = () => {
    setStep((currentStep) => currentStep + 1);
  };

  const onSubmit = () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (searchParams) {
      currentQuery = queryString.parse(searchParams.toString());
    }

    const updatedQuery: SearchModalQuery = {
      ...currentQuery,
      bathroomCount,
      guestCount,
      locationValue: location?.value,
      roomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = queryString.stringifyUrl(
      {
        url: "/",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        query: updatedQuery as Record<string, any>,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you want to go?"
        subtitle="Find the perfect location "
      />

      <CountrySelect
        onChange={(selectedCountry) => setLocation(selectedCountry)}
        value={location}
      />

      <hr />

      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />

        <Calendar
          onChange={(selectedDateRange) => {
            setDateRange(selectedDateRange.selection);
          }}
          value={dateRange}
        />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place" />

        <Counter
          title="Guests"
          subtitle="How many guests are coming?"
          onChange={(selectedGuestCount) => setGuestCount(selectedGuestCount)}
          value={guestCount}
        />

        <Counter
          title="Rooms"
          subtitle="How many rooms do you need?"
          onChange={(selectedRoomCount) => setRoomCount(selectedRoomCount)}
          value={roomCount}
        />

        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you need?"
          onChange={(selectedBathroomCount) =>
            setBathroomCount(selectedBathroomCount)
          }
          value={bathroomCount}
        />
      </div>
    );
  }

  return (
    <Modal
      actionLabel={actionLabel}
      body={bodyContent}
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      title="Filters"
    />
  );
};

export default SearchModal;
