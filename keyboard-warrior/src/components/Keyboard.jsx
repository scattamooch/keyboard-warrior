import React, { useState, useEffect } from 'react';
import '../styles/Keyboard.css';

const keys = [
  ['Esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'],
  ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '<--'],
  ['Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\'],
  ['Caps Lock', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', 'Enter'],
  ['Shift (L)', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', 'Shift (R)'],
  ['Ctrl (L)', 'Win', 'Alt (L)', 'Space', 'Alt (R)', 'Menu', 'Ctrl (R)'],
];

const numpadKeys = [
  ['Num Lock', '/', '*', '-'],
  ['7', '8', '9', '+'],
  ['4', '5', '6', ""],
  ['1', '2', '3', 'Enter'],
  ["", '0', '.', ""]
];

const specialKeyMap = {
  'BACKSPACE': '<--',
  ' ': 'Space',
  'ESCAPE': 'Esc',
  'CAPSLOCK': 'Caps Lock',
  'TAB': 'Tab',
  'SHIFT': { 'LEFT': 'Shift (L)', 'RIGHT': 'Shift (R)' },
  'CONTROL': { 'LEFT': 'Ctrl (L)', 'RIGHT': 'Ctrl (R)' },
  'ALT': { 'LEFT': 'Alt (L)', 'RIGHT': 'Alt (R)' },
  'ENTER': 'Enter',
  'META': 'Win',
  'NUMPADENTER': 'Enter',
  'NUMPADADD': '+',
  'NUMPADSUBTRACT': '-',
  'NUMPADMULTIPLY': '*',
  'NUMPADDIVIDE': '/',
  'NUMLOCK': 'Num Lock',
  'NUMPAD0': '0',
  'NUMPAD1': '1',
  'NUMPAD2': '2',
  'NUMPAD3': '3',
  'NUMPAD4': '4',
  'NUMPAD5': '5',
  'NUMPAD6': '6',
  'NUMPAD7': '7',
  'NUMPAD8': '8',
  'NUMPAD9': '9'
};

const Keyboard = () => {
  
  const [pressedKeys, setPressedKeys] = useState({});

  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    const location = event.location;
    let mappedKey;

    if (specialKeyMap[key]) {
      if (typeof specialKeyMap[key] === 'object') {
        mappedKey = specialKeyMap[key][location === 1 ? 'LEFT' : 'RIGHT'];
      } else {
        mappedKey = specialKeyMap[key];
      }
    } else {
      mappedKey = key;
    }

    if (['TAB', 'SPACE', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'alt', "Ctrl", "shift"].includes(key)) {
      event.preventDefault();
    }

    setPressedKeys((prev) => ({ ...prev, [mappedKey]: true }));
  };

  const handleKeyUp = (event) => {
    const key = event.key.toUpperCase();
    const location = event.location;
    let mappedKey;

    if (specialKeyMap[key]) {
      if (typeof specialKeyMap[key] === 'object') {
        mappedKey = specialKeyMap[key][location === 1 ? 'LEFT' : 'RIGHT'];
      } else {
        mappedKey = specialKeyMap[key];
      }
    } else {
      mappedKey = key;
    }

    setPressedKeys((prev) => ({ ...prev, [mappedKey]: false }));
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div className="keyboard-container">
      <div className="keyboard">
        {keys.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="keyboard-row">
            {row.map((key, keyIndex) => (
              <div
                key={`${rowIndex}-${keyIndex}`}
                className={`keyboard-key ${pressedKeys[key] ? 'pressed' : ''}`}
              >
                {key}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="numpad">
        {numpadKeys.map((row, rowIndex) => (
          <div key={`numpad-row-${rowIndex}`} className="keyboard-row">
            {row.map((key, keyIndex) => (
              <div
                key={`${rowIndex}-${keyIndex}`}
                className={`keyboard-key ${pressedKeys[key] ? 'pressed' : ''}`}
              >
                {key}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};  

export default Keyboard;