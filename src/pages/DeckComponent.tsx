import React from "react";
import { Link } from "react-router-dom";
import { Deck } from "../component/shared/Deck";

function DeckComponentTest() {
  return <>{<Deck {...cardData[cardNumber][1]} />}</>;
}

export default DeckComponentTest;
