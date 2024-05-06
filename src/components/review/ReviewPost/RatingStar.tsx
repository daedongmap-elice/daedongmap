interface RatingStarProps {
  name: string;
  initialValue: number;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}

const RatingStar: React.FC<RatingStarProps> = ({
  name,
  initialValue,
  setRating,
}) => {
  const ratingScore = [1, 2, 3, 4, 5];
  return (
    <div className="rating rating-sm">
      {ratingScore.map((score, index) => (
        <input
          key={index}
          type="radio"
          name={name}
          value={score}
          checked={initialValue === score}
          onChange={() => setRating(score)}
          className="mask mask-star-2 bg-mainY"
        />
      ))}
    </div>
  );
};

export default RatingStar;
