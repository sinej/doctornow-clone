import {useCallback, useEffect, useState} from 'react';
import {
    createTodos,
    deleteTodosSoft,
    getTodos,
    getTodosBySearch,
    getTodosByUserId,
    updateTodos
} from "@/actions/todo/todo.action";
import {Database} from "@/types/supabase";

type TodoDto = Database["public"]["Tables"]["todos_no_rls"]["Row"];
const useTodosController = (ownerUserId = "") => {
    const [loading, setLoading] = useState(true);
    const [todos, setTodos] = useState<TodoDto[]>([]);

    const handleGetTodos = useCallback(
        async () => {
            setLoading(true);
            try {
                const resultTodos = await getTodosByUserId(ownerUserId);
                if (resultTodos) setTodos(resultTodos);

            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }, [ownerUserId]);

    useEffect(() => {
        handleGetTodos();
    }, [handleGetTodos]);

    // 비어있는 todo 생성
    const handleCreateEmptyTodos = async () => {
        await createTodos("");
        await handleGetTodos();
    };

    // todo 업데이트
    const handleUpdateTodos = async (id: number, content: string) => {
        await updateTodos(id, content);
        await handleGetTodos();
    };

    // todo 삭제
    const handleDeleteTodos = async (id: number) => {
        await deleteTodosSoft(id);
        await handleGetTodos();
    };

    // todo 검색
    const handleSearchTodos = async (terms: string) => {
        if (terms) {
            const todoResult = await getTodosBySearch(terms);
            if (todoResult) setTodos(todoResult);
        } else {
            await handleGetTodos();
        }
    };

    return {loading, todos, handleCreateEmptyTodos, handleUpdateTodos, handleDeleteTodos, handleSearchTodos};

};


export default useTodosController;