import React, { useEffect, useState } from "react";
import ButtonGlobal from "../../components/button/ButtonGlobal";
import Logo from "../Logo/Logo";
import User from "../User/User";
import Cookies from "js-cookie";
import { getData } from "../../Api/getDataUser";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userId } from "../../Redux/userId";
import { avatar } from "../../Redux/AvatarUser";
const HeaderAdmin = () => {
  const dispatch = useDispatch();
  const accessToken = Cookies.get("accessToken");
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState();
  useEffect(() => {
    if (!accessToken) {
      navigate("/SignIn");
      return;
    }
    getData(accessToken, setUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, update]);
  const handleLogoutSuccess = () => {
    setUser();
    navigate("/");
  };
  useEffect(() => {
    if (user && user.isAdmin === true) {
    } else if (user) {
      navigate("/signIn");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  if (user) {
    dispatch(userId(user.id));
    dispatch(avatar(user.userImage));
  }
  return (
    <>
      <div className="bg-slate-50 flex items-center justify-between py-4 px-16 w-full  text-[18px]">
        <Logo></Logo>
        <div className="flex items-center gap-5">
          <ButtonGlobal
            color="success"
            to="/admin/addNews"
            style={{
              height: "50px",
              fontSize: "16px",
              lineHeight: "50px",
              width: "180px",
            }}
          >
            Tin tức mới
          </ButtonGlobal>
          <ButtonGlobal
            color="success"
            to="/admin/addProduct"
            style={{
              height: "50px",
              width: "180px",
              fontSize: "16px",
              lineHeight: "50px",
            }}
          >
            Sản phẩm Mới
          </ButtonGlobal>
          {user ? (
            <User
              info={user}
              onLogoutSuccess={handleLogoutSuccess}
              setState={setUpdate}
            ></User>
          ) : (
            <div className="w-[50px] h-[50px] bg-white rounded-full">
              <img
                src="https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                alt=""
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HeaderAdmin;
