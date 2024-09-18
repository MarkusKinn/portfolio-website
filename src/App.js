import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Timeline from './Timeline';
import BlogOverview from './BlogOverview';
import BlogPost from './BlogPost';


const Section = ({ title, children }) => (
    <div className="mb-16">
        <h2 className="text-2xl font-light mb-6 text-gray-900 dark:text-gray-200 uppercase tracking-wider">
            {title}
        </h2>
        {children}
    </div>
);

const ExperienceItem = ({ title, company, date, description, technologies }) => (
    <div className="mb-8">
        <h3 className="text-xl font-normal text-gray-900 dark:text-gray-200">{title}</h3>
        <p className="text-sm text-gray-700 dark:text-gray-400 mb-2">{company} | {date}</p>
        <ul className="list-disc list-inside text-gray-800 dark:text-gray-300 text-sm mb-2">
            {description.map((item, index) => (
                <li key={index} className="mb-1">{item}</li>
            ))}
        </ul>
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

const SkillList = ({ skills }) => (
    <ul className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
            <li key={index} className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 text-sm">{skill}</li>
        ))}
    </ul>
);

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

const ProjectItem = ({ title, description, technologies, link, image }) => {
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
                <h3 className="text-xl font-normal text-gray-900 dark:text-gray-200 transition-colors duration-300">
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
                                <p className="text-sm text-gray-800 dark:text-gray-400 mb-2">{description}</p>
                                <p className="text-sm text-gray-700 dark:text-gray-500 mb-2">
                                    Technologies: {technologies.join(', ')}
                                </p>
                                {link && (
                                    <a
                                        href={link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                        onClick={(e) => e.stopPropagation()} // Prevent item collapse when clicking the link
                                    >
                                        View Project
                                    </a>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};



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

function CV({ darkMode, showTimeline, setShowTimeline }) {
    return (
        <div className="container mx-auto px-4 max-w-5xl">
            <header className="mb-16 border-b pb-8 dark:border-gray-700">
                <div className="flex items-center mb-6">
                    <img
                        src="/profile-picture.jpg"
                        alt="Markus Kinn"
                        className="w-24 h-24 rounded-full mr-6 object-cover"
                    />
                    <div>
                        <h1 className="text-4xl font-light mb-2 text-gray-900 dark:text-white">Markus Kinn</h1>
                        <p className="text-xl text-gray-700 dark:text-gray-300">Master's Student in Informatics (AI)
                            | Software Engineer</p>
                    </div>
                </div>
                <p className="text-sm text-gray-700 dark:text-gray-400 mb-4">Trondheim, Norway |
                    markus.kinn@gmail.com | +47 473 41 615</p>
                <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                        <SocialLink
                            href="https://www.linkedin.com/in/markuskinn/"
                            icon="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/linkedin.svg"
                            name="LinkedIn"
                        />
                        <SocialLink
                            href="https://github.com/Markuski2023"
                            icon="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/github.svg"
                            name="GitHub"
                        />
                    </div>
                    <a
                        href={`/CV-Markus.pdf`}
                        download
                        className="inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        Download Resume
                    </a>
                </div>
            </header>

            <Section title="Experience">
                <ExperienceItem
                    title="Chief Engineer"
                    company="Ascend NTNU"
                    date="April 2024 - Present"
                    description={[
                        "Responsible for overseeing four technical groups",
                        "Coordinate efforts of 28 engineers to ensure seamless integration of work on autonomous drones",
                        "Worked closely with Deputy Chief Engineer to set strategic goals, manage project timelines, and maintain high standards of technical excellence"
                    ]}
                    technologies={["Team leadership", "Strategic planning", "Project management", "Technical oversight", "Coordination"]}
                />
                <ExperienceItem
                    title="Software Engineer"
                    company="Systek"
                    date="Jun 2024 - Aug 2024"
                    description={[
                        "Worked as a consultant with a group of three students",
                        "Created an AR Configuration System for Christmas trees (oil and gas type) using Unity, C# and Meta Quest 3",
                        "Configuration System simplified the process and reduced errors compared to traditional methods"
                    ]}
                    technologies={["Unity", "C#", "Git", "GitHub", "Meta Quest 3"]}
                />
                <ExperienceItem
                    title="Perception Engineer"
                    company="Ascend NTNU"
                    date="Sep 2023 - Aug 2024"
                    description={[
                        "Member of the Perception team, transforming sensor input into valuable insights about the drone's surroundings",
                        "Worked with technologies including custom deep learning models, fine-tuned existing models, synthetic data generation, ROS2, sensors, and Nvidia Jetson Orin NX"
                    ]}
                    technologies={["Python", "C++", "Deep learning", "Pytorch", "Ultralytics", "Blender", "ROS2", "OpenCV", "Linux", "CAD"]}
                />
                <ExperienceItem
                    title="Machine Learning Intern"
                    company="Europris"
                    date="Aug 2022 - Dec 2022"
                    description={[
                        "Worked with various machine learning algorithms focused on Time Series Data",
                        "Practiced data preprocessing techniques, understanding the importance of cleaning and preparing data for robust model training"
                    ]}
                    technologies={["Machine learning", "Databricks", "Data preprocessing", "Python", "SQL", "Git", "GitHub"]}
                />
            </Section>

            <Section title="Education">
                <ExperienceItem
                    title="Master of Science in Informatics - Artificial Intelligence"
                    company="NTNU - Trondheim"
                    date="Aug 2023 - Jun 2025"
                    description={[]}
                />
                <ExperienceItem
                    title="Bachelor of Computer Science - Machine Learning"
                    company="Østfold University College"
                    date="Aug 2020 - Jun 2023"
                    description={[]}
                />
                <ExperienceItem
                    title="High School"
                    company="Hans Nilsen Hauge VGs"
                    date="Aug 2017 - Jun 2020"
                    description={[]}
                />
            </Section>

            <ProjectsSection>
                <ProjectItem
                    title="Automated Foreign Object Debris Detection for Airfields"
                    description="Collaborated with three fellow students and industry partners Avinor and Kongsberg Gruppen on an innovative bachelor project to develop an automated Foreign Object Debris (FOD) detection system. The project utilized high-quality 360-degree video streams from the Remote Tower System to enhance airport safety. Key achievements included testing and validating real-time computer vision algorithms for FOD detection and processing high-resolution 360-degree video streams."
                    technologies={['Computer Vision', 'Machine Learning', 'Python', 'OpenCV', 'Pytorch']}
                    link="https://github.com/yourusername/fod-detection-project"
                    image={`/fod-detection-project.jpg`}
                />
                <ProjectItem
                    title="YOLOv3 Implementation from Scratch"
                    description="Implemented the YOLOv3 (You Only Look Once version 3) object detection algorithm from scratch in Python. This project involved a deep dive into advanced computer vision techniques and neural network architectures, including building the complex YOLOv3 neural network architecture, implementing the anchor box system and unique grid-based detection approach, and the loss function. The implementation was optimized for performance and validated against established benchmarks."
                    technologies={['Python', 'PyTorch', 'Computer Vision', 'Deep Learning']}
                    link="https://github.com/yourusername/yolov3-from-scratch"
                    image={`/logo.svg`}
                />
                <ProjectItem
                    title="AlphaGo Zero for Hex"
                    description="Implemented a scaled-down version of the AlphaGo Zero system for the game of Hex. This project successfully adapted the groundbreaking self-play reinforcement learning approach to a different strategic board game. Key achievements include adapting the Monte Carlo Tree Search algorithm, designing a compact neural network for policy and value functions, implementing efficient self-play, and optimizing the architecture for Hex gameplay."
                    technologies={['Python', 'Pytorch(Lightning)', 'Monte Carlo Tree Search', 'Reinforcement Learning']}
                    link="https://github.com/yourusername/alphago-zero-hex"
                    image={`/alphago-zero-hex.jpg`}
                />
                <ProjectItem
                    title="AR Configuration System for Oil & Gas Christmas Trees"
                    description="Developed an innovative Augmented Reality (AR) configuration system for oil and gas Christmas trees during a summer internship. Using Meta Quest 3 headsets and Unity, we created an immersive and interactive experience for configuring complex equipment. The system features real-time visualization of changes, and integration with component specifications. This project aims to help the sales and configuration process, reducing misunderstandings and improving efficiency in the oil and gas industry."
                    technologies={['Unity', 'C#', 'Augmented Reality', 'Meta Quest 3']}
                    link="https://github.com/yourusername/ar-christmas-tree-config"
                    image={`/ar-config-system.jpg`}
                />
                <ProjectItem
                    title="C++ Implementation of SAHI for High-Resolution Image Processing"
                    description="Developed a C++ implementation of SAHI (Slicing Aided Hyper Inference), an advanced technique for processing high-resolution images in deep learning models. This project addressed the challenge of maintaining detail and accuracy when working with large images in object detection tasks. The implementation includes efficient image slicing, tile management, result aggregation, enabling the processing of high-resolution images without compromising on detail or accuracy."
                    technologies={['C++', 'Computer Vision', 'Deep Learning', 'Image Processing']}
                    link="https://github.com/yourusername/sahi-cpp"
                    image={`/sahi-project.jpg`}
                />
                <ProjectItem
                    title="Basic Deep Learning Framework in C++"
                    description="Developed a basic deep learning framework from scratch in C++, implementing core components such as neural network architectures, backpropagation, optimization algorithms, and loss functions. This project demonstrated a comprehensive understanding of neural network principles and advanced C++ programming, serving as both a learning tool and a showcase of technical skills in deep learning and software development."
                    technologies={['C++', 'Deep Learning', 'Neural Networks', 'Backpropagation', 'Optimization Algorithms']}
                    link="https://github.com/yourusername/cpp-deep-learning-framework"
                    image={`/deep-learning-framework.jpg`}
                />
            </ProjectsSection>

            <Section title="References">
                <p className="mb-6 text-gray-700 dark:text-gray-300">
                    References will be provided upon request.
                </p>
            </Section>

            <Section title="Skills/ Buzzwords">
                <div className="space-y-4">
                    <div>
                        <h3 className="text-lg font-normal mb-2 text-gray-900 dark:text-gray-200">Programming Languages</h3>
                        <SkillList skills={["Python", "SQL", "C#", "C++"]}/>
                    </div>
                    <div>
                        <h3 className="text-lg font-normal mb-2 text-gray-900 dark:text-gray-200">Tools & Technologies</h3>
                        <SkillList skills={["Deep learning", "Machine learning", "Pytorch(Lightning)", "Git, Github", "Unity"]}/>
                    </div>
                </div>
            </Section>
            {showTimeline && (
                <Section title="Academic Timeline">
                    <Timeline/>
                </Section>
            )}
        </div>
    );
}

function Navigation() {
    const location = useLocation();
    const isBlogPost = location.pathname.startsWith('/blog/') && location.pathname !== '/blog';

    return (
        <div className="fixed top-4 left-4 space-x-2">
            {location.pathname !== '/' && (
                <Link to="/" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition duration-300">
                    CV
                </Link>
            )}
            {location.pathname !== '/blog' && !isBlogPost && (
                <Link to="/blog" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded transition duration-300">
                    Blog
                </Link>
            )}
        </div>
    );
}

function App() {
    const [darkMode, setDarkMode] = useState(() => {
        // Initialize darkMode state from localStorage, defaulting to false if not set
        const savedMode = localStorage.getItem('darkMode');
        return savedMode !== null ? JSON.parse(savedMode) : false;
    });
    const [showTimeline, setShowTimeline] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        // Save the current preference to localStorage
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    useEffect(() => {
        const timer = setTimeout(() => setFadeIn(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    return (
        <Router>
            <div className={`min-h-screen py-16 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'} transition-opacity duration-1000 ease-in-out ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
                <Navigation />
                <button
                    onClick={toggleDarkMode}
                    className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white transition duration-300"
                >
                    {darkMode ? '🌞' : '🌙'}
                </button>
                <button
                    onClick={() => setShowTimeline(!showTimeline)}
                    className="fixed top-20 right-4 p-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white transition duration-300"
                >
                    {showTimeline ? '📅' : '🗓️'}
                </button>
                <Routes>
                    <Route path="/" element={<CV darkMode={darkMode} showTimeline={showTimeline} setShowTimeline={setShowTimeline} />} />
                    <Route path="/blog" element={<BlogOverview />} />
                    <Route path="/blog/:id" element={<BlogPost />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;