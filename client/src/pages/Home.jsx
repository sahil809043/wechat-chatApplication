import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Home() {
	const navigate = useNavigate();
	return (
		<div className="font-inter bg-gradient-to-t from-blue-50 via-white to-blue-100 dark:bg-gradient-to-t dark:from-gray-900 dark:via-gray-800 dark:to-gray-700">

			{/* Hero Section */}
			<section className="bg-gradient-to-r from-white-500 to-white-600 dark:from-purple-700 dark:to-blue-900 py-16 text-gray-700">
				<div className=" mx-auto flex flex-col lg:flex-row items-center px-6">
					<div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0 text-center lg:text-left">
						<h1 className="text-4xl lg:text-5xl font-extrabold mb-4">
							Welcome to Wechat 🚀
						</h1>
						<p className="text-lg lg:text-xl mb-6">
							Wechat is a revolutionary messaging platform designed to make communication simple and secure. Connect with people around the world with ease. 🌐
						</p>
					</div>
					<div className="lg:w-1/2 lg:flex lg:justify-center lg:items-center">
						<img
							src="https://demo.themesberg.com/landwind/images/hero.png"
							alt="hero image"
							className="w-full max-w-md rounded-lg shadow-lg"
						/>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="bg-gradient-to-r from-white-500 to-white-600 dark:from-purple-700 dark:to-blue-900 py-16 text-gray-700">
				<h2 className="text-3xl font-bold text-center text-white-700 dark:text-purple-400 mb-12">
					Features 🌟
				</h2>
				<div className="mx-auto flex flex-wrap justify-center p-5">
					<div className="h-80 bg-white dark:bg-gray-700 shadow-lg rounded-lg p-2 m-4 w-full sm:w-80 text-center transform transition hover:scale-105">
						<img
							src="https://img-cdn.pixlr.com/image-generator/history/66a7c5ad3da6bb56a4697cf7/c16cc45e-c2c4-4c20-a86a-9dde7a05151f/preview.webp"
							alt="Real-Time Messaging"
							className="h-52 w-full rounded-md object-cover mb-4"
						/>
						<h3 className="text-xl font-bold mb-2">Real-Time Messaging 📲</h3>
						<p>Chat with your friends instantly with our real-time messaging features.</p>
					</div>
					<div className="h-80 bg-white dark:bg-gray-700 shadow-lg rounded-lg p-2 m-4 w-full sm:w-80 text-center transform transition hover:scale-105">
						<img
							src="https://img-cdn.pixlr.com/image-generator/history/66a7c63696b2c74df6c8c828/ed99ebe7-9780-4825-aedf-8698ffa74a47/preview.webp"
							alt="Secure Conversations"
							className="h-52 w-full rounded-md object-cover mb-4"
						/>
						<h3 className="text-xl font-bold mb-2">Secure Conversations 🔒</h3>
						<p>Your privacy is our priority. All chats are end-to-end encrypted for your security.</p>
					</div>
					<div className="h-80 bg-white dark:bg-gray-700 shadow-lg rounded-lg p-2 m-4 w-full sm:w-80 text-center transform transition hover:scale-105">
						<img
							src="https://img-cdn.pixlr.com/image-generator/history/66a7c673ce5ce592532e8ffa/0145907e-66d7-499d-9f3f-59bf7ae10685/preview.webp"
							alt="User-Friendly Interface"
							className="h-52 w-full rounded-md object-cover mb-4"
						/>
						<h3 className="text-xl font-bold mb-2">User-Friendly Interface 🖥️</h3>
						<p>Enjoy a sleek and intuitive interface that makes chatting easy and enjoyable.</p>
					</div>
				</div>
			</section>

			<section className="bg-gradient-to-r from-white-500 to-white-600 dark:from-purple-700 dark:to-blue-900 py-16 text-gray-700">
				<div className="mx-auto flex flex-col lg:flex-row items-center px-6 py-6">
					<div className="lg:w-1/2 lg:flex lg:justify-center lg:items-center">
						<img
							src="https://img.freepik.com/free-vector/dating-application-concept_23-2148277325.jpg?size=626&ext=jpg&ga=GA1.1.2060598943.1722769457&semt=ais_hybrid"
							alt="hero image"
							className="w-full max-w-md rounded-lg shadow-lg"
						/>
					</div>
					<div className="lg:w-1/2 lg:pr-8 mb-8 lg:mb-0 text-center lg:text-left">
						<p className="text-3xl lg:text-xl mb-6">
							Stay connected with private messaging and feel closer to your loved ones, no matter the distance. 💬💖</p>
					</div>
				</div>
			</section>

			{/* Testimonial Section */}
			<section className="bg-gradient-to-r from-white-500 to-white-600 dark:from-purple-700 dark:to-blue-900 py-16 text-gray-700">
				<div className="mx-auto text-center px-6">
					<figure className="max-w-screen-md mx-auto mb-8">
						<svg className="h-12 mx-auto mb-3 text-gray-200 dark:text-gray-400" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" fill="currentColor" />
						</svg>
						<blockquote>
							<p className="text-lg font-medium md:text-xl">
								"Experience seamless communication with our chat application, built with cutting-edge technology. This full-stack project combines a sleek frontend with a robust backend for an unparalleled messaging experience." 🌟💬
							</p>
						</blockquote>
					</figure>
				</div>
			</section>

			{/* Call to Action Section */}
			<section className="bg-gradient-to-r from-white-500 to-white-600 dark:from-purple-700 dark:to-blue-900 py-16 text-gray-700">
				<div className="mx-auto text-center px-6">
					<h2 className="text-3xl font-extrabold mb-6">
						Create Your Account Now 🎉
					</h2>
					<a
						href="#"
						className="border text-black-700 hover:text-purple-600 vfont-medium rounded-lg text-sm px-5 py-2.5 transition duration-300 ease-in-out" onClick={() => navigate('/Register')}
					>
						Register Now
					</a>
				</div>
			</section>

			{/* Footer */}
			<footer className="bg-gray-100 dark:bg-gray-900 py-10">
				<div className="mx-auto text-center max-w-screen-lg">
					{/* Footer Logo and Description */}
					<div className="mb-8">
						<span className="flex justify-center items-center">
							<svg
								fill="#6bc77a"
								width="60"
								height="60"
								viewBox="-51.2 -51.2 614.40 614.40"
								xmlns="http://www.w3.org/2000/svg"
								stroke="#6bc77a"
								className="mx-auto"
							>
								<g
									id="SVGRepo_bgCarrier"
									strokeWidth="0"
									transform="translate(28.159999999999997,28.159999999999997), scale(0.89)"
								>
									<path
										transform="translate(-51.2, -51.2), scale(38.4)"
										fill="#bddbe5"
										d="M9.166.33a2.25 2.25 0 00-2.332 0l-5.25 3.182A2.25 2.25 0 00.5 5.436v5.128a2.25 2.25 0 001.084 1.924l5.25 3.182a2.25 2.25 0 002.332 0l5.25-3.182a2.25 2.25 0 001.084-1.924V5.436a2.25 2.25 0 00-1.084-1.924L9.166.33z"
										strokeWidth="0"
									></path>
								</g>
								<g
									id="SVGRepo_tracerCarrier"
									strokeLinecap="round"
									strokeLinejoin="round"
									stroke="#CCCCCC"
									strokeWidth="45.056"
								>
									<title>ionicons-v5_logos</title>
									<path d="M80,32,48,112V416h96v64h64l64-64h80L464,304V32ZM416,288l-64,64H256l-64,64V352H112V80H416Z"></path>
									<rect x="320" y="143" width="48" height="129"></rect>
									<rect x="208" y="143" width="48" height="129"></rect>
								</g>
								<g id="SVGRepo_iconCarrier">
									<title>ionicons-v5_logos</title>
									<path d="M80,32,48,112V416h96v64h64l64-64h80L464,304V32ZM416,288l-64,64H256l-64,64V352H112V80H416Z"></path>
									<rect x="320" y="143" width="10" height="10"></rect>
									<rect x="208" y="143" width="10" height="10"></rect>
								</g>
							</svg>
						</span>
						<p className="text-gray-600 dark:text-gray-400 mt-4 text-lg font-semibold">
							Wechat - Connecting People with Ease. 🌐
						</p>
					</div>

					{/* Social Media Links */}
					<div className="flex justify-center space-x-8 mb-8">
						<a
							href="#"
							className="text-gray-500 hover:text-blue-600 dark:hover:text-gray-300 transition transform hover:scale-110 duration-300"
						>
							<svg
								className="h-8 w-8"
								fill="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M12 2.04c-5.52 0-10 4.48-10 10 0 5.04 3.79 9.2 8.7 9.8v-6.9h-2.6v-2.8h2.6v-2.1c0-2.6 1.55-4 3.89-4 1.1 0 2.07.08 2.35.12v2.72h-1.6c-1.32 0-1.57.63-1.57 1.56v2.08h3.16l-.41 2.8h-2.75v6.89c4.91-.6 8.7-4.76 8.7-9.8 0-5.52-4.48-10-10-10z" />
							</svg>
						</a>
						<a
							href="#"
							className="text-gray-500 hover:text-blue-400 dark:hover:text-gray-300 transition transform hover:scale-110 duration-300"
						>
							<svg
								className="h-8 w-8"
								fill="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M19.62 7.81c.01.17.01.34.01.51 0 5.21-3.97 11.22-11.22 11.22-2.23 0-4.31-.65-6.06-1.77.31.04.61.06.92.06 1.81 0 3.48-.62 4.8-1.67-1.69-.03-3.12-1.15-3.61-2.67.24.05.49.08.74.08.36 0 .71-.05 1.04-.14-1.77-.35-3.12-1.91-3.12-3.81v-.05c.52.29 1.12.46 1.76.48-1.05-.7-1.75-1.9-1.75-3.26 0-.71.19-1.37.52-1.95 1.91 2.35 4.75 3.9 7.97 4.06-.07-.28-.1-.57-.1-.87 0-2.1 1.71-3.81 3.81-3.81 1.1 0 2.1.46 2.82 1.21.88-.17 1.71-.49 2.44-.92-.29.9-.9 1.67-1.7 2.17.79-.1 1.54-.31 2.24-.62-.52.79-1.18 1.49-2.02 2.04z" />
							</svg>
						</a>
						<a
							href="#"
							className="text-gray-500 hover:text-blue-700 dark:hover:text-gray-300 transition transform hover:scale-110 duration-300"
						>
							<svg
								className="h-8 w-8"
								fill="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M22.23 0h-20.46c-1.06 0-1.92.86-1.92 1.92v20.16c0 1.06.86 1.92 1.92 1.92h20.46c1.06 0 1.92-.86 1.92-1.92v-20.16c0-1.06-.86-1.92-1.92-1.92zm-14.71 20.75h-3.77v-11.18h3.77v11.18zm-1.89-12.7c-1.2 0-2.17-.97-2.17-2.17 0-1.2.97-2.17 2.17-2.17s2.17.97 2.17 2.17c0 1.2-.97 2.17-2.17 2.17zm15.59 12.7h-3.77v-5.67c0-1.35-.05-3.09-1.88-3.09-1.89 0-2.18 1.48-2.18 2.99v5.77h-3.77v-11.18h3.62v1.52h.05c.5-.95 1.73-1.95 3.55-1.95 3.8 0 4.51 2.51 4.51 5.78v6.83z" />
							</svg>
						</a>
					</div>
				</div>
			</footer>


		</div>
	);
}


