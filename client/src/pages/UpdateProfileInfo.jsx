import React, { useState, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const UpdateProfileInfo = () => {
    const { updateUserInfo, editUserInfo, updateInfo, updateInfoError, setUpdateInfo } = useContext(AuthContext);
    const [profileImage, setProfileImage] = useState(updateInfo.profileImage);

    // Handling image changes
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Update profileImage in local state
                setProfileImage(reader.result);
                // Update profileImage in updateInfo state
                setUpdateInfo((prevInfo) => ({
                    ...prevInfo,
                    profileImage: reader.result
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    // Handling form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        editUserInfo();
    };

    return (
        <div className="max-w-4xl mx-auto p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Update Your Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex items-center space-x-6 mb-6">
                    <div className="relative w-32 h-32">
                        <img
                            src={profileImage || updateInfo.profileImage || 'default-profile.png'}
                            alt="Profile"
                            className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg"
                            style={{
                                objectFit: 'cover',
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                            }}
                        />
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="absolute bottom-0 right-0 opacity-0 cursor-pointer w-full h-full"
                            id="profileImage"
                        />
                        <label
                            htmlFor="profileImage"
                            className="absolute bottom-0 right-0 bg-blue-700 text-white px-3 py-1 rounded-full cursor-pointer text-xs shadow-lg"
                        >
                            Change
                        </label>
                    </div>
                    <div className="flex-1">
                        <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                            Username
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={updateInfo.name}
                            onChange={(e) => updateUserInfo({ ...updateInfo, name: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                        <label htmlFor="email" className="block text-sm font-medium text-white mt-4 mb-1">
                            E-mail
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={updateInfo.mail}
                            onChange={(e) => updateUserInfo({ ...updateInfo, mail: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                        />
                    </div>
                </div>
                {updateInfoError.error && (
                    <div className="bg-red-100 text-red-700 p-4 rounded-md shadow-lg" role="alert">
                        <p>{updateInfoError.message}</p>
                    </div>
                )}
                <div className="flex items-center justify-center mt-6">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        Update Profile
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateProfileInfo;