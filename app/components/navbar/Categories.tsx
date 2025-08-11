"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { BsSnow } from "react-icons/bs";
import { FaSkiing } from "react-icons/fa";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { IoDiamond } from "react-icons/io5";
import { MdOutlineVilla } from "react-icons/md";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";

import CategoryBox from "../CategoryBox";
import Container from "../Container";

import type { IconType } from "react-icons";

export interface Category {
  description: string;
  icon: IconType;
  label: string;
}

export const categories: Category[] = [
  {
    description: "This property is close to the beach",
    icon: TbBeach,
    label: "Beach",
  },
  {
    description: "This property has windmills",
    icon: GiWindmill,
    label: "Windmills",
  },
  {
    description: "This property is modern",
    icon: MdOutlineVilla,
    label: "Modern",
  },
  {
    description: "This property is in the countryside",
    icon: TbMountain,
    label: "Countryside",
  },
  {
    description: "This property has a pool",
    icon: TbPool,
    label: "Pools",
  },
  {
    description: "This property is on an island",
    icon: GiIsland,
    label: "Islands",
  },
  {
    description: "This property is close to a lake",
    icon: GiBoatFishing,
    label: "Lake",
  },
  {
    description: "This property has skiing activities",
    icon: FaSkiing,
    label: "Skiing",
  },
  {
    description: "This property is in a castle",
    icon: GiCastle,
    label: "Castle",
  },
  {
    description: "This property has camping activities",
    icon: GiForestCamp,
    label: "Camping",
  },
  {
    description: "This property is in the Arctic",
    icon: BsSnow,
    label: "Arctic",
  },
  {
    description: "This property is in a cave",
    icon: GiCaveEntrance,
    label: "Cave",
  },
  {
    description: "This property is in the desert",
    icon: GiCactus,
    label: "Desert",
  },
  {
    description: "This property is in a barn",
    icon: GiBarn,
    label: "Barns",
  },
  {
    description: "This property is luxurious",
    icon: IoDiamond,
    label: "Lux",
  },
];

const Categories = () => {
  const params = useSearchParams();
  const categoryParam = params?.get("category");
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  if (isMainPage) {
    return (
      <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
          {categories.map((category) => {
            return (
              <CategoryBox
                description={category.description}
                icon={category.icon}
                key={category.label}
                label={category.label}
                selected={category.label === categoryParam}
              />
            );
          })}
        </div>
      </Container>
    );
  }
};

export default Categories;
