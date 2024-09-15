import { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { db, auth } from '../firebase.config';




const postsCollectionRef = collection(db, 'posts');

async function initializePosts() {
    const data = await getDocs(postsCollectionRef);
    const posts = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
    return posts ? posts : [];
}


export function usePosts() {

    const [postsList, setPostsList] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await initializePosts();
            setPostsList(posts)
        }

        fetchPosts();
    }, [])

    return [postsList, setPostsList];
};


export function useSubmitPost(setPostsList) {

    const submitPost = async (event, title, postText, setTitle, setPostText) => {
        event.preventDefault();
        const post = {
            title,
            postText,
            author: { 
                name: auth.currentUser.displayName, 
                id: auth.currentUser.uid
            }
        }
        try {
           const docRef = await addDoc(postsCollectionRef, post);

           const newPost = {...post, id: docRef.id};
           setPostsList((prevPostsList) => [newPost, ...prevPostsList]);
           setPostText('');
           setTitle('');

        } catch (error) {
            console.log('Error submitting post:', error);
        };
    };

    return submitPost;
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


export function useIsAuth() {
    const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));

    return [isAuth, setIsAuth];
};