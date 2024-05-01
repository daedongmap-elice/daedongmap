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
  const handleFormSubmit = (
    e: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) => {
    e.preventDefault();
    Login(formData);
    //window.location.href = "/mypage";
    navigate("/mypage");
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
