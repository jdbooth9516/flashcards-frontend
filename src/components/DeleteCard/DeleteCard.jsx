import axios from 'axios';
import React from 'react'

export const DeleteCard = (cat, card) => {
    function confirmation () {
        const reply = window.confirm("Confirm Delete")
        if (reply) { 
            handleDelete(cat, card)
        }
    }

    function handleDelete(cat, card) {
        async function deleteCard(cat,card) { 
            try { 
                const response = await axios.delete(`http://127.0.0.1:8000/cards_category/${cat}/${card}/`)
                alert('card has been deleted')
            }   catch (error) {
                alert(error)
            }
        }
        deleteCard(cat,card)
    }

    confirmation()

    return (
        <div>
            
        </div>
    )
}
