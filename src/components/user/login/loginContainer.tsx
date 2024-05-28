import { LoginData } from "@/type/types";
import { FindEmail, Login } from "@/api/userApi";
import LoginPresent from "./loginPresent";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isCheckPhone } from "@/utils/authUtils";
import { useAtom } from "jotai";
import { isTokenAtom } from "@/components/atom/auth";
import { userIdAtom } from "@/components/atom/userId";

export default function LoginContainer() {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [phone, setPhone] = useState<string>("");
  const [isToken, setIsTokn] = useAtom(isTokenAtom);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userId, setUserId] = useAtom<number>(userIdAtom);
  const [isModal, setIsModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleFormSubmit = async (
    e: React.MouseEvent<HTMLFormElement, MouseEvent>
  ) => {
    e.preventDefault();
    const loginState = await Login(formData);
    if (loginState?.success) {
      setIsTokn(!isToken);
      setUserId(loginState.id);
      navigate("/");
    }
  };
  const isClickFindId = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModal(!isModal);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };
  const getId = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    await FindEmail(phone);
  };
  //useMemo로 변경
  const isbuttonDisabled = !(formData.email && formData.password);
  const findButtonDisabled = useMemo(() => {
    return !isCheckPhone(phone);
  }, [phone]);
  return (
    <LoginPresent
      onFormSubmit={handleFormSubmit}
      handleChange={handleChange}
      isbuttonDisabled={isbuttonDisabled}
      isClickFindId={isClickFindId}
      isModal={isModal}
      handleChangePhone={handleChangePhone}
      getId={getId}
      findButtonDisabled={findButtonDisabled}
    />
  );
}
