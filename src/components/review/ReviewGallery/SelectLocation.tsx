export default function SelectLocation() {
  return (
    <>
      <select className="min-h-8 h-8 select select-ghost w-fit max-w-xs">
        <option selected>전국</option>
        <option>서울</option>
        <option>경기도</option>
        <option>강원도</option>
        <option>충청도</option>
        <option>경상도</option>
        <option>전라도</option>
        <option>제주도</option>
      </select>
    </>
  );
}
