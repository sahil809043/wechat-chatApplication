import { useEffect, useState } from "react";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchReciever = (chat, currentUser) => {
    // console.log("Current User: ", currentUser);
    
    const [receiver, setReceiver] = useState(null);
    const [error, setError] = useState(null);

    // Log chat members and current user for debugging
    // console.log("Chat members: ", chat?.members);
    // console.log("Current User ID: ", currentUser?._id);

    // Find the other user's ID in the chat members
    const receiverId = chat?.members?.find((id) => id !== currentUser?._id);
    // console.log("Receiver ID: ", receiverId);  // Check if this is correct

    useEffect(() => {
        const getUser = async () => {
            // Check if receiverId is valid and different from currentUser._id
            if (!receiverId || receiverId === currentUser?._id) {
                console.error("Invalid receiver ID");
                return;
            }

            const response = await getRequest(`${baseUrl}/users/find/${receiverId}`);

            if (response.error) {
                return setError(response.error);
            }

            setReceiver(response);
        };

        getUser();
    }, [receiverId]);

    return { receiver, error };
};