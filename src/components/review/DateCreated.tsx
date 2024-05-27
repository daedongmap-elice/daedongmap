interface DateCreatedProps {
  createdAt: string | undefined;
}

const DateCreated = ({ createdAt }: DateCreatedProps) => {
  const formatDate = (created?: string) => {
    if (!created) return;
    const dateObject = new Date(created);
    const year: number = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, "0");
    const day = String(dateObject.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <span className="mr-4 text-sm text-gray-300">{formatDate(createdAt)}</span>
  );
};

export default DateCreated;
