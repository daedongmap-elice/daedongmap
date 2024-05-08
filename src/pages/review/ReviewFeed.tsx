import axios from "axios";
import ReviewDetail from "./ReviewDetail";
import { useEffect, useState } from "react";
import { ReviewDetailResponse } from "@/type/types";
import { useParams } from "react-router-dom";

const ReviewFeed = () => {
  const [dataArray, setDataArray] = useState<
    ReviewDetailResponse[] | undefined
  >(undefined);
  const token = localStorage.getItem("accessToken");
  const params = useParams();

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://35.232.243.53:8080/api/reviews/places/${params.placeId}`,
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
    <>
      {dataArray?.map((data) => <ReviewDetail type="feed" feedData={data} />)}
    </>
  );
};

export default ReviewFeed;
