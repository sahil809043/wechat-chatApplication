import { createContext, useCallback, useState, useEffect } from "react";
import { baseUrl, postRequest, getRequest } from "../utils/services";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();
// const navigate = useNavigate(); 

export default AuthContext;

export const AuthContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [userId, setUserId] = useState(() => {
        const userFromStorage = localStorage.getItem('userId');
        return userFromStorage || null;
    });

    const [currentUser, setCurrentUser] = useState({});
    const [registered, setRegistered] = useState(false);
    const [registerError, setRegisterError] = useState(null);
    const [isRegisterLoading, setIsRegisterLoading] = useState(false);
    const [registerModal, setRegisterModal] = useState(false);
    const [registerInfo, setRegisterInfo] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const [updateInfo, setUpdateInfo] = useState({
        name: '',
        mail: '',
        profileImage: ''
    });


    useEffect(() => {
        if (currentUser) {
            setUpdateInfo({
                name: currentUser?.username || '',
                mail: currentUser?.email || '',
                profileImage: currentUser?.profileImage || ''
            });
        }
    }, [currentUser]);

    const [updateInfoError, setUpdateInfoError] = useState({ error: false, message: "" });



    const updateUserInfo = useCallback((info) => {
        setUpdateInfo(info);
    }, []);

    //update the user Information and save to databse
    const editUserInfo = useCallback(async (e) => {
        if (e) e.preventDefault();
        setUpdateInfoError({ error: false, message: "" });

        try {
            const response = await postRequest(
                `${baseUrl}/users/updateInfo/${currentUser?._id}`,
                JSON.stringify(updateInfo),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.error) {
                setUpdateInfoError({ error: true, message: 'Update failed: Please try again' });
            } else {
                // Optional: update local state or handle successful update
                window.location.reload();
                getUser();
            }
        } catch (error) {
            setUpdateInfoError({ error: true, message: 'Update failed: Please try again' });
        }
    }, [updateInfo, currentUser?._id]);


    const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info);
    }, []);


    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info);
    }, []);


    // register user
    const registerUser = useCallback(async (e) => {
        e.preventDefault();
        setIsRegisterLoading(true);
        setRegisterError(null);

        try {
            const response = await postRequest(
                `${baseUrl}/users/register`,
                JSON.stringify(registerInfo)
            );

            setIsRegisterLoading(false);

            if (response.error) {
                setRegisterError({ error: true, message: response.error });
            } else {
                setRegistered(true);
                setRegisterModal(true);
            }
        } catch (error) {
            setIsRegisterLoading(false);
            setRegisterError({ error: true, message: `Server Error` });
        }
    }, [registerInfo]);


    //login user
    const loginUser = useCallback(async (e) => {
        e.preventDefault();
        setIsLoginLoading(true);
        setLoginError(null);

        try {
            const response = await postRequest(
                `${baseUrl}/users/login`,
                JSON.stringify(loginInfo)
            );

            setIsLoginLoading(false);
            // console.log("Response > ", response);

            if (response.error) {
                setLoginError({ error: true, message: response.error });
            } else {
                // Assuming the correct structure is response.user.id
                localStorage.setItem('accessToken', response.user.accessToken);
                localStorage.setItem('userId', response.user._id); // Correct this
                setUserId(response.user._id); // Make sure this is correct
            }
        } catch (error) {
            setIsLoginLoading(false);
            setLoginError({ error: true, message: response.error });
        }
    }, [loginInfo]);


    //logout user
    const logoutUser = useCallback(() => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        setLoginInfo({
            email: '',
            password: ''
        })
        setCurrentUser({})
        setUserId(null);
    }, []);


    // console.log("current user > ", currentUser)
    // console.log("userId > ", userId)
    //get the current user 
    const getUser = useCallback(async () => {
        if (userId) {
            try {
                const response = await getRequest(`${baseUrl}/users/find/${userId}`);
                if (response.error) {
                    console.log(response.error);
                } else {
                    setCurrentUser(response);
                }
            } catch (error) {
                console.log(error.message);
            }
        }
    }, [userId]);


    useEffect(() => {
        if (userId) {
            getUser();
        }
    }, [userId, getUser]);

    return (
        <AuthContext.Provider value={{
            currentUser,
            userId,
            registerInfo,
            registerModal,
            setRegisterModal,
            updateRegisterInfo,
            registerUser,
            registerError,
            isRegisterLoading,
            registered,
            logoutUser,
            loginUser,
            loginInfo,
            updateLoginInfo,
            loginError,
            isLoginLoading,
            updateUserInfo,
            setUpdateInfo,
            updateInfo,
            updateInfoError,
            editUserInfo,
        }}>
            {children}
        </AuthContext.Provider>
    );
}