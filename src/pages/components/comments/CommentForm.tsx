import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { PostProps } from "pages/home";
import React, { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import { toast } from "react-toastify";

export interface CommentFormProps {
    post: PostProps | null;
}

export default function CommentForm({ post }: CommentFormProps) {

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { target: { name, value } } = e;
        if (name === "comment") {
            setComment(value);
        }

    };

    const truncate = (str: string) => {
        return str?.length > 10 ? str?.substring(0, 10) + "..." : str;
    }

    const onSubmit = async (e: any) => {
        e.preventDefault();

        if (post && user) {
            try {
                const postRef = doc(db, "posts", post?.id);
                const commentObj = {
                    comment: comment,
                    uid: user?.uid,
                    email: user?.email,
                    createdAt: new Date()?.toLocaleDateString("ko", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                    })
                }
                await updateDoc(postRef, {
                    comments: arrayUnion(commentObj),
                })

                if (user?.uid !== post?.uid) {
                    // send out notification
                    await addDoc(collection(db, "notifications"), {
                        createdAt: new Date()?.toLocaleDateString("ko", {
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit"
                        }),
                        uid: post?.uid,
                        isRead: false,
                        url: `/posts/${post?.id}`,
                        content: `"${truncate(post?.content)}" 글에 댓글이 작성되었습니다`
                    })
                }
                toast.success("댓글을 성공적으로 등록하였습니다");
            } catch (e: any) {
                console.log(e);
            }
        }
    };

    const [comment, setComment] = useState<string>("");

    const { user } = useContext(AuthContext);

    return (
        <form action="post-form" onSubmit={onSubmit}>
            <textarea className="post-form__textarea" name="comment" value={comment} id="comment" required placeholder="What is Happening?"
                onChange={onChange}></textarea>
            <div className="post-form__submit-area">
                <div></div>
                <input type="submit" value="Comment" className="post-form__submit-btn" disabled={!comment} />
            </div>

        </form>

    )

}