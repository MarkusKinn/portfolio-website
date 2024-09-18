import React, { useState } from 'react';

const courses = [
    { id: 1, name: "Teknologi og samfunn", code: "ITF13019", grade: "Bestått", term: "2020 høst", credits: 10, type: "General" },
    { id: 2, name: "Programmering 1", code: "ITF10219", grade: "B", term: "2020 høst", credits: 10, type: "Software Development" },
    { id: 5, name: "Webutvikling", code: "ITF10511", grade: "C", term: "2020 høst", credits: 10, type: "Software Development" },
    { id: 3, name: "Databasesystemer", code: "ITF10319", grade: "C", term: "2021 vår", credits: 10, type: "Software Development" },
    { id: 4, name: "Programmering 2", code: "ITF10619", grade: "B", term: "2021 vår", credits: 10, type: "Software Development" },
    { id: 15, name: "Innføring i datasikkerhet", code: "ITF15019", grade: "B", term: "2021 vår", credits: 10, type: "Security" },
    { id: 6, name: "Diskret matematikk", code: "ITF10705", grade: "B", term: "2021 høst", credits: 10, type: "Mathematics" },
    { id: 7, name: "Software Engineering og testing", code: "ITF20319", grade: "C", term: "2021 høst", credits: 10, type: "Software Development" },
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

const Timeline = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showGrades, setShowGrades] = useState(false);
    const [orderBy, setOrderBy] = useState('chronological');

    const getTermColor = (term) => {
        const colors = {
            "høst": "bg-orange-200",
            "vår": "bg-green-200"
        };
        return term.includes("høst") ? colors["høst"] : colors["vår"];
    };

    const getGradeColor = (grade) => {
        const colors = {
            "A": "bg-green-500",
            "B": "bg-blue-500",
            "C": "bg-yellow-500",
            "D": "bg-orange-500",
            "E": "bg-red-500",
            "Bestått": "bg-purple-500"
        };
        return colors[grade] || "bg-gray-500";
    };

    const groupCoursesBySemester = (coursesToGroup) => {
        const grouped = {};
        coursesToGroup.forEach(course => {
            if (!grouped[course.term]) {
                grouped[course.term] = [];
            }
            grouped[course.term].push(course);
        });
        return Object.entries(grouped).sort((a, b) => {
            const [termA, termB] = [a[0], b[0]];
            const [yearA, yearB] = [termA.split(' ')[1], termB.split(' ')[1]];
            return yearA === yearB ? (termA.includes('vår') ? -1 : 1) : yearA - yearB;
        });
    };

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

    const groupedCourses = orderBy === 'chronological'
        ? groupCoursesBySemester(courses)
        : groupCoursesByType(courses);

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4 flex justify-center space-x-4">
                <button
                    onClick={() => setShowGrades(!showGrades)}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    {showGrades ? "Hide Grades" : "Show Grades"}
                </button>
                <button
                    onClick={() => setOrderBy(orderBy === 'chronological' ? 'type' : 'chronological')}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                    Order by {orderBy === 'chronological' ? 'Type' : 'Chronological'}
                </button>
            </div>
            <div className="relative">
                {groupedCourses.map(([groupName, groupCourses], groupIndex) => (
                    <div key={groupName} className={`mb-16 ${groupIndex % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} flex`}>
                        <div className={`w-1/4 ${groupIndex % 2 === 0 ? 'text-right pr-4' : 'text-left pl-4'}`}>
                            <h3 className="text-xl font-semibold mb-2">{groupName}</h3>
                        </div>
                        <div className="w-3/4 relative">
                            <div className={`absolute top-0 bottom-0 ${groupIndex % 2 === 0 ? 'left-0' : 'right-0'} w-1 bg-gray-300`}></div>
                            {groupCourses.map((course, index) => (
                                <div
                                    key={course.id}
                                    className={`mb-4 ${groupIndex % 2 === 0 ? 'ml-4' : 'mr-4'}`}
                                    onMouseEnter={() => setSelectedCourse(course)}
                                    onMouseLeave={() => setSelectedCourse(null)}
                                >
                                    <div className={`p-4 rounded-lg shadow-lg ${getTermColor(course.term)} cursor-pointer transition-all duration-300 hover:shadow-xl`}>
                                        <h4 className="font-semibold text-gray-900">{course.name}</h4>
                                        <p className="text-sm text-gray-600">{course.code}</p>
                                        {showGrades && (
                                            <div className="mt-2 flex justify-between items-center">
                        <span className={`px-2 py-1 rounded-full text-white text-sm ${getGradeColor(course.grade)}`}>
                          {course.grade}
                        </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            {selectedCourse && (
                <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-10">
                    <h3 className="font-bold text-gray-900 dark:text-white">{selectedCourse.name}</h3>
                    <p className="text-gray-700 dark:text-gray-300">Code: {selectedCourse.code}</p>
                    <p className="text-gray-700 dark:text-gray-300">Term: {selectedCourse.term}</p>
                    <p className="text-gray-700 dark:text-gray-300">Credits: {selectedCourse.credits}</p>
                    {showGrades && (
                        <>
                            <p className="text-gray-700 dark:text-gray-300">Grade: {selectedCourse.grade}</p>
                        </>
                    )}
                    <p className="text-gray-700 dark:text-gray-300">Type: {selectedCourse.type}</p>
                </div>
            )}
        </div>
    );
};

export default Timeline;