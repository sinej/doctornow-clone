
// RouterHandler, RSC, Middleware, ServerActions
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { Database } from "@/types/supabase";
import { NextRequest, NextResponse } from "next/server";
import { getCookie, setCookie } from "cookies-next"
export const createServerSideClient = async (serverComponent = false) => {
    const cookeStore = cookies();

    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get: (key) => cookeStore.get(key)?.value,
                set: (key, value, options) => {
                    if(serverComponent) return;
                    cookeStore.set(key, value, options)
                },
                remove: (key, options) => {
                    if(serverComponent) return;
                    cookeStore.set(key, "", options);
                },
            },
        }
    );
};

// RSC
export const createServerSideClientRSC = async () => {
    return createServerSideClient(true);
}

// Middleware
export const createSererSideMiddleware = async (req: NextRequest, res: NextResponse) => {
    return createServerClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get: (key) => getCookie(key, { req, res }),
                set: (key, value, options) => {
                    setCookie(key, value, { req, res, ...options })
                },
                remove: (key, options) => {
                    setCookie(key, "", { req, res, ...options });
                },
            },
        }
    );
}

