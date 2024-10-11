import { useContext, useEffect, useState, useCallback } from "react";
import chatContext from "../contexts/chatContext";
import AuthContext from "../contexts/AuthContext";
import SearchBar from "../components/SearchBar";
import { useFetchReciever } from "../hooks/useFetchReceiver.hooks";
import { debounce } from "lodash";

const RemoveFriend = () => {
    const { userChats, removeChat, friends } = useContext(chatContext);
    const { currentUser } = useContext(AuthContext);

    // Function to search a user to remove
    const [suggestedFriends, setSuggestedFriends] = useState(friends);
    const [info, setInfo] = useState("");

    // Debounce search to optimize performance
    const showSuggestedFriend = useCallback(
        debounce((searchTerm) => {
            if (searchTerm.trim() === "") {
                setSuggestedFriends(friends);
            } else {
                const filteredFriends = friends.filter((friend) =>
                    friend.uniqueId.toUpperCase().includes(searchTerm.toUpperCase())
                );
                setSuggestedFriends(filteredFriends);
            }
        }, 300),
        [friends]
    );

    useEffect(() => {
        showSuggestedFriend(info);
    }, [info, showSuggestedFriend]);


    return (
        <div className="h-auto bg-cover bg-center bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkUvhi-mYdaquhn2WlKlHKiP6VEQQ0izxhKg&s')]">
            <div className="flex justify-center px-4">
                <div className="w-full min-h-screen max-w-3xl mt-7 p-6 bg-white/50 border border-gray-300 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
                    <div className="mb-6">
                        <SearchBar info={info} setInfo={setInfo} />
                    </div>

                    <div className="w-full min-h-screen p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-md dark:bg-gray-700 dark:border-gray-600">
                        <div className="flex justify-between items-center mb-4">
                            <h5 className="text-2xl font-bold text-gray-900 dark:text-white">Your Friends</h5>
                        </div>
                        <div>
                            {suggestedFriends.length > 0 ? (
                                <ul role="list" className="divide-y divide-gray-500 dark:divide-gray-600">
                                    {suggestedFriends.map((friend, index) => (
                                        <li key={index} className="py-4 flex items-center">
                                            <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0">
                                                {friend?.profileImage ? (
                                                    <img
                                                        src={friend.profileImage}
                                                        alt={friend.username.charAt(0).toUpperCase()}
                                                        className="rounded-full w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="text-gray-500 text-center w-full h-full flex items-center justify-center">
                                                        {friend.username.charAt(0).toUpperCase()}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0 ml-6">
                                                <p className="text-lg font-medium text-gray-900 truncate dark:text-white">
                                                    {friend.username}
                                                </p>
                                                <p className={`text-sm text-green-700`}>
                                                    {friend.uniqueId}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => removeChat(currentUser?._id, friend._id)}
                                                className="ml-6 inline-flex items-center px-4 py-2">
                                                <span className="block sm:hidden overflow-hidden text-black rounded-full bg-red-700 px-5 py-2.5 text-white transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:-translate-y-1 active:scale-x-90 active:scale-y-110">Remove</span>
                                                <span className="hidden sm:block overflow-hidden text-black rounded-full bg-red-700 px-5 py-2.5 text-white transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:-translate-y-1 active:scale-x-90 active:scale-y-110">Remove Friend</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-center text-sm text-gray-500 dark:text-gray-400">No Friends to Display</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RemoveFriend;