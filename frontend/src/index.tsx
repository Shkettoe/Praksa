import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { configureStore } from './redux/configureStore';
import { Provider } from 'react-redux'

axios.defaults.baseURL = 'http://localhost:5000/'
axios.defaults.withCredentials = true

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = configureStore()

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
