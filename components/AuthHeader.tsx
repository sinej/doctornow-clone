'use client'

import React from 'react';
import {User} from "@supabase/auth-js";
import {createSupabaseBrowserClient} from "@/lib/client/supabase";
import {useRouter} from "next/navigation";
import {FcGoogle, FcTodoList} from "react-icons/fc";
import {AiOutlineLogout} from "react-icons/ai";

interface AuthHeaderProps {
    user?: User | null;
}

const AuthHeader = ({user}: AuthHeaderProps) => {
    const isLoggedIn = !!user?.email;
    const supabase = createSupabaseBrowserClient();
    const router = useRouter();

    const handleHome = () => {
        router.push('/')
    }

    const handleGoogleLogin = async () => {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO
            }
        });
    }
    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.reload();
    }

    return (
        <header className="h-[50px] bg-white">
            <section className="px-6 h-full">
                <div className="flex flex-row justify-between items-center h-full">
                    <div className="flex items-center flex-row cursor-pointer gap-2"
                         onClick={handleHome}
                    >
                        <FcTodoList size={30}/>
                        <h1>TODO</h1>
                    </div>

                    {
                        isLoggedIn ? (
                            <div className="flex flex-row items-center justify-end gap-2"
                                 onClick={handleLogout}
                            >
                                Logout
                                <AiOutlineLogout size={30}/>
                            </div>
                        ) : (
                            <div className="flex flex-row items-center justify-end gap-2"
                                 onClick={handleGoogleLogin}
                            >
                                Login
                                <FcGoogle size={30}/>
                            </div>
                        )
                    }
                </div>
            </section>
        </header>
    );
};

export default AuthHeader;