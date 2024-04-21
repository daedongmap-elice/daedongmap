import { FC } from "react";

interface ThumbnailProps {
  imgName: string;
}

const Thumbnail: FC<ThumbnailProps> = ({ imgName }) => {
  return (
    <>
      <a href="/detail">
        <img src={`img/${imgName}`} alt="" className="w-full" />
      </a>
    </>
  );
};

export default Thumbnail;
