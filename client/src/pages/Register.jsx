import React, { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const Register = () => {
  const navigate = useNavigate();
  const { registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading, setRegisterModal, registerModal } = useContext(AuthContext);

  return (
    <section className="py-10 2xl:py-20 bg-gradient-to-r from-blue-800 to-gray-900 overflow-hidden min-h-screen relative">
      {/* Background images */}
      <img className="hidden lg:block absolute inset-0 mt-32" src="zospace-assets/lines/line-mountain.svg" alt="" />
      <img className="hidden lg:block absolute inset-y-0 right-0 -mr-40 -mt-32" src="zospace-assets/lines/line-right-long.svg" alt="" />

      <div className="relative container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-16 lg:mb-0">
              <div className="max-w-md mx-auto lg:mx-0">
                <span className="text-lg text-blue-400 font-bold">Register Account</span>
                <h2 className="mt-8 mb-12 text-5xl font-bold font-heading text-white">Start your journey by creating an account.</h2>
              </div>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <div className="px-6 lg:px-20 py-12 lg:py-24 bg-gray-600 rounded-lg">
                <form onSubmit={registerUser}>
                  <h3 className="mb-10 text-2xl text-white font-bold font-heading">Register Account</h3>
                  {/* Username field */}
                  <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                    <span className="inline-block pr-3 py-2 border-r border-gray-50">
                      <svg className="w-5 h-5" width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.95442 10.166C4.04608 9.76202 3.79293 9.36025 3.38898 9.26859C2.98504 9.17693 2.58327 9.43009 2.49161 9.83403L3.95442 10.166ZM5.49981 4.73283C5.19117 5.00907 5.1649 5.48322 5.44115 5.79187C5.71739 6.10051 6.19154 6.12678 6.50019 5.85053L5.49981 4.73283ZM15 14.25C14.5858 14.25 14.25 14.5858 14.25 15C14.25 15.4142 14.5858 15.75 15 15.75L15 14.25ZM17.25 18.7083C17.25 19.1225 17.5858 19.4583 18 19.4583C18.4142 19.4583 18.75 19.1225 18.75 18.7083H17.25ZM5.25 18.7083C5.25 19.1225 5.58579 19.4583 6 19.4583C6.41421 19.4583 6.75 19.1225 6.75 18.7083H5.25ZM9 15L8.99998 15.75H9V15ZM11 15.75C11.4142 15.75 11.75 15.4142 11.75 15C11.75 14.5858 11.4142 14.25 11 14.25V15.75ZM12 3.75C16.5563 3.75 20.25 7.44365 20.25 12H21.75C21.75 6.61522 17.3848 2.25 12 2.25V3.75ZM12 20.25C7.44365 20.25 3.75 16.5563 3.75 12H2.25C2.25 17.3848 6.61522 21.75 12 21.75V20.25ZM20.25 12C20.25 16.5563 16.5563 20.25 12 20.25V21.75C17.3848 21.75 21.75 17.3848 21.75 12H20.25ZM3.75 12C3.75 11.3688 3.82074 10.7551 3.95442 10.166L2.49161 9.83403C2.33338 10.5313 2.25 11.2564 2.25 12H3.75ZM6.50019 5.85053C7.96026 4.54373 9.88655 3.75 12 3.75V2.25C9.50333 2.25 7.22428 3.1894 5.49981 4.73283L6.50019 5.85053ZM14.25 9C14.25 10.2426 13.2426 11.25 12 11.25V12.75C14.0711 12.75 15.75 11.0711 15.75 9H14.25ZM12 11.25C10.7574 11.25 9.75 10.2426 9.75 9H8.25C8.25 11.0711 9.92893 12.75 12 12.75V11.25ZM9.75 9C9.75 7.75736 10.7574 6.75 12 6.75V5.25C9.92893 5.25 8.25 6.92893 8.25 9H9.75ZM12 6.75C13.2426 6.75 14.25 7.75736 14.25 9H15.75C15.75 6.92893 14.0711 5.25 12 5.25V6.75ZM15 15.75C15.6008 15.75 16.1482 16.0891 16.5769 16.6848C17.0089 17.2852 17.25 18.0598 17.25 18.7083H18.75C18.75 17.7371 18.4052 16.6575 17.7944 15.8086C17.1801 14.9551 16.2275 14.25 15 14.25L15 15.75ZM6.75 18.7083C6.75 18.0598 6.99109 17.2852 7.42315 16.6848C7.85183 16.0891 8.39919 15.75 8.99998 15.75L9.00002 14.25C7.77253 14.25 6.81989 14.9551 6.20564 15.8086C5.59477 16.6575 5.25 17.7371 5.25 18.7083H6.75ZM9 15.75H11V14.25H9V15.75Z" fill="#000000"></path>
                      </svg>
                    </span>
                    <input
                      className="w-full pl-4 pr-6 py-4 font-semibold placeholder-gray-600 rounded-r-full focus:outline-none"
                      type="text"
                      placeholder="Username"
                      onChange={(e) => updateRegisterInfo({ ...registerInfo, username: e.target.value })}
                    />
                  </div>
                  {/* Email field */}
                  <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                    <span className="inline-block pr-3 py-2 border-r border-gray-50">
                      <svg className="w-5 h-5" width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M3.75 5.25L3 6V18L3.75 18.75H20.25L21 18V6L20.25 5.25H3.75ZM4.5 7.6955V17.25H19.5V7.69525L11.9999 14.5136L4.5 7.6955ZM18.3099 6.75H5.68986L11.9999 12.4864L18.3099 6.75Z" fill="#080341"></path>
                      </svg>
                    </span>
                    <input
                      className="w-full pl-4 pr-6 py-4 font-semibold placeholder-gray-600 rounded-r-full focus:outline-none"
                      type="email"
                      placeholder="E-mail"
                      onChange={(e) => updateRegisterInfo({ ...registerInfo, email: e.target.value })}
                    />
                  </div>
                  {/* Password field */}
                  <div className="flex items-center pl-6 mb-6 bg-white rounded-full">
                    <span className="inline-block pr-3 py-2 border-r border-gray-50">
                      <svg className="w-5 h-5" width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.184 8.48899H15.2011V6.25596C15.2011 2.6897 12.3193 0 8.49924 0C4.67919 0 1.7974 2.6897 1.7974 6.25596V8.48899H1.81568C0.958023 9.76774 0.457031 11.3049 0.457031 12.9569C0.457031 17.3921 4.06482 21 8.49924 21C12.9341 21 16.5424 17.3922 16.5428 12.9569C16.5428 11.3049 16.0417 9.76774 15.184 8.48899ZM2.69098 6.25596C2.69098 3.14895 5.13312 0.893578 8.49924 0.893578C11.8654 0.893578 14.3075 3.14895 14.3075 6.25596V7.39905C12.8423 5.86897 10.7804 4.91468 8.49966 4.91468C6.21837 4.91468 4.15607 5.86946 2.69098 7.40017V6.25596ZM8.49966 20.1064C4.55762 20.1064 1.35061 16.8989 1.35061 12.9569C1.35061 9.01534 4.5572 5.80826 8.49924 5.80826C12.4422 5.80826 15.6488 9.01534 15.6492 12.9569C15.6492 16.8989 12.4426 20.1064 8.49966 20.1064Z" fill="black"></path>
                        <path d="M8.49957 8.93567C7.26775 8.93567 6.26562 9.93779 6.26562 11.1696C6.26562 11.8679 6.60247 12.5283 7.1592 12.9474V14.7439C7.1592 15.4829 7.76062 16.0843 8.49957 16.0843C9.2381 16.0843 9.83994 15.4829 9.83994 14.7439V12.9474C10.3966 12.5278 10.7335 11.8679 10.7335 11.1696C10.7335 9.93779 9.7309 8.93567 8.49957 8.93567ZM9.16793 12.3228C9.03032 12.4023 8.94636 12.5502 8.94636 12.7088V14.7439C8.94636 14.9521 8.70726 15.1912 8.49957 15.1912C8.29136 15.1912 8.05267 14.9519 8.05267 14.7439V12.7088C8.05267 12.5501 7.9689 12.402 7.83129 12.3228C7.46356 12.1016 7.1592 11.6488 7.1592 11.1696C7.1592 10.4641 7.79401 9.82933 8.49957 9.82933C9.20451 9.82933 9.83994 10.4643 9.83994 11.1696C9.83994 11.6488 9.53569 12.1016 9.16793 12.3228Z" fill="black"></path>
                      </svg>
                    </span>
                    <input
                      className="w-full pl-4 pr-6 py-4 font-semibold placeholder-gray-600 rounded-r-full focus:outline-none"
                      type="password"
                      placeholder="Password"
                      onChange={(e) => updateRegisterInfo({ ...registerInfo, password: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center pl-6 mb-6 bg-white rounded-full">
                    <span className="inline-block pr-3 py-2 border-r border-gray-50">
                      <svg className="w-5 h-5" width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.184 8.48899H15.2011V6.25596C15.2011 2.6897 12.3193 0 8.49924 0C4.67919 0 1.7974 2.6897 1.7974 6.25596V8.48899H1.81568C0.958023 9.76774 0.457031 11.3049 0.457031 12.9569C0.457031 17.3921 4.06482 21 8.49924 21C12.9341 21 16.5424 17.3922 16.5428 12.9569C16.5428 11.3049 16.0417 9.76774 15.184 8.48899ZM2.69098 6.25596C2.69098 3.14895 5.13312 0.893578 8.49924 0.893578C11.8654 0.893578 14.3075 3.14895 14.3075 6.25596V7.39905C12.8423 5.86897 10.7804 4.91468 8.49966 4.91468C6.21837 4.91468 4.15607 5.86946 2.69098 7.40017V6.25596ZM8.49966 20.1064C4.55762 20.1064 1.35061 16.8989 1.35061 12.9569C1.35061 9.01534 4.5572 5.80826 8.49924 5.80826C12.4422 5.80826 15.6488 9.01534 15.6492 12.9569C15.6492 16.8989 12.4426 20.1064 8.49966 20.1064Z" fill="black"></path>
                        <path d="M8.49957 8.93567C7.26775 8.93567 6.26562 9.93779 6.26562 11.1696C6.26562 11.8679 6.60247 12.5283 7.1592 12.9474V14.7439C7.1592 15.4829 7.76062 16.0843 8.49957 16.0843C9.2381 16.0843 9.83994 15.4829 9.83994 14.7439V12.9474C10.3966 12.5278 10.7335 11.8679 10.7335 11.1696C10.7335 9.93779 9.7309 8.93567 8.49957 8.93567ZM9.16793 12.3228C9.03032 12.4023 8.94636 12.5502 8.94636 12.7088V14.7439C8.94636 14.9521 8.70726 15.1912 8.49957 15.1912C8.29136 15.1912 8.05267 14.9519 8.05267 14.7439V12.7088C8.05267 12.5501 7.9689 12.402 7.83129 12.3228C7.46356 12.1016 7.1592 11.6488 7.1592 11.1696C7.1592 10.4641 7.79401 9.82933 8.49957 9.82933C9.20451 9.82933 9.83994 10.4643 9.83994 11.1696C9.83994 11.6488 9.53569 12.1016 9.16793 12.3228Z" fill="black"></path>
                      </svg>
                    </span>
                    <input
                      className="w-full pl-4 pr-6 py-4 font-semibold placeholder-gray-600 rounded-r-full focus:outline-none"
                      type="password"
                      placeholder="Confirm Password"
                      onChange={(e) => updateRegisterInfo({ ...registerInfo, confirmPassword: e.target.value })}
                    />
                  </div>
                  {registerError && (
                    <div className="relative top-0 bg-yellow-600 bg-clip-text font-extrabold mb-3 text-center select-auto" role="alert">
                      <p>{registerError.message} 😞</p>
                    </div>
                  )}
                  {/* <button
                    type="submit"
                    className="w-full py-4 px-6 font-semibold text-lg text-white bg-blue-500 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-blue-400"
                    disabled={isRegisterLoading}
                  >
                    Register
                  </button> */}
                  <button
                    type="submit"
                    className="w-full py-4 px-6 font-semibold text-lg text-white"
                    disabled={isRegisterLoading}>
                    <a className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-blue-600 transition duration-300 ease-out border-2 border-blue-500 rounded-full shadow-md group">
                      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-500 group-hover:translate-x-0 ease">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </span>
                      <span className="absolute flex items-center justify-center w-full h-full text-blue-500 transition-all duration-300 transform group-hover:translate-x-full ease">Register</span>
                      <span className="relative invisible">Register</span>
                    </a>
                  </button>
                  {isRegisterLoading && (
                    <Loading />
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {registerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-md">
          <div className="relative p-4 text-center bg-black rounded-lg shadow-lg dark:bg-gray-800 sm:p-5">
            <div className="relative flex flex-col w-full outline-none focus:outline-none bg-opacity-50 backdrop-blur-md z-50">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 p-2 flex items-center justify-center mx-auto mb-3.5">
                <svg aria-hidden="true" className="w-8 h-8 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
                <span className="sr-only">Success</span>
              </div>
              <p className="mb-8 mt-4 mx-10 text-lg font-semibold text-white dark:text-white">Successfully Registered</p>
              <button
                onClick={() => {
                  setRegisterModal(false);
                  navigate('/Login');
                }}>
                <a className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-indigo-600 border-2 border-indigo-600 rounded-full hover:text-white group hover:bg-gray-50">
                  <span className="absolute left-0 block w-full h-0 transition-all bg-indigo-600 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                  <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </span>
                  <span className="relative">Go To Login</span>
                </a>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Register;
