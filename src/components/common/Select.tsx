// import { useState } from "react";

interface SelectProps {
  option: { name: string; value: string }[];
  handler: (item: string) => void;
}

const Select = ({ option, handler }: SelectProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handler(e.target.value);
    console.log(e.target.value);
  };

  return (
    <select
      className="select select-ghost mt-1 h-7 min-h-7 w-fit pl-2 pr-8 text-xs focus:outline-none"
      onChange={(e) => handleChange(e)}
    >
      {option.map(({ name, value }, i) => (
        <option key={`${i}-${name}`} value={value}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default Select;
