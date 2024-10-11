import { useContext, useEffect, useRef, useState } from "react";
import chatContext from "../contexts/chatContext";
import AuthContext from "../contexts/AuthContext";
import InputEmoji from "react-input-emoji";
import moment from "moment";

const GlobalChat = () => {
  const { sendTextMessages, messages } = useContext(chatContext);
  const { currentUser } = useContext(AuthContext);
  const [textMessages, setTextMessages] = useState('');
  const scroll = useRef();

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  const handleSendMessage = () => {
    if (textMessages.trim()) {
      sendTextMessages(textMessages, currentUser, "66f29fb8f914359cd0ddcb43", setTextMessages);
      setTextMessages('');
    }
  };


  // return (
  //   <div className="flex flex-col md:flex-row h-screen border rounded-lg bg-gray-800 p-2">
  //     <div className="hidden md:flex md:flex-col md:flex-grow md:overflow-hidden">
  //       <div className="bg-gray-900 shadow-md p-2 rounded-lg flex items-center justify-between">
  //         <div className="flex items-center">
  //           <h2 className="text-md text-white font-semibold">Send messages to everyone</h2>
  //         </div>
  //       </div>

  //       <div className="flex flex-col p-4 overflow-y-auto h-full">
  //         {messages?.map((msg, index) => (
  //           <div
  //             key={index}
  //             className={`flex flex-col mb-4 p-3 rounded-md max-w-xs ${msg?.senderId === currentUser?._id
  //               ? 'bg-blue-600 text-white self-end'
  //               : 'bg-gray-700 text-white self-start'
  //               }`}
  //             style={{ alignSelf: msg?.senderId === currentUser?._id ? 'flex-end' : 'flex-start' }}
  //           >
  //             <div>{msg.text}</div>
  //             <div className="text-xs text-gray-400 mt-1">
  //               {moment(msg.createdAt).fromNow()}
  //             </div>
  //           </div>
  //         ))}
  //         <div ref={scroll} />
  //       </div>

  //       <div className="p-2 shadow-md flex items-center bg-gray-900">
  //         <InputEmoji
  //           value={textMessages}
  //           onChange={setTextMessages}
  //           cleanOnEnter
  //           onEnter={handleSendMessage}
  //           placeholder="Type a message..."
  //           className="flex-grow p-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
  //         />
  //         <button
  //           onClick={handleSendMessage}
  //           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
  //           aria-label="Send Message"
  //         >
  //           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  //             <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
  //           </svg>
  //         </button>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white min-h-screen flex flex-col justify-center items-center">
      {/* Error Image */}
      <div className="text-center w-full max-w-md mx-auto">
        <h1 className="text-9xl mb-6">👨‍🔧</h1>
      </div>

      {/* Error Message Container */}
      <div className="text-center max-w-lg w-4/5 mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl mb-6">
          We're working on this functionality now!
        </h1>
        <p className="text-lg sm:text-xl mb-3">
          We expect this outage to last soon. If you continue to see this page, please contact us via email at{" "}
          <a href="mailto:support@wechat.com" className="underline text-white">support@wechat.com</a>.
        </p>
        <p className="text-lg sm:text-xl">
          We apologize for any inconvenience.
        </p>
      </div>
    </div>
  );
}

export default GlobalChat;