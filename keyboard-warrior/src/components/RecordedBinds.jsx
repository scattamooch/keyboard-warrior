import React, { useState, useEffect } from 'react';
import '../styles/RecordedBinds.css';

function RecordedBinds({ keybinds, updateKeybinds }) {
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (recording) {
        event.preventDefault(); // Prevent default behavior for shortcuts
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
  
        const standaloneModifiers = [
          'ControlLeft', 'ControlRight',
          'ShiftLeft', 'ShiftRight',
          'AltLeft', 'AltRight'
        ];
  
        if (!standaloneModifiers.includes(key) && !keybinds.includes(keybind)) {
          updateKeybinds([...keybinds, keybind]);
        }
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
  
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [recording, keybinds, updateKeybinds]);
  

  const toggleRecording = () => {
    setRecording((prevRecording) => !prevRecording);
  };

  const handleReset = () => {
    updateKeybinds([]);
  };

  return (
    <div className="recorded-binds">
      <div className="top-buttons-container">
        <button onClick={toggleRecording}>
          {recording ? 'Stop Recording' : 'Start Recording'}
        </button>
        <button onClick={handleReset}>Reset Binds</button>
      </div>
      <div
        className="keybinds-container"
        style={{ outline: recording ? '3px solid red' : '' }}
      >
        {keybinds.map((keybind, index) => (
          <div key={index} className="keybind">
            {keybind}
            <button
              className="delete-bind"
              onClick={() => updateKeybinds(keybinds.filter((_, i) => i !== index))}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecordedBinds;
