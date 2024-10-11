import { createContext, useCallback, useState, useEffect } from "react";
import { baseUrl, getRequest, postRequest, deletRequest } from '../utils/services.js';
import { io } from "socket.io-client"

const chatContext = createContext();

export default chatContext;

export const ChatContextProvider = ({ children, currentUser }) => {
    const [userChats, setUserChats] = useState([]);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [allUsers, setAllUsers] = useState({});
    const [nonFriends, setNonFriends] = useState([]);
    const [friends, setFriends] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [currentReceiver, setCurrentReceiver] = useState(null);
    const [messages, setMessages] = useState([]);
    const [messagesError, setMessagesError] = useState(null);
    const [newMessage, setNewMessage] = useState(null);
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [notifications, setNotifications] = useState([]);
    const [userRequests, setUserRequests] = useState([]);
    const [sendRequest, setSendRequest] = useState({});
    const [friendRequest, setFriendRequest] = useState([]);
    const [requestResponse, setRequestResponse] = useState();

    // Initial socket setup
    useEffect(() => {
        const newSocket = io("http://localhost:3000");

        newSocket.on("connect", () => {
            // console.log("Socket connected:", newSocket.id);
        });

        newSocket.on("connect_error", (err) => {
            console.error("Socket connection error:", err);
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, [currentUser]);


    useEffect(() => {
        if (!socket) return;

        socket.on("disconnect", () => {
            // console.log("Socket disconnected");
        });

        socket.on("reconnect", () => {
            // console.log("Socket reconnected:", socket.id);
            socket.emit("addNewUser", currentUser?._id); // Re-register the user on reconnect
        });

        return () => {
            socket.off("disconnect");
            socket.off("reconnect");
        };
    }, [socket]);


    // Add online users
    useEffect(() => {
        if (socket === null) return;

        socket.emit("addNewUser", currentUser?._id);

        socket.on("getOnlineUsers", (res) => {
            setOnlineUsers(res);
        });

        return () => {
            socket.off('getOnlineUsers');
        };
    }, [socket, currentUser]);


    // sending friend requests
    useEffect(() => {
        if (socket === null) return;

        if (sendRequest) {
            socket.emit("sendFriendRequest", {
                sender: sendRequest.sender,
                receiver: sendRequest.receiver
            });
        }
    }, [sendRequest]);


    // getting friend requests
    useEffect(() => {
        if (!socket) {
            // console.log("Socket is not initialized");
            return;
        }

        const handleFriendRequest = (res) => {
            setFriendRequest(prevRequests => [...prevRequests, res]);
            setNotifications(prev => [...prev, res]);
        };

        socket.on("getFriendRequest", handleFriendRequest);

        return () => {
            socket.off("getFriendRequest", handleFriendRequest);
        };
    }, [socket, setFriendRequest]);



    // Send messages > RealTime
    useEffect(() => {
        if (socket === null || !newMessage) return;

        const receiverId = currentChat?.members?.find((id) => id !== currentUser?._id);
        if (receiverId && receiverId !== 'undefined') {
            socket.emit("sendMessage", {
                ...newMessage,
                receiverId
            });
        } else {
            socket.emit("sendGlobalChatMessage", { ...newMessage });
        }
    }, [newMessage, socket, currentChat, currentUser]);


    // Receive messages && Notifications > RealTime
    useEffect(() => {
        if (!socket) return;

        const handleMessage = (message) => {
            if (currentChat?._id === message.chatId) {
                setMessages(prev => [...prev, message]);
            }
        };

        const handleGlobalMessage = (message) => {
            setMessages(prev => [...prev, message]);
        }

        // const handleNotification = (res) => {
        //     const isChatOpen = currentChat?.members.some(id => id === res.senderId);
        //     setNotifications(prev => (isChatOpen ? [{ ...res, isRead: true }, ...prev] : [res, ...prev]));
        // };

        socket.on("getMessage", handleMessage);
        socket.on("getGlobalChatMessage", handleGlobalMessage);
        // socket.on("getNotify", handleNotification);

        return () => {
            socket.off("getMessage", handleMessage);
            socket.off("getGlobalChatMessage", handleGlobalMessage);
            // socket.off("getNotify", handleNotification);
        };
    }, [socket, currentChat]);


    //getting all the users
    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const response = await getRequest(`${baseUrl}/users/users`);

                if (Array.isArray(response)) {
                    setAllUsers(response);
                } else {
                    console.error('Expected an array, but got:', response);
                    setAllUsers([]); // Reset to empty array if not an array
                }
            } catch (error) {
                console.error("Error fetching all users: ", error);
            }
        };

        if (currentUser) {
            getAllUsers();
        }
    }, [currentUser, socket]);



    // Getting suggested friends
    useEffect(() => {
        const getNonFriends = async () => {
            try {
                const response = await getRequest(`${baseUrl}/users/users`);

                if (response.error) {
                    return;
                }

                const notFriends = response.filter((user) => {
                    if (user._id === currentUser._id) return false; // Exclude current user

                    let isFriend = false;
                    if (Array.isArray(userChats)) {
                        isFriend = userChats.some((chat) => chat.members.includes(user._id));
                    }

                    return !isFriend; // If not already a friend, return true
                });

                setNonFriends(notFriends);
            } catch (error) {
                console.error("Error fetching users: ", error);
            }
        };

        getNonFriends();
    }, [userChats, currentUser]);


    // Getting current friends
    useEffect(() => {
        const getYourFriends = async () => {
            try {
                const response = await getRequest(`${baseUrl}/users/users`);

                if (response.error) {
                    return;
                }

                const yourFriends = response.filter((user) => {
                    if (user._id === currentUser._id) return false; // Exclude current user

                    let isFriend = false;
                    if (Array.isArray(nonFriends)) {
                        isFriend = nonFriends.some((item) => item._id === user._id);
                    }

                    return !isFriend; // If not already a friend, return true
                });

                setFriends(yourFriends);
            } catch (error) {
                console.error("Error fetching users: ", error);
            }
        };

        getYourFriends();
    }, [userChats, currentUser, nonFriends]);


    // Getting all the user which are chatting currently
    const getUserChats = useCallback(async () => {
        setIsUserChatsLoading(true);
        setUserChatsError(null);

        if (currentUser?._id) {
            try {
                const response = await getRequest(`${baseUrl}/chats/${currentUser._id}`);
                setIsUserChatsLoading(false);

                if (response.error) {
                    setUserChatsError(response.error);
                } else {
                    setUserChats(response);
                }
            } catch (error) {
                setIsUserChatsLoading(false);
                setUserChatsError(error.message);
            }
        }
    }, [currentUser]);
    useEffect(() => {
        getUserChats();
    }, [currentUser, getUserChats]);


    // Create chat with new friends
    const createNewChats = useCallback(async (secondId, firstId) => {
        if (!firstId || !secondId) {
            console.error('Invalid IDs:', firstId, secondId);
            return;
        }

        const response = await postRequest(`${baseUrl}/chats/`, JSON.stringify({ firstId, secondId }));

        if (response.error) {
            console.error(`CHATCONTEXT :: createNewChats() -> ${response.error}`);
            return;
        }

        setUserChats(prev => [...prev, response]);
    }, []);


    // remove the existing chat of the user
    const removeChat = useCallback(async (firstId, secondId) => {
        if (!firstId || !secondId) {
            console.error('Invalid IDs:', firstId, secondId);
            return;
        }

        const response = await deletRequest(`${baseUrl}/chats/remove/${firstId}/${secondId}`);

        if (response.error) {
            console.error(`CHATCONTEXT :: removeChat() -> ${response.error}`);
            return;
        }
        window.location.reload()
        getUserChats();
    }, [])


    // Getting messages
    const getUserMessages = useCallback(async () => {
        setMessagesError(null);

        try {
            const response = await getRequest(`${baseUrl}/messages/${currentChat._id}`);

            if (response.error) {
                setMessagesError(response.error);
            } else {
                setMessages(response);
            }
        } catch (error) {
            setMessagesError(error.message);
        }
    }, [currentChat]);
    useEffect(() => {
        if (currentChat?._id) {
            getUserMessages();
        }
    }, [currentChat, getUserMessages]);


    // Sending messages to the user and storing to database
    const sendTextMessages = useCallback(async (textMessages, sender, currentChatId, setTextMessages) => {
        if (!textMessages.trim()) return;

        const payload = {
            senderId: sender._id,
            chatId: currentChatId,
            text: textMessages,
        };

        try {
            const response = await postRequest(`${baseUrl}/messages/`, JSON.stringify(payload), {
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.error) {
                console.error("Error sending message: ", response.error);
                return;
            }

            if (response && response.senderId) {
                setNewMessage(response);
                setMessages(prev => [...prev, response]);
                setTextMessages('');  // Clear input after successfully sending
            } else {
                console.error("Invalid response format", response);
            }
        } catch (error) {
            console.error("Failed to send message:", error);
        }
    }, []);


    //adding the requests for the user in db
    const setRequest = useCallback(async (senderId, receiverId) => {

        if (!senderId || !receiverId) {
            setRequestResponse(`cannot proceed your request`)
            return;
        }

        try {
            const response = await postRequest(
                `${baseUrl}/users/set-request`,
                JSON.stringify({
                    senderId,
                    receiverId
                })
            );

            if (response.error) {
                setRequestResponse(response.error)
            } else {
                setRequestResponse(response.message)
            }
        } catch (error) {
            setRequestResponse(responseerror)
        }
    }, []);


    //fetching the user's friend request from db
    const getUserRequest = useCallback(async () => {
        if (currentUser._id) {
            try {
                const response = await getRequest(`${baseUrl}/users/get-request/${currentUser._id}`);

                if (response.error) {
                    // console.log(`API error: ${response.message}`);
                    return;
                } else {
                    setUserRequests(response);
                }
            } catch (error) {
                // console.log(`ERROR AT getRequest FUNCTION :: ${error.message}`);
                return;
            }
        } else {
            // console.log('No currentUser provided');
        }
    }, [currentUser]);
    useEffect(() => {
        getUserRequest();
    }, [getUserRequest, setRequest]);


    //deleting the requests from db that are ignored
    const deletUserRequests = useCallback(async (senderId, receiverId) => {
        if (!senderId || !receiverId) {
            console.error('senderId or receiverId is not defined');
            return;
        }

        try {
            const response = await postRequest(
                `${baseUrl}/users/delet-request`,
                JSON.stringify({
                    senderId,
                    receiverId
                })
            );

            if (response.error) {
                console.error(`error: setRequest() :: ${response.error}`);
            } else {
                // console.log(`Request has been ignored successfully`);
            }
        } catch (error) {
            console.error(`Cannot delet the request: ${error.message}`);
        }
    }, [])



    // Adding every user to the global chat
    // useEffect(() => {
    //     const setGlobalChat = async () => {
    //         try {
    //             const response = await postRequest(`${baseUrl}/chats/globalChat/${currentUser._id}`)

    //             if (!response.ok) {
    //                 return;
    //             }

    //             console.log("User set to global chat succesfully : ", response.message)

    //         } catch (error) {
    //             console.error(`CHATCONTEXT :: setGlobalChat() -> ${error}`)
    //         }
    //     }
    //     setGlobalChat()
    // }, [currentUser])


    return (
        <chatContext.Provider value={{
            userChats,
            allUsers,
            setUserChats,
            isUserChatsLoading,
            userChatsError,
            nonFriends,
            createNewChats,
            setNonFriends,
            currentChat,
            setCurrentChat,
            currentReceiver,
            setCurrentReceiver,
            messages,
            sendTextMessages,
            onlineUsers,
            notifications,
            setNotifications,
            removeChat,
            friends,
            setRequest,
            setUserRequests,
            userRequests,
            deletUserRequests,
            setSendRequest,
            requestResponse
        }}>
            {children}
        </chatContext.Provider>
    );
};