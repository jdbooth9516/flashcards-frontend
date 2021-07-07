import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateCard from "../UpdateCard/UpdateCard";
import { DeleteCard } from "../DeleteCard/DeleteCard";
import { Fade } from "@material-ui/core";
import "./Singlecard.css";

export const SingleCard = (props) => {
  const [card, setCard] = useState({});
  const [questionVisible, setQuestionVisible] = useState(true);
  const [answerVisible, setAnswerVisible] = useState(false)

  useEffect(() => {
    async function getCard() {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/cards_category/${props.categoryId}/${props.cardId}/`
        );
        setCard(response.data);
      } catch (error) {
        alert(error);
        return;
      }
    }
    getCard();
  }, [props.cardId]);

  return (
    <div
      className="card-body"
      onClick={() => {
        setQuestionVisible(!questionVisible);
        setAnswerVisible(!answerVisible);
      }}
    >
      {questionVisible ? (
        <Fade in={questionVisible} timeout={700}>
          <div className="card">
            <h3>{card.question}</h3>
          </div>
        </Fade>
      ) : null}
      {answerVisible ? (
        <Fade in={answerVisible} timeout={700}>
          <div className="card">
            <h3>{card.answer}</h3>
          </div>
        </Fade>
      ) : null}
      <div className="card-options">
        <div className="index">
          <p>
            {props.cardIndex}/{props.total}
          </p>
        </div>
        <div>
          <UpdateCard
            categoryId={props.categoryId}
            cardId={props.cardId}
            questionVisible={setQuestionVisible}
            update={props.update}
          />
        </div>
        <div>
          <button
            className="delete-btn"
            onClick={() => DeleteCard(props.categoryId, props.cardId, props.category)}
          >
            DEL
          </button>
        </div>
      </div>
    </div>
  );
};
