import axios from 'axios';
import { SingleCard } from '../SingleCard/SingleCard';
import React, {useState, useEffect}from 'react';
import "./cards.css"

export default function Cards(props) {

    const [cards, setCards] = useState([]);
    const [visible, setVisible] = useState(true)
    const [singleVisible, setSingleVisible] = useState(false)
    const [selectedCard, setSelected] = useState(0)
    const [showAnswer, setShowAnswer] = useState(null)
    const [collectionIndex, setIndex] = useState(0)
     
    useEffect(() => {
        async function getData() {
            const response = await axios.get(`http://127.0.0.1:8000/cards_category/${props.categoryId}`);
            setCards(response.data)
        }
        getData();
    }, [cards, props.categoryId]);

    return (
      <div>
        {visible ? (
          <div className="card-container">
            {cards.map((card, index) => (
              <div className="cards"
              
                onClick={() => {
                  setVisible(false);
                  setSelected(card.id);
                  setSingleVisible(true);
                  setIndex(index + 1);
                }}
                onMouseEnter={() => setShowAnswer(index)}
                onMouseLeave={() => setShowAnswer(null)}
                >
              <div
                className="card-tile"
              >
                {showAnswer !== index && (<h4 className="card-title">{card.question}</h4>
              )}
              {showAnswer === index && (<p className="card-answer">{card.answer}</p>
              )}
              
              </div>
              </div>
            ))}
          </div>
        ) : null}
        <div>
          <div>
            {singleVisible ? (
            <button
              onClick={() => {
                setIndex(collectionIndex - 1);
              }}
            >
              Prev
            </button>
            ): null }
          </div>
          {singleVisible ? (
            <div>
              <button
                // need to make this into conditional that will loop
                onClick={() => {
                  setVisible(true);
                  setSingleVisible(false);
                }}
              >
                X
              </button>
            </div>
          ) : null}
          {singleVisible ? (
            <SingleCard
              categoryId={props.categoryId}
              cardIndex={collectionIndex}
              cardId={cards[collectionIndex - 1].id}
              total={props.total}
            />
          ) : null}
        </div>
        <div>
          {singleVisible ? (
          <button
            onClick={() => {
              // need to make this into conditional that will loop
              setIndex(collectionIndex + 1);
            }}
          >
            Next
          </button>
          ): null }
        </div>
      </div>
    );
}
