import Cookies from "js-cookie";

export const setUserCookie = (user: any, token?: string) => {
  Cookies.set("user", JSON.stringify(user), { expires: 7 });
  if (token) Cookies.set("auth_token", token, { expires: 7 });
};

export const getUserCookie = () => {
  const data = Cookies.get("user");
  return data ? JSON.parse(data) : null;
};

export const clearUserCookie = () => {
  Cookies.remove("user");
  Cookies.remove("auth_token");
};
