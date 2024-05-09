import { useState } from "react";

interface SelectProps {
  items: string[];
  handler: (item: string) => void;
}

const Select = ({ items, handler }: SelectProps) => {
  const [selectedItem, setSelectedItem] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItem(e.target.value);
    handler(e.target.value);
  };
  return (
    <select
      className="select select-ghost mt-1 h-8 min-h-8 w-fit text-xs"
      value={selectedItem}
      onChange={(e) => handleChange(e)}
    >
      {items.map((item, i) => (
        <option key={`${i}${item}`}>{item}</option>
      ))}
    </select>
  );
};

export default Select;
