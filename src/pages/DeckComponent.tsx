import React from "react";
import { Link } from "react-router-dom";
import { Deck } from "../component/shared/Deck";

function DeckComponentTest() {
  const tempData = {
    deck_name: "test deck name",
  };

  return <>{<Deck {...tempData} />}</>;
}

export default DeckComponentTest;
