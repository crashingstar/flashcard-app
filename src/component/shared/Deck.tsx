import * as React from "react";
import "./Card.css";
import { Link } from "react-router-dom";

export default interface DeckType {
  deck_name: string;
  deck_id: number;
  date_created: string;
  last_accessed: string;
  total_cards: number;
}

export function createDeckData(
  deck_name: string,
  deck_id: number,
  date_created: string,
  last_accessed: string,
  total_cards: number
) {
  if (last_accessed == null) {
    last_accessed = "NA";
  }
  if (total_cards == null) {
    total_cards = 0;
  }

  return {
    deck_name: deck_name,
    deck_id: deck_id,
    date_created: date_created,
    last_accessed: last_accessed,
    total_cards: total_cards,
  } as DeckType;
}

export const Deck: React.FC<DeckType> = (props) => {
  return (
    <div>
      <h2>Deck Name: {props.deck_name}</h2>
      <h2>Total Flash card: {props.total_cards}</h2>
      <h2>Date created: {props.date_created}</h2>
      <h2>Last accessed: {props.last_accessed}</h2>
      <h2>Deck Id: {props.deck_id}</h2>
      <button>
        <Link to={`/deck/review/${props.deck_id}`}>
          Click here to review deck {props.deck_name}
        </Link>
      </button>
    </div>
  );
};
