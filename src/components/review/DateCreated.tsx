interface DateCreatedProps {
  createdAt: string | undefined;
}

const DateCreated: React.FC<DateCreatedProps> = ({ createdAt }) => {
  const formatDate = (created?: string) => {
    if (!created) return;
    const dateObject = new Date(created);
    const year: number = dateObject.getFullYear();
    const month: number = dateObject.getMonth() + 1;
    const day: number = dateObject.getDate();
    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
  };

  return (
    <span className="mr-4 text-sm text-gray-300">{formatDate(createdAt)}</span>
  );
};

export default DateCreated;
