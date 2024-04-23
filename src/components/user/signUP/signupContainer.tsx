import { useState } from "react";
//import { signUp } from "@/hooks/useAuth";
import { SignUpData } from "@/type/types";
import { isValidationEmail } from "@/utils/authUtils";
import SignUpPresent from "./signupPresent";

export default function SignUpContainer() {
  const [formData, setFormData] = useState<SignUpData>({
    email: "",
    password: "",
    nickname: "",
    phoneNumber: "",
  });
  const [isEmail, setIsEmail] = useState<boolean>(true);
  const handleFormSubmit = (
    e: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(formData);
    console.log(isEmail);
    //signUp(formData);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setIsEmail(isValidationEmail(formData.email));
  };
  return (
    <SignUpPresent
      onFormSubmit={handleFormSubmit}
      handleChange={handleInputChange}
      isEmail={isEmail}
    />
  );
}
