import axios from 'axios';
import React, {useState, useEffect}from 'react'

export default function Cards(props) {

    const [cards, setCards] = useState([]);
    const [visible, setVisible] = useState(false)
    
    console.log(props.categoryId);
    
    useEffect(() => {
        async function getData() {
            const response = await axios.get(`http://127.0.0.1:8000/cards_category/${props.categoryId}/`);
            setCards(response.data)
        }
        getData();
    }, [visible, props.categoryId]);

    return (
        <div>
            {cards.map((card) => (
                <div className='card-tile'>
                    <p>{card.question}</p>
                </div>
            ))}
        </div>
    )
}
