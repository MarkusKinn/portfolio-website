import React from "react";

const Section = React.forwardRef(({ title, children }, ref) => (
    <div ref={ref} className="mb-16">
        <h2 className="text-2xl font-light mb-6 text-gray-900 dark:text-gray-200 uppercase tracking-wider">
            {title}
        </h2>
        {children}
    </div>
));

export default Section;