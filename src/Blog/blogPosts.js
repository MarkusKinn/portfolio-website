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
    {
        id: 'sahi-object-detection',
        title: 'SAHI: Revolutionizing Small Object Detection',
        date: '2024-09-22',
        summary: 'An exploration of Slicing Aided Hyper Inference (SAHI), a cutting-edge technique that enhances object detection in large images by intelligently processing image slices and combining results.',
        content: () => import('./BlogPosts/SAHI'),
    },

];