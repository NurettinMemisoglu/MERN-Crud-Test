import React from "react";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { LuMessageSquare } from "react-icons/lu";

const MessageContainer = () => {
  const noChatSelected = true;
  return (
    <div className="min-w-[500px] flex flex-col">
      {noChatSelected ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-1">
            <span className="label-text">To: </span>
            <span className="text-gray-900">John Doe</span>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageContainer;

const NoChatSelected = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 Nurettin Memişoğlu❄</p>
        <p>Select a chat to start messaging</p>
        <LuMessageSquare className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
