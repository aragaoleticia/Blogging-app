import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";

export default function Spinner() {
  return (
    <div className='flex flex-col justify-center items-center w-full'>
        <ClipLoader
            type='Circles'
            color='#1f2937'
            height={50}
            width={200}
            className='m-10'
        />
        <p className='text-lg text-center text-gray-700 font-semibold px-2'>Loading posts</p>
    </div>
  )
};