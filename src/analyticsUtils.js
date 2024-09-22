const ANALYTICS_KEY = 'user_interactions';

export const trackEvent = (eventName) => {
    const currentData = JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '{}');
    currentData[eventName] = (currentData[eventName] || 0) + 1;
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(currentData));
};

export const getAnalyticsData = () => {
    return JSON.parse(localStorage.getItem(ANALYTICS_KEY) || '{}');
};