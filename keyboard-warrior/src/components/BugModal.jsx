import React, { useState, useEffect } from 'react';
import '../styles/BugModal.css';

function BugModal({ onClose }) {
    const [formState, setFormState] = useState({ name: "", email: "", message: "",})

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value,
          }));
        };

    const handleSubmit = (e) => {
        console.log(formState.message)
    };
  return (

    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <div className="modal-body">
            <h2 className='bug-header'>Let me know about a bug</h2>
            <h4 className="bug-header">Known issues:</h4>
                <ol className='bug-list'>
                <li className='bug-item'>Literally nothing, it's perfect. Shut up</li>
                <li className='bug-item'>Bug report submission currently does not submit to anywhere</li>
                <li className='bug-item'>NumPad Keys and MainBoard keys cause each other to light up and both satisfy the others testing requirements. Honor system for now</li>
                <li className='bug-item'>Several built-in OS/browser functions can not be overridden. This applies but may not be limited to: </li>
                  <ul className='bug-list'>
                    <li>ctrl + w (will close the tab)</li>
                    <li>Windows Menu (and any key-combo that starts with it)</li>
                    <li>alt + f4 (will close the window)</li>
                    <li>ctrl + # (will navigate to your #'d tab)</li>
                    <li>alt + __ will work, but simply pressing "alt" alone and releasing it may start cycling your browser option icons/dropdowns</li>
                  </ul>
                  <li className='bug-item'>Submitting a bug report triggers a full reload and resets all binds and times</li>
                </ol>
                <form onSubmit={handleSubmit} className="bug-form">
            <div className="form-group">
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BugModal;