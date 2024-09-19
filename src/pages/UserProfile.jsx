import React from 'react';
import { useFetchPost, useDeletePost} from '../hooks/usePosts';
import { auth } from '../firebase.config';
import Spinner from '../components/Spinner';
import iconDelete from '../assets/icon-delete.png';

function UserProfile({isAuth}) {
    const [postsList, setPostsList] = useFetchPost(isAuth);
    const deletePost = useDeletePost(setPostsList);


    const userPosts = isAuth 
        ? postsList.filter((post) => post.author.id === auth.currentUser.uid)
        : [];


    if(userPosts.length === 0) {
      return <Spinner massage='No pots available'/>
    }
  return (
    <div className='flex items-center justify-center min-h-screen py-10 px-4'>
      <div className='w-full max-w-lg md:max-w-3xl bg-white shadow-lg p-6 rounded-lg'>
        <h2 className='text-gray-800 bg-main text-xl md:text-2xl shadow-md font-bold text-center mb-6'>See what you've posted <span role='img' aria-label='speech-bubble'>📎</span></h2>
      <div className='flex flex-col items-center'>
        {userPosts.map((post) => (
        <div key={post.id} className='w-full m-5 p-5 rounded-lg bg-gray-100 shadow-md'>
          <div className='flex justify-between items-center mb-4'>
            <div className='flex items-center'>
            <img src={post.author.photo} alt='user profile'className='rounded-full w-12 h-12 md:w-16 md:h-16 shadow-xl object-cover mr-4'/>
              <h3 className='text-lg font-semibold'>@{post.author.name}</h3>
            </div>
            <div>
            </div>
              <button 
                onClick={(event) => {
                  event.stopPropagation(); 
                  deletePost(post.id)
                }}
              >
                <img src={iconDelete} alt='delete' className='w-6 text-center'/>
              </button>
          </div>
          <div>
            <h3 className='text-xl font-semibold mb-2'>{post.title}</h3>
            <p className='text-gray-700 break-words mb-4 max-h-40 overflow-y-auto'>{post.postText}</p>
          </div>
           
        </div>
        ))}
      </div>
      </div>
    </div>
  )
}

export default UserProfile;
