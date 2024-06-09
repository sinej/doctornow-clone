'use client'

import React from 'react';
import useTodosController from "../hooks/useTodosController";
import TodoList from "@/components/ui/TodoList";

interface TodoContainerProps {
    ownerUserId?: string;
}

const TodoContainer = ({ownerUserId}: TodoContainerProps) => {
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
            <TodoList ownerUserId={ownerUserId}
                      loading={loading}
                      todoListData={todos}
                      isReadOnly={false}
                      onUpdate={handleUpdateTodos}
                      onCreate={handleCreateEmptyTodos}
                      onDelete={handleDeleteTodos}
                      onSearch={handleSearchTodos}
            />
        </div>
    );
};

export default TodoContainer;