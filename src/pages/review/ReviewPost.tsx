import { RatingStar, ImageInput, FindPlace } from "@/components/review/index";
// import React, { useState } from "react";
import axios from "axios";

export default function ReviewPost() {
  const handleSubmit = async () => {
    try {
      const response = await axios.post("/data", {
        content: "content",
      });
      console.log("데이터 전송 성공:", response.data);
    } catch (error) {
      console.error("데이터 전송 실패:", error);
    }
  };
  return (
    <>
      <div className="mb-6 ml-5 mt-4 text-lg font-medium">새 리뷰 등록하기</div>
      <div className="flex flex-col items-center justify-center gap-3">
        <div className="flex justify-center">
          <ImageInput />
        </div>
        <div className="mt-3 flex flex-col items-center justify-center gap-2 pl-5 pr-5 text-xs">
          <div className="flex items-center gap-1">
            <span className="min-w-6 text-center">맛</span>
            <RatingStar />
          </div>
          <div className="flex items-center gap-1">
            <span className="min-w-6">위생</span>
            <RatingStar />
          </div>
          <div className="mb-3 flex items-center gap-1">
            <span className="min-w-6">친절</span>
            <RatingStar />
          </div>
        </div>
        <button
          type="button"
          className="btn btn-outline btn-sm w-3/4 max-w-xs flex-col items-baseline border-gray-300 text-xs font-normal"
          onClick={() => document.getElementById("placeModal").showModal()}
        >
          장소 선택
        </button>
        <dialog id="placeModal" className="modal modal-bottom">
          <FindPlace />
        </dialog>
        <select
          required
          className="select select-bordered select-sm w-3/4 max-w-xs text-xs"
        >
          <option disabled defaultValue="default">
            분류 선택
          </option>
          <option value="korean">한식</option>
          <option value="chinese">중식</option>
          <option value="japanese">일식</option>
          <option value="Western">양식</option>
          <option value="other">기타</option>
        </select>
        <textarea
          required
          className="textarea textarea-bordered h-32 w-3/4 max-w-xs pt-3 text-xs"
          placeholder="리뷰 내용 입력..."
        ></textarea>
        <button
          onClick={handleSubmit}
          className="btn btn-sm mt-2 w-1/2 bg-mainY font-medium text-YbtnText"
        >
          리뷰 등록
        </button>
      </div>
    </>
  );
}
