import { languageState } from "atom";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "pages/components/context/AuthContext";
import PostBox from "pages/components/posts/PostBox";
import { PostProps } from "pages/home";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useRecoilState } from "recoil";

export default function ProfilePage() {

    const [myPosts, setMyPosts] = useState<PostProps[]>([]);
    const [likePosts, setLikePosts] = useState<PostProps[]>([]);

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const PROFILE_DEFAULT_URL = "/logo192.png";

    type TabType = 'my' | 'like';

    const [activeTab, setActiveTab] = useState<TabType>('my');

    const [language, setLanguage] = useRecoilState(languageState)

    const onClickLanguage = () => {
        setLanguage(language === "ko" ? "en" : "ko");
        localStorage.setItem("language", language === "ko" ? "en" : "ko");
    }

    useEffect(() => {
        if (user) {
            let postsRef = collection(db, "posts");
            let myPostsQuery = query(postsRef, where("uid", "==", user.uid), orderBy("createdAt", "desc"));
            let likePostsQuery = query(postsRef, where("likes", "array-contains", user.uid), orderBy("createdAt", "desc"));

            onSnapshot(myPostsQuery, (snapshot) => {
                let dataObj = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc?.id
                }))
                setMyPosts(dataObj as PostProps[]);
            })

            onSnapshot(likePostsQuery, (snapshot) => {
                let dataObj = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc?.id
                }))
                setLikePosts(dataObj as PostProps[]);
            })
        }
    })

    return (


        <div className="home">
            <div className="home__top">
                <div className="home__title">Profile</div>
                <div className="profile">
                    <img src={user?.photoURL || PROFILE_DEFAULT_URL} alt="profile" className="profile__image" width={100} height={100} />
                    <div className="profile__flex">
                        <button type="button" className="profile__btn" onClick={() => navigate("/profile/edit")}>프로필 수정</button>
                        <button type="button" className="profile__btn-language" onClick={onClickLanguage}>
                            {language === "ko" ? "한국어" : "English"}
                        </button>
                    </div>
                </div>

                <div className="profile__text">
                    <div className="profile__name">{user?.displayName || "사용자님"}</div>
                    <div className="profile__name">{user?.email}</div>

                </div>

                <div className="home__tabs">
                    <div className={`home__tab ${activeTab === "my" && "home__tab-active"}`} onClick={() => { setActiveTab('my') }}>For You</div>
                    <div className={`home__tab ${activeTab === "like" && "home__tab-active"}`} onClick={() => { setActiveTab('like') }}>Likes</div>
                </div>



                {activeTab === 'my' && (
                    <div className="post">
                        {myPosts?.length > 0 ? (myPosts?.map((post) => <PostBox post={post} key={post.id} />)) :
                            <div className='post__no-posts'>
                                <div className='post__text'>
                                    게시글이 없습니다.
                                </div>
                            </div>}
                    </div>
                )}
                {activeTab === 'like' && (
                    <div className="post">
                        {likePosts?.length > 0 ? (likePosts?.map((post) => <PostBox post={post} key={post.id} />)) :
                            <div className='post__no-posts'>
                                <div className='post__text'>
                                    게시글이 없습니다.
                                </div>
                            </div>}
                    </div>
                )}

            </div>
        </div>
    )
}