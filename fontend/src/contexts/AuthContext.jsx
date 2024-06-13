import { useState } from "react";
import { createContext } from "react";
import authApi from "../apis/auth";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from "../utils/local-storage";
import { useEffect } from "react";
// import userApi from "../apis/auth";

export const AuthContext = createContext();

// 1.fetch on remder: fetch after first render
// 2.fetch then render: promise all feature
// 3.render as you fetch eg. react-query swr, react version 19 use(promise)

export default function AuthContextProvider({ children }) {
  const [authUser, setAuthUser] = useState(null);
  const [isAuthUserLoading, setIsAuthUserLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (getAccessToken()) {
          const res = await authApi.getAuthUser();
          setAuthUser(res.data.user);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsAuthUserLoading(false);
      }
    };

    fetchUser();
  }, []);
  // useEffect(() => console.log("thid id auth", authUser), [authUser]);

  // ใช้ปัจจุบัน
  // const login = async (credentials) => {
  //   const res = await authApi.login(credentials);
  //   setAccessToken(res.data.accessToken);
  //   const resGetAuthUser = await authApi.getAuthUser();
  //   // console.log(resGetAuthUser);
  //   setAuthUser(resGetAuthUser.data.user);
  //   // console.log(resGetAuthUser.data.user);
  // };

  // ทดสอบ 12-06-67
  const login = async (credentials) => {
    setIsAuthUserLoading(true);
    try {
      const res = await authApi.login(credentials);
      setAccessToken(res.data.accessToken);
      const resGetAuthUser = await authApi.getAuthUser();
      setAuthUser(resGetAuthUser.data.user);
    } finally {
      setIsAuthUserLoading(false);
    }
  };

  const logout = () => {
    removeAccessToken();
    setAuthUser(null);
  };

  // const updateAuthUser = async (formData) => {
  //   const res = await userApi.uploadUserImage(formData);
  //   setAuthUser((prev) => ({ ...prev, ...res.data }));
  // };

  return (
    <AuthContext.Provider
      value={{
        login: login,
        logout: logout,
        authUser: authUser,
        isAuthUserLoading: isAuthUserLoading,
        // updateAuthUser: updateAuthUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
