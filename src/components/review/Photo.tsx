import { FC } from "react";

interface ImgProps {
  imgName: string;
}

const Photo: FC<ImgProps> = ({ imgName }) => {
  return (
    <>
      <img src={`img/${imgName}`} alt="" className="w-full" />
    </>
  );
};

export default Photo;
