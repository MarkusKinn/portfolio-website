import React, { useRef, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';

const ProjectContext = React.createContext();

export const ProjectProvider = ({ children }) => {
    const [openProjectId, setOpenProjectId] = React.useState(null);
    return (
        <ProjectContext.Provider value={{ openProjectId, setOpenProjectId }}>
            {children}
        </ProjectContext.Provider>
    );
};

const ProjectItem = ({ id, title, description, technologies, link, image, confidential = false, blogPostId = null, codeLost = false }) => {
    const { openProjectId, setOpenProjectId } = useContext(ProjectContext);
    const itemRef = useRef(null);
    const overlayContentRef = useRef(null);
    const isExpanded = openProjectId === id;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isExpanded &&
                itemRef.current && !itemRef.current.contains(event.target) &&
                overlayContentRef.current && !overlayContentRef.current.contains(event.target)) {
                setOpenProjectId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isExpanded, setOpenProjectId]);

    const handleClick = () => {
        setOpenProjectId(isExpanded ? null : id);
    };

    const handleClose = (e) => {
        e.stopPropagation();
        setOpenProjectId(null);
    };

    return (
        <>
            <div
                ref={itemRef}
                className={`mb-6 border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 ease-in-out
                    ${isExpanded ? 'ring-4 ring-blue-500 shadow-lg' : 'shadow hover:shadow-md'}
                `}
                onClick={handleClick}
            >
                <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-200 transition-colors duration-300">
                        {title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {technologies.join(', ')}
                    </p>
                </div>
            </div>
            {isExpanded && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleClose}>
                    <div
                        ref={overlayContentRef}
                        className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">{title}</h2>
                        {image && (
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                        )}
                        <p className="text-base leading-relaxed text-gray-700 dark:text-gray-300 mb-4">{description}</p>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-4">
                            Technologies: {technologies.join(', ')}
                        </p>
                        <div className="flex flex-wrap gap-4 mt-4">
                            {confidential ? (
                                <p className="text-sm text-red-600 font-semibold">Confidential</p>
                            ) : codeLost ? (
                                <p className="text-sm text-yellow-600 font-semibold">Code Lost</p>
                            ) : link ? (
                                <a
                                    href={link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                    onClick={(e) => e.stopPropagation()} // Prevent item collapse when clicking the link
                                >
                                    View Project
                                </a>
                            ) : null}
                            {blogPostId && (
                                <Link
                                    to={`/blog/${blogPostId}`}
                                    className="text-green-600 hover:text-green-800 font-medium"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClose(e);
                                    }}
                                >
                                    Read Blog Post
                                </Link>
                            )}
                        </div>
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 bg-white dark:bg-gray-800 rounded-full p-2 transition-colors duration-200"
                            onClick={handleClose}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProjectItem;