import * as React from "react";
import "./Card.css";
import { updateTotalCardCount } from "./Deck";

export default interface CardType {
  back: string;
  card_id: number;
  card_status: string;
  date_created: string;
  deck_id: number;
  user_id: number;
  ease_factor: number;
  front: string;
  interval: number;
  learning_status: number;
  next_accessed: string;
}

export function createCardData(
  back: string,
  card_id: number,
  card_status: string,
  date_created: string,
  deck_id: number,
  user_id: number,
  ease_factor: number,
  front: string,
  interval: number,
  learning_status: number,
  next_accessed: string
) {
  return {
    back: back,
    card_id: card_id,
    card_status: card_status,
    date_created: date_created,
    deck_id: deck_id,
    user_id: user_id,
    ease_factor: ease_factor,
    front: front,
    interval: interval,
    learning_status: learning_status,
    next_accessed: next_accessed,
  } as CardType;
}

export function updateCardContent(cardInfo: CardType) {
  var formdata = new FormData();
  formdata.append("deck_id", String(cardInfo.deck_id));
  formdata.append("card_id", String(cardInfo.card_id));
  formdata.append("user_id", String(cardInfo.user_id));
  formdata.append("front", cardInfo.front);
  formdata.append("back", cardInfo.back);

  var requestOptions = {
    method: "POST",
    body: formdata,
  };

  fetch("http://127.0.0.1:5000/card/update_card_details", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.log("error", error));
}

export function createNewCard(
  deck_id: string,
  user_id: string,
  setCardData: any
) {
  var formdata = new FormData();
  formdata.append("deck_id", deck_id);
  formdata.append("user_id", user_id);
  var requestOptions = {
    method: "POST",
    body: formdata,
  };

  fetch("http://127.0.0.1:5000/card/create_card", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      let card = JSON.parse(result);

      setCardData((prevState: { [key: number]: CardType }) => ({
        ...prevState,
        [card.card_id]: createCardData(
          card.back,
          card.card_id,
          card.card_status,
          card.date_created,
          card.deck_id,
          card.user_id,
          card.ease_factor,
          card.front,
          card.interval,
          card.learning_status,
          card.next_accessed
        ) as CardType,
      }));
      updateTotalCardCount();
    })
    .catch((error) => console.log("error", error));
}

export const Card: React.FC<CardType> = (props) => {
  console.log(props);
  return (
    <div className="card-container">
      <div className="card">
        <div className="front">
          <div className="eng">{props.front}</div>
        </div>
        <div className="front back">
          <div className="kor">{props.back}</div>
        </div>
      </div>
    </div>
  );
};
