import { useEffect, useState } from "react";
import { getProfile } from "@/hooks/useAuth";
import MyPagePresent from "./mypagePresent";

export default function MyPageContainer() {
  const [profile, setProfile] = useState({});
  useEffect(() => {
    setProfile(getProfile());
  }, []);
  console.log(profile);
  return <MyPagePresent></MyPagePresent>;
}
