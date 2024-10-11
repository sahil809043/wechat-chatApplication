import { useContext } from "react";
import { useFetchReciever } from "../../hooks/useFetchReceiver.hooks.js";
import chatContext from "../../contexts/chatContext.jsx";

const ChatSidebar = ({ chat, currentUser }) => {
  const { receiver, error } = useFetchReciever(chat, currentUser);
  const { setCurrentReceiver, onlineUsers } = useContext(chatContext);

  let isOnline = onlineUsers?.some((onlineUser) => onlineUser?.userId === receiver?._id);
  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  return (
    <div
      className="text-white rounded-lg p-4 mb-4 flex items-center hover:bg-gray-700 cursor-pointer"
      onClick={() => setCurrentReceiver(receiver)}
    >
      <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0">
        {receiver?.profileImage ? (
          <img
            src={receiver.profileImage}
            className="rounded-full w-full h-full object-cover"
            alt={receiver?.username}
          />
        ) : (
          <span className="text-gray-500 text-center w-full h-full flex items-center justify-center text-xl">
            {receiver?.username?.charAt(0).toUpperCase()}
          </span>
        )}
      </div>
      <div className="ml-4">
        <p className="font-semibold text-lg">{receiver?.username}</p>
        <p className={`text-sm ${isOnline ? "text-green-400" : "text-gray-500"}`}>
          {isOnline ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
};

export default ChatSidebar;