import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from './blogPosts';

const BlogPost = () => {
    const { id } = useParams();
    const [postContent, setPostContent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPost = async () => {
            setIsLoading(true);
            setError(null);
            try {
                console.log('Received ID:', id);
                console.log('Available blog posts:', blogPosts);
                const post = blogPosts.find(p => p.id === id);
                if (!post) {
                    throw new Error(`Blog post with id "${id}" not found`);
                }
                console.log('Found post:', post);
                const module = await post.content();
                console.log('Loaded module:', module);
                if (!module.default) {
                    throw new Error('Module does not have a default export');
                }
                setPostContent(() => module.default);
            } catch (err) {
                console.error('Failed to load blog post:', err);
                setError(`Failed to load blog post: ${err.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        loadPost();
    }, [id]);

    if (isLoading) {
        return <div className="max-w-3xl mx-auto px-4 py-8">Loading...</div>;
    }

    if (error) {
        return <div className="max-w-3xl mx-auto px-4 py-8 text-red-600">{error}</div>;
    }

    if (!postContent) {
        return <div className="max-w-3xl mx-auto px-4 py-8">Blog post not found</div>;
    }

    const PostContent = postContent;

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <Link to="/blog" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">&larr; Back to all posts</Link>
            <PostContent />
        </div>
    );
};

export default BlogPost;