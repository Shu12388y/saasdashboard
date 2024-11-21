'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface User {
  username: string;
  email: string;
  password: string;
}

export default function SignIn() {
  const Router = useRouter();
  const [user, setUser] = useState<User>({
    username: '',
    email: '',
    password: '',
  });

  async function createUser() {
    try {
      const { data } = await axios.post('/api/auth/signup', user);
      console.log(data);
      if (data.message == 'User created') {
        Router.push('/');
      } else {
        console.log('Error');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="mb-3">
          <h1 className="text-4xl text-center font-semibold">Signup</h1>
        </div>
        <div className="">
          <Card>
            <CardHeader>
              <CardTitle>Create new Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 px-16">
              <div className="mt-3">
                <Label htmlFor="username">
                  {' '}
                  username
                  <Input
                    type="text"
                    name="username"
                    placeholder="enter your username"
                    id="username"
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                  />
                </Label>
              </div>
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
                <Button onClick={createUser}>Create</Button>
              </div>
              <div>
                <Link href={'/'} className="text-semibold text-red-500">
                  Already have an account?
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
