import React, { useState } from "react";
import Keyboard from './components/Keyboard';
import Results from './components/Results';
import RecordedBinds from './components/RecordedBinds';
import TestMe from './components/TestMe';
import HelpModal from "./components/HelpModal";
import BugModal from "./components/BugModal";
import ComingSoonModal from "./components/ComingSoonModal";
import CompetitiveMode from "./components/CompetitiveMode";
import Leaderboard from "./components/Leaderboard";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import './App.css';

function App() {
  const [keybinds, setKeybinds] = useState([]);
  const [results, setResults] = useState([]);
  const [modal, setModal] = useState(false);
  const [bugModal, setBugModal] = useState(false);
  const [soonModal, setSoonModal] = useState(false);
  const [trophyModal, setTrophyModal] = useState(false);
  const [gameMode, setGameMode] = useState(false);

  const HelpIcon = (
    <svg 
      className="help-icon" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      onClick={() => setModal(true)}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
  const ExitIcon = (
    <svg 
    class="help-icon"  
    width="24" height="24" 
    viewBox="0 0 24 24" 
    stroke-width="2" 
    stroke="currentColor" 
    fill="none" 
    stroke-linecap="round" 
    stroke-linejoin="round"
    onClick={() => setModal(false)}
    >  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="18" y1="6" x2="6" y2="18" />  <line x1="6" y1="6" x2="18" y2="18" /></svg>
  );
  const BugIcon =(
    <svg 
      class="bug-icon"  
      width="24" height="24" viewBox="0 0 24 24" 
      stroke-width="2" stroke="currentColor" 
      fill="none" stroke-linecap="round" 
      stroke-linejoin="round"
      onClick={() => setBugModal(true)}>  
      <path stroke="none" d="M0 0h24v24H0z"/>  
      <path d="M9 9v-1a3 3 0 0 1 6 0v1" />  
      <path d="M8 9h8a6 6 0 0 1 1 3v3a5 5 0 0 1 -10 0v-3a6 6 0 0 1 1 -3" />  
      <line x1="3" y1="13" x2="7" y2="13" />  
      <line x1="17" y1="13" x2="21" y2="13" />  
      <line x1="12" y1="20" x2="12" y2="14" />  
      <line x1="4" y1="19" x2="7.35" y2="17" />  
      <line x1="20" y1="19" x2="16.65" y2="17" />  
      <line x1="4" y1="7" x2="7.75" y2="9.4" />  
      <line x1="20" y1="7" x2="16.25" y2="9.4" />
      </svg>
  );
  const ComingSoon = (
    <svg class="soon-icon"  fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={() => setSoonModal(true)}>
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
</svg>

  );
  const LeaderboardIcon = (
    <svg 
      class="trophy-icon"  
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      stroke-width="2" 
      stroke="currentColor" 
      fill="none" 
      stroke-linecap="round" 
      stroke-linejoin="round"
      onClick={() => setTrophyModal(true)}
      >  
      <path stroke="none" d="M0 0h24v24H0z"/>  
      <line x1="8" y1="21" x2="16" y2="21" />  
      <line x1="12" y1="17" x2="12" y2="21" />  
      <line x1="7" y1="4" x2="17" y2="4" />  
      <path d="M17 4v8a5 5 0 0 1 -10 0v-8" />  
      <circle cx="5" cy="9" r="2" />  
      <circle cx="19" cy="9" r="2" />
    </svg>
  )
  
  const updateKeybinds = (newKeybinds) => {
    setKeybinds(newKeybinds);
  };

  const updateResults = (newResults) => {
    setResults(newResults);
  };

  const handleToggleChange = () => {
    setGameMode(!gameMode);
  };

  return (
    <div className="app-container">
            <div className="top-left-controls">
        <Toggle
          defaultChecked={gameMode}
          icons={false}
          onChange={handleToggleChange}
        />
        <span>{gameMode ? 'Competitive Mode' : 'Training Mode'}</span>
      </div>
      <div className="help-icon-wrapper">
        {ComingSoon}
        {LeaderboardIcon}
        {BugIcon}
        {HelpIcon}
      </div>
      {modal && <HelpModal onClose ={() => setModal(false)}/>}
      {bugModal && <BugModal onClose ={() => setBugModal(false)}/>}
      {soonModal && <ComingSoonModal onClose ={() => setSoonModal(false)}/>}
      {trophyModal && <Leaderboard onClose ={() => setTrophyModal(false)}/>}
      {gameMode ? <CompetitiveMode results={results} updateResults={updateResults}/> : <TestMe keybinds={keybinds} updateKeybinds={updateKeybinds} updateResults={updateResults} />}
      <div className="main-content">
        <div className="keyboard-section">
          <Keyboard />
          <div className={`recorded-binds-content ${!gameMode ? 'visible' : ''}`}>
              <RecordedBinds keybinds={keybinds} updateKeybinds={updateKeybinds} />
            </div>
        </div>
        <Results results={results} updateResults={updateResults}/>
      </div>
    </div>
  );
}

export default App;