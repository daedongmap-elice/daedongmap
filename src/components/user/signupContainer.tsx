import { useState } from "react";
import SignUpPresent from "./signupPresent";

interface SignUpData {
  email: string;
  password: string;
  nickname: string;
  phoneNumber: string;
}

export default function SignUpContainer() {
  const [formData, setFormData] = useState<SignUpData>({
    email: "",
    password: "",
    nickname: "",
    phoneNumber: "",
  });

  const handleFormSubmit = (
    e: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(formData);
    alert("클릭했습니다.");
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <SignUpPresent
      onFormSubmit={handleFormSubmit}
      handleChange={handleInputChange}
    />
  );
}
