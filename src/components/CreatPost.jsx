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
                photo: auth.currentUser.photoURL
            }
        };
        console.log(post.author.photo)

        try {
           const docRef = await addDoc(postsCollectionRef, post);

           const newPost = {...post, id: docRef.id};

           const newPosts = [...postsList, newPost]

           setPostsList(newPosts); 

           setPostText('');
           setTitle('');


        } catch (error) {
            console.log('Error submitting post:', error);
        };
    };

  return (
    <div className='w-full grid items-center justify-center'>
      <div className='w-[500px] h-auto p-5 bg-black rounded-lg text-white flex flex-col'>
        <h1 className='text-center text-lg font-semibold'>Create a post</h1>
        <form onSubmit={submitPost}>
        <div className='mt-[30px] flex flex-col'>
                <label>Title:</label>
                <input 
                    className='text-[18px] border-none rounded-sm p-5 text-black' 
                    placeholder='Title...'
                    value={title || ''}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </div>
            <div className='mt-[30px] flex flex-col'>
                <label>Post:</label>
                <textarea 
                    
                    className='text-[18px] border-none rounded-sm p-5 text-black' 
                    placeholder='Post...'
                    value={postText || ''}
                    onChange={(event) => setPostText(event.target.value)}
                />
            </div>
            <button 
                type='submit'
                className='mt-5 h-10 border-none rounded-sm cursor-pointer bg-slate-200 text-black text-lg font-semibold'
            >
                Submit post
            </button>
            </form>
      </div>
    </div>
  );
};

export default CreatePostText;
