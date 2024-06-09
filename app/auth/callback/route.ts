import { NextResponse } from "next/server";
import { createServerSideClient } from "@/lib/supabase";

export async function GET (request: Request) {
    const OVERRIDE_ORIGIN = process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO_HOME;
    const { searchParams, origin } = new URL(request.url);

    const code = searchParams.get("code");
    const next = searchParams.get("next");


    if(code) {
        const supabase = await createServerSideClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if(error) return NextResponse.redirect(`${OVERRIDE_ORIGIN}`);
        return NextResponse.redirect(`${OVERRIDE_ORIGIN}${next}`);
    }
    return NextResponse.redirect(`${OVERRIDE_ORIGIN}`)
}