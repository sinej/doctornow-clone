'use client'

import React from 'react';
import useTodosController from "../hooks/useTodosController";
import TodoList from "@/components/ui/TodoList";

const TodoContainer = () => {
    const {
        loading,
        todos,
        handleCreateEmptyTodos,
        handleUpdateTodos,
        handleDeleteTodos,
        handleSearchTodos,
    } = useTodosController();

    return (
        <div>
            <TodoList sharedUserFullName="gasina_eunji"
                      owerUserId="123123"
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