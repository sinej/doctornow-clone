'use client'

import React, {useState} from 'react';
import {IoSearchOutline} from "react-icons/io5";
import {AiOutlinePlus} from "react-icons/ai";

const InputBox = ({
                      onCreate = () => {},
                      onSearch = (terms) => {},
                  }) => {
    const [userSearchInput, setUserSearchInput] = useState("");

    const handleSearchEnd = () => {
        onSearch(userSearchInput);
        setUserSearchInput("");
    }

    return (
        <article className="flex flex-col sm:flex-row gap-4 mt-8 pb-5">
            <div className="flex flex-1 h-[60px]">
                <input className="bg-gray-100 rounded-l-2xl outline-none p-4 flex-1 font-bold"
                       value={userSearchInput}
                       onChange={(e) => setUserSearchInput(e.target.value)}
                       onKeyDown={(e) => {
                           if (e.key === "Enter") handleSearchEnd()
                       }}
                />
                <div className="w-[60px] flex justify-center items-center bg-black rounded-r-2xl"
                     onClick={() => handleSearchEnd()}
                >
                    <IoSearchOutline size={20} color="#fff"/>
                </div>
            </div>
            <div
                className="h-[60px] w-[60px] flex justify-center items-center bg-[#7EBB95] rounded-2xl border border-[#7EBB95] cursor-pointer"
                onClick={onCreate}
            >
                <AiOutlinePlus size={20}/>
            </div>
        </article>
    );
};

export default InputBox;