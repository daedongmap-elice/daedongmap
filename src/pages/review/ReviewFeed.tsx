import axios from "axios";
import ReviewDetail from "./ReviewDetail";
import { useEffect, useState } from "react";
import { ReviewResponse } from "@/type/types";
import PerfectScrollar from "react-perfect-scrollbar";

const ReviewFeed = () => {
  const [dataArray, setDataArray] = useState<ReviewResponse[] | undefined>(
    undefined
  );
  const token = localStorage.getItem("accessToken");
  const currentPlaceId = window.location.hash.substring(1);

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://35.232.243.53:8080/api/reviews/places/${currentPlaceId}`,
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
    <PerfectScrollar>
      {dataArray?.map((data) => <ReviewDetail type="feed" feedData={data} />)}
    </PerfectScrollar>
  );
};

export default ReviewFeed;
