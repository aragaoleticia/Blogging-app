import React from 'react';
import { useFetchPost } from '../hooks/usePosts';
import Posts from '../components/Posts';
import CreatePostText from '../components/CreatPost';

function Home({isAuth}) {

  const [postsList, setPostsList] = useFetchPost(isAuth);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-10 px-4'>
      <div className='py-8 px-4 bg-white rounded-lg'>
      {isAuth && <CreatePostText postsList={postsList} setPostsList={setPostsList} />}
      <Posts postsList={postsList}/>
      </div>
    </div>
  )
};

export default Home;

