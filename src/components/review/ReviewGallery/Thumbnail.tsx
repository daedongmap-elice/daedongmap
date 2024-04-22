interface ThumbnailProps {
  imageUrl: string;
}

const Thumbnail: React.FC<ThumbnailProps> = ({ imageUrl }) => {
  return (
    <>
      <a href="/detail">
        <img src={imageUrl} alt="" className="w-full" />
      </a>
    </>
  );
};

export default Thumbnail;
