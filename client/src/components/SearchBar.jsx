import React from "react";
import { FaSearch } from 'react-icons/fa'; // Import a search icon

const SearchBar = ({ info, setInfo, showSuggestedFriend }) => {

    const handleSearch = (e) => {
        setInfo(e.target.value);
    };

    return (
        <div className="relative max-w-lg mx-auto">
            <input
                type="text"
                value={info}
                placeholder="Enter Unique Id"
                onChange={handleSearch}
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-4 py-2.5 shadow-md transition duration-300 ease-in-out hover:border-blue-500 hover:shadow-lg focus:outline-none"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
    );
};

export default SearchBar;