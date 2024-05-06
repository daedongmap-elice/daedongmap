export const isValidationEmail = (email: string): boolean => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};

export const isCheckPassword = (
  password: string,
  checkPassword: string
): boolean => {
  if (password.length >= 8) {
    if (password === checkPassword) {
      return true;
    }
    return false;
  }
  return false;
};

export const isCheckDelete = (message: string) => {
  if (message === "회원탈퇴") {
    return true;
  }
  return false;
};
