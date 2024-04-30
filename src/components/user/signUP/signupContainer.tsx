import { useMemo, useState } from "react";
import { signUp } from "@/hooks/useAuth";
import { SignUpData } from "@/type/types";
import { isValidationEmail, isCheckPassword } from "@/utils/authUtils";
import SignUpPresent from "./signupPresent";
import { useNavigate } from "react-router-dom";

export default function SignUpContainer() {
  const [formData, setFormData] = useState<SignUpData>({
    email: "",
    password: "",
    checkPassword: "",
    nickName: "",
    phoneNumber: "",
  });
  const [isEmail, setIsEmail] = useState<boolean>(true);
  const [isPassword, setIsPassword] = useState<boolean>(true);
  const [pwLength, setPwLength] = useState<number>(0);
  const navigate = useNavigate();
  const handleFormSubmit = (
    e: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(formData);
    signUp(formData);
    navigate("/login");
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (formData.email) {
      setIsEmail(isValidationEmail(formData.email));
    }
    if (formData.password) {
      setPwLength(formData.password.length);
    }
    if (formData.checkPassword && formData.password) {
      setIsPassword(isCheckPassword(formData.password, formData.checkPassword));
    }
  };

  const isButtonDisabled = useMemo(() => {
    return !(
      isEmail &&
      isPassword &&
      formData.nickName &&
      formData.phoneNumber
    );
  }, [isEmail, isPassword, formData.nickName, formData.phoneNumber]);
  return (
    <SignUpPresent
      onFormSubmit={handleFormSubmit}
      handleChange={handleInputChange}
      isEmail={isEmail}
      isPassword={isPassword}
      buttonDisabled={isButtonDisabled}
      pwLength={pwLength}
    />
  );
}
