import React, { useState } from 'react';
import styles from '../styles/Game.module.css'; 

const Game = () => {
  // State to store the individual truths
  const [truthOne, setTruthOne] = useState('');
  const [truthTwo, setTruthTwo] = useState('');
  // State to store the response from the server
  const [generatedData, setGeneratedData] = useState(null);

  const handleTruthOneChange = (event) => {
    setTruthOne(event.target.value);
  };

  const handleTruthTwoChange = (event) => {
    setTruthTwo(event.target.value);
  };


  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3000/generate-lies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify([{ truth_one: truthOne, truth_two: truthTwo }]),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`data from request`, data);
      setGeneratedData(data);
    } catch (error) {
      console.error('There was an error making the fetch request:', error);
    }
  };

  return (
    <div className={styles.container}>
      {/* Display generated data */}
      <div className={styles.outputBox}>
        {generatedData && (
          <div>
            <p><b>Truth One:</b> {generatedData[0].truth_one}</p>
            <p><b>Truth Two:</b> {generatedData[0].truth_three}</p>
            <p><b>Truth Three:</b> {generatedData[0].truth_two}</p>
          </div>
        )}
      </div>

      {/* Two input fields for the truths */}
      <input
        type="text"
        className={styles.inputField}
        placeholder="Enter truth one"
        value={truthOne}
        onChange={handleTruthOneChange}
      />
      <input
        type="text"
        className={styles.inputField}
        placeholder="Enter truth two"
        value={truthTwo}
        onChange={handleTruthTwoChange}
      />

      {/* Submit button */}
      <button
        className={styles.submitButton}
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

export default Game;