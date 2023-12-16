import AuthContext from "pages/components/context/AuthContext";
import PostHeader from "pages/components/posts/Header";
import { useContext, useEffect, useState } from "react";
import { FiImage } from "react-icons/fi";
import { getStorage, ref, deleteObject, uploadString, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { storage } from "firebaseApp";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const STORAGE_DOWNLOAD_URL_STR = "https://firebasestorage.googleapis.com";

export default function ProfileEdit() {

    const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { value } } = e;
        setDisplayName(value);

    }

    const navigate = useNavigate();

    const { user } = useContext(AuthContext);

    const onSubmit = async (e: any) => {
        let key = `${user?.uid}/${uuidv4()}`
        const storageRef = ref(storage, key);
        let newImageUrl = null;
        e.preventDefault();
        try {
            // 기존 이미지 삭제 > 이미지 업로드 > 업데이트 프로필 호출
            if (user?.photoURL && user.photoURL?.includes(STORAGE_DOWNLOAD_URL_STR)) {
                const imageRef = ref(storage, user?.photoURL);
                if(imageRef) {
                    await deleteObject(imageRef).catch((error) => { console.log(error) });
                }
                
            }

            if (imageUrl) {
                const data = await uploadString(storageRef, imageUrl, "data_url");
                newImageUrl = await getDownloadURL(data?.ref);
            }

            if (user) {
                await updateProfile(user, {
                    displayName: displayName,
                    photoURL: newImageUrl || "",
                }).then(() => {
                    toast.success("프로필이 업데이트되었습니다");
                    navigate("/profile");
                }).catch((error) => {console.log(error)});
            }
        } catch (e: any) {

        }
    }

    const handleFileUpload = (e: any) => {
        const { target: { files }, } = e;
        const file = files?.[0];
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend = (e: any) => {
            const { result } = e?.currentTarget;
            setImageUrl(result);
        }
    }

    const handleDeleteImage = () => {
        setImageUrl(null);
    }

    useEffect(() => {
        if (user?.photoURL) {
            setImageUrl(user?.photoURL);
        }
        if (user?.displayName) {
            setDisplayName(user?.displayName);
        }
    }, [user?.photoURL]);


    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const [displayName, setDisplayName] = useState<string>("");

    return <div className="post">
        <PostHeader />
        <form action="" className="post-form" onSubmit={onSubmit}>
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
                    <input type="file" name="file-input" id="file-input" accept="image/*" onChange={handleFileUpload} className="hidden" />
                    <input type="submit" value="프로필 수정" className="post-form__submit-btn" />
                </div>

            </div>
        </form>
    </div>
}