import React from "react";

const Conversation = ({ conversation, lastIdx }) => {
  return (
    <>
      <div className="flex items-center hover:bg-sky-600 p-3 py-4 gap-x-2 cursor-pointer">
        <div className="avatar online  ">
          <div className="w-10 rounded-full">
            <img src={conversation.profilePic} alt="user avatar" />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex justify-between">
            <p className="font-bold text-gray-200">{conversation.fullName}</p>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Conversation;
