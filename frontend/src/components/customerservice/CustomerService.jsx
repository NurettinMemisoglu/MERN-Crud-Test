import { LuPenSquare } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import MessageContainer from "../messages/MessageContainer";
import MessageInput from "../messages/MessageInput";

const CustomerService = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [message, setMessage] = useState(""); // State for the message input
  const predefinedMessages = ["Siparişlerim", "Yemek ve Market Siparişlerim"];
  const [messages, setMessages] = useState([]); // Store sent messages
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      // Prevent sending empty messages
      setMessages([...messages, message]);
      setMessage(""); // Clear input *after* adding to messages
    }
  };

  const handlePredefinedMessageClick = (predefinedMessage) => {
    setMessage(predefinedMessage); // Set the message input
  };
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <div // Use a div for the outer container
        className={`p-6  shadow-md rounded-full transition-all duration-300 hover:-translate-y-1px hover:shadow-xl cursor-pointer`}
        onClick={() => setIsDrawerOpen(true)}
      >
        <button variant={"ghost"}>
          <LuPenSquare size={24} />
        </button>
      </div>
      {isDrawerOpen && ( // Conditionally render the drawer
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsDrawerOpen(false)} // Close on backdrop click
        >
          <div
            className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-xl h-2/3 relative "
            onClick={(e) => e.stopPropagation()} // Prevent closing on inner click
          >
            <button
              className="absolute top-2 right-2" // Close button positioning
              onClick={() => setIsDrawerOpen(false)}
            >
              X {/* Or a close icon */}
            </button>
            <h2 className="text-lg font-bold mb-4">Customer Service</h2>

            <div className="flex h-full">
              <Sidebar />
              <MessageContainer />
            </div>

            {/* <div className="space-y-2">
              {predefinedMessages.map((predefinedMessage) => (
                <button
                  key={predefinedMessage}
                  className="btn btn-outline w-full"
                  onClick={() =>
                    handlePredefinedMessageClick(predefinedMessage)
                  }
                >
                  {predefinedMessage}
                </button>
              ))}
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerService;
