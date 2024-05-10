import { UserInfo } from "@/type/types";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const profileAtom = atom<UserInfo>({
  profileImage: "",
  nickName: "",
  status: "",
  webSite: "",
});

export const isTokenAtom = atomWithStorage<boolean>("isToken", false);
