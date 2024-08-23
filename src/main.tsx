import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

/*createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
  

    <App />

  



  </StrictMode>,
)*/



// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppRoutes } from './Routes';
import { BrowserRouter } from 'react-router-dom' // 追加する

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
);
