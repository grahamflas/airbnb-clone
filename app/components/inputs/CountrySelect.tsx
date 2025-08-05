"use client";

import Select from "react-select";

import useCountries from "@/app/hooks/useCountries";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number;
  region: string;
  value: string;
};

interface Props {
  onChange: (value: CountrySelectValue) => void;
  value?: CountrySelectValue;
}

const CountrySelect = ({ onChange, value }: Props) => {
  const { getAll } = useCountries();

  return (
    <Select
      classNames={{
        control: () => "p-3 border-2",
        input: () => "text-lg",
        option: () => "text-lg",
      }}
      isClearable
      formatOptionLabel={(option: any) => (
        <div className="flex flex-row items-center gap-3">
          <div>{option.flag}</div>

          <div>
            {option.label},
            <span className="text-neutral-500 ml-1">{option.region}</span>
          </div>
        </div>
      )}
      onChange={(value) => onChange(value as CountrySelectValue)}
      options={getAll()}
      placeholder="Anywhere"
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: "black",
          primary25: "#ffe4e6",
        },
      })}
      value={value}
    />
  );
};

export default CountrySelect;
