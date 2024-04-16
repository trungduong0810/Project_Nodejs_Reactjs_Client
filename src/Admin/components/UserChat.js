import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUserById } from "../../Api/getDataUser";
import { FormatTime } from "../../components/formatTime.js/FormatTime";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { senderIdChat } from "../../Redux/getSenderIdChat";
import { urlApiChat } from "../../Api/urlApi";
const UserChat = () => {
  const dispatch = useDispatch();
  const [dataUserChat, setDataUserChat] = useState([]);
  const [newMessageReceived, setNewMessageReceived] = useState(false);
  const [clickedItemChat, setClickedItemChat] = useState(null);
  const socket = io(`${urlApiChat}`);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${urlApiChat}/api/chatBox/all`);
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
    fetchData();
    socket.on("message", (newMessage) => {
      setDataUserChat((prevData) => [...prevData, newMessage]);
      setNewMessageReceived(true);
    });

    return () => {
      socket.off("message");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (newMessageReceived) {
      fetchData();
      setNewMessageReceived(false);
    }
  }, [newMessageReceived]);
  const filteredDataUserChat = dataUserChat?.filter(
    (item) => item.senderId !== 2
  );

  const lastMessagesBySenderId = filteredDataUserChat?.reduce((acc, curr) => {
    acc[curr.senderId] = curr;
    return acc;
  }, {});

  return (
    <div>
      {lastMessagesBySenderId &&
        Object.keys(lastMessagesBySenderId)?.map((senderId) => {
          const message = lastMessagesBySenderId[senderId];
          return (
            <div
              onClick={() => {
                dispatch(senderIdChat(message.senderId));
                setClickedItemChat(message.senderId);
              }}
              key={message._id}
              className={`flex items-center gap-3  p-3 rounded-md mb-3 cursor-pointer  ${
                clickedItemChat === message.senderId
                  ? "bg-green-700"
                  : "bg-white"
              }`}
            >
              <img
                src={message.userImage}
                alt=""
                className="w-[60px] h-[60px] rounded-full"
              />
              <div
                className={`w-[80%] ${
                  clickedItemChat === message.senderId
                    ? "text-white"
                    : "text-gray-900"
                }`}
              >
                <h2 className={`font-bold text-[1rem]`}>{message.userName}</h2>
                <div className="flex justify-between items-center">
                  <h2 className="w-[85%] overflow-hidden whitespace-nowrap p-1 text-ellipsis">
                    {message.images.length > 0
                      ? "Hình ảnh"
                      : message.messageContent}
                  </h2>
                  <p> {FormatTime(message.timestamp)}</p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default UserChat;
