import { useState } from "react";
import EditProfilePresnet from "./editProfilePresent";
import { ProfileData } from "@/type/types";
//import { useNavigate } from "react-router-dom";

export default function EditProfileContainer() {
  const [profile, setProfile] = useState<ProfileData>({
    nickname: "",
    aboutMe: "",
    webSite: "",
  });
  //const navigate = useNavigate();
  const handleEditProfile = (
    e: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) => {
    e.preventDefault();
    //navigate("/mypage");
    console.log(profile);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    console.log(value);
    setProfile({ ...profile, [name]: value });
  };
  return (
    <EditProfilePresnet
      handleEditProfile={handleEditProfile}
      handleChange={handleChange}
    />
  );
}
