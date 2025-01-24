'use client'

import { createClient } from "@/lib/supabase/client";

export default function Signup() {
    const onSignup = async () => {
        const res = await fetch('http://localhost:3000/api/signup', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: 'ryan@gmail.com', password: 'asd123asd'})
        })

        const data = await res.json()
        console.log(data);
        return data
    }

    const onOAuthGoogle = async () => {
        const supabase = createClient()
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google'
        })
        console.log({ data, error });
        
    }
  return (
    <div>
        <button onClick={onSignup}>Signup</button>
        <button onClick={onOAuthGoogle}>Google sign-in</button>
    </div>
  )
}
