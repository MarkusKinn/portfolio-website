import React from "react";

const ProjectsSection = ({ children }) => (
    <div className="w-full py-16">
        <div className="max-w-[90%] mx-auto px-4">
            <h2 className="text-2xl font-light mb-6 text-gray-900 dark:text-gray-200 uppercase tracking-wider">
                Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-max">
                {children}
            </div>
        </div>
    </div>
);

export default ProjectsSection;