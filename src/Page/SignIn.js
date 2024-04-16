import React, { useEffect, useState } from "react";
import Input from "../components/input/Input";
import ButtonGlobal from "../components/button/ButtonGlobal";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { validateSignIn } from "../Validation/validateSignIn";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import Logo from "../Layouts/Logo/Logo";
import { urlApi } from "../Api/urlApi";

const SignIn = () => {
  const [data, setData] = useState({});
  const [infoResData, setInfoResData] = useState();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validateSignIn),
    mode: "onChange",
  });

  const postLogin = (email, password) => {
    axios
      .post(`${urlApi}/login`, {
        email: email,
        password: password,
      })
      .then(function (response) {
        setInfoResData(response.data.status);
        if (response.data.status === "Success") {
          if (response.data.user.isAdmin) {
            toast.success("Bạn đã đăng nhập thành công", {
              pauseOnHover: false,
            });
            Cookies.set("accessToken", response.data.accessToken);
            navigate("/admin/dashboard");
          } else {
            toast.success("Bạn đã đăng nhập thành công", {
              pauseOnHover: false,
            });
            Cookies.set("accessToken", response.data.accessToken);
            navigate("/");
          }
        } else {
          toast.error("Tài khoản hoặc mật khẩu không đúng", {
            pauseOnHover: false,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleSubmitSignIn = (value) => {
    if (!isValid) return;
    setData(value);
  };

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      postLogin(data.email, data.password);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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

  useEffect(() => {
    reset({
      email: "",
      password: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoResData]);
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
        <form onSubmit={handleSubmit(handleSubmitSignIn)}>
          <div className="mb-12">
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
              label="Mật khẩu"
              type="password"
              color={errors.password ? "error" : "success"}
              control={control}
              name="password"
            ></Input>
          </div>

          <ButtonGlobal
            type="submit"
            style={{ fontSize: "20px", height: "50px", width: "100%" }}
            color="success"
          >
            Đăng nhập
          </ButtonGlobal>
          <div className="text-center mt-4 text-lg">
            Bạn chưa có tài khoản?{" "}
            <NavLink className="text-green-600 font-medium" to="/SignUp">
              Tạo tài khoản
            </NavLink>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default SignIn;
