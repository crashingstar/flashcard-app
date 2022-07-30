import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DeckType, {
  GetDeckDetails,
  initialState,
  updateDeckDetails,
} from "../component/shared/Deck";
import { EditDeck, Item } from "../component/shared/EditDeck";
import CardContent from "@mui/material/CardContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function EditDeckComponent() {
  const [deckState, setDeckState] = useState(initialState);
  let { deckId } = useParams(); // Unpacking and retrieve id

  function editDeckData(e: any) {
    setDeckState(
      (prevState) =>
        ({
          ...prevState,
          deck_name: e.target.value,
        } as DeckType)
    );
  }

  useEffect(() => {
    GetDeckDetails(deckId, setDeckState);
  }, []);

  return (
    <>
      {
        <div>
          <CardContent
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
            }}
          >
            <Item sx={{ textAlign: "right" }}>Deck Name: </Item>
            <TextField
              sx={{ gridColumnStart: "2", gridColumnEnd: "4" }}
              label="Deck Name"
              color="primary"
              value={deckState.deck_name}
              onChange={(e) => editDeckData(e)}
              focused
            />
            <Button
              sx={{ width: "20%" }}
              variant="contained"
              onClick={() => updateDeckDetails(deckState)}
            >
              Save
            </Button>
          </CardContent>
          <EditDeck {...deckState} />
        </div>
      }
    </>
  );
}

export default EditDeckComponent;
