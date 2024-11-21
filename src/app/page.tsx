'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  email: string;
  password: string;
}

export default function Home() {
  useEffect(() => {
    const token = window.localStorage.getItem('token');
    if (token) {
      Router.push('/product');
    }
  }, []);
  const Router = useRouter();
  const [user, setUser] = useState<User>({
    email: '',
    password: '',
  });
  async function loginUser() {
    try {
      const { data } = await axios.post('/api/auth/signin', user);
      if (data.token) {
        window.localStorage.setItem('token', data.token);
        Router.push('/product');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="mb-3">
          <h1 className="text-4xl text-center font-semibold">Login</h1>
        </div>
        <div className="">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 px-16">
              <div>
                <Label htmlFor="email">
                  Email
                  <Input
                    type="email"
                    required
                    placeholder="enter your email"
                    id="email"
                    name="email"
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                  />
                </Label>
              </div>
              <div>
                <Label htmlFor="password">
                  Password
                  <Input
                    type="password"
                    placeholder="enter your password"
                    id="password"
                    name="password"
                    onChange={(e) =>
                      setUser({ ...user, password: e.target.value })
                    }
                  />
                </Label>
              </div>
              <div>
                <Button onClick={loginUser}>Log In</Button>
              </div>
              <div>
                <Link href={'/signup'} className="text-semibold text-red-500">
                  Create a new account?
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
