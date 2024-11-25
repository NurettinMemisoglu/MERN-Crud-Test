import React from "react";

const Conversation = () => {
  return (
    <>
      <div className="flex items-center hover:bg-sky-600 p-3 py-4 cursor-pointer">
        <div className="avatar online">
          <div className="w-10 rounded-full">
            <img
              src="https://cdn1.iconfinder.com/data/icons/user-pictures/100/male3-512.png"
              alt="user avatar"
            />
          </div>
        </div>
      </div>
      <div className="divider my-0 py-0 h-1" />
    </>
  );
};

export default Conversation;
