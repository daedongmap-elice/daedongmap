import Logo from "../../components/review/ReviewGallery/Logo";
import SelectLocation from "../../components/review/ReviewGallery/SelectLocation";
import SelectSort from "../../components/review/ReviewGallery/SelectSort";
import Photo from "../../components/review/Photo";

export default function ReviewGallery() {
  return (
    <>
      <div className="flex justify-between mb-2">
        <Logo />
        <div>
          <SelectSort />
          <SelectLocation />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-px">
        <Photo imgName="sample1.png" />
        <Photo imgName="sample2.png" />
        <Photo imgName="sample3.png" />
        <Photo imgName="sample4.png" />
      </div>
    </>
  );
}
