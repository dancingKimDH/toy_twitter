import PostHeader from "pages/components/posts/Header";
import { useState } from "react";
import { FiImage } from "react-icons/fi";

export default function ProfileEdit() {

    const onchange = () => { }

    const handleFileUpload = () => { }

    const handleDeleteImage = () => { }
    
    const [imageUrl, setImageUrl] = useState<string>("");

    const [displayName, setDisplayName] = useState<string>("");

    return <div className="post">
        <PostHeader />
        <form action="" className="post-form">
            <div className="post-form__profile">
                <input type="text" name="displayName" id="" className="post-form__input" placeholder="이름"
                    onChange={onchange} value={displayName} />

                    {imageUrl && (
                        <div className="post-form__attachment">
                            <img src={imageUrl} alt="attachment" width={100} height={100} />
                            <button type="button" className="post-form__clear-btn" onClick={handleDeleteImage}>Delete</button>
                        </div>
                    )}

                <div className="post-form__submit-area">
                    <div className="post-form__image-area">
                        <label htmlFor="file-input" className="post-form__file">
                            <FiImage className="post-form__file-icon" />
                        </label>
                    </div>
                    <input type="file" name="file-input" id="file-input" accept="image/*" onChange={handleFileUpload} className="hidden"/>
                    <input type="submit" value="프로필 수정" className="post-form__submit-btn" />
                </div>

            </div>
        </form>
    </div>
}