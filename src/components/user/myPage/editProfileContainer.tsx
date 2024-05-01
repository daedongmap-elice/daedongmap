import { useRef, useState } from "react";
import EditProfilePresnet from "./editProfilePresent";
import { ProfileData } from "@/type/types";
import { axiosClient } from "@/hooks/useAuth";
//import { useNavigate } from "react-router-dom";

export default function EditProfileContainer() {
  const [profile, setProfile] = useState<ProfileData>({
    nickname: "",
    status: "",
    webSite: "",
  });
  const [imgFile, setImgFile] = useState<string[]>([]);
  const upload = useRef<HTMLInputElement>(null);
  //const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  const headers = { Authorization: `Bearer ${accessToken}` };
  const editProfile = async (info: ProfileData) => {
    try {
      const res = await axiosClient.put(`/user`, info, { headers });
      if (res.status === 200) {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditProfile = (
    e: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) => {
    e.preventDefault();
    editProfile(profile);
    //navigate("/mypage");
    console.log(profile);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };
  const imgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (upload.current && upload.current.files) {
      const file = upload.current.files[0];
      console.log(upload.current.files);
      console.log(imgFile);
      setImgFile([URL.createObjectURL(file)]);
    }
  };
  return (
    <EditProfilePresnet
      handleEditProfile={handleEditProfile}
      handleChange={handleChange}
      upload={upload}
      imgUpload={imgUpload}
      imgFile={imgFile}
    />
  );
}
