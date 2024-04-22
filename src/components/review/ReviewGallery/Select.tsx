interface SelectProps {
  items: string[];
}

const Select: React.FC<SelectProps> = ({ items }) => {
  return (
    <>
      <select className="min-h-8 h-8 select select-ghost w-fit max-w-xs">
        {items.map((item, i) => (
          <option key={`${i}${item}`}>{item}</option>
        ))}
      </select>
    </>
  );
};

export default Select;
