import React, { useEffect, useState } from "react";
import Logo from "../Logo/Logo";
import ButtonGlobal from "../../components/button/ButtonGlobal";
import Nav from "../Nav/Nav";
import User from "../User/User";
import Cookies from "js-cookie";
import Cart from "../Cart/Cart";
import { getData } from "../../Api/getDataUser";
import { useDispatch } from "react-redux";
import { userId } from "../../Redux/userId";
import { avatar } from "../../Redux/AvatarUser";
import HeaderResponsive from "../../responsive/Header";

const Header = () => {
  const dispatch = useDispatch();
  const accessToken = Cookies.get("accessToken");
  const [user, setUser] = useState(null);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    getData(accessToken, setUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, update]);
  const handleLogoutSuccess = () => {
    setUser(null);
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  if (user) {
    dispatch(userId(user.id));
    dispatch(avatar(user.userImage));
  }
  return (
    <>
      <div className="bg-white flex items-center justify-between h-[80px] laptop:px-16 desktop:px-16 fixed top-0 z-50 w-[100vw] text-[18px] border-b-2 shadow-lg mobile:px-3 mobile:fixed mobile:top-0">
        <HeaderResponsive></HeaderResponsive>
        <Logo className=""></Logo>
        <Nav></Nav>
        <div className="flex items-center gap-7">
          {user ? (
            <div className="flex items-center justify-center gap-2">
              <Cart userId={user.id}></Cart>
              <User
                onLogoutSuccess={handleLogoutSuccess}
                info={user}
                setState={setUpdate}
              ></User>
            </div>
          ) : (
            <div
              className={`flex items-center gap-2 opacity-100 laptop:flex desktop:flex mobile:hidden ${
                user ? "hidden" : ""
              }`}
            >
              <ButtonGlobal
                to="/signUp"
                color="success"
                style={{
                  height: "40px",
                  fontSize: "14px",
                  lineHeight: "40px",
                  backgroundColor: "#aaa8b0",
                  textTransform: "none",
                  fontWeight: "500",
                  width: "110px",
                }}
              >
                Đăng ký
              </ButtonGlobal>
              <ButtonGlobal
                to="/signIn"
                color="success"
                style={{
                  height: "40px",
                  width: "110px",
                  fontSize: "14px",
                  lineHeight: "40px",
                  backgroundColor: "black",
                  textTransform: "none",
                }}
              >
                Đăng nhập
              </ButtonGlobal>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
