import React, { useState, useEffect } from 'react';
import '../styles/Leaderboard.css';

function Leaderboard({ onClose }) {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/app/leaderboard/')
            .then(response => response.json())
            .then(data => {
                // Sort the data by score in descending order
                const sortedData = data.sort((a, b) => b.score - a.score);
                setLeaderboard(sortedData);
            })
            .catch(error => console.error('Error fetching leaderboard:', error));
    }, []);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>X</button>
                <div className="modal-body">
                    <div className="leaderboard">
                        <h2>Leaderboard</h2>
                        <ol>
                            {leaderboard.map((entry, index) => (
                                <li key={index}>
                                    <span>{entry.name}</span>
                                    <span>{entry.score}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Leaderboard;
