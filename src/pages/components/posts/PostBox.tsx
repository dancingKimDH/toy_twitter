import { PostProps } from "pages/home";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import { FaRegComment, FaUserCircle } from "react-icons/fa"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { arrayRemove, arrayUnion, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { toast } from "react-toastify";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { storage } from "firebaseApp";
import FollowingBox from "../following/FollowingBox";

interface PostBoxProps {
    post: PostProps;
}

export default function PostBox({ post }: PostBoxProps) {

    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const toggleLike = async () => {
        const postRef = doc(db, "posts", post.id);
        if (user?.uid && post?.likes?.includes(user?.uid)) {
            // like > cancel likev
            await updateDoc(postRef, {
                likes: arrayRemove(user?.uid),
                likeCount: post?.likeCount ? post?.likeCount - 1 : 0,
            })
        } else {
            // no like > like
            await updateDoc(postRef, {
                likes: arrayUnion(user?.uid),
                likeCount: post?.likeCount ? post?.likeCount + 1 : 1,
            })
        }
    }

    const handleDelete = async () => {
        const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");

        if (confirm) {

            const imageRef = ref(storage, post?.imageUrl);

            if (post?.imageUrl) {
                deleteObject(imageRef).catch((error) => {
                    console.log(error);
                })
            }

            await deleteDoc(doc(db, "posts", post.id));
            toast.success("게시글을 삭제하였습니다");
            navigate("/");
        }
    }

    return (

        <div className='post__box' key={post?.id}>

            <div className='post__box-profile'>
                <div className='post__flex'>
                    {post?.profileUrl ? (<img src={post?.profileUrl} alt='profile' className='post__box-profile-img' />)
                        : <FaUserCircle className='post__box-profile-icon' />}
                    <div className="post__flex-between">
                        <div className="post__flex">
                            <div className='post__email'>{post?.email}</div>
                            <div className='post__createdAt'>{post?.createdAt}</div>
                        </div>
                        <FollowingBox post={post}/>
                    </div>
                </div>
                <Link to={`/posts/${post.id}`}>
                    <div className='post__box-content'>{post?.content}</div>

                    {post?.imageUrl && (
                        <div className="post__image-div">
                            <img src={post?.imageUrl} alt="post image" className="post__image" width={100} height={100} />
                        </div>
                    )}

                    <div className="post-form__hashtags-outputs">
                        {post?.hashTags?.map((tag, index) => (
                            <span className="post-form__hashtags-tag" key={index}>#{tag}</span>
                        ))}
                    </div>
                </Link>
            </div>


            <div className='post__box-footer'>
                {user?.uid === post?.uid && (
                    <>
                        <button type='button' className='post__delete' onClick={handleDelete}>Delete</button>
                        <button type='button' className='post__edit'>
                            <Link to={`/posts/edit/${post?.id}`}>Edit</Link>
                        </button>

                        <button type='button' className='post__likes' onClick={toggleLike}>
                            {user && post?.likes?.includes(user.uid) ? (<AiFillHeart />) : (<AiOutlineHeart />)}
                            {post?.likeCount || 0}</button>
                        <button type='button' className='post__comments'><FaRegComment /> {post?.comments?.length || 0} </button>
                    </>
                )}
            </div>
        </div>

    )
}
