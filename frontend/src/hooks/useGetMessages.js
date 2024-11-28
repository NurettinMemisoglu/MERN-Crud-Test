import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../store/useConversation";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const selectedConversation = useConversation(
    (state) => state.selectedConversation,
  );
  const setMessages = useConversation((state) => state.setMessages);
  const messages = useConversation((state) => state.messages);

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);

      try {
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id]);

  return { messages, loading };
};

export default useGetMessages;
