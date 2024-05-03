import { LoginData } from "@/type/types";
import { Login } from "@/hooks/useAuth";
import LoginPresent from "./loginPresent";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginContainer() {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleFormSubmit = async (
    e: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) => {
    e.preventDefault();
    const loginState = await Login(formData);
    //window.location.href = "/mypage";
    if (loginState) {
      navigate("/mypage");
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  //useMemo로 변경
  const isbuttonDisabled = !(formData.email && formData.password);
  return (
    <LoginPresent
      onFormSubmit={handleFormSubmit}
      handleChange={handleChange}
      isbuttonDisabled={isbuttonDisabled}
    />
  );
}
