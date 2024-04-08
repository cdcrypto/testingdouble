import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [walletAddress, setWalletAddress] = useState('Account');
  const [walletBalance, setWalletBalance] = useState('0');
  const [pendingPayout, setPendingPayout] = useState('0');

  // Equivalent to Vue's onMounted
  const fetchWalletInfo = () => {
    if (window.Telegram && window.Telegram.WebApp) {
      const telegramId = window.Telegram.WebApp.initDataUnsafe.user.id;
  
      fetch('https://77nypb.buildship.run/id', {
        method: 'GET', // Changed from 'FETCH' to 'POST'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ telegramId }), // Sending the Telegram ID in the request body
      })
      .then(response => response.json())
      .then(data => {
        setWalletAddress(`Account ${data.walletAddress}`);
        setWalletBalance(`Wallet Balance: $${data.balance}`);
        setPendingPayout(`Pending Payout: $${data.payout}`);
      })
      .catch(error => console.error('Error fetching wallet data:', error));
    } else {
      console.error('Telegram WebApp SDK not initialized or available.');
    }
  };
  
  // Call fetchWalletInfo on component mount
  fetchWalletInfo();
  // Function to copy wallet address to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress).then(() => {
      alert('Wallet address copied to clipboard');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  // Tailwind CSS classes
  const containerClasses = 'max-w-lg mx-auto bg-zinc-900 text-white rounded-lg shadow-lg overflow-hidden';
  const qrCodeClasses = 'p-2 bg-white border-2 border-zinc-700 rounded-lg';
  const contentClasses = 'px-6 py-4';
  const copyButtonClasses = 'px-2 py-1 text-xs font-semibold bg-zinc-700 rounded hover:bg-zinc-600';
  const inputClasses = 'w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50';
  const submitButtonClasses = 'px-6 py-3 bg-blue-500 rounded hover:bg-blue-600 text-lg font-bold';

  return (
    <div className={containerClasses}>
      <div className="flex justify-between items-center p-4">
        <span className="text-xl font-semibold">Wallet Info</span>
        <button onClick={fetchWalletInfo} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Refresh
        </button>
      </div>
      <div className="flex justify-center pt-2">
        <img src="https://placehold.co/128" alt="QR Code" className={qrCodeClasses} />
      </div>
      <div className={contentClasses}>
        <div className="flex justify-between items-center mt-4">
          <span>{walletAddress}</span>
          <button onClick={copyToClipboard} className={copyButtonClasses}>Copy</button>
        </div>
        <div className="flex flex-col items-center space-y-4 mt-4">
          <p className="font-bold">{walletBalance}</p>
          <p className="font-bold">{pendingPayout}</p>
        </div>
        <p className="mt-2 text-center text-sm">Welcome To SolPonzi. How does it work? Load your wallet with any amount of Solana. Enter the amount of Solana you want to double and click "Double My Sol". Once there are sufficient funds from the next person, double the amount of Solana will be sent to your wallet and you will be able to withdrawal.</p>
        <div className="mt-4">
          <input type="number" placeholder="Enter number of coins" className={inputClasses} />
        </div>
        <div className="flex justify-center mt-6">
          <button className={submitButtonClasses}>Double my Sol</button>
        </div>
      </div>
    </div>
  )}
  export default App;