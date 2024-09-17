import React from 'react';
import { useIsAuth, useFetchPost, useDeletePost} from '../hooks/usePosts';
import { auth } from '../firebase.config';

function UserProfile() {
    const [isAuth] = useIsAuth();
    const [postsList, setPostsList] = useFetchPost(isAuth);
    const deletePost = useDeletePost(setPostsList);


    const userPosts = isAuth 
        ? postsList.filter((post) => post.author.id === auth.currentUser.uid)
        : [];


    console.log(auth.currentUser.photoURL)
    if(userPosts.length === 0) {
        return <div>No posts available.</div>
    }
  return (
    <div className='w-full min-h-[calc(100vh-80px)] h-auto flex flex-col items-center'>
        <h2>Your Posts</h2>
        {userPosts.map((post) => (
        <div key={post.id} className='w-[600px] h-auto max-h-[600px] bg-gray-100 shadow-md m-5 p-5 rounded-lg'>
          <div className='flex justify-center w-full'>
            <div className='flex-[50%] text-2xl font-semibold'>
              {post.title}
            </div>
            <div className='flex felx-col items-end'>
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

export default UserProfile;
