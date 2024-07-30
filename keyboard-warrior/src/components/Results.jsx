import React, { useState, useEffect } from 'react';
import '../styles/Results.css';

function Results({ results, updateResults }) {


    const handleReset = () => {
        updateResults([]);
      };

  return (

    <div className="top-container">
        <div className="button-and-title">
      <h2>Results</h2>
      <button className="reset-button" onClick={handleReset}>Reset Times</button>
      </div>
      <div className="results-container">
      <ul>
        {results.map((result, index) => (
          <li key={index}>
            {result.keybind}: {result.timeTaken} sec
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default Results;