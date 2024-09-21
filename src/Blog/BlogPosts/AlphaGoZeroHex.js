import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

const AlphaGoZeroHex  = () => {
    return (
        <article className="max-w-3xl mx-auto px-4 py-8 text-gray-800 dark:text-gray-200">
            <h1 className="text-3xl font-bold mb-6">Implementing AlphaGo Zero for HEX: A Deep Dive into Reinforcement Learning</h1>

            <section className="mb-8">
                <p>My journey of implementing AlphaGo Zero for the game of HEX has been an enlightening exploration into the depths of reinforcement learning and game AI. This project not only challenged my understanding of advanced AI algorithms but also pushed me to adapt these techniques to a game with fundamentally different mechanics from Go. In this blog post, I'll delve into the technical intricacies of my implementation, discussing the core components, challenges faced, and insights gained.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">The Essence of AlphaGo Zero</h2>
                <p>At its core, AlphaGo Zero is a revolutionary reinforcement learning algorithm that achieves superhuman performance without any prior domain knowledge. It learns purely through self-play, using a deep neural network and Monte Carlo Tree Search (MCTS) to improve its play iteratively.</p>
                <p className="mt-4">The key innovation of AlphaGo Zero lies in its ability to learn tabula rasa - from a blank slate. Unlike its predecessors, it doesn't rely on human expert moves or hand-crafted features. Instead, it starts with random play and progressively improves by playing against itself and learning from the outcomes.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Neural Network Architecture</h2>
                <p>The neural network is the brain of AlphaGo Zero, serving dual purposes: policy prediction and value estimation. For my HEX implementation, I designed a convolutional neural network with residual blocks, adapting it to the hexagonal structure of the HEX board.</p>
                <p className="mt-4">The network takes as input a 3D tensor representing the game state, where each channel represents a different aspect of the board (player stones, opponent stones, empty spaces). It then processes this input through several convolutional layers and residual blocks, before splitting into two heads:</p>
                <ol className="list-decimal pl-6 mt-2">
                    <li><strong>Policy Head:</strong> Outputs a probability distribution <InlineMath>p</InlineMath> over all possible moves. This is represented as a vector where each element <InlineMath>p_i</InlineMath> is the probability of making move <InlineMath>i</InlineMath>.</li>
                    <li><strong>Value Head:</strong> Outputs a scalar <InlineMath>v \in [-1, 1]</InlineMath> estimating the expected outcome of the game from the current position. A value close to 1 indicates a high likelihood of winning, while a value close to -1 suggests a likely loss.</li>
                </ol>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Monte Carlo Tree Search (MCTS)</h2>
                <p>MCTS is the engine that drives AlphaGo Zero's decision-making process. It builds a search tree, using the neural network to guide its growth and evaluate positions. The MCTS algorithm in AlphaGo Zero consists of four stages:</p>
                <ol className="list-decimal pl-6 mt-4">
                    <li><strong>Selection:</strong> Starting from the root, the algorithm recursively selects child nodes according to the Upper Confidence Bound (UCB) formula:
                        <BlockMath>{"UCB(s,a) = Q(s,a) + c_{puct}P(s,a)\\frac{\\sqrt{\\sum_b N(s,b)}}{1 + N(s,a)}"}</BlockMath>
                        Where <InlineMath>Q(s,a)</InlineMath> is the mean action value, <InlineMath>P(s,a)</InlineMath> is the prior probability given by the policy network, <InlineMath>{"N(s,a)"}</InlineMath> is the visit count, and <InlineMath>{"c_{puct}"}</InlineMath> is an exploration constant.</li>
                    <li><strong>Expansion:</strong> When a leaf node is reached, the neural network is used to evaluate the position, providing both <InlineMath>P(s,a)</InlineMath> and <InlineMath>v</InlineMath> for the new node.</li>
                    <li><strong>Simulation:</strong> Unlike traditional MCTS, AlphaGo Zero doesn't perform random rollouts. Instead, it uses the value <InlineMath>v</InlineMath> from the neural network as an estimate of the position's value.</li>
                    <li><strong>Backpropagation:</strong> The value <InlineMath>v</InlineMath> is propagated back up the tree, updating <InlineMath>N(s,a)</InlineMath> and <InlineMath>Q(s,a)</InlineMath> for each traversed edge.</li>
                </ol>
                <p className="mt-4">In my implementation, I introduced virtual loss and lock-free parallelism to improve the efficiency of MCTS, allowing for multiple simulations to be run concurrently.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Self-Play and Training Loop</h2>
                <p>The learning process in AlphaGo Zero is an iterative cycle of self-play, training, and evaluation:</p>
                <ol className="list-decimal pl-6 mt-2">
                    <li><strong>Self-Play:</strong> The current best network plays against itself, using MCTS to select moves. Each game generates a dataset of (state, improved policy, outcome) tuples.</li>
                    <li><strong>Training:</strong> The neural network is updated using the data from self-play games. I used stochastic gradient descent with momentum, applying techniques like learning rate annealing and gradient clipping for stability.</li>
                    <li><strong>Evaluation:</strong> The newly trained network plays against the current best network. If it wins significantly more than 55% of games, it becomes the new best network.</li>
                </ol>
                <p className="mt-4">I implemented a replay buffer to store the most recent self-play games, using prioritized experience replay to sample more important positions more frequently during training. This helped to stabilize learning and improved data efficiency.</p>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Adapting to HEX: Challenges and Solutions</h2>
                <p>Adapting AlphaGo Zero to HEX presented several unique challenges:</p>
                <ul className="list-disc pl-6 mt-2">
                    <li><strong>Board Representation:</strong> I implemented an efficient bitboard representation for the hexagonal grid, allowing for fast move generation and win checking. Each player's stones were represented as a bitset, with clever bit manipulations used to check for winning connections.</li>
                    <li><strong>MCTS Adaptation:</strong> The exploration-exploitation balance in MCTS needed careful tuning for HEX. I implemented a dynamic temperature parameter that started high (encouraging exploration) and decreased over the course of the game (focusing on exploitation).</li>
                </ul>
            </section>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Results and Insights</h2>
                <p>My AlphaGo Zero implementation for HEX demonstrated remarkable learning capabilities:</p>
                <ul className="list-disc pl-6 mt-2">
                    <li>Starting from random play, it quickly learned basic HEX strategies like building strong connections and blocking opponent's paths.</li>
                    <li>It displayed advanced decision making on a 7x7 board.</li>
                    <li>Due to the neural network's size, the self-play was very tedious, making it close to impossible to use the model for a board size greater than 7x7.</li>
                </ul>
                <p className="mt-4">Perhaps the most fascinating aspect was watching the AI's play style evolve. It transitioned from making seemingly random moves to developing a distinctive style that often involved setting up complex, long-term strategies that were not immediately obvious to human observers.</p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-4">Conclusion and Future Directions</h2>
                <p>Implementing AlphaGo Zero for HEX has been a profound journey into the capabilities of modern AI. It has demonstrated that the principles behind AlphaGo Zero are indeed generalizable to other games, even those with fundamentally different structures from Go.</p>
                <p className="mt-4">Looking forward, there are several exciting directions to explore:</p>
                <ul className="list-disc pl-6 mt-2">
                    <li>Investigating more efficient neural network architectures, possibly incorporating attention mechanisms to better capture the connectivity aspects of HEX.</li>
                    <li>Exploring transfer learning techniques to quickly adapt the trained model to different board sizes or even to other connection games.</li>
                    <li>Implement a more efficient MCTS using multi-threading to better utilize the CPU.</li>
                </ul>
                <p className="mt-4">This project has not only resulted in a strong HEX AI but has also deepened my understanding of reinforcement learning and game AI in general. It stands as a testament to the power of self-play learning and the potential of AI to master complex strategic domains.</p>
            </section>
        </article>
    );
};

export default AlphaGoZeroHex;
