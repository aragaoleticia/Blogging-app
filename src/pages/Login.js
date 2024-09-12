import React ,{ useEffect } from 'react';
import { auth, provider } from '../firebase.config';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import googleicon from '../assets/googleicon.svg';


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
      }, [])
    
  return (
    <div className='w-screen h-[calc(100vh-80px)] flex flex-col justify-center items-center'>
      <p>Sign In with Google to Continue</p>
      <button
      onClick={signInWithGoogle}
      className="cursor-pointer flex  items-center justify-center transition-colors duration-300 p-[5px_16px_12px] border-none rounded-[3px] shadow-[0_-1px_0_rgba(0,0,0,0.04),0_1px_1px_rgba(0,0,0,0.25)] text-[#757575] text-[25px] font-medium bg-white bg-no-repeat bg-[12px_11px] font-['-apple-system',BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,Cantarell,'Fira Sans','Droid Sans','Helvetica Neue',sans-serif]"
    >
      <img
        src={googleicon}        
        alt="Google logo"
        className="w-6 h-6 mr-3"
      />
      Sign in with Google
    </button>
    </div>
  )
}

export default Login;
