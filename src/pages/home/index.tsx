import { Link } from 'react-router-dom';
import PostForm from 'pages/components/posts/PostForm';
import PostBox from 'pages/components/posts/PostBox';

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
                <PostForm />

                {/* tweet posts */}
                <div className='post'>{posts?.map((post) => (
                        <PostBox post = {post} key={post?.id}/>
                    ))}

                </div>
            </div>
        )
}