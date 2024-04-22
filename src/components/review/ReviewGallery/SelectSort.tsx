export default function SelectSort() {
  return (
    <>
      <select className="min-h-8 h-8 select select-ghost w-fit max-w-xs">
        <option selected>추천순</option>
        <option>인기순</option>
        <option>최신순</option>
      </select>
    </>
  );
}
