interface SelectProps {
  items: string[];
}

const Select: React.FC<SelectProps> = ({ items }) => {
  return (
    <>
      <select className="select select-ghost h-8 min-h-8 w-fit max-w-xs">
        {items.map((item, i) => (
          <option key={`${i}${item}`}>{item}</option>
        ))}
      </select>
    </>
  );
};

export default Select;
