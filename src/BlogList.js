import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from './blogPosts';

const BlogList = () => {
    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
            {blogPosts.map((post) => (
                <div key={post.id} className="mb-6">
                    <h2 className="text-2xl font-semibold">
                        <Link to={`/blog/${post.id}`} className="text-blue-600 hover:text-blue-800">
                            {post.title}
                        </Link>
                    </h2>
                    <p className="text-gray-600">{post.date}</p>
                    <p className="mt-2">{post.summary}</p>
                    <p className="mt-2 text-sm text-gray-500">Post ID: {post.id}</p>
                </div>
            ))}
        </div>
    );
};

export default BlogList;