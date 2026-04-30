import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'sonner';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: 'rgba(2,8,23,0.95)',
          border: '1px solid rgba(255,255,255,0.1)',
          color: '#f8fafc',
          fontFamily: 'DM Sans, sans-serif',
          backdropFilter: 'blur(20px)',
        },
      }}
    />
  </React.StrictMode>
);
