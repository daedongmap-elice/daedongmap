import { atom } from "jotai";
import { getToken } from "@/utils/useToken";
export const TokenAtom = atom(false);
const isToken = getToken();

export const isTokenAtom = atom(
  (get) => get(TokenAtom),
  (get, set) => {
    set(TokenAtom, isToken);
  }
);
