import { useEffect, useState } from "react";
import appWriteService from '../../appwrite/conf';
import { Container, PostCard } from '../index';
import { Link } from "react-router-dom";

function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        appWriteService.getPosts([]).then((data) => {
            if (data) setPosts(data.documents);
        });
    }, []);

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <h1 className="text-2xl font-bold hover:text-gray-500">
                        No Posts
                    </h1>
                </Container>
            </div>
        );
    }

    const featured = posts[0];
    const recent = posts.slice(1, 5); 

    return (
        <div className="w-full py-8 space-y-10">
            
                {/* Hero Section */}
                <section className="w-full text-center mb-8  mx-auto">
                    <h1 className="text-4xl font-bold mb-2">Welcome to inkSpire</h1>
                    <p className="text-gray-600 text-lg">Explore the latest in tech, web development, and design.</p>
                    <Link to="/all-posts" className="mt-4 inline-block bg-blue-800 text-white px-4 py-2 rounded hover:bg-blue-500 transition">Browse All Posts</Link>
                </section>

                {/* Featured Post */}
                {featured && (
                    <section className="mb-12 mx-8">
                        <h2 className="text-2xl font-semibold mb-4">Featured Post</h2>
                        <div className=" md:w-2/3 lg:w-1/2 " >
                            <PostCard {...featured} />
                        </div>
                    </section>
                )}

                {/* Recent Posts */}
                <section className="mb-12 mx-8">
                    <h2 className="text-2xl font-semibold mb-4">Recent Posts</h2>
                    <div className="flex flex-wrap -m-2">
                        {recent.map(post => (
                            <div key={post.$id} className="w-full sm:w-1/2 lg:w-1/4 p-2">
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </section>
            
        </div>
    );
}

export default Home;
