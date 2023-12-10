import { useContext, useState } from "react";
import { FiImage } from "react-icons/fi";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "firebaseApp";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";
import { error } from "console";
import { v4 as uuidv4 } from "uuid";


export default function PostForm() {

    const [imageFile, setImageFile] = useState<string | null>(null);

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [tags, setTags] = useState<string[]>([]);

    const [content, setContent] = useState<string>("");

    const [hashTag, setHashTag] = useState<string>("");

    const { user } = useContext(AuthContext);

    const handleFileUpload = (e: any) => {
        const { target: { files } } = e;

        const file = files?.[0];
        const fileReader = new FileReader();
        fileReader?.readAsDataURL(file);
        fileReader.onloadend = (e: any) => {
            const { result } = e?.currentTarget;
            setImageFile(result);
        }
    };

    const handleDeleteImage = () => {
        setImageFile(null);
    }

    const onSubmit = async (e: any) => {
        setIsSubmitting(true);
        const key = `${user?.uid}/${uuidv4()}`;
        const storageRef = ref(storage, key);
        e.preventDefault();

        try {

            // image upload

            let imageUrl = "";
            if(imageFile){
                const data = await uploadString(storageRef, imageFile, "data_url");
                imageUrl = await getDownloadURL(data?.ref);
            }

            // text upload

            await addDoc(collection(db, 'posts'), {
                content: content,
                createdAt: new Date()?.toLocaleDateString("ko", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                }),
                uid: user?.uid,
                email: user?.email,
                hashTags: tags,
                imageUrl: imageUrl,
            });
            setTags([]);
            setHashTag("");
            setContent("");
            setImageFile(null);
            toast.success("게시글을 생성하였습니다");
            setIsSubmitting(false);
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
                <div className="post-form__image-area">
                    <label htmlFor="file-input" className='post-form__file'>
                        <FiImage className='post-from__file-icon' />
                    </label>
                    <input type="file" name="file-input" id="file-input" accept='image/*' onChange={handleFileUpload} className='hidden' />

                    {imageFile && (
                        <div className="post-form__attachment">
                            <img src={imageFile} alt="" width={100} height={100} />
                            <button className="post-form__clear-btn" type="button" onClick={handleDeleteImage}>Delete</button>
                        </div>

                    )}

                </div>
                <input type="submit" value="Tweet" className='post-form__submit-btn' disabled={isSubmitting} />

            </div>
        </form>

    )


}