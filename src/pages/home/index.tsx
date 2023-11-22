import { FiImage } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'
import { AiFillHeart } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa';

export interface PostProps {
    id: string;
    email: string;
    content: string;
    createdAt: string;
    uid: string;
    profileUrl?: string;
    likes?: string[];
    likeCount?: number;
    comments?: any;
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
    const handleDelete = () => { }
        ; return (
            <div>
                <div className="home">
                    <div className="home__title">Home</div>
                    <div className="home__tabs">
                        <div className="home__tab home__tab--active">For You</div>
                        <div className="home__tab home__tab--active">Following</div>
                    </div>
                </div>
                {/* post form */}
                <form action="" className="post-form">
                    <textarea name="content" id="" className="post-form__textarea" required placeholder="What is happening?"></textarea>
                    <div className="post-form__submit-area">
                        <label htmlFor="file-input" className='post-form__file'>
                            <FiImage className='post-from__file-icon' />
                        </label>
                        <input type="file" name="file-input" id="" accept='image/*' onChange={handleFileUpload} className='hidden' />
                        <input type="submit" value="Tweet" className='post-form__submit-btn' />
                    </div>
                </form>
                {/* tweet posts */}
                <div className='post'>
                    {posts?.map((post) => (
                        <div className='post__box' key={post?.id}>
                            <Link to={`/posts/${post.id}`}>
                                <div className='post__box-profile'>
                                    <div className='post__flex'>
                                        {post?.profileUrl ? (<img src={post?.profileUrl} alt='profile' className='post__box-profile-img' />)
                                            : <FaUserCircle className='post__box-profile-icon' />}
                                        <div className='post__email'>{post?.email}</div>
                                        <div className='post__createdAt'>{post?.createdAt}</div>
                                    </div>
                                    <div className='post__box-content'>{post?.content}</div>
                                </div>
                            </Link>
                            <div className='post__box-footer'>
                                {/* post.uid === user.uid */}
                                <button type='button' className='post__delete' onClick={handleDelete}>Delete</button>
                                <button type='button' className='post__edit'>
                                    <Link to={`/posts/edit/${post?.id}`}>Edit</Link>
                                </button>
                                <button type='button' className='post__likes'><AiFillHeart />{post?.likeCount || 0}</button>
                                <button type='button' className='post__comments'><FaRegComment /> {post?.comments?.length || 0} </button>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        )
}