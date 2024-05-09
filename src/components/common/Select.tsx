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
      className="select select-ghost mt-1 h-8 min-h-8 w-fit text-right text-xs"
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
