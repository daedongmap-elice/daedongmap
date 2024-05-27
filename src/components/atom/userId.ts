import { atom } from "jotai";

interface UserId {
  userId: number;
}

export const userId = atom<UserId>({
  userId: 0,
});
