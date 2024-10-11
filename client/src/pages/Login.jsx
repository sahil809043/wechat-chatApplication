import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext";
import Loading from "../components/Loading";

const Login = () => {
  const navigate = useNavigate()

  const { loginInfo, updateLoginInfo, loginUser, loginError, isLoginLoading } = useContext(AuthContext);

  return (
    <>
      <section className="bg-gray-800 min-h-screen flex items-center justify-center py-4">
        {/* <!-- login container --> */}
        <div className="bg-gray-600 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          {/* <!-- form --> */}
          <div className="md:w-full px-8 md:px-16">
            <h2 className="mb-10 text-2xl text-white font-bold font-heading">Login</h2>
            {/* <p className="text-xs mt-4 text-white">If you are already a member, easily log in</p> */}

            <form onSubmit={loginUser} className="flex flex-col gap-4">
              <div className="flex items-center pl-6 mb-3 bg-white rounded-full">
                <span className="inline-block pr-3 py-2 border-r border-gray-50">
                  <svg className="w-5 h-5" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0 7.9998C0 3.58084 3.58172 0 8 0C12.4183 0 16 3.58084 16 7.9998C16 12.4188 12.4183 16 8 16C3.58172 16 0 12.4188 0 7.9998ZM7.76599 15.1073C3.89089 14.9782 0.892239 11.8993 0.892239 7.9998C0.892239 4.07347 3.99292 0.966562 7.92456 0.892315V7.30203L3.94997 10.3263C4.5705 11.0048 5.41342 11.4757 6.39252 11.6442C7.37161 11.8126 8.37192 11.6654 9.22294 11.2275C10.0738 10.7896 10.7261 10.0878 11.0607 9.24348C11.3954 8.39909 11.3913 7.46564 11.0495 6.62443C10.7075 5.78308 10.0571 5.08988 9.22546 4.64938C8.39421 4.20894 7.42989 4.05252 6.5058 4.20535C5.58172 4.35819 4.74614 4.80979 4.14446 5.47433L3.52269 4.93016C4.26094 4.11043 5.28261 3.54884 6.39434 3.40158C7.50608 3.25432 8.63989 3.53335 9.58811 4.18708C10.5361 4.84073 11.2322 5.82465 11.5583 6.93945C11.8843 8.05412 11.8193 9.23047 11.3747 10.3034C10.9304 11.3761 10.1366 12.2791 9.11489 12.8755C8.09336 13.472 6.89725 13.7241 5.71801 13.5901C4.53879 13.456 3.44565 12.9447 2.63484 12.1459L2.43745 11.9566L6.8961 8.67242V1.78504C10.4623 1.85832 13.1078 4.56559 13.1078 8C13.1078 11.509 10.508 14.2164 7.00001 14.2164C7.25444 14.2164 7.50896 14.1832 7.76599 14.1073Z" fill="black"></path>
                  </svg>
                </span>
                <input className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-900 rounded-r-full focus:outline-none"
                  type="email"
                  placeholder="E-mail"
                  onChange={(e) => updateLoginInfo({ ...loginInfo, email: e.target.value })} />
              </div>
              <div className="flex items-center pl-6 mb-6 bg-white rounded-full">
                <span className="inline-block pr-3 py-2 border-r border-gray-50">
                  <svg className="w-5 h-5" width="17" height="21" viewBox="0 0 17 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.184 8.48899H15.2011V6.25596C15.2011 2.6897 12.3193 0 8.49924 0C4.67919 0 1.7974 2.6897 1.7974 6.25596V8.48899H1.81568C0.958023 9.76774 0.457031 11.3049 0.457031 12.9569C0.457031 17.3921 4.06482 21 8.49924 21C12.9341 21 16.5424 17.3922 16.5428 12.9569C16.5428 11.3049 16.0417 9.76774 15.184 8.48899ZM2.69098 6.25596C2.69098 3.14895 5.13312 0.893578 8.49924 0.893578C11.8654 0.893578 14.3075 3.14895 14.3075 6.25596V7.39905C12.8423 5.86897 10.7804 4.91468 8.49966 4.91468C6.21837 4.91468 4.15607 5.86946 2.69098 7.40017V6.25596ZM8.49966 20.1064C4.55762 20.1064 1.35061 16.8989 1.35061 12.9569C1.35061 9.01534 4.5572 5.80826 8.49924 5.80826C12.4422 5.80826 15.6488 9.01534 15.6492 12.9569C15.6492 16.8989 12.4426 20.1064 8.49966 20.1064Z" fill="black"></path>
                    <path d="M8.49957 8.93567C7.26775 8.93567 6.26562 9.93779 6.26562 11.1696C6.26562 11.8679 6.60247 12.5283 7.1592 12.9474V14.7439C7.1592 15.4829 7.76062 16.0843 8.49957 16.0843C9.2381 16.0843 9.83994 15.4829 9.83994 14.7439V12.9474C10.3966 12.5278 10.7335 11.8679 10.7335 11.1696C10.7335 9.93779 9.7309 8.93567 8.49957 8.93567ZM9.16793 12.3228C9.03032 12.4023 8.94636 12.5502 8.94636 12.7088V14.7439C8.94636 14.9521 8.70726 15.1912 8.49957 15.1912C8.29136 15.1912 8.05267 14.9519 8.05267 14.7439V12.7088C8.05267 12.5501 7.9689 12.402 7.83129 12.3228C7.46356 12.1016 7.1592 11.6488 7.1592 11.1696C7.1592 10.4641 7.79401 9.82933 8.49957 9.82933C9.20451 9.82933 9.83994 10.4643 9.83994 11.1696C9.83994 11.6488 9.53569 12.1016 9.16793 12.3228Z" fill="black"></path>
                  </svg>
                </span>
                <input className="w-full pl-4 pr-6 py-4 font-bold placeholder-gray-900 rounded-r-full focus:outline-none"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => updateLoginInfo({ ...loginInfo, password: e.target.value })} />
              </div>
              {loginError && (
                <div className="relative top-0 bg-yellow-600 bg-clip-text font-extrabold mb-3 text-center select-auto" role="alert">
                  <p>{loginError.message} 😞</p>
                </div>
              )}
              <button
                type="submit"
                className="w-full py-4 px-6 font-semibold text-lg text-white" >
                <a className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-green-600 transition duration-300 ease-out border-2 border-green-500 rounded-full shadow-md group">
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-green-500 group-hover:translate-x-0 ease">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-green-500 transition-all duration-300 transform group-hover:translate-x-full ease">Login</span>
                  <span className="relative invisible">Login</span>
                </a>
              </button>
              {isLoginLoading && (
                <Loading />
              )}
            </form>

            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>

            <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#dde3ec]">
              <a href="/change-password">Forgot your password?</a>
            </div>

            <div className="mt-3 text-xs flex justify-between items-center text-[#dde3ec]">
              <p>Don't have an account?</p>
              <button className="text-[#112747] py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300" onClick={() => navigate('/Register')}>Register</button>
            </div>
          </div>

          {/* <!-- image --> */}
          <div className="md:block hidden w-full">
            <img className="rounded-2xl" src="https://plus.unsplash.com/premium_photo-1684761949512-fab7ef8a3b3c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2hhdGluZyUyMG9ubGluZXxlbnwwfHwwfHx8MA%3D%3D" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
