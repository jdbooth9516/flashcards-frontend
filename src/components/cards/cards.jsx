import axios from 'axios';
import { SingleCard } from '../SingleCard/SingleCard';
import React, {useState, useEffect}from 'react';
import { Fade } from '@material-ui/core';
import "./cards.css"

export default function Cards(props) {

    const [cards, setCards] = useState([]);
    const [visible, setVisible] = useState(true)
    const [singleVisible, setSingleVisible] = useState(false)
    const [selectedCard, setSelected] = useState(0)
    const [showAnswer, setShowAnswer] = useState(null)
    const [fadeTrigger, setFadeTrigger] = useState(null)
    const [collectionIndex, setIndex] = useState(null)
    const [update, setUpdate] = useState(false)
     
    useEffect(() => {
        async function getData() {
            const response = await axios.get(`http://127.0.0.1:8000/cards_category/${props.categoryId}`);
            setCards(response.data)
        }
        getData();
    }, [props.categoryId, update]);

    function updateCards() { 
      setUpdate(true);
      setSingleVisible(false);
      setTimeout(() => {
        setUpdate(false);
        setSingleVisible(true);
      }, 200);
    }

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
                onMouseEnter={() => {setShowAnswer(index); setFadeTrigger(index)}}
                onMouseLeave={() => {setShowAnswer(null); setFadeTrigger(null)}}
                >
              <div
                className="card-tile"
              >
                {showAnswer !== index && (<Fade in={fadeTrigger !== index} timeout={700}><h4 className="card-title">{card.question}</h4></Fade>)}
                {showAnswer === index && (<Fade in={fadeTrigger === index} timeout={700}><p className="card-answer" style={{paddingTop: '2.5vh'}}>{card.answer}</p></Fade>
              )}
              
              </div>
              </div>
            ))}
          </div>
        ) : null}
        <div className='single-card'>
          <div>
            {singleVisible == true && collectionIndex != 1 && (
            <button className='index-btn'
              onClick={() => {
                setIndex(collectionIndex - 1);
              }}
            >
              Prev
            </button>
            ) }
          </div>
          <div>
          {singleVisible ? (
            <SingleCard
              category={props.category}
              categoryId={props.categoryId}
              cardIndex={collectionIndex}
              cardId={cards[collectionIndex - 1].id}
              total={props.total}
              update={updateCards}
            />
          ) : null}
        </div>
        <div>
          {singleVisible == true && collectionIndex != cards.length &&(
          <button className='index-btn'
            onClick={() => {
              // need to make this into conditional that will loop
              setIndex(collectionIndex + 1);
            }}
          >
            Next
          </button>
          )}
          </div>
          {singleVisible ? (
            <div>
              <button className="del-btn"
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
        </div>
      </div>
    );
}
