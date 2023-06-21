import React, { useEffect, useState } from 'react';
import './Styles/App.css';

const makeTitleCase = (str) => {
  const words = str.split(' ');
  const titleCaseWords = words.map(word => {
    const firstLetter = word[0].toUpperCase();
    const restOfWord = word.slice(1).toLowerCase();
    return firstLetter + restOfWord;
  });
  return titleCaseWords.join(' ');
};


function App() {
  const [quote, setQuote] = useState({ text: 'The truth will set you free.', author: 'The Bible' });

  const generateQuote = () => {
    fetch('https://type.fit/api/quotes')
      .then(response => response.json())
      .then(data => {
        const rndmIndex = Math.floor(Math.random() * data.length);
        setQuote(data[rndmIndex]);
      });
  };

  useEffect(() => {
    generateQuote();
  }, []);

  return (
    <div className="App">
      <div className="quote-box">
        <p className='card-text'>
          <q>
            {makeTitleCase(quote.text)}
          </q>
        </p>
        <p className='card-footer'>~ 
          {quote.author ? makeTitleCase(quote.author) : 'Anonymous'}
        </p>
        <button onClick={generateQuote}>Get New</button>
      </div>
    </div>
  );
}

export default App;
