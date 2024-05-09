import { UserInfo } from "@/type/types";
import { atomWithStorage } from "jotai/utils";

export const profileAtom = atomWithStorage<UserInfo>("profile", {
  profileImage: "",
  nickName: "",
  status: "",
  webSite: "",
});
