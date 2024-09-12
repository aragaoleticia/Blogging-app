import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase.config';

function CreatePost() {

    const [title, setTitle] = useState('');
    const [postText, setPostText] = useState('');


    const postsCollectionRef = collection(db, 'posts');

    const submitPost = async () => {
        await addDoc(postsCollectionRef, {
            title,
            postText,
            author: { name: auth.currentUser.displayName, id: auth.currentUser.uid}
        });
        setTitle('');
        setPostText('');
    };

  return (
    <div className='w-full grid items-center justify-center'>
      <div className='w-[500px] h-auto p-5 bg-black rounded-lg text-white flex flex-col'>
        <h1 className='text-center text-lg font-semibold'>Create a post</h1>
        <div className='mt-[30px] flex flex-col'>
            <label>Title:</label>
            <input 
                className='text-[18px] border-none rounded-sm p-5 text-black' 
                placeholder='Title...'
                onChange={(event) => {
                    setTitle(event.target.value);
                }}
            />
        </div>
        <div className='mt-[30px] flex flex-col'>
            <label>Post:</label>
            <textarea 
                className='text-[18px] border-none rounded-sm p-5 text-black' 
                placeholder='Post...'
                onChange={(event) => {
                    setPostText(event.target.value);
                }}
            />
        </div>
        <button 
            onClick={submitPost}
            className='mt-5 h-10 border-none rounded-sm cursor-pointer bg-slate-200 text-black text-lg font-semibold'
        >
            Submit post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
