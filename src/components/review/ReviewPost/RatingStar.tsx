interface RatingStarProps {
  name: string;
  setRating: React.Dispatch<React.SetStateAction<number>>;
}

const RatingStar: React.FC<RatingStarProps> = ({ name, setRating }) => {
  return (
    <div className="rating rating-sm">
      <input
        type="radio"
        name={name}
        value={1}
        onChange={() => setRating(1)}
        className="mask mask-star-2 bg-mainY"
      />
      <input
        type="radio"
        name={name}
        value={2}
        onChange={() => setRating(2)}
        className="mask mask-star-2 bg-mainY"
      />
      <input
        type="radio"
        name={name}
        value={3}
        onChange={() => setRating(3)}
        className="mask mask-star-2 bg-mainY"
      />
      <input
        type="radio"
        name={name}
        value={4}
        onChange={() => setRating(4)}
        className="mask mask-star-2 bg-mainY"
      />
      <input
        type="radio"
        name={name}
        value={5}
        onChange={() => setRating(5)}
        className="mask mask-star-2 bg-mainY"
      />
    </div>
  );
};

export default RatingStar;
