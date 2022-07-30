import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Deck, GetDeckDetails, initialState } from "../component/shared/Deck";

function DeckComponent() {
  const [state, setState] = useState(initialState);
  let { deckId } = useParams(); // Unpacking and retrieve id

  useEffect(() => {
    GetDeckDetails(deckId, setState);
  }, []);

  return <>{<Deck {...state} />}</>;
}

export default DeckComponent;
