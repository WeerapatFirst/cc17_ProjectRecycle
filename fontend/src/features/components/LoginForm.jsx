import { useState } from "react";
import Input from "../../components/Input";
import validateLogin from "../validators/validate-login";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
// import authApi from "../../apis/auth";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const initialInput = {
  email: "",
  password: "",
};

const initialInputError = {
  email: "",
  password: "",
};

export default function LoginForm() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [errorMessage, setErrorMessage] = useState("");

  // const handleSubmit = async (e) => {
  //   try {
  //     e.preventDefault();
  //     if (email === "" || password === "") {
  //       setErrorMessage("กรุณากรอกอีเมลและรหัสผ่าน");
  //     } else {
  //       setErrorMessage("");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = async (e) => {
    try {
      e.preventDefault();

      const error = validateLogin(input);
      if (error) {
        console.log(error);
        return setInputError(error);
      }

      setInputError(initialInputError);

      await login(input);

      // alert("ล็อกอินสำเร็จ");
      toast.success("ล็อกอินสำเร็จ");
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error instanceof AxiosError) {
        const message =
          error.response.status === 400
            ? "อีเมลหรือรหัสผ่านไม่ถูกต้อง"
            : "เกิดข้อผิดพลาดภายใน";
        setErrorMessage(message);
      } else {
        setErrorMessage("เกิดข้อผิดพลาดภายใน");
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 flex justify-center">Login</h2>
      <form onSubmit={handleSubmitForm}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <Input
            type="email"
            placeholder="อีเมล"
            name="email"
            value={input.email}
            onChange={handleChangeInput}
            error={inputError.email}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Password:
          </label>
          <Input
            type="password"
            placeholder="รหัสผ่าน"
            name="password"
            value={input.password}
            onChange={handleChangeInput}
            error={inputError.password}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Login
        </button>
        {errorMessage && (
          <p className="mt-2 text-red-500 text-sm flex justify-center">
            {errorMessage}
          </p>
        )}
      </form>
    </div>

    // ------------------------------------------------
    // <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
    //   <h2 className="text-2xl font-bold mb-4 flex justify-center">Login</h2>
    //   <form onSubmit={handleSubmit}>
    //     <div className="mb-4">
    //       <label className="block text-sm font-medium text-gray-700">
    //         Email:
    //       </label>
    //       <Input
    //         placeholder="อีเมล"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         // error={errorMessage}
    //       />
    //     </div>
    //     <div className="mb-4">
    //       <label className="block text-sm font-medium text-gray-700">
    //         Password:
    //       </label>
    //       <Input
    //         type="password"
    //         placeholder="รหัสผ่าน"
    //         name="password"
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </div>
    //     <button
    //       type="submit"
    //       className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //     >
    //       Login
    //     </button>
    //     {errorMessage && (
    //       <p className="mt-2 text-red-500 text-sm flex justify-center">
    //         {errorMessage}
    //       </p>
    //     )}
    //   </form>
    // </div>
  );
}
