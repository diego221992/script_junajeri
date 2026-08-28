window.__PAGE_LOAD_TIME__ = Date.now();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router";
import { DataProvider } from "./context/UserContext";
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  //<StrictMode>
  <BrowserRouter>
    <DataProvider>
      <App />
    </DataProvider>
  </BrowserRouter>
  //</StrictMode>,
)
