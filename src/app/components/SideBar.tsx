'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

function SideBar() {
  const Router = useRouter();
  const [user, setUser] = useState('');

  useEffect(() => {
    const token = window.localStorage.getItem('token');
    (async function getProfile() {
      try {
        const { data } = await axios.post('/api/auth/verify', { token });
        if (data) {
          setUser(data.data.username);
          window.localStorage.setItem('username', data.data.username);
        } else {
          Router.push('/');
        }
      } catch (error) {
        console.log(error);
        Router.push('/');
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('username');
      }
    })();
  }, []);

  useEffect(() => {
    const userName = window.localStorage.getItem('username');
    if (userName) {
      setUser(userName);
    }
    const token = window.localStorage.getItem('token');
    if (!userName) {
      (async function getProfile() {
        try {
          const { data } = await axios.post('/api/auth/verify', { token });
          if (data) {
            setUser(data.data.username);
            window.localStorage.setItem('username', data.data.username);
          } else {
            Router.push('/');
          }
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, []);

  return (
    <div className="relative flex flex-col h-full w-[15rem] shadow-lg">
      <h2 className="font-semibold text-center text-3xl py-6">
        Welcome {user}
      </h2>
      <div className="flex flex-col  h-full justify-start items-center ">
        <div className="w-full  text-center py-[1rem] my-[1rem]">
          <Link href="/analysis">
            <Button className="w-full h-[5rem] bg-white text-black hover:text-white rounded-none shadow-none">
              Analysis
            </Button>
          </Link>
        </div>
        <div className="w-full  text-center py-[1rem] my-[1rem]">
          <Link href="/product">
            <Button className="w-full h-[5rem] bg-white text-black hover:text-white rounded-none shadow-none">
              All Products
            </Button>
          </Link>
        </div>
        <div className="w-full text-center py-[1rem] my-[1rem]">
          <Link href="/create">
            <Button className="w-full h-[5rem] bg-white text-black hover:text-white rounded-none shadow-none">
              Create
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
