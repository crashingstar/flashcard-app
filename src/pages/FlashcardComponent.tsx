import { Stack, Button } from "@mui/material";
import * as React from "react";
import CardType, { Card, createCardData } from "../component/shared/Card";
import { useParams } from "react-router-dom";

type State = {
  result: CardType[];
};

const initialState: State = {
  result: [],
};

export default function Flashcard() {
  const [cardData, setCardData] = React.useState(initialState);
  const [cardNumber, setCardNumber] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  let { deckId } = useParams(); // Unpacking and retrieve id

  function getAllCardDetails(deckId: any) {
    var formdata = new FormData();
    formdata.append("deck_id", deckId);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };
    fetch("http://127.0.0.1:5000/card/get_deck_all_card", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        Object.entries(JSON.parse(result)).forEach(([k, unknown_card]) => {
          let card = unknown_card as any;
          setCardData((prevState) => ({
            result: [
              ...prevState.result,
              createCardData(
                card.back,
                card.card_id,
                card.card_status,
                card.date_created,
                card.deck_id,
                card.ease_factor,
                card.front,
                card.interval,
                card.learning_status,
                card.next_accessed
              ),
            ],
          }));
        });

        // console.log(Object.entries(result));
        // setCardData(JSON.parse(result));
        setIsLoading(false);
        console.log(cardNumber);
      })
      .catch((error) => console.log("error", error));
  }

  const updateCardInterval = (responseQuality: string) => {
    var formdata = new FormData();
    console.log("Carddatacardnumber");
    console.log(cardData);
    formdata.append("deck_id", String(cardData.result[cardNumber].deck_id));
    formdata.append("card_id", String(cardData.result[cardNumber].card_id));
    formdata.append("user_id", "1");
    formdata.append("response_quality", responseQuality!);
    console.log(cardData.result[cardNumber].deck_id);
    console.log(cardData.result[cardNumber].card_id);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http://127.0.0.1:5000/card/update_card_interval", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log("Before set cardNumebrr");
        console.log(result);
        setCardNumber(cardNumber + 1);
      })
      .catch((error) => console.log("error", error));
  };

  React.useEffect(() => {
    getAllCardDetails(deckId);
  }, [setCardNumber]);

  // const handleEasyButton = () => {
  //   updateCardInterval("3");
  // };

  // const handleGoodButton = () => {
  //   updateCardInterval("2");
  // };
  // const handleHardButton = () => {
  //   updateCardInterval("1");
  // };
  // const handleAgainButton = () => {
  //   updateCardInterval("0");
  // };
  return (
    <>
      <h3>Flashcard</h3>
      {!isLoading && <Card {...cardData.result[cardNumber]} />}
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        paddingTop="10px"
      >
        <Button variant="outlined" onClick={() => updateCardInterval("3")}>
          Easy
        </Button>
        <Button variant="outlined" onClick={() => updateCardInterval("2")}>
          Good{" "}
        </Button>
        <Button variant="outlined" onClick={() => updateCardInterval("1")}>
          Hard{" "}
        </Button>
        <Button variant="outlined" onClick={() => updateCardInterval("0")}>
          Again
        </Button>
      </Stack>
    </>
  );
}
