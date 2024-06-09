import { NextResponse } from "next/server";
import {getTodos} from "@/actions/todo/todo.action";

export const GET = async () => {
    const result = await getTodos();

    return NextResponse.json({ ...result });
}