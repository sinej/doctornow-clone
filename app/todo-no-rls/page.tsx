import React from 'react';
import {sleep} from "@/lib/utils";

const Page = async () => {
    await sleep(1500);

    return (
        <div>
            Page
        </div>
    );
};

export default Page;