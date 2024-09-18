import { useState, useEffect } from 'react';
import { getDocs, collection, deleteDoc, doc} from 'firebase/firestore';
import { db } from '../firebase.config';




const postsCollectionRef = collection(db, 'posts');

export async function initializePosts() {
    const data = await getDocs(postsCollectionRef);
    const posts = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
    return posts || [];
}


export function useFetchPost(isAuth) {
  const [postsList, setPostsList] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      console.log('detalhes',isAuth)
        if(isAuth){
          const posts = await initializePosts();
          setPostsList(posts);
        } else if(!isAuth) {
          setPostsList([])
        }
    };

    fetchPosts()
  }, [isAuth]);

  return [postsList, setPostsList]
}



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


export function useIsAuth() {
    const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
    return [isAuth, setIsAuth];
};