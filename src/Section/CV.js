import SkillsSection from "./SkillsSection";
import CourseSection from "./CourseSection";
import React from "react";
import Section from "./Section";
import ProjectsSection from "./ProjectSection";
import ProjectItem from "../Item/ProjectItem";
import ExperienceItem from "../Item/ExperienceItem";
import SocialLink from "../Navigation/SocialLink";

function CV({ timelineSectionRef }) {
    return (
        <div className="mx-auto">
            <style jsx>{`
                @keyframes strongBlink {
                    0%, 100% { opacity: 0.1; }
                    50% { opacity: 1; }
                }
                .blink-glow {
                    animation: strongBlink 2s infinite;
                }
            `}</style>
            <div className="container mx-auto px-4 max-w-6xl">
                <header className="mb-16 border-b pb-8 dark:border-gray-700">
                    <div className="flex items-center mb-6">
                        <img
                            src="/profile-picture.jpg"
                            alt="Markus Kinn"
                            className="w-32 h-32 rounded-full mr-6 object-cover"
                        />
                        <div>
                            <h1 className="text-5xl font-light mb-2 text-gray-900 dark:text-white">Markus Kinn</h1>
                            <p className="text-2xl text-gray-700 dark:text-gray-300">Master's Student in Informatics (AI)
                                | Machine learning & Software Engineer</p>
                        </div>
                    </div>
                    <p className="text-lg text-gray-700 dark:text-gray-400 mb-4">Trondheim, Norway |
                        markus.kinn@gmail.com | +47 473 41 615</p>
                    <div className="flex items-center justify-between">
                        <div className="flex space-x-6">
                            <SocialLink
                                href="https://www.linkedin.com/in/markuskinn/"
                                icon="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/linkedin.svg"
                                name="LinkedIn"
                            />
                            <SocialLink
                                href="https://github.com/MarkusKinn"
                                icon="https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/github.svg"
                                name="GitHub"
                            />
                        </div>
                        <a
                            href={`/CV-Markus.pdf`}
                            download
                            className="p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none relative group"
                            aria-label="Download Resume"
                        >
                            <div className="absolute inset-0 bg-blue-400 dark:bg-blue-600 rounded-full opacity-75 group-hover:opacity-100 blink-glow"></div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="relative z-10 text-gray-800 dark:text-white"
                            >
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                        </a>
                    </div>
                </header>

                <ProjectsSection>
                    <ProjectItem
                        id="1"
                        title="Automated Foreign Object Debris Detection for Airfields"
                        description="Collaborated with three fellow students and industry partners Avinor and Kongsberg Gruppen on an innovative bachelor project to develop an automated Foreign Object Debris (FOD) detection system. The project utilized high-quality 360-degree video streams from the Remote Tower System to enhance airport safety. Key achievements included testing and validating real-time computer vision algorithms for FOD detection and processing high-resolution 360-degree video streams."
                        technologies={['Computer Vision', 'Machine Learning', 'Python', 'OpenCV', 'Pytorch']}
                        link="https://github.com/yourusername/fod-detection-project"
                        confidential={true}
                    />
                    <ProjectItem
                        id="2"
                        title="YOLOv3 Implementation from Scratch"
                        description="Implemented the YOLOv3 (You Only Look Once version 3) object detection algorithm from scratch in Python. This project involved a deep dive into advanced computer vision techniques and neural network architectures, including building the complex YOLOv3 neural network architecture, implementing the anchor box system and unique grid-based detection approach, and the loss function. The implementation was optimized for performance and validated against established benchmarks."
                        technologies={['Python', 'PyTorch', 'Computer Vision', 'Deep Learning']}
                        link="https://github.com/yourusername/yolov3-from-scratch"
                        image={`/yolov3.jpg`}
                        codeLost={true}
                    />
                    <ProjectItem
                        id="3"
                        title="AlphaGo Zero for Hex"
                        description="Implemented a scaled-down version of the AlphaGo Zero system for the game of Hex. This project successfully adapted the groundbreaking self-play reinforcement learning approach to a different strategic board game. Key achievements include adapting the Monte Carlo Tree Search algorithm, designing a compact neural network for policy and value functions, implementing efficient self-play, and optimizing the architecture for Hex gameplay."
                        technologies={['Python', 'Pytorch(Lightning)', 'Monte Carlo Tree Search', 'Reinforcement Learning']}
                        link="https://github.com/MarkusKinn/AlphaGO"
                        image={`/alphago.jpg`}
                        blogPostId="alphago-zero-hex"
                    />
                    <ProjectItem
                        id="4"
                        title="AR Configuration System for Oil & Gas Christmas Trees"
                        description="Developed an innovative Augmented Reality (AR) configuration system for oil and gas Christmas trees during a summer internship. Using Meta Quest 3 headsets and Unity, we created an immersive and interactive experience for configuring complex equipment. The system features real-time visualization of changes, and integration with component specifications. This project aims to help the sales and configuration process, reducing misunderstandings and improving efficiency in the oil and gas industry."
                        technologies={['Unity', 'C#', 'Augmented Reality', 'Meta Quest 3']}
                        confidential={true}
                    />
                    <ProjectItem
                        id="5"
                        title="C++ Implementation of SAHI for High-Resolution Image Processing"
                        description="Developed a C++ implementation of SAHI (Slicing Aided Hyper Inference), an advanced technique for processing high-resolution images in deep learning models. This project addressed the challenge of maintaining detail and accuracy when working with large images in object detection tasks. The implementation includes efficient image slicing, tile management, result aggregation, enabling the processing of high-resolution images without compromising on detail or accuracy."
                        technologies={['C++', 'Computer Vision', 'Deep Learning', 'Image Processing']}
                        link="https://github.com/MarkusKinn/SAHI"
                        image={`/sahi.png`}
                        blogPostId="sahi-object-detection"
                    />
                    <ProjectItem
                        id="6"
                        title="Basic Deep Learning Framework in C++"
                        description="Developed a basic deep learning framework from scratch in C++, implementing core components such as neural network architectures, backpropagation, optimization algorithms, and loss functions. This project demonstrated a comprehensive understanding of neural network principles and advanced C++ programming, serving as both a learning tool and a showcase of technical skills in deep learning and software development."
                        technologies={['C++', 'Deep Learning', 'Neural Networks', 'Backpropagation', 'Optimization Algorithms']}
                        link="https://github.com/yourusername/cpp-deep-learning-framework"
                        codeLost={true}
                    />
                    <ProjectItem
                        id="7"
                        title="AR Application for Understanding Neural Networks"
                        description="Developed an innovative Augmented Reality (AR) application designed to visualize and interact with neural networks in real-time. This educational tool allows users to build, train, and observe neural networks in an immersive 3D environment. Key features include the ability to add or remove layers, visualize data flow through the network and observe the training process in real-time. The application aims to bridge the gap between theoretical knowledge and practical understanding of neural network principles."
                        technologies={['Unity', 'C#', 'AR Foundation', 'Machine Learning', 'Neural Networks', 'Augmented Reality']}
                        link="https://github.com/MarkusKinn/ARNNVisualizer"
                        blogPostId="ar-neural-network"
                    />
                    <ProjectItem
                        id="8"
                        title="Homework Management Tool (Canvas Replacement)"
                        description="Developed a comprehensive homework management system as an alternative to Canvas, designed to streamline academic workflows for both students and educators. This tool integrates seamlessly with various educational APIs to provide a centralized platform for assignment tracking, submission, and grading. Key features include automated deadline reminders, customizable course organization, real-time grade calculations, and an intuitive interface for managing multiple classes and projects simultaneously."
                        technologies={['Python', 'Django', 'REST APIs', 'SQLite']}
                        link="https://github.com/Markuski2023/HomeworkManagement"
                    />
                    <ProjectItem
                        id="9"
                        title="Interactive Portfolio Website"
                        description="Designed and developed a dynamic, responsive portfolio website to showcase my projects, skills, and professional experience. This modern web application features a clean, user-friendly interface with dark mode support, an interactive timeline of academic achievements, and a built-in blog system. Key features include a customizable project showcase, an detailed CV section with expandable items, and seamless integration with external platforms like GitHub and LinkedIn."
                        technologies={['React', 'JavaScript', 'Tailwind CSS', 'Responsive Design', 'GitHub']}
                        link="https://github.com/MarkusKinn/portfolio-website"
                    />
                </ProjectsSection>


                <Section title="Experience">
                    <ExperienceItem
                        title="Chief Engineer"
                        company="Ascend NTNU"
                        date="April 2024 - Present"
                        overview="Lead four technical groups in the development of autonomous drones, overseeing a team of 28 engineers in a cutting-edge student organization focused on aerial robotics. Responsible for driving innovation, ensuring technical excellence, and fostering collaboration across multidisciplinary teams to achieve ambitious project goals."
                        highlights={[
                            "Coordinate efforts across technical groups to ensure seamless integration of work on autonomous drones",
                            "Set strategic goals and manage project timelines in collaboration with the Deputy Chief Engineer",
                            "Maintain high standards of technical excellence across all projects and teams",
                            "Represent Ascend NTNU in technical discussions with sponsors and at international competitions"
                        ]}
                        technologies={["Team leadership", "Strategic planning", "Project management", "Technical oversight", "Coordination", "Agile methodologies", "Autonomous systems"]}
                    />
                    <ExperienceItem
                        title="Software Engineer"
                        company="Systek"
                        date="Jun 2024 - Aug 2024"
                        overview="Worked as a consultant in a team of three students to develop an innovative AR Configuration System for oil and gas Christmas trees, utilizing Unity, C#, and Meta Quest 3 technologies. This project aimed to shorten the configuration process in the oil and gas industry by leveraging AR capabilities."
                        highlights={[
                            "Created an AR Configuration System that significantly simplified the process and reduced errors compared to traditional methods",
                            "Collaborated effectively within a small team to deliver a complex project within a tight summer internship timeframe",
                            "Applied AR technologies to solve real-world industrial challenges in the oil and gas sector",
                        ]}
                        technologies={["Unity", "C#", "Git", "GitHub", "Meta Quest 3", "AR Development", "3D Modeling", "UI/UX Design"]}
                    />
                    <ExperienceItem
                        title="Perception Engineer"
                        company="Ascend NTNU"
                        date="Sep 2023 - Aug 2024"
                        overview="Served as a member of the Perception team, focusing on transforming sensor input into valuable insights about the drone's surroundings for autonomous navigation and decision-making. Played a crucial role in developing advanced computer vision algorithms and integrating various sensors to enhance the drone's situational awareness."
                        highlights={[
                            "Developed and fine-tuned custom deep learning models for real-time object detection and classification",
                            "Implemented synthetic data generation techniques to enhance model training and performance",
                            "Worked extensively with ROS2, various sensors, and Nvidia Jetson Orin NX for efficient on-board processing",
                            "Optimized perception algorithms to meet strict real-time performance requirements on embedded systems",
                        ]}
                        technologies={["Python", "C++", "Deep learning", "PyTorch", "Ultralytics", "Blender", "ROS2", "OpenCV", "Linux", "CAD", "Sensor fusion", "Embedded systems"]}
                    />
                    <ExperienceItem
                        title="Machine Learning Intern"
                        company="Europris"
                        date="Aug 2022 - Dec 2022"
                        overview="Engaged in an internship focused on applying machine learning techniques to time series data, contributing to data-driven decision making processes within the company. Worked on projects aimed at improving inventory management and sales forecasting through advanced data analysis and predictive modeling."
                        highlights={[
                            "Worked with various machine learning algorithms specialized for time series data analysis",
                            "Conducted extensive data preprocessing, cleaning, and preparation to ensure robust model training",
                            "Utilized Databricks platform for efficient large-scale data processing and model deployment",
                        ]}
                        technologies={["Machine learning", "Databricks", "Data preprocessing", "Python", "SQL", "Git", "GitHub", "Time series analysis", "Data visualization"]}
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
            </div>

            <div className="container mx-auto px-4 max-w-6xl">
                <SkillsSection/>
                <Section title="Academic CourseSection" ref={timelineSectionRef}>
                    <CourseSection/>
                </Section>

                <Section title="References">
                    <p className="mb-6 text-lg text-gray-700 dark:text-gray-300">
                        References will be provided upon request.
                    </p>
                </Section>
            </div>
        </div>
    );
}

export default CV;