import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import { signOut } from 'firebase/auth';
import { auth } from './firebase.config';
import { useIsAuth, useFetchPost } from './hooks/usePosts'
import UserProfile from './pages/UserProfile';

function App() {
  const [isAuth, setIsAuth] = useIsAuth();
  const [postsList] = useFetchPost(isAuth);

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
          <nav className='w-full flex gap-3 p-6 items-center justify-between text-main font-semibold'>
          <Link to='/'>
            <img src={userPhoto}/>
            Home
          </Link>
          <Link to='/profile'>Profile</Link>
          <button className='bg-white p-2 rounded-md text-red-500' onClick={signUserOut}>Log out</button>
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
