import { NextResponse } from "next/server";
import {createServerSideClient} from "@/lib/supabase";
import {getTodoAction} from "@/actions/todo/todo.action";

export const GET = async () => {
    const result = await getTodoAction();

    console.log("Todo GET API income", result);

    return NextResponse.json({ ...result });
}