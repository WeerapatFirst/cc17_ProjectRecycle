import { useState } from "react";
import Input from "../../components/Input";
import validateRegister from "../validators/validate-register";
import authApi from "../../apis/auth";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// import { Navigate } from "react-router-dom";

const initialInput = {
  firstname: "",
  lastname: "",
  phonenumber: "",
  email: "",
  password: "",
  confirmpassword: "",
};

const initialInputError = {
  firstname: "",
  lastname: "",
  phonenumber: "",
  email: "",
  password: "",
  confirmpassword: "",
};

export default function RegisterForm() {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);
  const navigate = useNavigate();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
    // setInputError({ ...initialInputError, [e.target.value]: "" });
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const error = validateRegister(input);
      if (error) {
        return setInputError(error);
      }

      // setInputError({ ...initialInput });
      setInputError(initialInputError);

      await authApi.register(input);

      // alert("สมัครสมาชิกสำเร็จ");
      toast.success("สมัครสมาชิกสำเร็จ");
      navigate("/login");
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response.data.field === "email")
          setInputError((prev) => ({
            ...prev,
            email: "อีเมลนี้ถูกใช้งานแล้ว",
          }));
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 flex justify-center">Register</h2>
      <form onSubmit={handleSubmitForm}>
        <div className="flex justify-between">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Firstname:
            </label>
            <Input
              placeholder="ชื่อ"
              value={input.firstname}
              name="firstname"
              onChange={handleChangeInput}
              error={inputError.firstname}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 ">
              Lastname:
            </label>
            <Input
              placeholder="นามสกุล"
              value={input.lastname}
              name="lastname"
              onChange={handleChangeInput}
              error={inputError.lastname}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            PhoneNumber:
          </label>
          <Input
            placeholder="เบอร์โทรศัพท์"
            value={input.phonenumber}
            name="phonenumber"
            onChange={handleChangeInput}
            error={inputError.phonenumber}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Email:
          </label>
          <Input
            type="email"
            placeholder="อีเมล"
            value={input.email}
            name="email"
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
            value={input.password}
            name="password"
            onChange={handleChangeInput}
            error={inputError.password}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            ConfirmPassword:
          </label>
          <Input
            type="password"
            placeholder="ยืนยันรหัสผ่าน"
            value={input.confirmpassword}
            name="confirmpassword"
            onChange={handleChangeInput}
            error={inputError.confirmpassword}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Register
        </button>
      </form>
    </div>
  );
}
