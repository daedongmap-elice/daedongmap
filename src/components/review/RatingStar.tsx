interface RatingStarProps {
  item: string;
}

const RatingStar: React.FC<RatingStarProps> = ({ item }) => {
  return (
    <div id={item} className="rating rating-sm">
      <input
        type="radio"
        name="rating-6"
        className="mask mask-star-2 bg-mainY"
      />
      <input
        type="radio"
        name="rating-6"
        className="mask mask-star-2 bg-mainY"
      />
      <input
        type="radio"
        name="rating-6"
        className="mask mask-star-2 bg-mainY"
      />
      <input
        type="radio"
        name="rating-6"
        className="mask mask-star-2 bg-mainY"
      />
      <input
        type="radio"
        name="rating-6"
        className="mask mask-star-2 bg-mainY"
      />
    </div>
  );
};

export default RatingStar;
