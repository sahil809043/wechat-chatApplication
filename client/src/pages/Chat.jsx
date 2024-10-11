import React, { useContext, useEffect, useState } from "react";
import chatContext from "../contexts/chatContext.jsx";
import AuthContext from '../contexts/AuthContext';
import ChatSidebar from "../components/chats/ChatSidebar.jsx";
import ChatCard from "../components/chats/ChatCard";
import FindFriends from "./FindFriends.jsx";
import GlobalChat from "./GlobalChat.jsx";
import { useLocation } from "react-router-dom";
import RemoveFriend from "./RemoveFriends";
import UpdateProfileInfo from "./UpdateProfileInfo";
import PageNotFound from "./PageNotFound.jsx";
import Loading from "../components/Loading.jsx";

const Chat = ({ index }) => {
  const chatContextValue = useContext(chatContext);
  const { currentUser } = useContext(AuthContext);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const { userChats, isUserChatsLoading, userChatsError, setCurrentChat } = chatContextValue;

  const handleChatClick = (chat) => {
    setCurrentChat(chat);
    setIsSidebarVisible(false);
  };

  const showSidebar = () => {
    setIsSidebarVisible(true);
  };


  // useEffect(() => {
  //   if (index === 1) {
  //     const getGLobalChat = async () => {
  //       try {
  //         const response = await getRequest(${baseUrl}/chats/find-global-chat/66f29fb8f914359cd0ddcb43);
  //         // const data = await response.json();  // Parse response data to JSON

  //         if (response.error) {
  //           console.error('CHAT :: getGlobalChat() -> ', response.message);
  //         } else {
  //           setCurrentChat(response);  // Update state with the chat object
  //         }
  //       } catch (error) {
  //         console.error(ERROR AT FETCHING CHAT FRONTEND : ${error});
  //       }
  //     }
  //     getGLobalChat();
  //   }
  // }, [index, setCurrentChat]);

  const renderContent = () => {
    switch (index) {
      case 0:
        return (
          <div className="flex h-screen">
            {/* Sidebar */}
            <div
              className={`${isSidebarVisible ? "block" : "hidden"
                } lg:block w-full lg:w-1/3 bg-gray-900`}
            >
              {isUserChatsLoading ? (
                <Loading />
              ) : userChatsError ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-white text-md p-4">
                    Cannot fetch your chats Right now!!
                  </div>
                </div>
              ) : userChats.length === 0 ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-white text-2xl md:text-4xl p-8 animate-bounce">
                    No user available. Add some friends to start chatting!
                  </div>
                </div>
              ) : (
                <div>
                  {userChats.map((chat, index) => (
                    <div key={index} onClick={() => handleChatClick(chat)}>
                      <ChatSidebar chat={chat} currentUser={currentUser} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Chat Card */}
            <div className={`flex-1 ${isSidebarVisible ? "hidden" : "block"} lg:block`}>
              <ChatCard onBack={showSidebar} />
            </div>
          </div>
        );

      case 1:
        return <GlobalChat />;

      case 2:
        return <UpdateProfileInfo />;

      case 3:
        return <FindFriends />;

      case 4:
        return <RemoveFriend />

      default:
        return <PageNotFound />;
    }
  };

  return (
    <div className="chat-page bg-gray-600 h-screen">
      {renderContent()}
    </div>
  );
};

export default Chat;