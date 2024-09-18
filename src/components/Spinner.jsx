import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";

export default function Spinner({massage}) {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full gap-2'>
        <ClipLoader
            type='Circles'
            color='#1f2937'
            height={50}
            width={200}
            className='m-10'
        />
        <p className='text-lg text-center px-2'>{massage}</p>
    </div>
  )
};