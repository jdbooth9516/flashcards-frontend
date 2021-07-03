import React, {useState, useEffect} from 'react'
import { CreateCategory } from '../CreateCategory/CreateCategory';
import './Navbar.css'

export default function Navbar(props) {
    const [visible, setVisible] = useState(false);

    return (
      <div className="navbar-inner">
        <div className="logo">
          <h1> FlashCards </h1>
        </div>
        <div className="buttons">
          <button onClick={() => {setVisible(true)}}>create categories</button>
          {visible ? <CreateCategory /> : null}
        </div>
        <div></div>
      </div>
    );
}
