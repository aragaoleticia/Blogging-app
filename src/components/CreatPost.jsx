import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase.config';

  
function CreatePostText({postsList, setPostsList}) {
    const postsCollectionRef = collection(db, 'posts');

    const [title, setTitle] = useState('');
    const [postText, setPostText] = useState('');


    
    const submitPost = async (e) => {
        e.preventDefault();
        const post = {
            title,
            postText,
            author: { 
                name: auth.currentUser.displayName, 
                id: auth.currentUser.uid,
                photo: auth.currentUser.photoURL,
            }
        };

        try {
           const docRef = await addDoc(postsCollectionRef, post);

           const newPost = {...post, id: docRef.id, createdAt: new Date()};

           const newPosts = [newPost,...postsList]

           setPostsList(newPosts); 

           setPostText('');
           setTitle('');


        } catch (error) {
            console.log('Error submitting post:', error);
        };
    };

  return (
    
    <div className='w-full flex items-center justify-center py-10 px-4'>
      <div className='w-full max-w-sm md:max-w-3xl p-6 bg-gray-100 rounded-lg shadow-lg'>
        <h1 className='text-center text-xl font-semibold text-gray-800 mb-4'>What would you like to share? <span role='img' aria-label='speech-bubble'>💬</span></h1>
        <form onSubmit={submitPost}>
        <div className='flex flex-col mb-5'>
                <input
                    required
                    type='text' 
                    className='border border-gray-300 bg-gray-100 rounded-md p-3 text-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-main focus:border-main' 
                    placeholder='Title...'
                    value={title || ''}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </div>
            <div className='flex flex-col mb-4'>
                <textarea 
                    required
                    className='border border-gray-300  bg-gray-100 rounded-md p-3 text-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-main focus:border-main' 
                    placeholder='Post...'
                    value={postText || ''}
                    onChange={(event) => setPostText(event.target.value)}
                />
            </div>
            <button 
                type='submit'
                className='w-full bg-main text-white py-1 rounded-md text-lg font-semibold hover:bg-light-main hover:text-main transition duration-300 shadow-md hover:shadow-lg'
            >
                Submit
            </button>
            </form>
      </div>
    </div>
  );
};

export default CreatePostText;
