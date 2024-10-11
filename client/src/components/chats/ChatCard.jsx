import { useContext, useEffect, useRef, useState } from "react";
import chatContext from "../../contexts/chatContext";
import AuthContext from "../../contexts/AuthContext";
import InputEmoji from "react-input-emoji";
import moment from "moment";
import { bouncyArc, helix } from 'ldrs'

const ChatCard = ({ onBack }) => {
  const { currentReceiver, sendTextMessages, currentChat, messages } = useContext(chatContext);
  const { currentUser } = useContext(AuthContext);

  const [textMessages, setTextMessages] = useState('');
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768); // Check initial screen size
  const scroll = useRef();

    useEffect(() => {
      helix.register();
    }, [currentUser]);


    useEffect(() => {
      const handleResize = () => {
        setIsMobileView(window.innerWidth <= 768);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, []);

    useEffect(() => {
      scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = () => {
      if (textMessages.trim()) {
        sendTextMessages(textMessages, currentUser, currentChat._id, setTextMessages);
        setTextMessages('');
      }
    };

    if (!currentReceiver) {
      return (
        <div className="ml-2 flex flex-col items-center justify-center h-screen bg-gray-800">
          <l-helix
            size="75"
            speed="2.5"
            color="yellow"
          ></l-helix>

          <div className="text-white text-2xl md:text-4xl p-8 text-center">
            Select a user to start chatting
          </div>
        </div>
      );
    }

    return (
      <div className="ml-2 flex flex-col h-full border rounded-lg bg-gray-800 p-2">
        <div className="bg-gray-900 shadow-md p-2 rounded-lg flex items-center justify-between">
          {isMobileView && (
            <button className="text-blue-500 font-bold" onClick={onBack}>
              ← Back
            </button>
          )}
          <div className="flex items-center">
            <img src={currentReceiver?.profileImage}
              className="w-12 h-12 rounded-full mr-2 border border-gray-600"
              alt={currentReceiver?.username}
            />
            <h2 className="text-md text-white font-semibold">{currentReceiver?.username}</h2>
          </div>
        </div>

        <div className="flex flex-col p-4 overflow-y-auto h-full">
          {messages?.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col mb-4 p-3 rounded-md max-w-xs ${msg?.senderId === currentUser?._id
                ? 'bg-blue-600 text-white self-end'
                : 'bg-gray-700 text-white self-start'
                }`}
            >
              <div>{msg.text}</div>
              <div className="text-xs text-gray-400 mt-1">
                {moment(msg.createdAt).fromNow()}
              </div>
            </div>
          ))}
          <div ref={scroll} />
        </div>

        <div className="p-2 shadow-md flex items-center bg-gray-900">
          <InputEmoji
            value={textMessages}
            onChange={setTextMessages}
            cleanOnEnter
            onEnter={handleSendMessage}
            placeholder="Type a message..."
            className="flex-grow p-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            aria-label="Send Message"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </div>
    );
  };

  export default ChatCard;
