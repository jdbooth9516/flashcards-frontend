import axios from 'axios';
import { SingleCard } from '../SingleCard/SingleCard';
import React, {useState, useEffect}from 'react'

export default function Cards(props) {

    const [cards, setCards] = useState([]);
    const [visible, setVisible] = useState(true)
    const [singleVisible, setSingleVisible] = useState(false)
    const [selectedCard, setSelected] = useState(0)
    const [collectionIndex, setIndex] = useState(0)
     
    useEffect(() => {
        async function getData() {
            const response = await axios.get(`http://127.0.0.1:8000/cards_category/${props.categoryId}`);
            setCards(response.data)
        }
        getData();
    }, [props.categoryId]);

    return (
      <div>
        {visible ? (
          <div>
            {cards.map((card, index) => (
              <div
                onClick={() => {
                  setVisible(false);
                  setSelected(card.id);
                  setSingleVisible(true);
                  setIndex(index + 1);
                }}
                className="card-tile"
              >
                <p>{card.question}</p>
              </div>
            ))}
          </div>
        ) : null}
        <div>
          <div>
            <button
              onClick={() => {
                setIndex(collectionIndex - 1);
              }}
            >
              Prev
            </button>
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
          <button
            onClick={() => {
              // need to make this into conditional that will loop
              setIndex(collectionIndex + 1);
            }}
          >
            Next
          </button>
        </div>
      </div>
    );
}
