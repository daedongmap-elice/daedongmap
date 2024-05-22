import ReviewDetail from "./ReviewDetail";
import { useEffect, useState } from "react";
import { ReviewResponse } from "@/type/types";
import PerfectScrollar from "react-perfect-scrollbar";
import { useParams } from "react-router-dom";
import axiosClient from "@/utils/baseUrl";

const ReviewFeed = () => {
  const [dataArray, setDataArray] = useState<ReviewResponse[] | undefined>(
    undefined
  );
  const token = localStorage.getItem("accessToken");
  const { placeId: currentPlaceId } = useParams();

  const getData = async () => {
    try {
      const response = await axiosClient.get(
        `/reviews/places/${currentPlaceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setDataArray(response.data);
    } catch (error) {
      console.error("리뷰상세 get요청 에러", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="pb-12">
      <PerfectScrollar>
        {dataArray?.map((data, i) => (
          <ReviewDetail key={i} type="feed" feedData={data} />
        ))}
      </PerfectScrollar>
    </div>
  );
};

export default ReviewFeed;
