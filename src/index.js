import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './assets/styles/style.scss';
import { Provider } from 'react-redux';
import store from './store';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render((
    <Provider store={store}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>
), document.getElementById('root'));

reportWebVitals();
