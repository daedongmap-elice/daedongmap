import { useState } from "react";
//import { signUp } from "@/hooks/useAuth";
import { SignUpData } from "@/type/types";
import { isValidationEmail, isCheckPassword } from "@/utils/authUtils";
import SignUpPresent from "./signupPresent";

export default function SignUpContainer() {
  const [formData, setFormData] = useState<SignUpData>({
    email: "",
    password: "",
    nickname: "",
    phoneNumber: "",
  });
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [checkPassword, setCheckPassword] = useState<string>("");
  const handleFormSubmit = (
    e: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(formData);
    console.log(isEmail, isPassword);
    //signUp(formData);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value == "") {
      setIsEmail(!isEmail);
      setIsPassword(!isPassword);
    }
    setFormData({ ...formData, [name]: value });
    if (name == "checkPassword") {
      setCheckPassword(value);
    }
    setIsEmail(isValidationEmail(formData.email));
    setIsPassword(isCheckPassword(formData.password, checkPassword));
  };
  const isButtonDisabled = !(
    isEmail &&
    isPassword &&
    formData.nickname &&
    formData.phoneNumber
  );
  return (
    <SignUpPresent
      onFormSubmit={handleFormSubmit}
      handleChange={handleInputChange}
      isEmail={isEmail}
      isPassword={isPassword}
      buttonDisabled={isButtonDisabled}
    />
  );
}
