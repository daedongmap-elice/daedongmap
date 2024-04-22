export const getCookie = () => {
  const cookies = document.cookie;
  if (cookies == "") {
    return false;
  }
  return true;
};
