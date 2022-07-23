import { Button } from "@material-ui/core";
import { Stack } from "@mui/material";
import * as React from "react";
import { Card } from "../component/shared/Card";
import { useParams } from "react-router-dom";

export default function Flashcard() {
  const [cardData, setCardData] = React.useState<any>();
  const [cardNumber, setCardNumber] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  let { deckId } = useParams(); // Unpacking and retrieve id

  React.useEffect(() => {
    var requestOptions = {
      method: "POST",
    };
    fetch("http://127.0.0.1:5000/card/get_card", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(Object.entries(result));
        setCardData(Object.entries(result));
        setIsLoading(false);
        console.log(cardNumber);
      })
      .catch((error) => console.log("error", error));
  }, [setCardNumber]);
  const handleEasyButton = () => {
    var formdata = new FormData();
    formdata.append("deck_id", cardData.deck_id);
    formdata.append("card_id", cardData.card_id);
    formdata.append("user_id", "1");
    formdata.append("response_quality", "3");
    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http://127.0.0.1:5000/card/update_card_interval", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setCardNumber(cardNumber + 1);
      })
      .catch((error) => console.log("error", error));
  };
  const handleGoodButton = () => {
    var formdata = new FormData();
    formdata.append("deck_id", cardData.deck_id);
    formdata.append("card_id", cardData.card_id);
    formdata.append("user_id", "1");
    formdata.append("response_quality", "2");
    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http://127.0.0.1:5000/card/update_card_interval", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setCardNumber(cardNumber + 1);
      })
      .catch((error) => console.log("error", error));
  };
  const handleHardButton = () => {
    var formdata = new FormData();
    formdata.append("deck_id", cardData.deck_id);
    formdata.append("card_id", cardData.card_id);
    formdata.append("user_id", "1");
    formdata.append("response_quality", "1");
    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http://127.0.0.1:5000/card/update_card_interval", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setCardNumber(cardNumber + 1);
      })
      .catch((error) => console.log("error", error));
  };
  const handleAgainButton = () => {
    var formdata = new FormData();
    formdata.append("deck_id", cardData.deck_id);
    formdata.append("card_id", cardData.card_id);
    formdata.append("user_id", "1");
    formdata.append("response_quality", "0");
    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http://127.0.0.1:5000/card/update_card_interval", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        setCardNumber(cardNumber + 1);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <>
      <h3>Flashcard</h3>
      {!isLoading && <Card {...cardData[cardNumber][1]} />}
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        paddingTop="10px"
      >
        <Button variant="outlined" onClick={handleEasyButton}>
          Easy
        </Button>
        <Button variant="outlined" onClick={handleGoodButton}>
          Good{" "}
        </Button>
        <Button variant="outlined" onClick={handleHardButton}>
          Hard{" "}
        </Button>
        <Button variant="outlined" onClick={handleAgainButton}>
          Again
        </Button>
      </Stack>
    </>
  );
}
