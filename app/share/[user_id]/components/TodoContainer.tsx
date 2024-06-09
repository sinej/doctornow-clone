'use client'

import React from 'react';
import useTodosController from "../hooks/useTodosController";
import TodoList from "@/components/ui/TodoList";

interface TodoContainerProps {
    ownerUserId?: string;
    sharedUserFullName?: string;
}

const TodoContainer = ({ownerUserId, sharedUserFullName}: TodoContainerProps) => {
    const {
        loading,
        todos,
        handleCreateEmptyTodos,
        handleUpdateTodos,
        handleDeleteTodos,
        handleSearchTodos,
    } = useTodosController(ownerUserId);

    return (
        <div>
            <TodoList sharedUserFullName={sharedUserFullName}
                      ownerUserId={ownerUserId}
                      loading={loading}
                      todoListData={todos}
                      isReadOnly={true}
                      onUpdate={handleUpdateTodos}
                      onCreate={handleCreateEmptyTodos}
                      onDelete={handleDeleteTodos}
                      onSearch={handleSearchTodos}
            />
        </div>
    );
};

export default TodoContainer;