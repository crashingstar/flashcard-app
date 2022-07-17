import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DeckType, { Deck, createDeckData } from "../component/shared/Deck";

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
  },
};

function DeckComponent() {
  const [state, setState] = useState(initialState);
  let { deckId } = useParams(); // Unpacking and retrieve id

  function GetDeckDetails(deckId: any) {
    var formdata = new FormData();
    formdata.append("deck_id", deckId);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };
    fetch("http://127.0.0.1:5000/deck/get_deck_details", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        // Object.entries(JSON.parse(result)).forEach(([k, unknown_v]) => {
        let v = JSON.parse(result) as any;
        setState(() => ({
          result: createDeckData(
            v.deck_name,
            v.deck_id,
            v.date_created,
            v.last_updated,
            v.total_cards
          ),
        }));
        // });
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    GetDeckDetails(deckId);
  }, []);

  return <>{<Deck {...state.result} />}</>;
}

export default DeckComponent;
