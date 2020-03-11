import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
// import App from './App';
// import registerServiceWorker from './registerServiceWorker';
// import { BrowserRouter } from 'react-router-dom';
import SimpleTable from './Components/Table'
//import ListEmployee from './Components/ListEmployee'

// ReactDOM.render(
//     <BrowserRouter>
//         <App />
//         {/* <ListEmployee /> */}
//     </BrowserRouter>, document.getElementById('root'));
// registerServiceWorker();

ReactDOM.render(<SimpleTable />, document.getElementById('root'));