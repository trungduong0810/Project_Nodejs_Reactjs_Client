import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faKaaba,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { CSSTransition } from "react-transition-group";
import ModalGlobal from "../../components/Modal/ModalGlobal";
import { NavLink, useNavigate } from "react-router-dom";
import UploadAvatarUser from "../../Admin/Upload/UploadAvatarUser";
import { updateApi } from "../../Api/updateApi";
import { useDispatch } from "react-redux";
import { changeAvatar } from "../../Redux/RenderchangeAvatarUser";
import { urlApi } from "../../Api/urlApi";
const User = ({ onLogoutSuccess, info, setState }) => {
  const dispatch = useDispatch();
  const [imageUser, setImageUser] = useState("");
  const [handleEmptyImgUpload, setHandleEmptyImgUpload] = useState(false);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();
  const [showMenuUser, setShowMenuUser] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (setState) {
      setState(update);
    }
  }, [update, setState]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (showMenuUser && !event.target.closest(".logout-menu")) {
        setShowMenuUser(false);
      }
    }
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [showMenuUser]);

  const handleModal = () => {
    setOpenModal(true);
    setShowMenuUser(false);
  };
  const handleLogout = async () => {
    Swal.fire({
      title: "Bạn muốn đăng xuất tài khoản?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy bỏ",
    }).then(async (result) => {
      if (result.isConfirmed) {
        Cookies.remove("accessToken");
        if (onLogoutSuccess) {
          onLogoutSuccess();
          navigate("/");
          Swal.fire({
            title: "Thành công",
            text: "Bạn đã đăng xuất tài khoản thành công",
            icon: "success",
          });
        }
      }
    });
  };

  const updateImageUser = (userId, userImage) => {
    updateApi(
      `${urlApi}/api/users/${userId}`,
      {
        userImage: userImage,
      },
      setUpdate
    );
    setOpenModal(false);
  };

  return (
    <div>
      <div className="laptop:w-[50px] laptop:h-[50px] mobile:w-[30px] mobile:h-[30px] bg-white rounded-full relative cursor-pointer logout-menu flex flex-col items-center justify-center ">
        {info && info?.userImage ? (
          <img
            onClick={() => setShowMenuUser(!showMenuUser)}
            src={info.userImage}
            alt=""
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <img
            onClick={() => setShowMenuUser(!showMenuUser)}
            src="https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
            alt=""
            className="w-full h-full rounded-full object-cover"
          />
        )}

        {showMenuUser && (
          <div className="laptop:w-[150px] mobile:w-[150px] cursor-pointer bg-slate-400 absolute bottom-0 left-1/2 laptop:translate-x-[-50%] mobile:translate-x-[-100%] laptop:translate-y-[110%] mobile:translate-y-[110%] text-center z-50 rounded-xl overflow-hidden">
            <div className="flex flex-col items-center justify-center laptop:text-lg text-white font-semibold mobile:text-[14px]">
              <div
                className="laptop:py-3 px-5 mobile:py-2 w-full hover:bg-slate-900 transition-all flex items-center gap-2"
                onClick={handleLogout}
              >
                <FontAwesomeIcon icon={faRightFromBracket} />
                <span>Log out</span>
              </div>
              <div
                onClick={handleModal}
                className="laptop:py-3 mobile:py-2 px-5 w-full hover:bg-slate-900 transition-all flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faCircleInfo} />
                <span>Thông tin</span>
              </div>
              {info && info.isAdmin === true && (
                <NavLink to="/admin/dashboard" className="w-full">
                  <div className="py-3 px-5 hover:bg-slate-900 transition-all flex items-center gap-2">
                    <FontAwesomeIcon icon={faKaaba} />
                    <span>Quản lý</span>
                  </div>
                </NavLink>
              )}
            </div>
          </div>
        )}
      </div>

      {/* modal information user  */}
      <div>
        <CSSTransition
          in={openModal}
          timeout={250}
          unmountOnExit
          classNames="zoom"
        >
          <ModalGlobal
            visible={openModal}
            onclose={() => setOpenModal(false)}
            containerClass="flex items-center justify-center"
            bodyClass="laptop:w-[30%] mobile:w-[90%] bg-white p-7 p-b rounded-lg infoUser"
            styleBody={{
              transition: "all 0.25s linear",
            }}
          >
            <div className="text-black text-center bg-white">
              <h2 className="text-2xl font-bold  mb-4 text-teal-600">
                Thông tin tài khoản
              </h2>

              <UploadAvatarUser
                setImageValue={setImageUser}
                click={setHandleEmptyImgUpload}
              ></UploadAvatarUser>

              <div>
                <div className="w-full text-left text-[17px] font-medium mt-7">
                  <div>
                    <div className="w-full flex items-center py-2 text-gray-400">
                      <label className="w-[25%] block">Tên </label>
                      <span className="text-gray-900 w-[75%]">
                        {info.username}
                      </span>
                    </div>
                    <div className="w-full flex items-center py-2 text-gray-400">
                      <label className="w-[25%] block">Email </label>
                      <span className="text-gray-900 w-[75%]">
                        {info.email}
                      </span>
                    </div>
                    <div className="w-full flex items-center py-2 text-gray-400">
                      <label className="w-[25%] block">Mật khẩu </label>
                      <span className="text-gray-900 w-[75%]">
                        {info.password}
                      </span>
                    </div>
                  </div>
                  {imageUser && (
                    <div
                      onClick={() => {
                        updateImageUser(info.id, imageUser);
                        dispatch(changeAvatar(update));
                      }}
                      className="flex items-center justify-center gap-3 text-[20px] font-normal text-white text-center py-[6px] rounded-lg mt-7 w-full bg-green-800 cursor-pointer hover:opacity-70 transition-all"
                    >
                      <h3>Cập nhật</h3>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </ModalGlobal>
        </CSSTransition>
      </div>
    </div>
  );
};

export default User;
