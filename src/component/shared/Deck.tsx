import * as React from "react";
import "./Card.css";

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
  console.log(props);
  return (
    <div>
      <h3>Total Flash card: 66</h3>
      <h3>Deck Name: {props.deck_name}</h3>
      <h3>Time spent on deck: 234 hours</h3>
      <button>{/* <Link to="/flashcard">Click here to review</Link> */}</button>
    </div>
  );
};
