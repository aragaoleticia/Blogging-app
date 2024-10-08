import React from 'react';
import { useFetchPost } from '../hooks/usePosts';
import Posts from '../components/Posts';
import CreatePostText from '../components/CreatPost';

function Home({isAuth}) {

  const [postsList, setPostsList, loadingPosts] = useFetchPost(isAuth);

  return (
    <div className='flex flex-col items-center justify-center  py-10 px-4'>
      <div className='w-full max-w-lg md:max-w-3xl py-8 px-4 bg-white rounded-lg'>
      {isAuth && <CreatePostText postsList={postsList} setPostsList={setPostsList} />}
      <Posts postsList={postsList} loadingPosts={loadingPosts}/>
      </div>
    </div>
  )
};

export default Home;

