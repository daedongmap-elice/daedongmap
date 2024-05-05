interface StarProps {
  name: string;
  rating: number | undefined;
}

const Star: React.FC<StarProps> = ({ name, rating }) => {
  return (
    <div className="rating rating-sm">
      <input
        type="radio"
        name={name}
        readOnly
        checked={rating === 1}
        className="mask mask-star-2 pointer-events-none bg-mainY"
      />
      <input
        type="radio"
        name={name}
        readOnly
        checked={rating === 2}
        className="mask mask-star-2 pointer-events-none bg-mainY"
      />
      <input
        type="radio"
        name={name}
        readOnly
        checked={rating === 3}
        className="mask mask-star-2 pointer-events-none bg-mainY"
      />
      <input
        type="radio"
        name={name}
        readOnly
        checked={rating === 4}
        className="mask mask-star-2 pointer-events-none bg-mainY"
      />
      <input
        type="radio"
        name={name}
        readOnly
        checked={rating === 5}
        className="mask mask-star-2 pointer-events-none bg-mainY"
      />
    </div>
  );
};

export default Star;
