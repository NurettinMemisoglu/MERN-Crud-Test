import React from "react";
import Conversation from "./Conversation";
import useGetConversations from "../../../hooks/useGetConversations";

const Conversations = () => {
  const { loading, conversations } = useGetConversations();
  return (
    <div>
      {loading ? (
        <span className="loading loading-spinner mx-auto"></span>
      ) : null}

      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
    </div>
  );
};

export default Conversations;
