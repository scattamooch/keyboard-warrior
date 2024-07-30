import React, { useState, useEffect } from 'react';
import Sound from "react-sound";
import beep from "../assets/sounds/beep-07a.mp3";
import '../styles/Competitive.css';

function CompetitiveMode({ results, updateResults }) {
    const [keybinds, setKeybinds] = useState([]);
    const [currentBind, setCurrentBind] = useState('');
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

    useEffect(() => {
        if (keybinds.length > 0 && gameStarted) {
            initializeBinds();
        }
    }, [keybinds, gameStarted]);

    const initializeBinds = () => {
        const current = keybinds[0].bind;
        setCurrentBind(current);
        setStartTime(Date.now());
    };

    const updateBinds = () => {
        const nextBind = keybinds[Math.floor(Math.random() * keybinds.length)].bind;
        setCurrentBind(nextBind);
        setStartTime(Date.now());
    };

    const handleStartClick = () => {
        if (!keybinds || keybinds.length === 0) {
            window.alert('Sorry, there seems to be an error at the moment. Please try again in a few moments.');
        } else {
            setCountdownStarted(true);
            setTimeLeft(30);
            setScore(0);
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
        initializeBinds();
        window.addEventListener('keydown', handleKeyPress);
    };

    useEffect(() => {
        if (timeLeft === 0) {
            setGameStarted(false);
            window.removeEventListener('keydown', handleKeyPress);
        }
    }, [timeLeft]);

    const handleKeyPress = (e) => {
        e.preventDefault();
        const keybind = formatKeybind(e);
        console.log(`Pressed keybind: ${keybind}`);
        console.log(`Expected keybind: ${currentBind}`);
        if (keybind === currentBind) {
            const endTime = Date.now();
            const reactionTime = (endTime - startTime) / 1000;
            updateResults([...results, { bind: currentBind, time: reactionTime }]);
            setScore(prevScore => prevScore + 1);
            updateBinds();
        }
    };

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

    return (
        <div className="top-container">
            {!gameStarted && <button className="start-button" onClick={handleStartClick}>
                Begin
            </button>}
            <div className={`competitive-mode ${!gameStarted ? '' : 'visible'}`}>
                <div>Time Left: {timeLeft}s</div>
                <div>Current Keybind: {currentBind}</div>
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