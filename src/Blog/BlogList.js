import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from './blogPosts';

const BlogList = () => {
    const [isAscending, setIsAscending] = useState(true);

    const toggleSortOrder = () => {
        setIsAscending(!isAscending);
    };

    const sortedPosts = [...blogPosts].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return isAscending ? dateA - dateB : dateB - dateA;
    });

    return (
        <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Blog Posts</h1>
                <button
                    onClick={toggleSortOrder}
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors duration-200 focus:outline-none"
                    aria-label={isAscending ? "Sort Descending" : "Sort Ascending"}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transform ${isAscending ? 'rotate-180' : ''}`}
                    >
                        <line x1="12" y1="19" x2="12" y2="5"></line>
                        <polyline points="5 12 12 5 19 12"></polyline>
                    </svg>
                </button>
            </div>
            {sortedPosts.map((post) => (
                <div key={post.id} className="mb-6">
                    <h2 className="text-2xl font-semibold">
                        <Link to={`/blog/${post.id}`} className="text-blue-600 hover:text-blue-800">
                            {post.title}
                        </Link>
                    </h2>
                    <p className="text-gray-600">{post.date}</p>
                    <p className="mt-2">{post.summary}</p>
                </div>
            ))}
        </div>
    );
};

export default BlogList;