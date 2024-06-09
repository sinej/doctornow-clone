import React from 'react';
import ClientComponentTest from "@/app/todo/components/ClientComponentTest";
import {getTodoAction} from "@/actions/todo/todo.action";

const Page = async () => {

    const result = await getTodoAction();

    console.log(">>SSR End");

    return (
        <div>
            {JSON.stringify(result)}
            <ClientComponentTest />
        </div>
    );
};

export default Page;