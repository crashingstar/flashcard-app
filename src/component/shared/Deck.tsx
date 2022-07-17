import * as React from "react";
import "./Card.css";

export default interface Deck {
  deck_name: string;
}

export const Deck: React.FC<Deck> = (props) => {
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
