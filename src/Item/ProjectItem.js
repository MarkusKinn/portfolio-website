import React, {useEffect, useRef, useState} from "react";

const ProjectItem = ({ title, description, technologies, link, image, confidential = false, codeLost = false }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHorizontallyExpanded, setIsHorizontallyExpanded] = useState(false);
    const [isVerticallyExpanded, setIsVerticallyExpanded] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const contentRef = useRef(null);

    useEffect(() => {
        let timer1, timer2, timer3;
        if (isExpanded) {
            // Opening sequence
            setIsHorizontallyExpanded(true);
            timer1 = setTimeout(() => {
                setIsVerticallyExpanded(true);
            }, 300); // Start vertical expansion after 300ms
            timer2 = setTimeout(() => {
                setShowContent(true);
            }, 600); // Show content after vertical expansion is complete
        } else {
            // Closing sequence
            setShowContent(false);
            timer1 = setTimeout(() => {
                setIsVerticallyExpanded(false);
            }, 50); // Start vertical collapse almost immediately
            timer2 = setTimeout(() => {
                setIsHorizontallyExpanded(false);
            }, 350); // Start horizontal collapse after vertical collapse is mostly done
        }
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [isExpanded]);

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div
            className={`mb-6 border rounded-lg overflow-hidden cursor-pointer
                transition-all duration-300 ease-in-out
                ${isExpanded ? 'shadow-lg' : 'shadow hover:shadow-md'}
            `}
            style={{
                gridColumn: isHorizontallyExpanded ? 'span 2 / span 2' : 'span 1 / span 1',
                transition: 'all 0.3s ease-in-out, grid-column 0.3s ease-in-out',
            }}
            onClick={handleClick}
        >
            <div className="p-4">
                <h3 className="text-2xl font-normal text-gray-900 dark:text-gray-200 transition-colors duration-300">
                    {title}
                </h3>
                <div
                    ref={contentRef}
                    className={`mt-4 overflow-hidden
                        transition-[max-height] duration-500 ease-in-out
                        ${isVerticallyExpanded ? 'max-h-96' : 'max-h-0'}
                    `}
                    style={{
                        transitionTimingFunction: isVerticallyExpanded ? 'cubic-bezier(0.4, 0, 0.2, 1)' : 'cubic-bezier(0.6, 0.04, 0.98, 0.335)',
                    }}
                >
                    <div className={`transition-opacity duration-300 ease-in-out ${showContent ? 'opacity-100' : 'opacity-0'}`}>
                        {showContent && (
                            <>
                                <p className="text-xl text-gray-800 dark:text-gray-400 mb-2">{description}</p>
                                <p className="text-m text-gray-700 dark:text-gray-500 mb-2">
                                    Technologies: {technologies.join(', ')}
                                </p>
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
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectItem;