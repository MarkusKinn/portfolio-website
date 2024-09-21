import React from 'react';

const Section = React.forwardRef(({ title, children }, ref) => (
    <div ref={ref} className="mb-16">
        <h2 className="text-2xl font-light mb-6 text-gray-900 dark:text-gray-200 uppercase tracking-wider">
            {title}
        </h2>
        {children}
    </div>
));

const SkillItem = ({ skill, rating }) => {
    const ratingColor = {
        1: 'bg-red-200 dark:bg-red-800',
        2: 'bg-yellow-200 dark:bg-yellow-800',
        3: 'bg-green-200 dark:bg-green-800',
        4: 'bg-blue-200 dark:bg-blue-800',
        5: 'bg-purple-200 dark:bg-purple-800',
    };

    return (
        <li className={`inline-block bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 text-sm mr-2 mb-2 relative overflow-hidden`}>
            {skill}
            <div
                className={`absolute bottom-0 left-0 h-1 ${ratingColor[rating]}`}
                style={{ width: `${rating * 20}%` }}
            ></div>
        </li>
    );
};

const SkillList = ({ skills }) => (
    <ul className="flex flex-wrap">
        {skills.map((skill, index) => (
            <SkillItem key={index} skill={skill.name} rating={skill.rating} />
        ))}
    </ul>
);

const SkillLegend = () => (
    <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {[
                { level: "Beginner", color: "bg-red-200 dark:bg-red-800" },
                { level: "Elementary", color: "bg-yellow-200 dark:bg-yellow-800" },
                { level: "Intermediate", color: "bg-green-200 dark:bg-green-800" },
                { level: "Advanced", color: "bg-blue-200 dark:bg-blue-800" },
                { level: "Expert", color: "bg-purple-200 dark:bg-purple-800" },
            ].map((item, index) => (
                <div key={index} className="flex items-center">
                    <div className={`w-4 h-4 ${item.color} mr-2 rounded`}></div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">{item.level}</span>
                </div>
            ))}
        </div>
    </div>
);

const SkillsSection = () => (
    <Section title="Stuff I know (at least) decently well">
        <SkillLegend />
        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-normal mb-2 text-gray-900 dark:text-gray-200">Programming Languages</h3>
                <SkillList skills={[
                    { name: "Python", rating: 5 },
                    { name: "C++", rating: 2 },
                    { name: "C#", rating: 4 },
                    { name: "SQL", rating: 3 },
                    { name: "Java", rating: 3 },
                    { name: "HTML/CSS", rating: 3 }
                ]} />
            </div>
            <div>
                <h3 className="text-lg font-normal mb-2 text-gray-900 dark:text-gray-200">Machine Learning / AI</h3>
                <SkillList skills={[
                    { name: "Deep Learning", rating: 5 },
                    { name: "Computer Vision", rating: 5 },
                    { name: "Reinforcement Learning", rating: 4 },
                    { name: "PyTorch", rating: 4 },
                    { name: "Neural Networks", rating: 5 },
                    { name: "Convolutional Neural Networks (CNN)", rating: 5 },
                    { name: "Recurrent Neural Networks (RNN)", rating: 4 },
                    { name: "Generative Adversarial Networks (GAN)", rating: 4 },
                    { name: "Generative Pretrained Transformers (GPT)/ LLMs", rating: 5 }
                ]} />
            </div>
            <div>
                <h3 className="text-lg font-normal mb-2 text-gray-900 dark:text-gray-200">Data Science</h3>
                <SkillList skills={[
                    { name: "Data Analysis", rating: 4 },
                    { name: "Data Visualization", rating: 3 },
                    { name: "Time Series Analysis", rating: 3 },
                    { name: "Pandas", rating: 4 },
                    { name: "NumPy", rating: 4 },
                    { name: "Matplotlib", rating: 3 }
                ]} />
            </div>
            <div>
                <h3 className="text-lg font-normal mb-2 text-gray-900 dark:text-gray-200">Software Development</h3>
                <SkillList skills={[
                    { name: "Git", rating: 4 },
                    { name: "GitHub", rating: 4 },
                    { name: "Object-Oriented Programming (OOP)", rating: 5 },
                    { name: "Software Testing", rating: 3 }
                ]} />
            </div>
            <div>
                <h3 className="text-lg font-normal mb-2 text-gray-900 dark:text-gray-200">Tools & Technologies</h3>
                <SkillList skills={[
                    { name: "Unity", rating: 4 },
                    { name: "ROS2", rating: 3 },
                    { name: "OpenCV", rating: 4 },
                    { name: "Linux", rating: 3 },
                    { name: "Databricks", rating: 3 },
                    { name: "Jupyter Notebooks", rating: 4 },
                    { name: "Nvidia Jetson", rating: 3 },
                    { name: "Meta Quest 3", rating: 4 },
                    { name: "Augmented Reality (AR)", rating: 5 },
                    { name: "CAD", rating: 3 }
                ]} />
            </div>
            <div>
                <h3 className="text-lg font-normal mb-2 text-gray-900 dark:text-gray-200">Soft Skills</h3>
                <SkillList skills={[
                    { name: "Team Leadership", rating: 5 },
                    { name: "Project Management", rating: 5 },
                    { name: "Technical Writing", rating: 3 },
                    { name: "Problem Solving", rating: 5 },
                    { name: "Collaboration", rating: 4 },
                    { name: "Communication", rating: 4 }
                ]} />
            </div>
        </div>
    </Section>
);

export default SkillsSection;