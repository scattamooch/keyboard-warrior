import React, { useState, useEffect } from 'react';
import Sound from "react-sound";
import beep from "../assets/sounds/beep-07a.mp3";
import '../styles/Competitive.css';

function CompetitiveMode({ results, updateResults, onGameEnd }) {
    const [keybinds, setKeybinds] = useState([]);
    const [currentKeybind, setCurrentKeybind] = useState('');
    const [elapsedTime, setElapsedTime] = useState(0);
    const [times, setTimes] = useState([]);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [gameStarted, setGameStarted] = useState(false);
    const [countdownStarted, setCountdownStarted] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [playSound, setPlaySound] = useState(false);
    const [startTime, setStartTime] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/app/keybinds/')
            .then(response => response.json())
            .then(data => setKeybinds(data));
    }, []);

    useEffect(() => {
        if (!gameStarted || timeLeft === 0) return;

        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [gameStarted, timeLeft]);

    const formatKeybind = (event) => {
        let key = event.code;
        let keybind = '';
    
        if (event.ctrlKey && key !== 'ControlLeft' && key !== 'ControlRight') {
            keybind += 'ctrl + ';
        }
        if (event.shiftKey && key !== 'ShiftLeft' && key !== 'ShiftRight') {
            keybind += 'shift + ';
        }
        if (event.altKey && key !== 'AltLeft' && key !== 'AltRight') {
            keybind += 'alt + ';
        }
    
        keybind += key.replace('Key', '').replace('Digit', '');
        return keybind;
    };

    const selectRandomKeybind = () => {
        const randomIndex = Math.floor(Math.random() * keybinds.length);
        const selectedKeybind = keybinds[randomIndex];
        setCurrentKeybind(selectedKeybind.bind);
        setStartTime(new Date().getTime());
        setElapsedTime(0);
    };

    useEffect(() => {
        let timer;
        if (currentKeybind && gameStarted) {
            const handleKeyDown = (event) => {
                event.preventDefault();
                if (event.key === 'Control' || event.key === 'Shift' || event.key === 'Alt') {
                    return;
                }
                const keybind = formatKeybind(event);
                console.log("Keypressed: ", keybind)
    
                if (keybind === currentKeybind) {
                    const endTime = new Date().getTime();
                    const timeTaken = (endTime - startTime) / 1000; //
                    setTimes((prevTimes) => [...prevTimes, { keybind, timeTaken }]);
                    updateResults((prevTimes) => [...prevTimes, { keybind, timeTaken }])
                    setScore(prevScore => prevScore + 30);
                    selectRandomKeybind();
                } else if (score > 0) {
                    setScore(prevScore => Math.max(prevScore - 10, 0));
                }
            };
    
            timer = setInterval(() => {
                setElapsedTime((prevTime) => prevTime + 0.1);
            }, 100);
    
            window.addEventListener('keydown', handleKeyDown);
    
            return () => {
                clearInterval(timer);
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
    
        return () => clearInterval(timer);
    }, [currentKeybind, startTime, gameStarted]);

    const handleStartClick = () => {
        if (!keybinds || keybinds.length === 0) {
            window.alert('Sorry, there seems to be an error at the moment. Please try again in a few moments.');
        } else {
            setCountdownStarted(true);
            setTimeLeft(5);
            setScore(0);
            updateResults([]);
            startCountdown();
        }
    };

    const startCountdown = () => {
        let countdownValue = 4;
        setCountdown(countdownValue);
        const countdownInterval = setInterval(() => {
            countdownValue -= 1;
            setCountdown(countdownValue);
            if (countdownValue === 3 || countdownValue === 2 || countdownValue === 1) {
                setPlaySound(true);
            }
            if (countdownValue === 0) {
                clearInterval(countdownInterval);
                setCountdown(null);
                setGameStarted(true);
                startTest();
            }
        }, 1000);
    };

    const handleSoundFinishedPlaying = () => {
        setPlaySound(false);
    };

    const startTest = () => {
        selectRandomKeybind();
    };

    useEffect(() => {
        if (timeLeft === 0 && gameStarted) {
            setGameStarted(false);
            onGameEnd(score); 
        }
    }, [timeLeft, score, onGameEnd, gameStarted]);

    return (
        
        <div className="top-container">
            {!gameStarted && <button className="start-button" onClick={handleStartClick}>
                Begin
            </button>}
            <div className={`competitive-mode ${!gameStarted ? '' : 'visible'}`}>
                <div>Time Left: {timeLeft}s</div>
                <div>Current Keybind: {currentKeybind}</div>
                <div>Score: {score}</div>
            </div>
            {playSound && (
                <Sound
                    url={beep}
                    playStatus={Sound.status.PLAYING}
                    onFinishedPlaying={handleSoundFinishedPlaying}
                />
            )}
            <div className={`countdown ${countdownStarted ? 'visible' : ''}`}>
                {countdown !== null ? countdown : ''}
            </div>
        </div>
    );
}

export default CompetitiveMode;
