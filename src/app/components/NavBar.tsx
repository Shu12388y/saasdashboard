'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function NavBar() {
  const Router = useRouter();

  function userLogOut() {
    const token = window.localStorage.getItem('token');
    const username = window.localStorage.getItem('username');

    if (token && username) {
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('username');
      Router.push('/');
    }
  }

  return (
    <div className="flex flex-row items-center justify-end p-4">
      <Button onClick={userLogOut}>Log Out</Button>
    </div>
  );
}

export default NavBar;
