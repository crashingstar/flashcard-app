import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeckType, { GetDeckDetails } from "../component/shared/Deck";
import { EditDeck } from "../component/shared/EditDeck";

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

function EditDeckComponent() {
  const [state, setState] = useState(initialState);
  let { deckId } = useParams(); // Unpacking and retrieve id

  useEffect(() => {
    GetDeckDetails(deckId, setState);
  }, []);

  return <>{<EditDeck {...state.result} />}</>;
}

export default EditDeckComponent;
