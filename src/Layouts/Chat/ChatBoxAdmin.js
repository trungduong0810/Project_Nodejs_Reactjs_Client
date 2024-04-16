import React, { useState, useEffect, useRef } from "react";
import Logo from "../Logo/Logo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCameraRetro,
  faPaperPlane,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as uuIdv4 } from "uuid";
import Loading from "../../components/Loading/Loading";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { imageDb } from "../../Admin/StoreImageFirebase/firebaseConfig";
import axios from "axios";
import { io } from "socket.io-client";
import { getUserById } from "../../Api/getDataUser";
import { FormatTime } from "../../components/formatTime.js/FormatTime";
import { urlApiChat } from "../../Api/urlApi";
const ChatBoxAdmin = () => {
  const socket_1 = io(`${urlApiChat}`);
  const [newMessageReceived, setNewMessageReceived] = useState(false);
  const senderId = useSelector((state) => state.senderIdChat.value);
  const userId = useSelector((state) => state.userId.value);
  const avatarUser = useSelector((state) => state.avatarUser.value);
  const [render, setRender] = useState(false);
  const [dataUserChat, setDataUserChat] = useState([]);
  let lastMessageTimestamp = null;
  const [valueChat, setValueChat] = useState("");
  const conversation = useRef();
  const valueTextarea = useRef();
  const [progressPercent, setProgressPercent] = useState(0);
  const [arrayImages, setArrayImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  //todo: ===========================================================
  const [socket, setSocket] = useState(null);
  const socketSer = async () => {
    const newSocket = await io(`${urlApiChat}`);
    setSocket(newSocket);
    newSocket.on("connect", () => {
      console.log("Connected to server");
    });
    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
    return () => {
      newSocket.close();
    };
  };

  useEffect(() => {
    socketSer();
  }, []);

  //todo: upload file ảnh
  const handleUploadFile = (e) => {
    const fileImages = Array.from(e.target.files);
    if (!fileImages) return;
    setArrayImages(fileImages);
    if (fileImages) {
      fileImages.forEach((item) => {
        const extension = item.name.split(".").pop();
        const uniqueFilename = `${uuIdv4()}.${extension}`;
        const storageRef = ref(imageDb, "ChatBoxImages/" + uniqueFilename);
        const uploadTask = uploadBytesResumable(storageRef, item);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgressPercent(progress);
          },
          (error) => {
            console.log(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageUrls((prevDownloadURLs) => [
                ...prevDownloadURLs,
                downloadURL,
              ]);
            });
          }
        );
      });
    }
  };

  //todo: delete file ảnh
  const handleDeleteImageUpload = (e) => {
    const imageUrl = e.currentTarget.getAttribute("data-url");
    const folderFirebase = decodeURIComponent(
      imageUrl.split("/").pop().split("?")[0]
    );
    const fileName = folderFirebase.substring(
      folderFirebase.lastIndexOf("/") + 1
    );
    const desertRef = ref(imageDb, `ChatBoxImages/${fileName}`);
    deleteObject(desertRef).then(() => {
      toast.success("Xóa hình ảnh thành công", {
        pauseOnHover: false,
      });
      setImageUrls((prevImageUrls) =>
        prevImageUrls.filter((url) => url !== imageUrl)
      );
      setProgressPercent(0);
    });
  };

  const fetchData = async (senderId) => {
    try {
      const res = await axios.get(
        `${urlApiChat}/api/chatBox?senderId=${senderId}&receiverId=2`
      );
      const data = res.data;
      const dataChatBox = await Promise.all(
        data.map(async (userChat) => {
          const userRes = await getUserById(userChat.senderId);
          const userData = userRes.data.user;
          return {
            ...userChat,
            userImage: userData.userImage,
            userName: userData.username,
          };
        })
      );
      setDataUserChat(dataChatBox);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    if (senderId) {
      fetchData(senderId);
    } else {
      return;
    }
  }, [senderId]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const addMessageChat = async (
    senderId,
    receiverId,
    messageContent,
    images
  ) => {
    const messageData = {
      senderId: senderId,
      receiverId: receiverId,
      messageContent: messageContent,
      images: images,
    };
    socket.emit("sendMessage", messageData);
    setRender((prevRender) => !prevRender);
    setValueChat("");
  };

  const handleChat = (e) => {
    e.preventDefault();
    if (valueChat === "" && imageUrls.length === 0) {
      toast.error("Vui lòng nhập nội dung", {
        pauseOnHover: false,
      });
      valueTextarea.current.style.border = "1px solid red";
    } else {
      valueTextarea.current.style.border = "1px solid green";
      addMessageChat(userId, senderId, valueChat, imageUrls);
      setImageUrls([]);
    }
  };

  if (senderId && conversation.current) {
    conversation.current.scrollTop = conversation.current.scrollHeight;
  }

  useEffect(() => {
    fetchData(senderId);
    socket_1.on("message", (newMessage) => {
      setDataUserChat((prevData) => [...prevData, newMessage]);
      setNewMessageReceived(true);
    });

    return () => {
      socket_1.off("message");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (newMessageReceived) {
      fetchData(senderId);
      setNewMessageReceived(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessageReceived]);
  console.log(senderId);
  if (!userId) return null;
  if (senderId === 0) return null;

  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center text-[1.2rem] bg-slate-300 mx-auto shadow-md">
        <Logo className="w-[70%] mx-auto"></Logo>
        <div className="font-bold py-2 text-gray-800">Tư vấn trực tuyến</div>
      </div>
      {/* Đoạn chat */}
      <div
        ref={conversation}
        className="w-[90%] mx-auto pb-[70px] pt-4 overflow-y-scroll h-[65vh]"
      >
        {dataUserChat &&
          dataUserChat.map((item) => (
            <div key={item.__id}>
              {item.senderId === senderId && (
                <div className="flex gap-2 my-1">
                  {lastMessageTimestamp === FormatTime(item.timestamp) ? (
                    <img
                      className="w-[40px] h-[40px] rounded-full object-cover opacity-0 visible"
                      src={item.userImage}
                      alt=""
                    />
                  ) : (
                    <img
                      className="w-[40px] h-[40px] rounded-full object-cover"
                      src={item.userImage}
                      alt=""
                    />
                  )}
                  <div className="hidden">
                    {(lastMessageTimestamp = FormatTime(item.timestamp))}
                  </div>
                  <div className=" w-[80%] flex flex-col gap-2 text-[0.9rem] text-white">
                    <div className="flex justify-start">
                      <div
                        className={`${
                          item.messageContent
                            ? "bg-gray-600 py-2 px-3 rounded-md"
                            : ""
                        } `}
                      >
                        {item.messageContent}

                        <div className="flex gap-2 items-center flex-wrap justify-center">
                          {item.images?.length > 0 &&
                            item.images.map((data, index) => (
                              <img
                                key={index}
                                src={data}
                                alt=""
                                className="w-[150px] h-[150px] object-cover rounded-md"
                              />
                            ))}
                        </div>
                        <p className="text-[0.6rem] mt-[2px]">
                          {FormatTime(item.timestamp)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {item.senderId === userId && (
                <div>
                  <div className="gap-2 flex justify-end mt-2">
                    <div className=" w-[80%] flex flex-col gap-2 text-[0.9rem] text-white">
                      <div className="flex justify-end">
                        <div
                          className={`${
                            item.messageContent
                              ? "bg-blue-800 py-2 px-3 rounded-md"
                              : ""
                          } `}
                        >
                          {item.messageContent}

                          <div className="flex gap-2 items-center flex-wrap justify-center">
                            {item.images?.length > 0 &&
                              item.images.map((data, index) => (
                                <img
                                  key={index}
                                  src={data}
                                  alt=""
                                  className="w-[150px] h-[150px] object-cover rounded-md"
                                />
                              ))}
                          </div>
                          <p className="text-[0.6rem] mt-[2px]">
                            {FormatTime(item.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>

      {imageUrls && imageUrls.length > 0 && (
        <div className="border-t-2 bg-blue-50 w-full absolute bottom-[70px] z-[999] h-[80px] flex items-center">
          <div className="flex items-center justify-center gap-2 flex-wrap w-[90%]">
            {imageUrls.length > 0 &&
              imageUrls.map((item, index) => (
                <div
                  key={index}
                  className="relative w-[60px] h-[60px] group rounded-lg overflow-hidden shadow-lg cursor-pointer "
                >
                  <img
                    src={item}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] z-20 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <FontAwesomeIcon
                      icon={faTrashCan}
                      onClick={handleDeleteImageUpload}
                      data-url={item}
                      className="text-[1rem] bg-white p-2 text-red-500 rounded-full hover:text-red-700 hover:bg-gray-200 transition-all"
                    />
                  </div>
                  <div className="absolute inset-0  group-hover:bg-black opacity-[0.6] transition-all z-10"></div>
                </div>
              ))}
          </div>
        </div>
      )}
      {/* INput  */}
      <div className="border-t-2 bg-slate-300 w-full absolute bottom-0 left-0 h-[80px] flex items-center">
        <div className="w-[90%] mx-auto flex items-center justify-between gap-3">
          <img
            src={avatarUser}
            alt=""
            className="w-[50px] h-[50px] rounded-full"
          />
          <form
            action=""
            className="flex gap-3 items-center w-full"
            onSubmit={handleChat}
          >
            <textarea
              ref={valueTextarea}
              name="chat"
              rows={2}
              className="w-[80%] outline-none border rounded-md px-3 py-1 text-[0.8rem] resize-none"
              value={valueChat}
              onChange={(e) => setValueChat(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleChat(e);
                }
              }}
            ></textarea>

            <div className="w-[10%] cursor-pointer">
              <div className="relative rounded-md  mx-auto flex items-center justify-center group">
                <div className="cursor-pointer">
                  <input
                    type="file"
                    multiple
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleUploadFile}
                  />
                  <div className="text-center font-semibold">
                    <div className="">
                      <FontAwesomeIcon
                        icon={faCameraRetro}
                        className="text-[2rem]  text-teal-600 cursor-pointer border-2 border-gray-500 py-[6px] px-3 rounded-md"
                      />
                    </div>
                  </div>

                  {arrayImages.length !== 0 &&
                    progressPercent !== 0 &&
                    progressPercent !== 100 && (
                      <>
                        <div className="absolute inset-0 bg-black opacity-[0.6]"></div>
                        <Loading className="w-[30px] h-[30px]"></Loading>
                      </>
                    )}
                </div>
              </div>
            </div>

            <button type="submit">
              <FontAwesomeIcon
                icon={faPaperPlane}
                className="text-[2rem] text-teal-700 hover:text-teal-900 transition-all"
              />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBoxAdmin;
