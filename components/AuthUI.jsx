'use client'

import React, {useCallback, useEffect, useState} from 'react';
import {Auth} from "@supabase/auth-ui-react";
import {ThemeSupa} from "@supabase/auth-ui-shared";
import {createSupabaseBrowserClient} from "@/lib/client/supabase";
import useHydrate from "@/hooks/useHydrate";

const AuthUi = () => {
  const [user, setUser] = useState();
  const supabase = createSupabaseBrowserClient();
  const isMount = useHydrate();
  const getUserInfo = useCallback(
    async () => {
      const result = await supabase.auth.getUser();
      if(result?.data?.user) setUser(result?.data?.user);
    }, [supabase])

  useEffect(() => {
    getUserInfo();
  }, [getUserInfo]);

  const handleLogout = async () => {
    supabase.auth.signOut();
    window.location.reload();
  }

  const handleGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO,
      }
    })
  }
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO,
      }
    })
  }

  if(!isMount) return null;

  return (
    <section className="w-full p-10">
      <div>
        {user ? `로그인 됨 ${user?.email}` : '로그아웃'}
        <>
          {user && <button onClick={handleLogout} className="border-2 border-black">로그아웃</button>}
        </>
      </div>
      <div className="max-w-[500px] mx-auto">
        <Auth redirectTo={process.env.NEXT_PUBLIC_AUTH_REDIRECT_TO}
              supabaseClient={supabase}
              appearance={{theme: ThemeSupa}}
              onlyThirdPartyProviders
              providers={["google", "github"]}
        />

        <div className="flex flex-col w-full gap-4">
          <button onClick={handleGoogleLogin}
                  className="bg-white border border-neutral-200 h-12 rounded-xl w-full"
          >
            Google로 로그인
          </button>
          <button onClick={handleGithubLogin}
                  className="bg-black h-12 rounded-xl w-full text-white"
          >
            Github으로 로그인
          </button>
        </div>
      </div>
    </section>
  );
};

export default AuthUi;