import { useEffect, useState } from 'react';
import axios from 'axios'; // Import axios

import './App.css';

function App() {
  const [amount, setAmount] = useState("1");
  const [fromcurrency, setFromcurrency] = useState("USD");
  const [tocurrency, setTocurrency] = useState("INR");
  const [converteramount, setConverteramount] = useState(null); // Changed to null
  const [exchangerate, setExchangerate] = useState(null);

  useEffect(() => {
    const getExchangerate = async () => {
      try {
        let url = `https://api.exchangerate-api.com/v4/latest/${fromcurrency}`; // Added colon after https
        const response = await axios.get(url);
        setExchangerate(response.data.rates[tocurrency]);
      } catch (error) {
        console.error("error fetching exchange rate:", error);
      }
    };
    getExchangerate(); // Corrected the function call
  }, [fromcurrency, tocurrency]);

  useEffect(() => {
    if (exchangerate !== null) {
      setConverteramount((amount * exchangerate).toFixed(2));
    }
  }, [amount, exchangerate]);

  return (
    <>
      <div className='currency-converter'>
        <div className='box'></div>
        <div className='data'>
          <h1>currency converter</h1>
          <div className='input-converter'>
            <label htmlFor='amt'>amount:</label>
            <input type='text' id='amt' value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>
          <div className='input-converter'>
            <label htmlFor='fromcurrency'>From Currency:</label>
            <select id='fromcurrency' value={fromcurrency} onChange={(e) => setFromcurrency(e.target.value)}>
              <option value="USD">USD-united states dollar</option>
              <option value="EUR">EUR-euro</option>
              <option value="GBP">GBP-british pound sterling</option>
              <option value="JPY">JPY-japanese yen</option>
              <option value="AUD">AUD-australian dollar</option>
              <option value="INR">INR-indian rupee</option>
            </select>
          </div>
          <div className='input-converter'>
            <label htmlFor='Tocurrency'>To Currency:</label>
            <select id='Tocurrency' value={tocurrency} onChange={(e) => setTocurrency(e.target.value)}>
              <option value="USD">USD-united states dollar</option>
              <option value="EUR">EUR-euro</option>
              <option value="GBP">GBP-british pound sterling</option>
              <option value="JPY">JPY-japanese yen</option>
              <option value="AUD">AUD-australian dollar</option>
              <option value="INR">INR-indian rupee</option>
            </select>
          </div>
          <div className='result'>
            <p>{amount} {fromcurrency} is equal to {converteramount} {tocurrency}</p>
          </div>
          <p className="copyright">
        Designed by <span>Prabu Kannan</span>
      </p>
        </div>
      </div>
    </>
  )
}

export default App;