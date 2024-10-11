import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { Menu, X } from 'lucide-react';
import Notification from "../Notifications.jsx"
import { baseUrl, postRequest } from "../../utils/services.js";
import Loading from "../Loading.jsx";

const menuItems = [
  {
    name: 'Home',
    href: "/",
  },
  {
    name: "Login",
    href: "/Login",
  },
  {
    name: "Signup",
    href: "/Register",
  },
];

const userMenuItems = [
  {
    name: "Messages",
    href: "/messages",
  },
  {
    name: "Global",
    href: "/global",
  },
  {
    name: "Update profile",
    href: "/update-info",
  },
  {
    name: "Find Friend",
    href: "/find-friends",
  },
  {
    name: "Remove Friend",
    href: "/remove-friend",
  },
];

const Head = ({ isSelected, setIsSelected }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser, userId, logoutUser } = useContext(AuthContext);
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ error: false, message: '' });
  const [loading, setLoading] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    openModal();
  };

  const confirmLogout = async () => {
    setLoading(true);
    try {
      const response = await postRequest(
        `${baseUrl}/users/logout`,
        JSON.stringify({
          password,
          refreshToken: currentUser?.refreshToken,
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      if (response.error) {
        setError({ error: true, message: response.error });
        setLoading(false);
      } else {
        setTimeout(() => {
          logoutUser();
          setLoading(false);
          closeModal();
        }, 2000);
      }
    } catch (error) {
      setError({ error: true, message: `error is ${error}` });
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  if (isModalOpen) {
    return (
      <>
        {isModalOpen && (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-sm">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-900 outline-none focus:outline-none bg-opacity-50 backdrop-blur-md z-50">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    <h3 className="text-white text-3xl font-semibold">
                      Please confirm your Password!
                    </h3>
                  </div>
                  <div className="relative p-6 flex-auto">
                    <input
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="border border-gray-300 rounded p-2 w-full"
                    />
                    {error.error && (
                      <div className="text-red-700 p-4 mt-4" role="alert">
                        <p>{error.message}</p>
                      </div>
                    )}
                    {loading && (
                      <Loading />
                    )}
                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => {
                        closeModal();
                        setError({ error: false, message: '' });
                      }}
                    >
                      Close
                    </button>
                    <button
                      className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => confirmLogout()}
                      disabled={loading}
                    >
                      Confirm Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        )}
      </>
    );
  } else if (userId) {
    return (
      <header className="relative w-full border-b bg-gray-800 pb-4">
        <div className="mx-10 flex max-w-7xl items-center justify-between px-2 py-2">
          <div className="inline-flex items-center space-x-2">
            <div className="flex items-center">
              <button>
                <div className="h-12 w-12 rounded-full overflow-hidden object-cover mt-2">
                  <img src={currentUser?.profileImage}
                    alt="Your profile image"
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                    }} />
                </div>

              </button>
              <div className="flex-1 min-w-0 ml-6">
                <p className="text-lg font-medium text-white truncate dark:text-white">
                  {currentUser?.username}
                </p>
                <p className={`text-sm text-yellow-300`}>
                  {currentUser?.uniqueId}
                </p>
              </div>
            </div>
          </div>
          <Notification />
          <div className="hidden lg:block">
            <ul className="inline-flex space-x-8">
              {userMenuItems.map((item, index) => (
                <li key={item.name}>
                  <a
                    onClick={() => {
                      setIsSelected(index)
                      navigate(item.href)
                    }}
                    className={`text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${isSelected == index ? 'text-yellow-500' : ''}`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden lg:block">
            <button
              type="button"
              onClick={() => handleLogout()}
              className="overflow-hidden rounded-lg bg-orange-700 px-5 py-2.5 text-black transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:-translate-y-1 active:scale-x-90 active:scale-y-110"
            >
              Logout
            </button>
          </div>
          <div className="lg:hidden">
            <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer bg-white" />
          </div>
          {isMenuOpen && (
            <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
              <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-5 pb-6 pt-5">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center space-x-2">
                      <span>
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 50 56"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                            fill="black"
                          />
                        </svg>
                      </span>
                      <span className="font-bold">DevUI</span>
                    </div>
                    <div className="-mr-2">
                      <button
                        type="button"
                        onClick={toggleMenu}
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        <span className="sr-only">Close menu</span>
                        <X className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid gap-y-4">
                      {userMenuItems.map((item, index) => (
                        <a
                          key={item.name}
                          onClick={() => {
                            // navigate(item.href);
                            setIsSelected(index)
                            toggleMenu();
                          }}
                          className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                        >
                          <span className="ml-3 text-base font-medium text-gray-900 ${isSelected == index ? 'text-yellow-500' : ''}">
                            {item.name}
                            <div className="border-b w-screen border-gray-700 my-2 p-1" />
                          </span>
                        </a>
                      ))}
                    </nav>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      handleLogout()
                      toggleMenu()
                    }}
                    className="overflow-hidden rounded-lg bg-orange-700 px-5 py-2.5 text-black transition-all duration-300 [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:-translate-y-1 active:scale-x-90 active:scale-y-110"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
    );
  } else {
    return (
      <header className="relative w-full border-b bg-gray-800 pb-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2">
          <div className="inline-flex items-center space-x-2">
            <span>
              <svg fill="#6bc77a"
                width="48"
                height="48"
                viewBox="-51.2 -51.2 614.40 614.40"
                xmlns="http://www.w3.org/2000/svg" stroke="#6bc77a">
                <g id="SVGRepo_bgCarrier" strokeWidth="0"
                  transform="translate(28.159999999999997,28.159999999999997), scale(0.89)"><path transform="translate(-51.2, -51.2), scale(38.4)" fill="#bddbe5" d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z" strokeWidth="0"></path></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="45.056"><title>ionicons-v5_logos</title><path d="M80,32,48,112V416h96v64h64l64-64h80L464,304V32ZM416,288l-64,64H256l-64,64V352H112V80H416Z"></path><rect x="320" y="143" width="48" height="129"></rect><rect x="208" y="143" width="48" height="129"></rect></g><g id="SVGRepo_iconCarrier"><title>ionicons-v5_logos</title><path d="M80,32,48,112V416h96v64h64l64-64h80L464,304V32ZM416,288l-64,64H256l-64,64V352H112V80H416Z"></path><rect x="320" y="143" width="10" height="10"></rect>
                  <rect x="208" y="143" width="10" height="10"></rect></g>
              </svg>
            </span>
            <span className="text-white font-bold">Wechat</span>
          </div>
          <div className="hidden lg:block">
            <ul className="inline-flex space-x-8">
              {menuItems.map((item, index) => (
                <li key={item.name}>
                  <a
                    onClick={() => {
                      navigate(item.href)
                      setSelected(index)
                    }}
                    className={`text-gray-300 hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium cursor-pointer ${selected == index ? 'text-yellow-500' : ''}`}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden lg:block">
          </div>
          <div className="lg:hidden">
            <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer bg-white" />
          </div>
          {isMenuOpen && (
            <div className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition lg:hidden">
              <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="px-5 pb-6 pt-5">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex items-center space-x-2">
                      <span>
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 50 56"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                            fill="black"
                          />
                        </svg>
                      </span>
                      <span className="font-bold">DevUI</span>
                    </div>
                    <div className="-mr-2">
                      <button
                        type="button"
                        onClick={toggleMenu}
                        className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                      >
                        <span className="sr-only">Close menu</span>
                        <X className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-6">
                    <nav className="grid gap-y-4">
                      {menuItems.map((item) => (
                        <a
                          key={item.name}
                          onClick={() => {
                            navigate(item.href);
                            toggleMenu(); // Close the menu after navigating
                          }}
                          className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                        >
                          <span className="ml-3 text-base font-medium text-gray-900">
                            {item.name}
                          </span>
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

    );

  }

}
export default Head;