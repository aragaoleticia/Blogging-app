import React from 'react';
import Spinner from '../components/Spinner';
import NoPostsYet from './NoPostsYet';
import { format } from 'date-fns';


function Posts({postsList, loadingPosts}) {


  
  if(loadingPosts) {
    return <Spinner/>
  }else if(postsList.length === 0) {
    return <NoPostsYet/>

  }
  

  return (
    <div className='w-full max-w-lg md:max-w-3xl p-6'>
    <div className='flex flex-col items-center'>
      {postsList.map((post) => (
      <div key={post.id} className='w-full m-5 p-5 rounded-lg bg-gray-100 shadow-lg'>
        <div className='flex justify-start items-center mb-4'>
          <div className='flex items-center'>
          <img src={post.author.photo} alt='user profile'className='rounded-full w-12 h-12 md:w-16 md:h-16 shadow-xl object-cover mr-4'/>
          </div>
          <div>
            <h3 className='text-lg font-semibold'>@{post.author.name}</h3>
          </div>
        </div>
        <div>
          <h3 className='text-xl font-semibold mb-2'>{post.title}</h3>
          <p className='text-gray-700 break-words mb-4 max-h-40 overflow-y-auto'>{post.postText}</p>
        </div>
         <div>
          {format(post.createdAt,'dd/MM/yyyy HH:mm')}
         </div>
      </div>
      ))}
    </div>
    </div>
  )
}

export default Posts;
