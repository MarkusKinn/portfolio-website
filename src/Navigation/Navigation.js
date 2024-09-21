import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navigation({ darkMode, toggleDarkMode, showTimeline, handleTimelineToggle }) {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const isBlogPage = location.pathname === '/blog' || location.pathname.startsWith('/blog/');

    return (
        <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="w-1/3 flex justify-center">
                        {/* Center content if needed */}
                    </div>
                    <div className="w-1/3 flex justify-end items-center">
                        <button
                            onClick={toggleDarkMode}
                            className="text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full mr-4 w-10 h-10 flex items-center justify-center"
                            aria-label={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {darkMode ? '🌞' : '🌙'}
                        </button>
                        <div className="w-32"> {/* Fixed width container for main action button */}
                            {!isBlogPage && (
                                <Link to="/blog"
                                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center w-full"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                    </svg>
                                    Blog
                                </Link>
                            )}
                            {isBlogPage && (
                                <Link to="/"
                                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center w-full"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                    </svg>
                                    CV
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;