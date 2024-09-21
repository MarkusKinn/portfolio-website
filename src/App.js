import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './Blog/BlogList';
import BlogPost from './Blog/BlogPost';
import Navigation from "./Navigation/Navigation";
import CV from "./Section/CV";

const globalStyles = `
  html {
    overflow-y: scroll;
  }

  body {
    width: calc(100vw - var(--scrollbar-width));
    overflow-x: hidden;
    min-height: 100vh;
  }

  :root {
    --scrollbar-width: 0px;
  }
`;

function App() {
    const [darkMode, setDarkMode] = useState(() => {
        const savedMode = localStorage.getItem('darkMode');
        return savedMode !== null ? JSON.parse(savedMode) : false;
    });
    const [showTimeline, setShowTimeline] = useState(false);
    const [fadeIn, setFadeIn] = useState(false);
    const timelineSectionRef = useRef(null);

    useEffect(() => {
        // Calculate scrollbar width and set it as a CSS variable
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);

        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('darkMode', JSON.stringify(darkMode));

        const timer = setTimeout(() => setFadeIn(true), 100);
        return () => clearTimeout(timer);
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(prevMode => !prevMode);
    };

    const handleTimelineToggle = () => {
        setShowTimeline(prev => !prev);
    };

    useEffect(() => {
        if (showTimeline && timelineSectionRef.current) {
            timelineSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [showTimeline]);

    return (
        <Router>
            <style>{globalStyles}</style>
            <div className={`flex flex-col min-h-screen ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
                <Navigation
                    darkMode={darkMode}
                    toggleDarkMode={toggleDarkMode}
                    handleTimelineToggle={handleTimelineToggle}
                />
                <main className={`flex-grow pt-16 transition-opacity duration-1000 ease-in-out ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
                    <Routes>
                        <Route path="/" element={<CV showTimeline={showTimeline} timelineSectionRef={timelineSectionRef} />} />
                        <Route path="/blog" element={<BlogList />} />
                        <Route path="/blog/:id" element={<BlogPost />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;