import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "firebaseApp";
import AuthContext from "pages/components/context/AuthContext";
import PostBox from "pages/components/posts/PostBox";
import { PostProps } from "pages/home";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {

    const [posts, setPosts] = useState<PostProps[]>([]);

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

    const PROFILE_DEFAULT_URL = "/logo192.png";

    useEffect(() => {
        if (user) {
            let postsRef = collection(db, "posts");
            let postsQuery = query(postsRef, where("uid", "==", user.uid), orderBy("createdAt", "desc"));

            onSnapshot(postsQuery, (snapshot) => {
                let dataObj = snapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc?.id
                }))
                setPosts(dataObj as PostProps[]);
            })
        }
    })

    return (


        <div className="home">
            <div className="home__top">
                <div className="home__title">Profile</div>
                <div className="profile">
                    <img src={user?.photoURL || PROFILE_DEFAULT_URL} alt="profile" className="profile__image" />
                    <button type="button" className="profile__btn" onClick={() => navigate("/profile/edit")}>프로필 수정</button>
                </div>

                <div className="profile__text">
                    <div className="profile__name">{user?.displayName || "사용자님"}</div>
                    <div className="profile__name">{user?.email}</div>

                </div>

                <div className="home__tabs">
                    <div className="home__tab home__tab--active">For You</div>
                    <div className="home__tab home__tab--active">Likes</div>
                </div>

                <div className="post">
                    {posts?.length > 0 ? (posts?.map((post) => <PostBox post={post} key={post.id} />)) :
                        <div className='post__no-posts'>
                            <div className='post__text'>
                                게시글이 없습니다.
                            </div>
                        </div>}
                </div>

            </div>
        </div>
    )
}