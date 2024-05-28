import { atom } from "jotai";
import { ReviewResponse } from "@/type/types";

export const reviewAtom = atom<ReviewResponse[]>([]);
