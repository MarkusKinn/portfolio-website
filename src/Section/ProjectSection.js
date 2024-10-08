import React from "react";
import {ProjectProvider} from "../Item/ProjectItem";

const ProjectsSection = ({ children }) => (
    <ProjectProvider>
        <div className="w-full py-16">
            <div className="mx-auto">
                <h2 className="text-2xl font-light mb-6 text-gray-900 dark:text-gray-200 uppercase tracking-wider">
                    Projects
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-max">
                    {children}
                </div>
            </div>
        </div>
    </ProjectProvider>
);

export default ProjectsSection;