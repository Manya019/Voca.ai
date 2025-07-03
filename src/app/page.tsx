"use client";

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button }  from '@/components/ui/button';
import { authClient } from '@/lib/auth-client';

export default function Home() {

  const {data: session} = authClient.useSession();
  const [name,setname] = useState('');
  const [email,setemail] = useState('');
  const [password,setpassword] = useState('');

  const onSubmit = () => {
    authClient.signUp.email({
      email,
      password,
      name,
    },{
      onError: (error) => {
        window.alert("something went wrong")
    },
      onSuccess: () => {
        window.alert("user created successfully")
      }
    });
  }

   const onLogin = () => {
    authClient.signIn.email({
      email,
      password,
    },{
      onError: (error) => {
        window.alert("something went wrong")
    },
      onSuccess: () => {
        window.alert("user Logged in successfully")
      }
    });
  }

  
  return (
    <div className='flex flex-col gap-y-10'>
      <div className='p-4 flex flex-col gap-4'>
        <Input placeholder='name' value={name} onChange={(e)=>setname(e.target.value)}/>
        <Input placeholder='email' value={email} onChange={(e)=>setemail(e.target.value)} />
        <Input placeholder='password' type='password' value={password} onChange={(e)=>setpassword(e.target.value)}/>
      <Button onClick={onSubmit}>
        create user
      </Button>
      </div>
      <div className='p-4 flex flex-col gap-4'>
        <Input placeholder='email' value={email} onChange={(e)=>setemail(e.target.value)} />
        <Input placeholder='password' type='password' value={password} onChange={(e)=>setpassword(e.target.value)}/>
      <Button onClick={onLogin}>
        Login User
      </Button>
      </div>
    </div>
  );
};
