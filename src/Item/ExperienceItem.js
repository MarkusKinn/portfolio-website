import React from "react";

const formatText = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        return part;
    });
};

const ExperienceItem = ({ title, company, date, overview, highlights, technologies }) => (
    <div className="mb-8">
        <h3 className="text-xl font-normal text-gray-900 dark:text-gray-200">{title}</h3>
        <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">{company} | {date}</p>
        {overview && <p className="text-gray-800 dark:text-gray-300 text-sm mb-2">{formatText(overview)}</p>}
        {highlights && highlights.length > 0 && (
            <ul className="list-disc list-inside text-gray-800 dark:text-gray-300 text-sm mb-2">
                {highlights.map((item, index) => (
                    <li key={index} className="mb-1">{formatText(item)}</li>
                ))}
            </ul>
        )}
        {technologies && technologies.length > 0 && (
            <div className="mt-2">
                <ul className="flex flex-wrap gap-2 mt-1">
                    {technologies.map((tech, index) => (
                        <li key={index} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 text-xs rounded">{tech}</li>
                    ))}
                </ul>
            </div>
        )}
    </div>
);

export default ExperienceItem;