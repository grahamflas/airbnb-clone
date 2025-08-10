"use client";

import { IconType } from "react-icons";

interface Props {
  description: string;
  icon: IconType;
  label: string;
}

const ListingCategory = ({ description, icon: Icon, label }: Props) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon className="text-neutral-600" size={40} />

        <div className="flex flex-col">
          <div className="text-lg font-semibold">{label}</div>

          <div className="text-neutral-500 font-light">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
