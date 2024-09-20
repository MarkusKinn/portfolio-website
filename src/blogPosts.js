export const blogPosts = [
    {
        id: 'alphago-zero-hex',
        title: 'Implementing AlphaGo Zero for HEX: A Deep Dive into Reinforcement Learning',
        date: '2024-03-15',
        summary: 'An exploration of implementing AlphaGo Zero for the game of HEX, discussing the challenges and insights gained.',
        content: () => import('./BlogPosts/AlphaGoZeroHex'),
    },
    {
        id: 'ar-neural-network',
        title: 'Augmented Reality for understanding Neural Networks',
        date: '2024-09-20',
        summary: 'An innovative AR application visualizing neural networks in 3D, enabling real-time interaction and enhancing understanding of AI concepts.',
        content: () => import('./BlogPosts/ARNeuralNetwork'),
    },

];