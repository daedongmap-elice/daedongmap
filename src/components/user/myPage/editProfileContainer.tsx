import { useRef, useState } from "react";
import EditProfilePresnet from "./editProfilePresent";
import { UserInfo } from "@/type/types";
import { axiosClient } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { profileAtom } from "@/components/atom/auth";
import { useAtom } from "jotai";

export default function EditProfileContainer() {
  const [profile, setProfile] = useAtom<UserInfo>(profileAtom);
  const [img, setImg] = useState<any>();
  const formData = new FormData();
  const [imgFile, setImgFile] = useState<string[]>([profile.profileImage]);
  const upload = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const imgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (upload.current && upload.current.files) {
      const file = upload.current.files[0];
      setImgFile([URL.createObjectURL(file)]);
      setImg(file);
    }
  };

  const editProfile = async () => {
    if (!formData) {
      return console.error("formData가 유효하지 않습니다.");
    }
    const profileJSON = JSON.stringify(profile);
    formData.append("file", img);
    formData.append(
      "userUpdateDto",
      new Blob([profileJSON], { type: "application/json" })
    );
    try {
      await axiosClient.put(
        `/user`,
        {
          file: formData.get("file"),
          userUpdateDto: formData.get("userUpdateDto"),
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditProfile = (
    e: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) => {
    e.preventDefault();
    editProfile();
    navigate("/mypage");
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
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
      profile={profile}
    />
  );
}
