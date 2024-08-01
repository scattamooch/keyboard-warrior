import React, { useState, useEffect } from 'react';
import '../styles/ComingSoon.css';

function ComingSoonModal({ onClose }) {

  return (

    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <div className="modal-body">
            <h2 className="soon-header">In the works:</h2>
            <ol className="coming-soon">
                <li className="soon-item">
                    Finish filling out keybind database(s)
                </li>
                <li className="soon-item">
                    Keybind practice for specific games. Pick a game and the trainer will tailor itself to that specific game. Ex: World of Warcraft, choose a class and that class' 
                    spellbook will be imported. You can bind the spells to specific keybinds, and rather than being tested on the binds, you'll be tested via spell tooltip icons.
                    Should work for RTS and MOBA games as well.
                </li>
                <li className="soon-item">
                    Fixes for the ever-expanding bug list
                </li>
                <li className="soon-item">
                    Multiple difficulties for competitive. Number/complexity of binds will scale up with difficulty, but will also award more points.
                </li>
            </ol>
        </div>
      </div>
    </div>
  );
}

export default ComingSoonModal;