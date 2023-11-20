import { FiImage } from 'react-icons/fi'

export interface PostProps {
    id: string;
    email: string;
    content: string;
    createdAt: string;
    uid: string;
}

const posts: PostProps[] = [
    {
        id: "1",
        email: "sdf@sdf",
        content: "내용",
        createdAt: "2023",
        uid: "134"
    },
    {
        id: "2",
        email: "sdf@sdf",
        content: "내용",
        createdAt: "2023",
        uid: "1345"
    },
    {
        id: "3",
        email: "sdf@sdf",
        content: "내용",
        createdAt: "2023",
        uid: "13456"
    }
]

export default function HomePage() {
    const handleFileUpload = () => { };
    return (
        <div>
            <div className="home">
                <div className="home__title">Home</div>
                <div className="home__tabs"></div>
                <div className="home__tab home__tab--active">For You</div>
                <div className="home__tab home__tab--active">Following</div>
            </div>
            {/* post form */}
            <form action="" className="post-form">
                <textarea name="content" id="" className="post-form__textarea" required placeholder="What is happening?"></textarea>
                <div className="post-form__submit-area">
                    <label htmlFor="file-input" className='post-from__file'>
                        <FiImage className='post-form__file-icon' />
                    </label>
                    <input type="file" name="file-input" id="" accept='image/*' onChange={handleFileUpload} className='hidden' />
                    <input type="submit" value="Tweet" className='post-form__submit-btn' />
                </div>
            </form>
            {/* tweet posts */}
            <div className='post'>
                {posts?.map((post) => (
                    <div className='post__box' key={post?.id}>
                        {post?.content}
                    </div>
                ))}

            </div>
        </div>
    )
}