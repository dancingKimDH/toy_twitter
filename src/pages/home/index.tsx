import { FiImage } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'
import { AiFillHeart } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa';
import PostForm from 'pages/components/posts/PostForm';

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



export default function HomePage() {


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
                <PostForm />

                {/* tweet posts */}
                
            </div>
        )
}