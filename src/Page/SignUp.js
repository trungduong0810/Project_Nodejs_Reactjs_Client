import React, { useEffect, useState } from "react";
import Input from "../components/input/Input";
import ButtonGlobal from "../components/button/ButtonGlobal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateSignUp } from "../Validation/validataSignUp";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "../Layouts/Logo/Logo";
import { urlApi } from "../Api/urlApi";
const SignUp = () => {
  const [data, setData] = useState({});
  const [infoResData, setInfoResData] = useState();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validateSignUp),
    mode: "onChange",
  });
  const postData = (username, email, password) => {
    axios
      .post(`${urlApi}/api/users`, {
        username: username,
        email: email,
        password: password,
      })
      .then(function (response) {
        setInfoResData(response.data.status);
        if (response.data.status === "Success") {
          Swal.fire({
            title: "Thành công",
            text: "Bạn đã tạo tài khoản thành công",
            icon: "success",
          }).then(() => navigate("/SignIn"));
        } else {
          Swal.fire({
            icon: "error",
            title: "Lỗi rồi",
            text: "Tài khoản đã tồn tại",
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmitSignUp = (value) => {
    if (!isValid) return;
    setData(value);
    console.log(value);
  };

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      postData(data.username, data.email, data.password);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    reset({
      username: "",
      email: "",
      password: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoResData]);

  useEffect(() => {
    const errorKeys = Object.keys(errors);
    if (errorKeys.length > 0) {
      const firstErrorKey = errorKeys[0];
      document.getElementsByName(firstErrorKey)[0].focus();
      toast.error(errors[firstErrorKey].message, {
        pauseOnHover: false,
      });
    }
  }, [errors]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      {/* <img
        src="https://bizweb.dktcdn.net/100/372/651/themes/802187/assets/bg_breadcrumb.jpg?1706031035076"
        alt=""
        className="h-[100vh] w-[100vw]"
      /> */}
      <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] laptop:w-[450px] mobile:w-[90%]">
        <div className="mb-12">
          <Logo className="mx-auto"></Logo>
        </div>
        <form onSubmit={handleSubmit(handleSubmitSignUp)}>
          <Input
            className="w-full"
            label="Tên"
            type="text"
            color={errors.username ? "error" : "success"}
            control={control}
            name="username"
          ></Input>
          <Input
            className="w-full"
            label="Email"
            type="email"
            color={errors.email ? "error" : "success"}
            control={control}
            name="email"
          ></Input>
          <Input
            className="w-full"
            label="Tạo mật khẩu"
            type="password"
            color={errors.password ? "error" : "success"}
            control={control}
            name="password"
          ></Input>
          <Input
            className="w-full"
            label="Xác nhận mật khẩu"
            type="password"
            color={errors.confirmPassword ? "error" : "success"}
            control={control}
            name="confirmPassword"
          ></Input>
          <ButtonGlobal
            type="submit"
            className="w-full mt-7"
            style={{ fontSize: "20px", height: "50px", width: "100%" }}
            color="success"
          >
            Tạo tài khoản
          </ButtonGlobal>
          <div className="text-center mt-6 text-lg">
            Bạn đã có tài khoản?
            <NavLink className="text-green-600 font-medium ml-2" to="/SignIn">
              Đăng nhập
            </NavLink>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default SignUp;
