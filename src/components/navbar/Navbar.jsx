import React, {useState, useEffect} from 'react'
import './Navbar.css'

export default function Navbar(props) {


    return (
        <div className="navbar-inner">
            <div className='logo'>
                <h1> FlashCards </h1> 
            </div>
            <div className='buttons'>
                <button>create categories</button>
                <button>edit category</button>
                <button>create card</button>
                <button>edit card</button>
            </div>
        </div>
    )
}
