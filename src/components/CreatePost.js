import React, { useState } from 'react';
import { useSubmitPost, usePosts } from '../hooks/usePosts';

function CreatePost() {

    const [setPostsList] = usePosts();
    const submitPost = useSubmitPost(setPostsList);

    const [title, setTitle] = useState('');
    const [postText, setPostText] = useState('');

  return (
    <div className='w-full grid items-center justify-center'>
      <div className='w-[500px] h-auto p-5 bg-black rounded-lg text-white flex flex-col'>
        <h1 className='text-center text-lg font-semibold'>Create a post</h1>
        <form onSubmit={(e) => submitPost(e, title, postText, setTitle, setPostText)}>
        <div className='mt-[30px] flex flex-col'>
                <label>Title:</label>
                <input 
                    className='text-[18px] border-none rounded-sm p-5 text-black' 
                    placeholder='Title...'
                    onChange={(event) => setTitle(event.target.value)}
                />
            </div>
            <div className='mt-[30px] flex flex-col'>
                <label>Post:</label>
                <textarea 
                    
                    className='text-[18px] border-none rounded-sm p-5 text-black' 
                    placeholder='Post...'
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

export default CreatePost;
