'use client'

// Todo List 가져오기
import {createSupabaseBrowserClient} from "@/lib/client/supabase";

export const getTodos = async () => {
    const supabase = createSupabaseBrowserClient();
    const result = await supabase
        .from("todos_no_rls")
        .select("*")
        .is("deleted_at", null)
        .order("id", {
            ascending: false, // 내림차순
        });

    return result.data;
}

// Todo List 가져오기 + by Id
export const getTodosById = async (id: number) => {
    const supabase = createSupabaseBrowserClient();
    const result = await supabase
        .from("todos_no_rls")
        .select("*")
        .is("deleted_at", null)
        .eq("id", id);

    return result.data;
}

// Todo List 중 가져오기 + search
export const getTodosBySearch = async (terms: string) => {
    const supabase = createSupabaseBrowserClient();
    const result = await supabase
        .from("todos_no_rls")
        .select("*")
        .is("deleted_at", null)
        .ilike("content", `%${terms}%`)
        .order("id", {
            ascending: false,
        })
        .limit(500);

    return result.data;
}

// TodoList 생성하기
export const createTodos = async (content: string) => {
    const supabase = createSupabaseBrowserClient();
    const result = await supabase
        .from("todos_no_rls")
        .insert({
            content
        })
        .select("");

    return result.data;
}

// TodoList 업데이트
export const updateTodos = async (id: number, content: string) => {
    const supabase = createSupabaseBrowserClient();
    const result = await supabase
        .from("todos_no_rls")
        .update({
            content,
            updated_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select();

    return result.data;
}

// TodoList softDelete
export const deleteTodosSoft = async (id: number) => {
    const supabase = createSupabaseBrowserClient();
    const result = await supabase
        .from("todos_no_rls")
        .update({
            deleted_at: new Date().toISOString(),
        })
        .eq("id", id)
        .select();

    return result.data;
}

// TodoList hardDelete
export const deleteTodosHard = async (id: number) => {
    const supabase = createSupabaseBrowserClient();
    const result = await supabase
        .from("todos_no_rls")
        .delete()
        .eq("id", id);

    return result.data;
}