import { Link } from 'react-router-dom';
import PostForm from 'pages/components/posts/PostForm';
import PostBox from 'pages/components/posts/PostBox';
import { useEffect, useState, useContext, useCallback } from "react";
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
    hashTags?: string[];
    imageUrl?: string;
}

interface UserProps {
    id: string;
}

type tabType = "all" | "following";

export default function HomePage() {

    const [posts, setPosts] = useState<PostProps[]>([]);

    const { user } = useContext(AuthContext);

    const [activeTab, setActiveTab] = useState<tabType>("all");

    const [followingPosts, setFollowingPosts] = useState<PostProps[]>([]);

    const [followingIds, setFollowingIds] = useState<string[]>([""]);

    const getFollowingIds = useCallback(async () => {
        if (user?.uid) {
            const ref = doc(db, "following", user?.uid);
            onSnapshot(ref, (doc) => {
                setFollowingIds([""]);
                doc?.data()?.users.map((user: UserProps) => setFollowingIds((prev: string[]) => prev ? [...prev, user?.id] : []))
            })
        }
    }, [user?.uid])

    useEffect(() => {
        if (user?.uid) getFollowingIds();
    }, [getFollowingIds, user?.uid])

    useEffect(() => {
        if (user) {
            let postsRef = collection(db, "posts");
            let postsQuery = query(postsRef, orderBy("createdAt", "desc"));
            let followingQuery = query(postsRef, where("uid", "in", followingIds), orderBy("createdAt", "desc"))

            onSnapshot(postsQuery, (snapshot) => {
                let dataObj = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc?.id
                }))
                setPosts(dataObj as PostProps[]);
            })

            onSnapshot(followingQuery, (snapshot) => {
                let dataObj = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc?.id
                }))
                setFollowingPosts(dataObj as PostProps[]);
            })
        }
    }, [followingIds, user])

    const handleDelete = () => { }
        ; return (
            <div>
                <div className="home">
                    <div className="home__top">
                        <div className="home__title">Home</div>
                        <div className="home__tabs">
                            <div className={`home__tab ${activeTab === "all" && "home__tab--active"}`} onClick={() => { setActiveTab("all") }}>For You</div>
                            <div className={`home__tab ${activeTab === "following" && "home__tab--active"}`} onClick={() => { setActiveTab("following") }}>Following</div>
                        </div>
                    </div>
                </div>

                {/* post form */}
                <PostForm />
                {activeTab === "all" && (
                    // tweet posts
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
                )}

                {activeTab === "following" && (
                    // tweet posts
                    <div className='post'>
                        {followingPosts?.length > 0 ? followingPosts?.map((post) => (
                            <PostBox post={post} key={post?.id} />
                        )) :
                            <div className='post__no-posts'>
                                <div className='post__text'>
                                    게시글이 없습니다.
                                </div>
                            </div>
                        }

                    </div>
                )}

            </div>
        )
}