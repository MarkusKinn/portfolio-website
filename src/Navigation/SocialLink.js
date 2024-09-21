import React from "react";

const SocialLink = ({ href, icon, name }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-300"
    >
        <img src={icon} alt={`${name} icon`} className="w-5 h-5 mr-2" />
        <span>{name}</span>
    </a>
);

export default SocialLink;