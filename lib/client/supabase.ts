import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/supabase"

export const createSupabaseBrowserClient = () =>
    createBrowserClient<Database>(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    )



// {
//     "iss": "https://accounts.google.com",
//     "sub": "104604634636678049780",
//     "name": "신은지",
//     "email": "sinej1020@gmail.com",
//     "picture": "https://lh3.googleusercontent.com/a/ACg8ocKjqPdmpKYlC1u9Tuk1PRt8J45f4NiIfQUp_hZ36uZCFbdjWg=s96-c",
//     "full_name": "신은지",
//     "user_name": "sinej",
//     "avatar_url": "https://lh3.googleusercontent.com/a/ACg8ocKjqPdmpKYlC1u9Tuk1PRt8J45f4NiIfQUp_hZ36uZCFbdjWg=s96-c",
//     "provider_id": "104604634636678049780",
//     "email_verified": true,
//     "phone_verified": false,
//     "preferred_username": "sinej"
// }
