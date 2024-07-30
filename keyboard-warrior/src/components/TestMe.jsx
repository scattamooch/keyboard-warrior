import React, { useState, useEffect } from 'react';
import Sound from "react-sound";
import beep from "../assets/sounds/beep-07a.mp3";
import '../styles/TestMe.css';

function TestMe({ keybinds, updateKeybinds, updateResults }) {
    const [currentKeybind, setCurrentKeybind] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [times, setTimes] = useState([]);
    const [countdown, setCountdown] = useState(3);
    const [isTesting, setIsTesting] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [playSound, setPlaySound] = useState(false)
  
    useEffect(() => {
      if (keybinds.length > 0) {
        selectRandomKeybind();
      }
    }, [keybinds]);
  
    useEffect(() => {
      let timer;
      if (currentKeybind && isTesting) {
        const handleKeyDown = (event) => {
          event.preventDefault();
          const keybind = formatKeybind(event);
  
          if (keybind === currentKeybind) {
            const endTime = new Date().getTime();
            const timeTaken = (endTime - startTime) / 1000; // in seconds
            setTimes((prevTimes) => [...prevTimes, { keybind, timeTaken }]);
            updateResults((prevTimes) => [...prevTimes, { keybind, timeTaken }])
            selectRandomKeybind();
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
    }, [currentKeybind, startTime, isTesting]);
  
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
  
    const handleClick = () => {
      if (!keybinds || keybinds.length === 0) {
        window.alert('Record some keybinds first!');
      } else {
        setIsTesting(!isTesting);
        if (!isTesting) {
          startCountdown();
        } else {
          setCurrentKeybind('');
          setElapsedTime(0);
        }
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
  
    const selectRandomKeybind = () => {
      const randomIndex = Math.floor(Math.random() * keybinds.length);
      const selectedKeybind = keybinds[randomIndex];
      setCurrentKeybind(selectedKeybind);
      setStartTime(new Date().getTime());
      setElapsedTime(0);
    };
  
    return (

      <div className="top-container">
        <button className="test-me-button" onClick={handleClick}>
          {isTesting ? 'Stop Testing' : 'Test Me'}
        </button>
        <div className={`test-window ${isTesting ? 'visible' : 'invisible'}`}>
          {countdown !== null ? countdown : `Press ${currentKeybind}`}
          {countdown === null && (
            <div className="timer">
              Time: {elapsedTime.toFixed(1)} seconds
            </div>
          )}
        </div>
        {playSound && (
      <Sound
        url={beep}
        playStatus={Sound.status.PLAYING}
        onFinishedPlaying={handleSoundFinishedPlaying}
      />
    )}
      </div>
    );
  }
  
  export default TestMe;