'use client'

import React from 'react';
import {BounceLoader} from "react-spinners";

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-12">
            <div className="">
                <BounceLoader/>
            </div>
            <div>
                <p className="font-bold text-xl">Loading...</p>
            </div>
        </div>
    );
};

export default Loading;