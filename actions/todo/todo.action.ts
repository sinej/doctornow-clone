'use server'

import {createServerSideClient} from "@/lib/supabase";

export const getTodos = async () => {
    const supabase = await createServerSideClient();
    const result = await supabase
        .from("todos_with_rls")
        .select("*")
        .is("deleted_at", null)
        .order("id", {
            ascending: false, // 내림차순
        });

    return result.data;
}

// Todo List 가져오기 + by Id
export const getTodosById = async (id: number) => {
    const supabase = await createServerSideClient();
    const result = await supabase
        .from("todos_with_rls")
        .select("*")
        .is("deleted_at", null)
        .eq("id", id);

    return result.data;
}

// Todo List 가져오기 + by userId
export const getTodosByUserId = async (userId: string) => {
    const supabase = await createServerSideClient(true);
    const result = await supabase
        .from("todos_with_rls")
        .select("*")
        .is("deleted_at", null)
        .eq("user_id", userId);

    return result.data;
}

// Todo List 중 가져오기 + search
export const getTodosBySearch = async (terms: string) => {
    const supabase = await createServerSideClient();
    const result = await supabase
        .from("todos_with_rls")
        .select("*")
        .is("deleted_at", null)
        .ilike("content", `%${terms}%`)
        .order("id", {
            ascending: false,
        })
        .limit(500);

    return result.data;
}

// Todo List 생성하기
export const createTodos = async (content: string) => {
    const supabase = await createServerSideClient();
    const result = await supabase
        .from("todos_with_rls")
        .insert({
            content
        })
        .select("");

    return result.data;
}

// Todo List 업데이트
export const updateTodos = async (id: number, content: string) => {
    const supabase = await createServerSideClient();
    const result = await supabase
        .from("todos_with_rls")
        .update({
            content,
            updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select();

    return result.data;
}

// Todo List softDelete
export const deleteTodosSoft = async (id: number) => {
    const supabase = await createServerSideClient();
    const result = await supabase
        .from("todos_with_rls")
        .update({
            deleted_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select();

    return result.data;
}