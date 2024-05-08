interface SelectProps {
  items: string[];
}

const Select = ({ items }: SelectProps) => {
  return (
    <select className="select select-ghost mt-1 h-8 min-h-8 w-fit text-xs">
      {items.map((item, i) => (
        <option key={`${i}${item}`}>{item}</option>
      ))}
    </select>
  );
};

export default Select;
