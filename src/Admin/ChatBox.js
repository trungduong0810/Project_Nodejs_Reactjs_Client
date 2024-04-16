import React from "react";
import HeaderAdmin from "../Layouts/Header/HeaderAdmin";
import SidebarAdmin from "../Layouts/Sidebar/SidebarAdmin";
import UserChat from "./components/UserChat";
import ChatBoxAdmin from "../Layouts/Chat/ChatBoxAdmin";
const ChatBox = () => {
  return (
    <div>
      <HeaderAdmin></HeaderAdmin>
      <div className="mt-7 flex">
        <SidebarAdmin></SidebarAdmin>
        <div className="flex gap-3 w-full">
          <div className="w-[37%] bg-gray-100 h-[80vh] p-4 rounded-md overflow-y-scroll">
            <UserChat></UserChat>
          </div>
          <div className="w-[60%] h-[80vh] bg-slate-50  relative rounded-md overflow-hidden">
            <ChatBoxAdmin></ChatBoxAdmin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
