import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { signOut } from 'firebase/auth';
import { auth } from './firebase.config';
import { useFetchPost } from './hooks/usePosts'
import UserProfile from './pages/UserProfile';
import { useState } from 'react';

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
  const [postsList] = useFetchPost(isAuth);


  const [menuOpen, setMenuOpen] = useState(false);

  const userPhoto = postsList.find((post) => 
    post.author.id === auth.currentUser?.uid)?.author.photo;

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = '/login'
    })
  }

  return (
    <Router>
        {!isAuth ? 
          <Link to='/login'></Link> 
          : 
          <nav className='w-full bg-white shadow-lg p-6 flex items-center justify-between'>
          <Link to='/profile' className='flex items-center gap-3'>
            <img 
              src={userPhoto} 
              alt='user profile' 
              className='rounded-full w-12 h-12 shadow-md object-cover'
            />
            <span className='text-lg font-medium text-gray-800'>Profile</span>
          </Link>

          <button
            className='md:hidden block focus:outline-none'
            onClick={() => setMenuOpen(!menuOpen)}
          >
          <svg 
            className='w-6 h-6 text-gray-800' 
            fill='none' stroke='currentColor' 
            viewBox='0 0 24 24' 
            xmlns='http://www.w3.org/2000/svg'
          >
            <path 
              strokeLinecap='round' 
              strokeLinejoin='round' 
              strokeWidth='2' 
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
          </button>
          <div className='hidden md:flex items-center gap-6'>
            <Link to='/' className='text-lg font-medium text-grey-800'>
              Home
            </Link>
            <button 
              className='bg-white px-4 py-2 rounded-md text-red-500' 
              onClick={signUserOut}
            >
              Log out
            </button>
          </div>
          {menuOpen && (
            <div className='absolute top-20 right-6 bg-white shadow-lg rounded-lg p-4 flex flex-col items-start md:hidden'>
            <Link to='/' className='text-lg font-medium text-grey-800 mb-4'>
              Home
            </Link>
            <button 
              className='bg-white px-4 py-2 rounded-md text-red-500' 
              onClick={signUserOut}
            >
              Log out
            </button>
            </div>
          )}
          </nav>
        }       
      <Routes>
        <Route path='/' element={<Home isAuth={isAuth}/>} />
        <Route path='/profile' element={<UserProfile isAuth={isAuth}/>}/>
        <Route path='/login' element={<Login setIsAuth={setIsAuth} isAuth={isAuth}/>} />
      </Routes>
    </Router>
  );
}

export default App;
