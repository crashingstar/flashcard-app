import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeckType, { Deck, GetDeckDetails } from "../component/shared/Deck";

type State = {
  result: DeckType;
};

const initialState: State = {
  result: {
    deck_name: "initial_name",
    deck_id: -1,
    date_created: "NA",
    last_accessed: "NA",
    total_cards: -1,
    cards_due: -1,
  },
};

function DeckComponent() {
  const [state, setState] = useState(initialState);
  let { deckId } = useParams(); // Unpacking and retrieve id

  useEffect(() => {
    GetDeckDetails(deckId, setState);
  }, []);

  return <>{<Deck {...state.result} />}</>;
}

export default DeckComponent;
