import React, { useState, useRef, useEffect } from 'react';
import '../styles/SubmitScore.css';

function SubmitScoreModal({ onClose, score }) {
  const [initials, setInitials] = useState(["", "", ""]);
  const [showWarning, setShowWarning] = useState(false);
  const inputRefs = [useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    inputRefs[0].current.focus(); // Set focus to the first input field on mount
  }, []);

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newInitials = [...initials];
      newInitials[index] = value.toUpperCase();
      setInitials(newInitials);

      // Move to the next input if current one is filled
      if (value.length === 1 && index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (initials.every(letter => letter.length === 1)) {
      const name = initials.join('');
      try {
        const response = await fetch('http://localhost:8000/app/leaderboard/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name, score })
        });
        if (response.ok) {
          console.log("Score submitted successfully");
          onClose(); // Make sure onClose is defined and works
        } else {
          alert("Failed to submit the score.");
        }
      } catch (error) {
        alert("Error submitting score: " + error.message);
      }
    } else {
      alert("Please enter exactly 3 initials.");
    }
  };

  const handleOverlayClick = (e) => {
    e.stopPropagation(); // This stops the click from bubbling up to modal-overlay
    if (initials.some(letter => letter.trim())) {
      setShowWarning(true);
    } else {
      console.log("Closing modal with no name entered"); // Debug log
      onClose(); // Debug: Check if this function is called
    }
  };

  const handleCloseClick = (e) => {
    e.stopPropagation(); // This stops the click from bubbling up to modal-overlay
    if (initials.some(letter => letter.trim())) {
      setShowWarning(true);
    } else {
      console.log("Closing modal with no name entered"); // Debug log
      onClose(); // Debug: Check if this function is called
    }
  };

  const handleWarningClose = (confirm) => {
    setShowWarning(false);
    if (confirm) {
      console.log("User confirmed to close"); // Debug log
      onClose();
    }
  };

  return (
    <div className="submit-modal-overlay" onClick={handleOverlayClick}>
      <div className="submit-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={handleCloseClick}>X</button>
        <div className="submit-modal-body">
          <h2>Your Score: {score}</h2>
          <form onSubmit={handleSubmit} className="initials-form">
            {initials.map((letter, index) => (
              <input
                key={index}
                type="text"
                value={letter}
                onChange={(e) => handleChange(index, e.target.value)}
                maxLength="1"
                ref={inputRefs[index]}
                className="initials-input"
              />
            ))}
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </div>
      {showWarning && (
        <div className="warning-overlay" onClick={(e) => e.stopPropagation()}>
          <div className="warning-modal">
            <h4>Are you sure you want to close?</h4>
            <p>Your score will not be saved.</p>
            <button onClick={() => handleWarningClose(true)}>Yes, Close</button>
            <button onClick={() => handleWarningClose(false)}>No, Go Back</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SubmitScoreModal;