import { useCallback, useContext, useEffect, useState } from "react";
import { debounce } from "lodash";
import chatContext from "../contexts/chatContext";
import SearchBar from "../components/SearchBar";
import AuthContext from "../contexts/AuthContext";

const FindFriends = () => {
    const { nonFriends, setSendRequest, setRequest, requestResponse } = useContext(chatContext);
    const { currentUser } = useContext(AuthContext);

    const [suggestedFriends, setSuggestedFriends] = useState(nonFriends);
    const [info, setInfo] = useState("");
    const [responseModal, setResponseModal] = useState(false);

    // Debounce search to optimize performance
    const showSuggestedFriend = useCallback(
        debounce((searchTerm) => {
            if (searchTerm.trim() === "") {
                setSuggestedFriends(nonFriends);
            } else {
                const filteredFriends = nonFriends.filter((friend) =>
                    friend.uniqueId.toUpperCase().includes(searchTerm.toUpperCase())
                );
                setSuggestedFriends(filteredFriends);
            }
        }, 300),
        [nonFriends]
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
                            <h5 className="text-2xl font-bold text-gray-900 dark:text-white">Suggested Friends</h5>
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
                                                onClick={() => {
                                                    const sender = currentUser?._id;
                                                    const receiver = friend?._id;
                                                    setSendRequest({ sender, receiver });
                                                    setRequest(sender, receiver);
                                                    setResponseModal(true);
                                                }}
                                                className="ml-6 inline-flex items-center px-4 py-2"
                                            >
                                                <span className="block sm:hidden overflow-hidden rounded-full bg-blue-700 px-5 py-2.5 text-white transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:-translate-y-1 active:scale-x-90 active:scale-y-110">Add</span>
                                                <span className="hidden sm:block overflow-hidden rounded-full bg-blue-700 px-5 py-2.5 text-white transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:-translate-y-1 active:scale-x-90 active:scale-y-110">Add Friend</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-center text-sm text-gray-500 dark:text-gray-400">No suggestions available</p>
                            )}
                            {responseModal && (
                                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
                                    <div className="relative p-4 text-center bg-black rounded-lg shadow-lg dark:bg-gray-800 sm:p-5">
                                        <div className="relative flex flex-col w-full outline-none focus:outline-none bg-opacity-50 backdrop-blur-md z-50">
                                            {/* Close Icon */}
                                            <button
                                                className="absolute rounded-full top-1 right-2 text-red-900 hover:text-gray-400 focus:outline-none"
                                                onClick={() => setResponseModal(false)} 
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-6 h-6"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path fillRule="evenodd" d="M10 9.586l4.95-4.95a1 1 0 111.415 1.415L11.414 11l4.95 4.95a1 1 0 11-1.415 1.415L10 12.414l-4.95 4.95a1 1 0 11-1.415-1.415L8.586 11 3.636 6.05A1 1 0 114.95 4.636L10 9.586z" clipRule="evenodd"></path>
                                                </svg>
                                                <span className="sr-only">Close</span>
                                            </button>
                                            <p className="mb-8 mt-10 mx-10 text-lg font-semibold text-white dark:text-white">{requestResponse}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FindFriends;
