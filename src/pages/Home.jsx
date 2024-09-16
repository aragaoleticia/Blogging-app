import React, { useState, useEffect } from 'react';
import { initializePosts, useIsAuth } from '../hooks/usePosts';
import Posts from '../components/Posts';
import CreatePostText from '../components/CreatPost';

function Home() {
  const [isAuth] = useIsAuth();

  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
        const posts = await initializePosts();
        setPostsList(posts);
    };

    fetchPosts()
  }, []);


  return (
    <div className='w-full min-h-[calc(100vh-80px)] h-auto flex flex-col items-center'>
      {isAuth && <CreatePostText postsList={postsList} setPostsList={setPostsList} />}
      <Posts postsList={postsList} setPostsList={setPostsList}/>
    </div>
  )
};

export default Home;

