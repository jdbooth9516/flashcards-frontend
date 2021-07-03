import React, { useState, useEffect } from 'react'
import axios from 'axios'



export const SingleCard = (props) => {
    
    const [card, setCard] = useState({});
    const [questionVisible, setQuestionVisible] = useState(true);
    const [answerVisible, setAnswerVisible] = useState(false);

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
      <div onClick={() => {
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
        <div className="index">
          <p>
            {props.cardIndex}/{props.total}
          </p>
        </div>
      </div>
    );
}
