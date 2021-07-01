import React, {useState, useEffect} from 'react';
import Categories from './components/categories/categories';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='navBar'>   
        <h1> Hi There</h1>
      </div>
      <div className="main-area">
        <div className="cat-container">   
          < Categories />
        </div>
        <div className='card-container'>
          
        </div>
      </div>
    </div>
  );
}

export default App;
