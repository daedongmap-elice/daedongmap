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
  const formData = new FormData();
  const [imgFile, setImgFile] = useState<string[]>(["img/sample1.png"]);
  const upload = useRef<HTMLInputElement>(null);
  //const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");

  const editProfile = async () => {
    if (!formData) {
      return console.error("formData가 유효하지 않습니다.");
    }
    try {
      const res = await axiosClient.put(
        `/user`,
        {
          file: formData.get("file"),
          userUpdateDto: {
            nickName: profile.nickname,
            status: profile.status,
            webSite: profile.webSite,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
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
    editProfile();
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
      console.log(imgFile);
      console.log(upload.current.files);
      setImgFile([URL.createObjectURL(file)]);
      formData.append("file", file);
      // formData.append("nickName", profile.nickname);
      // formData.append("status", profile.status);
      // formData.append("webSite", profile.webSite);
    }
  };
  const handleButtonClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (upload.current) return upload.current.click();
  };
  return (
    <EditProfilePresnet
      handleEditProfile={handleEditProfile}
      handleChange={handleChange}
      upload={upload}
      imgUpload={imgUpload}
      imgFile={imgFile}
      handleButtonClick={handleButtonClick}
    />
  );
}
