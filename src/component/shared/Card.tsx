import * as React from "react";
import "./Card.css";

export default interface CardType {
  back: string;
  card_id: number;
  card_status: string;
  date_created: string;
  deck_id: number;
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
    ease_factor: ease_factor,
    front: front,
    interval: interval,
    learning_status: learning_status,
    next_accessed: next_accessed,
  } as CardType;
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
