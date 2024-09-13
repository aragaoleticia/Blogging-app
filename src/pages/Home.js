import React, { useEffect, useState } from 'react';
import { getDocs, collection, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase.config';
import CreatePost from '../components/CreatePost';

function Home({isAuth}) {
  const [postsList, setPostsList] = useState([]);

  const postsCollectionRef = collection(db, 'posts');

  useEffect(() => {
    const getPosts = async () => {
      try {
        const data = await getDocs(postsCollectionRef);
        const posts = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
  
        if(JSON.stringify(posts) !== JSON.stringify(postsList)) {
          setPostsList(posts);
        };
      } catch (error) {
          console.log('Erorr feching posts', error)
      };
    };

    getPosts();
  }, [])

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

  // useEffect(() => {
  //   const getPosts = async () => {
  //     const data = await getDocs(postsCollectionRef);
  //     setPostsList(data.docs.map((doc) => (
  //       {
  //         ...doc.data(), id: doc.id
  //       }
  //     )))
  //   }

  //   getPosts()
  // }, [])

  // const deletePost = (id) => {
  //   const postDoc = doc(db, 'posts', id);
  //   deleteDoc(postDoc).then(() => {
  //     const newPostsList = [...postsList]
  //       .filter(post => post.id !== id)
  //       if(newPostsList.length !== postsList.length) {
  //         setPostsList(newPostsList);
  //       };
  //   });
  // };

  console.log(postsList.map(post => post.id))


  return (
    <div className='w-full min-h-[calc(100vh-80px)] h-auto flex flex-col items-center'>
      {isAuth && <CreatePost/>}
      {postsList.map((post) => {
        return (
          <div key={post.id} className='w-[600px] h-auto max-h-[600px] bg-gray-100 shadow-md m-5 p-5 rounded-lg'>
            <div className='flex justify-center w-full'>
              <div className='flex-[50%] text-2xl font-semibold'>
                {post.title}
              </div>
              <div className='flex felx-col items-end'>
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button 
                    onClick={(event) => {
                      event.stopPropagation(); 
                      deletePost(post.id)
                    }
                    }
                    className='border-none bg-none text-[30px] cursor-pointer'
                  >
                    &#128465;
                  </button>
                )
                }
              </div>
            </div>

            <div>
              <div className='break-words h-auto max-h-[400px] w-full overflow-hidden overflow-y-auto'>
                {post.postText}
                <h3>@{post.author.name}</h3>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
};

export default Home;

