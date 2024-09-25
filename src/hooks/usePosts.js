import { useState, useEffect } from 'react';
import { getDocs, collection, deleteDoc, doc} from 'firebase/firestore';
import { db } from '../firebase.config';


const postsCollectionRef = collection(db, 'posts');

export function newDateFromSeconds(seconds) {
  const currentDate = new Date(0);
  currentDate.setSeconds(seconds);
  return currentDate;
};

export async function initializePosts(setLoadingPosts) {
    setLoadingPosts(true);
    const data = await getDocs(postsCollectionRef);
    const posts = data.docs.map((doc) => ({...doc.data(), id: doc.id, createdAt: newDateFromSeconds(doc._document.createTime.timestamp.seconds)}))
      .sort((a,b) => b.createdAt - a.createdAt);
    return posts || [];
};


export function useFetchPost(isAuth) {
  const [postsList, setPostsList] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);


  useEffect(() => {
    const fetchPosts = async () => {
        if(isAuth){
          const posts = await initializePosts(setLoadingPosts);
          setPostsList(posts);
        } else if(!isAuth) {
          setPostsList([])
        }
        setLoadingPosts(false);
    };

    fetchPosts();
  }, [isAuth]);

  return [postsList, setPostsList, loadingPosts ,setLoadingPosts]
};



export function useDeletePost(setPostsList) {
    
    const deletePost = async (id) => {
        const postDoc = doc(db, 'posts', id);
        try {
          await deleteDoc(postDoc);
    
          setPostsList((prevPostsList) => 
            prevPostsList.filter((post) => post.id !== id));
        } catch (error) {
          console.log('Error deleting post', error);
        };
      };

      return deletePost;
};

export const fetchUser = () => {
  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  return userInfo;
};