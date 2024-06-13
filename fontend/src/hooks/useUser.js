import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function useUser() {
  return useContext(AuthContext);
}
