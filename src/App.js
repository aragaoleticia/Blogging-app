import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { signOut } from 'firebase/auth';
import { auth } from './firebase.config';
import { useIsAuth } from './hooks/usePosts'
import UserProfile from './pages/UserProfile';

function App() {
  const [isAuth, setIsAuth] = useIsAuth();

  const signUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = '/login'
    })
  }

  return (
    <Router>
      <nav className='m-0 w-full h-20 bg-black flex justify-center items-center text-white text-lg font-semibold gap-6'>
        <Link to='/'>Home</Link>
        {!isAuth ? 
          <Link to='/login'>Login</Link> 
          : 
          <>
          <Link to='/profile'>Profile</Link>
          <button onClick={signUserOut}>Log out</button>
          </>
        }
      </nav>         
      <Routes>
        <Route path='/' element={<Home isAuth={isAuth}/>} />
        <Route path='/profile' element={<UserProfile isAuth={isAuth}/>}/>
        <Route path='/login' element={<Login setIsAuth={setIsAuth} isAuth={isAuth}/>} />
      </Routes>
    </Router>
  );
}

export default App;
