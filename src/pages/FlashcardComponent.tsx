import { Button } from "@material-ui/core";
import * as React from "react";
import { Card } from "../component/shared/Card";
export default function Flashcard() {

    const [cardData, setCardData] = React.useState<any>()
    React.useEffect(() => {
    var requestOptions = {
      method: "POST",
    };
    fetch("http://127.0.0.1:5000/card/get_card", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setCardData(result)
      })
      .catch((error) => console.log("error", error));
  },[]);
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
        console.log(result)
      })
      .catch((error) => console.log("error", error));
    }
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
        console.log(result)
      })
      .catch((error) => console.log("error", error));
    }
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
        console.log(result)
      })
      .catch((error) => console.log("error", error));
    }
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
        console.log(result)
      })
      .catch((error) => console.log("error", error));
    }
    return (
      <div>
        <h3>Flashcard</h3>
        <Card />
        <Button onClick={handleEasyButton}>Easy</Button>
        <Button onClick={handleGoodButton}>Good </Button>
        <Button onClick={handleHardButton}>Hard </Button>
        <Button onClick={handleAgainButton}>Again</Button>
      </div>
    );
  
}
