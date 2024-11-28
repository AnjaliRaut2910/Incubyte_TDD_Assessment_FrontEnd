import React, { useState } from 'react';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); 

  const calculate = () => {
    try {
      setError('');
      setSuccessMessage(''); 
      const calcResult = add(input); 
      setResult(calcResult);
      setSuccessMessage(`Calculation Successful! Result: ${calcResult}`); 
    } catch (err) {
      setError(err.message); 
      setResult(null);
      setSuccessMessage(''); 
    }
  };


  const add = (numbers) => {
    if (!numbers) return 0; 

    let delimiter = /,|\n/; 

 
    if (numbers.startsWith("//")) {
      const delimiterEnd = numbers.indexOf("\n");
      const customDelimiter = numbers.slice(2, delimiterEnd); 
      delimiter = new RegExp(customDelimiter.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
      numbers = numbers.slice(delimiterEnd + 1); 
    }

    
    const numberList = numbers
      .split(delimiter)
      .map((num) => num.trim()) 
      .filter((num) => num !== ""); 

   
    const negativeNumbers = numberList.filter((num) => Number(num) < 0);
    if (negativeNumbers.length > 0) {
      throw new Error(
        `Negative numbers not allowed: ${negativeNumbers.join(", ")}`
      );
    }

   
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
