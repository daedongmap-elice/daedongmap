import { FC } from "react";

interface ThumbnailProps {
  imgName: string;
}

const Thumbnail: FC<ThumbnailProps> = ({ imgName }) => {
  return (
    <>
      <img src={`img/${imgName}`} alt="" className="w-full" />
    </>
  );
};

export default Thumbnail;
