// import { useState } from "react";

interface SelectProps {
  optionName: string[];
  optionValue: string[];
  handler: (item: string) => void;
}

const Select = ({ optionName, optionValue, handler }: SelectProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handler(e.target.value);
    console.log(e.target.value);
  };

  return (
    <select
      className="select select-ghost mt-1 h-7 min-h-7 w-fit pl-2 pr-8 text-xs focus:outline-none"
      onChange={(e) => handleChange(e)}
    >
      {optionName.map((name, i) => (
        <option key={`${i}${name}`} value={optionValue[i]}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default Select;
