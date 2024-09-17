import React ,{ useEffect } from 'react';
import { auth, provider } from '../firebase.config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import googleicon from '../assets/googleicon.svg';
import postImg from '../assets/post-img.svg';


function Login({ setIsAuth, isAuth }) {

    let navigate = useNavigate();

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem('isAuth', true);
            setIsAuth(true);
            navigate('/');
        })
    }

    useEffect(() => {
        if(!isAuth){
          navigate('/login')
        }
      }, [isAuth, navigate])
    
  return (
    <div className='flex flex-col lg:flex-row h-screen'>
      <div className='hidden lg:flex lg:w-1/2 bg-main items-center justify-center'>
        <img src={postImg} alt='Post Illustration' className='object-cover'/>
      </div>

      <div className='lg:w-1/2 p-6 bg-light-main flex flex-col flex-1 items-center justify-center'>
          <h2 className='text-2xl lg:text-3xl font-semibold mb-4 lg:mb-6 text-gray-800'>Log in</h2>
          <p className='text-base lg:text-lg mb-4 text-gray-600'>Welcome! Sign in with Google to Continue</p>
          <button
            onClick={signInWithGoogle}
            className="flex items-center justify-center px-4 py-2 border-none rounded-md shadow-md text-gray-600 text-base lg:text-lg bg-white hover:bg-gray-100 transition-colors"
          >
          <img
            src={googleicon}        
            alt="Google logo"
            className="w-6 h-6 mr-3"
          />
          Sign in with Google
          </button>
      </div>
    </div>
  )
}

export default Login;
