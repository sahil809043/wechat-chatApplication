import React, { useContext, useState } from 'react';
import { baseUrl, postRequest } from '../utils/services';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState({ error: false, message: '' })
    const navigate = useNavigate();

    const handleChangePassword = async (e) => {
        e.preventDefault();

        try {
            const response = await postRequest(
                `${baseUrl}/users/changePassword`,
                JSON.stringify({
                    email,
                    newPassword: password,
                    confirmNewPassword: confirmPassword,
                }),
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.error) {
                setError({ error: true, message: response.error });
            } else {
                window.alert('Password Chnaged Succesfully');
                navigate('/login')
            }
        } catch (error) {
            setError({ error: true, message: response.error });
        }
    };

    return (
        <div className="flex item-center justify-center max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg shadow-lg border border-gray-200">
            <form
                className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
                onSubmit={handleChangePassword}
            >
                <h2 className="text-2xl font-semibold mb-6 text-gray-800">Change Your Password</h2>

                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-500"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">New Password</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm New Password</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                >
                    Change Password
                </button>
                {error && (
                    <div className="text-red-700 p-4" role="alert">
                        <p>{error.message}</p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default ChangePassword;