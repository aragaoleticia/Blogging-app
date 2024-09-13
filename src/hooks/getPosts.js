import { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase.config';




const postsCollectionRef = collection(db, 'posts');

async function initializePosts() {
    const data = await getDocs(postsCollectionRef);
    const posts = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
    return data ? posts : [];
}


export function getPosts() {
    const [postsList, setPostsList] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const posts = await initializePosts();
            setPostsList(posts)
        }

        fetchPosts();
    }, [])


};
