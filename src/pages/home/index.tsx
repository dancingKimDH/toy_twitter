import { Link } from 'react-router-dom';
import PostForm from 'pages/components/posts/PostForm';
import PostBox from 'pages/components/posts/PostBox';
import { useEffect, useState, useContext } from "react";
import AuthContext from 'pages/components/context/AuthContext';
import { collection, query, where, onSnapshot, orderBy, doc } from 'firebase/firestore';
import { db } from 'firebaseApp';

export interface PostProps {
    id: string;
    email: string;
    content: string;
    createdAt: string;
    uid: string;
    profileUrl?: string;
    likes?: string[];
    likeCount?: number;
    comments?: any;
}



export default function HomePage() {

    const [posts, setPosts] = useState<PostProps[]>([]);

    const {user} = useContext(AuthContext);

    useEffect(()=>{
        if(user) {
            let postsRef = collection(db, "posts");
            let postsQuery = query(postsRef, orderBy("createdAt", "desc"));

            onSnapshot(postsQuery, (snapshot) => {
                let dataObj = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc?.id
                }))
                setPosts(dataObj as PostProps[]);
            })
        }
    })

    const handleDelete = () => { }
        ; return (
            <div>
                <div className="home">
                    <div className="home__top">
                        <div className="home__title">Home</div>
                        <div className="home__tabs">
                            <div className="home__tab home__tab--active">For You</div>
                            <div className="home__tab home__tab--active">Following</div>
                        </div>
                    </div>
                </div>

                {/* post form */}
                <PostForm />

                {/* tweet posts */}
                <div className='post'>
                    {posts?.length > 0 ? posts?.map((post) => (
                        <PostBox post={post} key={post?.id} />
                    )) :
                        <div className='post__no-posts'>
                            <div className='post__text'>
                                게시글이 없습니다.
                            </div>
                        </div>
                    }

                </div>
            </div>
        )
}