'use client'

import React, {useEffect} from 'react';
import {
    getTodos,
    getTodosById,
    getTodosBySearch,
    createTodos,
    updateTodos,
    deleteTodosSoft,
    deleteTodosHard
} from "@/apis/todos-no-rls";

const TodoContainer = () => {
    useEffect(() => {
        getTodos();
        deleteTodosHard(8);
    }, []);

    return (
        <div>
            TodoContainer
        </div>
    );
};

export default TodoContainer;