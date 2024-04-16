import React, { useState, useEffect, useRef } from "react";
import Logo from "../Logo/Logo";
import logo from "../../Assets/image/logoChat.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCameraRetro,
  faMinus,
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
import { fetchDataChat } from "../../Api/apiChat";
import { FormatTime } from "../../components/formatTime.js/FormatTime";
import { imageDb } from "../../Admin/StoreImageFirebase/firebaseConfig";

import { io } from "socket.io-client";
import { urlApiChat } from "../../Api/urlApi";
const ChatBox = () => {
  const AdminId = 2;
  const userId = useSelector((state) => state.userId.value);
  const avatarUser = useSelector((state) => state.avatarUser.value);
  const [chatNow, setChatNow] = useState(false);
  const [dataChat, setDataChat] = useState();
  const [render, setRender] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [valueChat, setValueChat] = useState("");
  const chatBoxRef = useRef(null);
  const conversation = useRef();
  const valueTextarea = useRef();
  const [progressPercent, setProgressPercent] = useState(0);
  const [arrayImages, setArrayImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [newMessageReceived, setNewMessageReceived] = useState(false);

  //todo: ===========================================================
  const socket_1 = io(`${urlApiChat}`);
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

  //todo: ===========================================================
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

  //todo: Open chat
  const handleOpenChat = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  //todo: Click out side
  const handleClickOutside = (event) => {
    if (
      chatBoxRef.current &&
      !chatBoxRef.current.contains(event.target) &&
      isOpen
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleClickOutside);
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    fetchDataChat(setDataChat, userId, setRender);
  }, [userId, render]);

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

  const handleChatNow = () => {
    setChatNow(true);
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
      addMessageChat(userId, 2, valueChat, imageUrls);
      setImageUrls([]);
    }
  };

  if (dataChat && conversation.current) {
    conversation.current.scrollTop = conversation.current.scrollHeight;
  }

  useEffect(() => {
    fetchDataChat(setDataChat, userId, setRender);
    socket_1.on("message", (newMessage) => {
      setDataChat((prevData) => [...prevData, newMessage]);
      setNewMessageReceived(true);
    });

    return () => {
      socket_1.off("message");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (newMessageReceived) {
      fetchDataChat(setDataChat, userId, setRender);
      setNewMessageReceived(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newMessageReceived]);

  useEffect(() => {
    dataChat?.map((item) => {
      if (item.messageContent !== "" || item.images.length > 0) {
        setChatNow(true);
      } else {
        setChatNow(false);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataChat]);
  if (!userId || userId === 2) return null;

  return (
    <div>
      <div
        onClick={handleOpenChat}
        className="fixed bottom-4 right-5 w-[50px] h-[50px] rounded-full overflow-hidden cursor-pointer"
      >
        <img
          src="https://cdn.jim-nielsen.com/watchos/1024/messenger-2020-03-09.png"
          alt=""
        />
      </div>

      <div
        ref={chatBoxRef}
        className={`chat-box-container z-50 ${isOpen ? "open" : ""}`}
      >
        <div
          className={`chat-box fixed  laptop:bottom-8 mobile:bottom-[70px] mobile:right-3 laptop:right-[80px] overflow-hidden laptop:w-[30vw] mobile:w-[95%] h-[80vh] bg-gray-200 z-50 rounded-lg transition-all duration-500 ease-in-out ${
            isOpen ? "open" : ""
          }`}
        >
          <div className="w-full flex flex-col h-full">
            <div className="bg-blue-800 p-4 h-[35%]">
              <div className="flex justify-between items-center">
                <Logo className="w-[100%] mx-auto"></Logo>
                <div
                  onClick={() => setIsOpen(false)}
                  className="w-[40px] h-[40px] rounded-full bg-white flex justify-center items-center hover:bg-gray-700 transition-all cursor-pointer group"
                >
                  <FontAwesomeIcon
                    icon={faMinus}
                    className="text-[1.5rem] group-hover:text-white"
                  />
                </div>
              </div>
              <div className="text-white flex flex-col gap-2 text-[1.2rem] font-medium mt-5">
                <h2 className="text-[2rem] font-bold">Xin chào!</h2>
                <p>Rất vui khi được hổ trợ bạn</p>
              </div>
            </div>

            <div className="w-full text-center h-[55%] relative">
              <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] w-[80%]">
                <h2 className="text-gray-600 text-[1.3rem] font-semibold">
                  Bắt đầu trò chuyện với Sea Fashion
                </h2>
                <div
                  onClick={handleChatNow}
                  className="w-full bg-blue-800 p-3 text-white text-[1.5rem] font-bold rounded-md mt-7 cursor-pointer hover:bg-blue-900 transition-all"
                >
                  Chat nhanh
                </div>
              </div>
            </div>

            <div className="w-full h-[10%] bg-blue-800"></div>
          </div>
        </div>

        {dataChat?.length >= 0 && chatNow && (
          <div
            className={`chat-box fixed laptop:bottom-8  mobile:bottom-[70px] mobile:right-3 laptop:right-[80px] overflow-hidden laptop:w-[30vw] mobile:w-[95%] h-[80vh] bg-gray-200 z-50 rounded-lg transition-all duration-500 ease-in-out ${
              isOpen ? "open" : ""
            }`}
          >
            <div className="flex flex-col items-center justify-center text-[1.2rem] bg-slate-300 mx-auto shadow-md">
              <Logo className="w-[70%] mx-auto"></Logo>
              <div className="font-bold py-2 text-gray-800">
                Tư vấn trực tuyến
              </div>
            </div>
            {/* Đoạn chat  */}
            <div
              ref={conversation}
              className="w-[90%] mx-auto pb-[70px]  overflow-y-scroll h-[80%]"
            >
              {dataChat &&
                dataChat.map((item) => (
                  <div>
                    {item.senderId === AdminId && (
                      <div className="flex gap-2 my-1">
                        <img
                          className="w-[40px] h-[40px]  object-contain p-1 rounded-full bg-[#5ce1e6]"
                          src={logo}
                          alt=""
                        />
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

                              <div className="flex gap-2 items-center flex-wrap w-full">
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

                                <div className="flex gap-2 items-center flex-wrap w-full justify-center">
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
              <div className="border-t-2 bg-blue-50 w-full fixed bottom-[70px] z-[999] h-[100px] flex items-center">
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
            <div className="border-t-2 bg-slate-300 w-full fixed bottom-0 z-[999] h-[80px] flex items-center">
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
                    className="w-[70%] outline-none border rounded-md px-3 py-1 text-[0.8rem] resize-none"
                    value={valueChat}
                    onChange={(e) => setValueChat(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleChat(e);
                      }
                    }}
                  ></textarea>

                  <div className="w-[12%] cursor-pointer">
                    <div className="relative rounded-md border-2 border-gray-500 mx-auto flex items-center justify-center group">
                      <div className="cursor-pointer">
                        <input
                          type="file"
                          multiple
                          className="absolute inset-0 opacity-0 cursor-pointer"
                          onChange={handleUploadFile}
                        />
                        <div className="text-center font-semibold">
                          <div className="flex flex-col p-2">
                            <FontAwesomeIcon
                              icon={faCameraRetro}
                              className="text-[20px]  text-teal-600 cursor-pointer"
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
                      className="text-[1.8rem] text-teal-700 hover:text-teal-900 transition-all"
                    />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
