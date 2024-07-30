import React, { useState, useEffect } from 'react';
import '../styles/HelpModal.css';

function HelpModal({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <div className="modal-body">
          <h2>Welcome to keyboard warrior. Here's how to get started:</h2>
          <ol className='help-list'>
          <li className="help-item">Press "Start Recording" and enter whatever binds you'd like to practice</li>
          <li className="help-item">Press "Stop Recording" when you're finished. Press "Test me" when you're ready to begin practicing</li>
          <li className="help-item">There will be a short timer, ending with 3 beeps, to begin the test</li>
          <li className="help-item">The timer at the top will track your reaction time to each bind. You can stop the test at any time</li>
          <li className="help-item">"Reset Binds" will clear your binds as needed, or you can remove them individually in the recording window</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default HelpModal;