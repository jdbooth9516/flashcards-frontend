import React, { useState, useEffect } from 'react'
import axios from 'axios'
import UpdateCard from '../UpdateCard/UpdateCard'
import "./Singlecard.css"



export const SingleCard = (props) => {
    
    const [card, setCard] = useState({});
    const [questionVisible, setQuestionVisible] = useState(true);
    const [answerVisible, setAnswerVisible] = useState(false);
    const [updateVisible, setUpdateVisible] = useState(false);

    useEffect(() => {
        async function getCard()  {
            try {
                const response = await axios.get(
                `http://127.0.0.1:8000/cards_category/${props.categoryId}/${props.cardId}/`
                ); // first ${} is the category id second is the card id.
                setCard(response.data)
            } catch (error) {
                alert(error)
                return
            }
        }
        getCard();
    }, [props.cardId])

    return (
      <div className='card-body' onClick={() => {
          setQuestionVisible(!questionVisible);
          setAnswerVisible(!answerVisible)
      }}>
        {questionVisible ? (
          <div className="card">
            <h3>{card.question}</h3>
          </div>
        ) : null}
        {answerVisible ? (
          <div className="card">
            <h3>{card.answer}</h3>
          </div>
        ) : null}
        <div className='card-options'>
          <div className="index">
            <p>
              {props.cardIndex}/{props.total}
            </p>
          </div>
          <div> 
            <button className="edit-btn" onClick={() => setUpdateVisible(true)}>Edit card
            </button>
          </div>
        </div>
        <div>
            {updateVisible ? (<UpdateCard categoryId={props.categoryId} cardId={props.cardId} updateVisible={setUpdateVisible}/> ): null }
        </div>
      </div>
    );
}
