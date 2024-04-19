import Logo from "../../components/review/ReviewGallery/Logo";
import SelectLocation from "../../components/review/ReviewGallery/SelectLocation";
import SelectSort from "../../components/review/ReviewGallery/SelectSort";
import Thumbnail from "../../components/review/ReviewGallery/Thumbnail";
import BottomNavbar from "../../components/BottomNavbar";

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
        <Thumbnail imgName="sample1.png" />
        <Thumbnail imgName="sample2.png" />
        <Thumbnail imgName="sample3.png" />
        <Thumbnail imgName="sample4.png" />
        <Thumbnail imgName="sample1.png" />
        <Thumbnail imgName="sample2.png" />
        <Thumbnail imgName="sample3.png" />
        <Thumbnail imgName="sample4.png" />
        <Thumbnail imgName="sample1.png" />
        <Thumbnail imgName="sample2.png" />
        <Thumbnail imgName="sample3.png" />
        <Thumbnail imgName="sample4.png" />
        <Thumbnail imgName="sample1.png" />
        <Thumbnail imgName="sample2.png" />
        <Thumbnail imgName="sample3.png" />
        <Thumbnail imgName="sample4.png" />
        <Thumbnail imgName="sample1.png" />
        <Thumbnail imgName="sample2.png" />
        <Thumbnail imgName="sample3.png" />
        <Thumbnail imgName="sample4.png" />
        <Thumbnail imgName="sample1.png" />
        <Thumbnail imgName="sample2.png" />
        <Thumbnail imgName="sample3.png" />
        <Thumbnail imgName="sample4.png" />
        <Thumbnail imgName="sample1.png" />
        <Thumbnail imgName="sample2.png" />
        <Thumbnail imgName="sample3.png" />
        <Thumbnail imgName="sample4.png" />
        <Thumbnail imgName="sample1.png" />
        <Thumbnail imgName="sample2.png" />
        <Thumbnail imgName="sample3.png" />
        <Thumbnail imgName="sample4.png" />
        <Thumbnail imgName="sample1.png" />
        <Thumbnail imgName="sample2.png" />
        <Thumbnail imgName="sample3.png" />
        <Thumbnail imgName="sample4.png" />
        <Thumbnail imgName="sample1.png" />
        <Thumbnail imgName="sample2.png" />
        <Thumbnail imgName="sample3.png" />
        <Thumbnail imgName="sample4.png" />
        <Thumbnail imgName="sample1.png" />
        <Thumbnail imgName="sample2.png" />
        <Thumbnail imgName="sample3.png" />
        <Thumbnail imgName="sample4.png" />
        <Thumbnail imgName="sample1.png" />
        <Thumbnail imgName="sample2.png" />
        <Thumbnail imgName="sample3.png" />
        <Thumbnail imgName="sample4.png" />
        <Thumbnail imgName="sample1.png" />
        <Thumbnail imgName="sample2.png" />
        <Thumbnail imgName="sample3.png" />
        <Thumbnail imgName="sample4.png" />
        <Thumbnail imgName="sample1.png" />
        <Thumbnail imgName="sample2.png" />
        <Thumbnail imgName="sample3.png" />
        <Thumbnail imgName="sample4.png" />
      </div>
      <BottomNavbar />
    </>
  );
}
