import React, { useState, useEffect, useRef } from 'react';

const courses = [
    { id: 1, name: "Teknologi og samfunn", code: "ITF13019", grade: "Bestått", term: "2020 høst", credits: 10, type: "General" },
    { id: 2, name: "Programmering 1", code: "ITF10219", grade: "B", term: "2020 høst", credits: 10, type: "Software Development" },
    { id: 5, name: "Webutvikling", code: "ITF10511", grade: "C", term: "2020 høst", credits: 10, type: "Software Development" },
    { id: 3, name: "Databasesystemer", code: "ITF10319", grade: "C", term: "2021 vår", credits: 10, type: "Software Development" },
    { id: 4, name: "Programmering 2", code: "ITF10619", grade: "B", term: "2021 vår", credits: 10, type: "Software Development" },
    { id: 15, name: "Innføring i datasikkerhet", code: "ITF15019", grade: "B", term: "2021 vår", credits: 10, type: "Security" },
    { id: 6, name: "Diskret matematikk", code: "ITF10705", grade: "B", term: "2021 høst", credits: 10, type: "Mathematics" },
    { id: 7, name: "Software Engineering og testing", code: "ITF20319", grade: "C", term: "2021 høst", credits: 10, type: "Project" },
    { id: 8, name: "Innføring i operativsystemer", code: "ITF22519", grade: "A", term: "2021 høst", credits: 10, type: "Software Development" },
    { id: 9, name: "Algoritmer og datastrukturer", code: "ITF20006", grade: "C", term: "2022 vår", credits: 10, type: "Software Development" },
    { id: 10, name: "Statistikk og statistisk programmering", code: "ITD20218", grade: "C", term: "2022 vår", credits: 10, type: "Mathematics" },
    { id: 11, name: "Autonome kjøretøy", code: "ITF20521", grade: "B", term: "2022 vår", credits: 10, type: "AI/ML" },
    { id: 12, name: "Kalkulus", code: "ITD15020", grade: "B", term: "2022 høst", credits: 10, type: "Mathematics" },
    { id: 13, name: "Praktisk maskinlæring", code: "ITF31519", grade: "A", term: "2022 høst", credits: 10, type: "AI/ML" },
    { id: 14, name: "Bedriftspraksis", code: "ITD35014", grade: "Bestått", term: "2022 høst", credits: 10, type: "General" },
    { id: 16, name: "Bildeanalyse", code: "ITF31719", grade: "A", term: "2023 vår", credits: 10, type: "AI/ML" },
    { id: 17, name: "Bacheloroppgave", code: "ITF32012", grade: "B", term: "2023 vår", credits: 20, type: "Project" },
    { id: 18, name: "HMS-kurs for 1. årsstudenter 2-årig master", code: "HMS0009", grade: "Bestått", term: "2023 høst", credits: 0, type: "General" },
    { id: 19, name: "Introduksjon til kunstig intelligens", code: "TDT4136", grade: "D", term: "2023 høst", credits: 7.5, type: "AI/ML" },
    { id: 20, name: "Kognitive arkitekturer", code: "TDT4137", grade: "B", term: "2023 høst", credits: 7.5, type: "AI/ML" },
    { id: 21, name: "Maskinlæring", code: "TDT4173", grade: "A", term: "2023 høst", credits: 7.5, type: "AI/ML" },
    { id: 22, name: "Anvendt data science", code: "TDT4259", grade: "A", term: "2023 høst", credits: 7.5, type: "AI/ML" },
    { id: 23, name: "Kunstig intelligens programmering", code: "IT3105", grade: "Bestått", term: "2024 vår", credits: 7.5, type: "AI/ML" },
    { id: 24, name: "Metoder i kunstig intelligens", code: "TDT4171", grade: "C", term: "2024 vår", credits: 7.5, type: "AI/ML" },
    { id: 25, name: "Datasyn og dyp læring", code: "TDT4265", grade: "B", term: "2024 vår", credits: 7.5, type: "AI/ML" },
    { id: 26, name: "Eksperter i team - Biomaterialer og helse", code: "TMT4853", grade: "B", term: "2024 vår", credits: 7.5, type: "Project" },
];

const CourseSection = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showGrades, setShowGrades] = useState(false);

    const groupCoursesByType = (coursesToGroup) => {
        const grouped = {};
        coursesToGroup.forEach(course => {
            if (!grouped[course.type]) {
                grouped[course.type] = [];
            }
            grouped[course.type].push(course);
        });
        return Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0]));
    };

    const renderCourse = (course) => (
        <div
            key={course.id}
            className="mb-4 p-4 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-300 hover:shadow-md"
            onMouseEnter={() => setSelectedCourse(course)}
            onMouseLeave={() => setSelectedCourse(null)}
        >
            <h4 className="font-medium text-gray-800 dark:text-gray-200">{course.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{course.code}</p>
            {showGrades && (
                <div className="mt-2 flex justify-between items-center">
                    <span className="px-2 py-1 rounded-full text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        {course.grade}
                    </span>
                </div>
            )}
        </div>
    );

    const FlexibleMasonryLayout = ({ items }) => {
        const containerRef = useRef(null);
        const [columns, setColumns] = useState(3);

        useEffect(() => {
            const updateLayout = () => {
                const containerWidth = containerRef.current?.offsetWidth || 0;
                const newColumns = Math.floor(containerWidth / 300);
                setColumns(Math.max(1, Math.min(3, newColumns)));
            };

            updateLayout();
            window.addEventListener('resize', updateLayout);
            return () => window.removeEventListener('resize', updateLayout);
        }, []);

        const distributeItems = () => {
            const columnHeights = new Array(columns).fill(0);
            const columnContents = new Array(columns).fill(null).map(() => []);

            items.forEach(([groupName, groupCourses]) => {
                const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));
                columnContents[shortestColumnIndex].push([groupName, groupCourses]);
                columnHeights[shortestColumnIndex] += groupCourses.length + 1;
            });

            return columnContents;
        };

        const distributedItems = distributeItems();

        return (
            <div ref={containerRef} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns} gap-6`}>
                {distributedItems.map((column, columnIndex) => (
                    <div key={columnIndex} className="flex flex-col">
                        {column.map(([groupName, groupCourses]) => (
                            <div key={groupName} className="mb-6">
                                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">{groupName}</h3>
                                {groupCourses.map(renderCourse)}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    const groupedCourses = groupCoursesByType(courses);

    return (
        <div className="container mx-auto p-4">
            <div className="mb-6 flex justify-start">
                <button
                    onClick={() => setShowGrades(!showGrades)}
                    className="px-4 py-2 rounded-full text-sm font-medium transition-colors duration-150 ease-in-out
                               border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300
                               hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2
                               focus:ring-offset-2 focus:ring-gray-500 dark:focus:ring-gray-400"
                >
                    {showGrades ? "Hide Grades" : "Show Grades"}
                </button>
            </div>
            <FlexibleMasonryLayout items={groupedCourses}/>
            {selectedCourse && (
                <div
                    className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-10 border border-gray-200 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200">{selectedCourse.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Code: {selectedCourse.code}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Term: {selectedCourse.term}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Credits: {selectedCourse.credits}</p>
                    {showGrades && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">Grade: {selectedCourse.grade}</p>
                    )}
                    <p className="text-sm text-gray-600 dark:text-gray-400">Type: {selectedCourse.type}</p>
                </div>
            )}
        </div>
    );
};

export default CourseSection;