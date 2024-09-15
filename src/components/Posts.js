import React from 'react';
import { usePosts, useIsAuth, useDeletePost } from '../hooks/usePosts';
import { auth } from '../firebase.config';


function Posts() {
  const [postsList, setPostsList] = usePosts();
  const [isAuth] = useIsAuth();
  const deletePost = useDeletePost(setPostsList);

  console.log(postsList.map(post => post.id))

  return (
    <div>
      {postsList.map((post) => (
        <div key={post.id} className='w-[600px] h-auto max-h-[600px] bg-gray-100 shadow-md m-5 p-5 rounded-lg'>
          <div className='flex justify-center w-full'>
            <div className='flex-[50%] text-2xl font-semibold'>
              {post.title}
            </div>
            <div className='flex felx-col items-end'>
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button 
                    onClick={(event) => {
                      event.stopPropagation(); 
                      deletePost(post.id)
                    }
                    }
                    className='border-none bg-none text-[30px] cursor-pointer'
                  >
                    &#128465;
                  </button>
                )
                }
              </div>
          </div>
            <div className='break-words h-auto max-h-[400px] w-full overflow-hidden overflow-y-auto'>
                  {post.postText}
                  <h3>@{post.author.name}</h3>
            </div>
        </div>
      ))}
    </div>
  )
}

export default Posts;
