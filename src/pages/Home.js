import React, { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase.config';

function Home() {
  const [postsList, setPostsList] = useState([]);

  const postsCollectionRef = collection(db, 'posts');

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostsList(data.docs.map((doc) => (
        {
          ...doc.data(), id: doc.id
        }
      )))
    }

    getPosts()
  }, [])

  return (
    <div className='w-full min-h-[calc(100vh-80px)] h-auto flex flex-col items-center'>
      {postsList.map((post) => (
        <div className='w-[600px] h-auto max-h-[600px] bg-gray-100 shadow-md m-5 p-5 rounded-lg'>
          <div className='flex justify-center w-full'>
            <div className='flex-[50%] text-2xl font-semibold'>
              {post.title}
            </div>
            <div className='flex felx-col items-end'>
              <button 
                
                className='border-none bg-none text-[30px] cursor-pointer'
              >
                 &#128465;
              </button>
            </div>
          </div>

          <div>
            <div className='break-words h-auto max-h-[400px] w-full overflow-hidden overflow-y-auto'>
              {post.postText}
              <h3>@{post.author.name}</h3>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home

