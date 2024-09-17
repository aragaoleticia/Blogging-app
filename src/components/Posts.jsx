import React from 'react';

function Posts({postsList}) {

  
  if(postsList === null) {
    return <div>Loading posts....</div>
  }

  if(postsList.length === 0) {
    return <div>No posts available.</div>
  }
  

  return (
    <div>
      {(postsList || []).map((post) => (
        <div key={post.id} className='w-[600px] h-auto max-h-[600px] bg-gray-100 shadow-md m-5 p-5 rounded-lg'>
          <div className='flex justify-center w-full'>
            <div className='flex-[50%] text-2xl font-semibold'>
              {post.title}
            </div>
          </div>
            <div className='break-words h-auto max-h-[400px] w-full overflow-hidden overflow-y-auto'>
                  {post.postText}
                  <img src={post.author.photo}/>
                  <h3>@{post.author.name}</h3>
            </div>
        </div>
      ))}
    </div>
  )
}

export default Posts;
