interface StarProps {
  name: string;
  rating: number | undefined;
}

const Star = ({ name, rating }: StarProps) => {
  const ratingScore = [1, 2, 3, 4, 5];
  return (
    <div className="rating rating-sm">
      {ratingScore.map((score, index) => (
        <input
          type="radio"
          readOnly
          key={index}
          name={name}
          checked={rating === score}
          className="mask mask-star-2 pointer-events-none bg-mainY"
        />
      ))}
    </div>
  );
};

export default Star;
