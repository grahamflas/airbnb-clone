"use client";

import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";

import type { IconType } from "react-icons";

interface Props {
  description: string;
  icon: IconType;
  label: string;
  selected?: boolean;
}

// In order to use the react-icon we passed as a prop,
// we need to give the prop a capitalized alias (Icon),
// so we can use it as a component
const CategoryBox = ({ description, icon: Icon, label, selected }: Props) => {
  const router = useRouter();
  const params = useSearchParams();

  // [TODO]: write up something about this https://www.youtube.com/watch?v=c_-b_isI4vg
  // create object out of current parameters
  // a lot of details about the guest's search will be stored
  // in the URL; need to be able to make sure that by clicking
  // on different filters, we don't reset the already-selected filters
  const handleClick = () => {
    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div
      className={`
        flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
        ${selected ? "border-b-neutral-800" : "border-transparent"}
        ${selected ? "text-neutral-800" : "text-neutral-500"}
      `}
      onClick={handleClick}
    >
      <Icon size={26} title={description} />

      <div className="font-medium text-sm">{label} </div>
    </div>
  );
};

export default CategoryBox;
