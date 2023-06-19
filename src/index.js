import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.


export default function Index() {
  return (
    <div>

      <App/>


      
      </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<BrowserRouter><Index/></BrowserRouter>);
