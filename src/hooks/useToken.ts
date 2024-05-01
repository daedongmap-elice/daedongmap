export const getToken = () => {
  const token: string | null = localStorage.getItem("accessToken");
  if (token == null) {
    return false;
  }
  return true;
};
