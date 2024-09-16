import React from 'react';
import { useFetchPost, useIsAuth } from '../hooks/usePosts';
import Posts from '../components/Posts';
import CreatePostText from '../components/CreatPost';

function Home() {
  const [isAuth] = useIsAuth();

  const [postsList, setPostsList] = useFetchPost();


  return (
    <div className='w-full min-h-[calc(100vh-80px)] h-auto flex flex-col items-center'>
      {isAuth && <CreatePostText postsList={postsList} setPostsList={setPostsList} />}
      <Posts postsList={postsList}/>
    </div>
  )
};

export default Home;

