import { useCallback, useContext, useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "firebaseApp";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import { PostProps } from "pages/home";

export default function PostEditForm() {

    const params = useParams();
    const [post, setPost] = useState<PostProps | null>(null);
    const getPost = useCallback(async () => {
        if (params.id) {
            const docRef = doc(db, "posts", params.id);
            const docSnap = await getDoc(docRef);
            setPost({ ...(docSnap?.data() as PostProps), id: docSnap.id });
            setContent(docSnap?.data()?.content);
            setTags(docSnap?.data()?.hashTags);
        }
    }, [params.id]);

    const navigate = useNavigate();

    const handleFileUpload = () => { };

    const [content, setContent] = useState<string>("");


    const [tags, setTags] = useState<string[]>([]);
    const [hashTag, setHashTag] = useState<string>("");
    const onChangeHashTag = (e: any) => {
        setHashTag(e?.target?.value?.trim());
    }

    const removeTag = (tag: string) => {
        setTags(tags?.filter((val) => val !== tag));
    }

    const handleKeyUp = (e: any) => {
        if (e.keyCode === 32 && e.target.value.trim() !== '') {
            // create tag
            if (tags?.includes(e.target.value?.trim())) {
                toast.error("같은 태그가 있습니다");
            } else {
                setTags((prev) => (prev?.length > 0 ? [...prev, hashTag] : [hashTag]));
                setHashTag("");
            }
        }
    }



    const onSubmit = async (e: any) => {
        e.preventDefault();
        try {
            if (post) {
                const postRef = doc(db, "posts", post?.id);
                await updateDoc(postRef, {
                    content: content,
                    hashTags: tags,
                })
            }
            navigate(`/posts/${post?.id}`);
            toast.success("게시글을 수정하였습니다");
        } catch (e: any) {
            toast.error(e.message);
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { target: { name, value } } = e;
        if (name === "content") {
            setContent(value);
        }

    }

    useEffect(() => {
        if (params.id) getPost();
    }, [getPost, params.id])


    return (

        <form action="" className="post-form" onSubmit={onSubmit}>
            <textarea name="content" id="" className="post-form__textarea" required placeholder="What is happening?"
                onChange={onChange} value={content}></textarea>

            <div className="post-form__hashtags">
                <span className="post-form__hashtags-outputs">
                    {tags?.map((tag, index) => (
                        <span className="post-form__hashtags-tag" key={index} onClick={() => removeTag(tag)}>#{tag}</span>
                    ))}
                </span>
                <input type="text" className="post-form__input" name="hashtag" id="hastag" placeholder="해시태그 + 스페이스바 입력"
                    onChange={onChangeHashTag} onKeyUp={handleKeyUp} value={hashTag} />
            </div>

            <div className="post-form__submit-area">
                <label htmlFor="file-input" className='post-form__file'>
                    <FiImage className='post-from__file-icon' />
                </label>
                <input type="file" name="file-input" id="" accept='image/*' onChange={handleFileUpload} className='hidden' />
                <input type="submit" value="수정" className='post-form__submit-btn' />
            </div>
        </form>

    )


}