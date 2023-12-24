import Loader from "pages/components/loader/Loader";
import PostBox from "pages/components/posts/PostBox";
import { PostProps } from "pages/home"
import { useCallback, useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "firebaseApp";
import { IoIosArrowBack } from "react-icons/io";
import PostHeader from "pages/components/posts/Header";
import CommentForm from "pages/components/comments/CommentForm";
import CommentBox, { CommentProps } from "pages/components/comments/CommentBox";


export default function PostDetail() {

    const params = useParams();
    const [post, setPost] = useState<PostProps | null>(null);
    const navigate = useNavigate();

    const getPost = useCallback(async () => {
        if (params?.id) {
            const docRef = doc(db, "posts", params.id);
            onSnapshot(docRef, (doc) => {
                setPost({ ...(doc?.data() as PostProps), id: doc.id})
            })
        }
    }, [params.id])

    useEffect(() => {
        if (params.id) getPost();
    }, [getPost, params.id]);

    return (
        <div className="post">
            <PostHeader />
            {post ? <><PostBox post={post} /><CommentForm post={post} />
                {post?.comments?.slice(0)?.reverse()?.map((data: CommentProps, index: number) => (
                    <CommentBox data={data} key={index} post={post} />
                ))}
            </> : <Loader />}
        </div>

    )
}