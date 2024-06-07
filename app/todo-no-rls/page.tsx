import React from 'react';
import {sleep} from "@/lib/utils";
import TodoContainer from "@/app/todo-no-rls/components/TodoContainer";

const Page = async () => {
    await sleep(1500);

    return (
        <div>
            <TodoContainer/>
        </div>
    );
};

export default Page;