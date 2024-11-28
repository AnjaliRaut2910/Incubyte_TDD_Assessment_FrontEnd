import React, { useState } from 'react';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Success message state

  // Function to handle calculation
  const calculate = () => {
    try {
      setError('');
      setSuccessMessage(''); // Clear success message on new calculation
      const calcResult = add(input); // Call the add function
      setResult(calcResult);
      setSuccessMessage(`Calculation Successful! Result: ${calcResult}`); // Set success message
    } catch (err) {
      setError(err.message); // Set error if any negative number is found
      setResult(null);
      setSuccessMessage(''); // Clear success message if there's an error
    }
  };

  // Add function to handle calculation
  const add = (numbers) => {
    if (!numbers) return 0; // Step 1: Handle empty string

    let delimiter = /,|\n/; // Default delimiters are comma and newline

    // Step 4: Handle custom delimiters
    if (numbers.startsWith("//")) {
      const delimiterEnd = numbers.indexOf("\n");
      const customDelimiter = numbers.slice(2, delimiterEnd); // Extract the custom delimiter
      delimiter = new RegExp(customDelimiter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")); // Escape special characters
      numbers = numbers.slice(delimiterEnd + 1); // Remove the delimiter line
    }

    // Split the string by the current delimiter(s)
    const numberList = numbers
      .split(delimiter)
      .map((num) => num.trim()) // Remove unnecessary spaces
      .filter((num) => num !== ""); // Ignore empty strings

    // Step 5: Handle negative numbers
    const negativeNumbers = numberList.filter((num) => Number(num) < 0);
    if (negativeNumbers.length > 0) {
      throw new Error(
        `Negative numbers not allowed: ${negativeNumbers.join(", ")}`
      );
    }

    // Convert valid numbers to integers and calculate the sum
    return numberList.reduce((sum, num) => sum + Number(num), 0);
  };

  return (
    <div className="calculator-container">
      <h1>String Calculator</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter numbers here"
        className="input-area"
      ></textarea>
      <button onClick={calculate} className="calculate-button">Calculate</button>

      {result !== null && !error && (
        <div className="result-text">
          <strong>Result: </strong>{result}
        </div>
      )}
      
      {error && (
        <div className="error-text">
          <strong>Error: </strong>{error}
        </div>
      )}

      {successMessage && (
        <div className="success-text">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default App;
