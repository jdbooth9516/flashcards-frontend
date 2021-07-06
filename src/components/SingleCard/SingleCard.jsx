import React, { useState, useEffect } from "react";
import axios from "axios";
import UpdateCard from "../UpdateCard/UpdateCard";
import { DeleteCard } from "../DeleteCard/DeleteCard";
import { Fade } from "@material-ui/core";
import "./Singlecard.css";

export const SingleCard = (props) => {
  const [card, setCard] = useState({});
  const [questionVisible, setQuestionVisible] = useState(true);
  const [answerVisible, setAnswerVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);

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
  }, [props.cardId, updateVisible]);

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
          <button
            className="edit-btn"
            onClick={() => {
              setUpdateVisible(true);
              setAnswerVisible(false);
              setQuestionVisible(false);
            }}
          >
            Edit card
          </button>
          <button
            className="delete-btn"
            onClick={() => DeleteCard(props.categoryId, props.cardId)}
          >
            DEL
          </button>
        </div>
      </div>
      <div>
        {updateVisible ? (
          <UpdateCard
            categoryId={props.categoryId}
            cardId={props.cardId}
            updateVisible={setUpdateVisible}
            questionVisible={setQuestionVisible}
            update={props.update}
          />
        ) : null}
      </div>
    </div>
  );
};
