interface DateCreatedProps {
  createdAt: string | undefined;
}

const DateCreated: React.FC<DateCreatedProps> = ({ createdAt }) => {
  // @ts-expect-error NOTE: created의 타입 추론이 이상하여 any로 처리
  const formatDate = (created) => {
    const dateObject = new Date(created);
    const year: number = dateObject.getFullYear();
    const month: number = dateObject.getMonth() + 1;
    const day: number = dateObject.getDate();
    return `${year}-${month < 10 ? `0${month}` : month}-${day}`;
  };

  return (
    <span className="mr-4 text-sm text-subGray">{formatDate(createdAt)}</span>
  );
};

export default DateCreated;
