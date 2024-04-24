import { LoginData } from "@/type/types";
import LoginPresent from "./loginPresent";
import React, { useState } from "react";

export default function LoginContainer() {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleFormSubmit = (
    e: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(formData);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const isbuttonDisabled = !(formData.email && formData.password);
  return (
    <LoginPresent
      onFormSubmit={handleFormSubmit}
      handleChange={handleChange}
      isbuttonDisabled={isbuttonDisabled}
    />
  );
}
