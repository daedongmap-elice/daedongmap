import { ReviewResponse } from "@/type/types";
import axiosClient from "@/utils/baseUrl";

export const getReview = async (
  setReviews: (reviews: ReviewResponse[]) => void
) => {
  try {
    const { status, data } = await axiosClient.get(`/reviews/users/me`);
    if (status === 200) {
      setReviews(data);
    }
  } catch (error) {
    console.log(error);
  }
};
