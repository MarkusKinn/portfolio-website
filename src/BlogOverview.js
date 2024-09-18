import React from 'react';
import { Link } from 'react-router-dom';

const mockBlogs = [
    { id: "alphago-zero-hex", title: "AlphaGo Zero for HEX", date: "2024-03-15", excerpt: "Exploring the fascinating world of artificial intelligence and its impact on our daily lives." },
];

const BlogOverview = () => {
    return (
        <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-3xl font-bold mb-8 text-center">Blog Posts</h1>
            <div className="space-y-8">
                {mockBlogs.map(blog => (
                    <div key={blog.id} className="border-b pb-6">
                        <h2 className="text-2xl font-semibold mb-2">
                            <Link to={`/blog/${blog.id}`} className="hover:text-blue-500 transition-colors">
                                {blog.title}
                            </Link>
                        </h2>
                        <p className="text-sm text-gray-500 mb-2">{blog.date}</p>
                        <p className="text-gray-700 dark:text-gray-300">{blog.excerpt}</p>
                        <Link to={`/blog/${blog.id}`} className="text-blue-500 hover:underline mt-2 inline-block">
                            Read more
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogOverview;