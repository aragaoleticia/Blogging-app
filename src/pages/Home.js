import React from 'react';
import CreatePost from '../components/CreatePost';
import { useIsAuth } from '../hooks/usePosts';
import Posts from '../components/Posts';

function Home() {
  const [isAuth] = useIsAuth();


  return (
    <div className='w-full min-h-[calc(100vh-80px)] h-auto flex flex-col items-center'>
      {isAuth && <CreatePost/>}
      <Posts/>
    </div>
  )
};

export default Home;

