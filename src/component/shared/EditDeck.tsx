import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box, { BoxProps } from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Link from "@mui/material/Link";
import { useParams } from "react-router-dom";
import CardType, { createCardData } from "../shared/Card";

export default interface DeckType {
  deck_name: string;
  deck_id: number;
  date_created: string;
  last_accessed: string;
  total_cards: number;
  cards_due: number;
}

type State = {
  result: CardType[];
};

const initialState: State = {
  result: [],
};

function Item(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "#fff",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        // border: "1px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.300",
        // p: 1,
        m: 1,
        // borderRadius: 2,
        fontSize: "1.2rem",
        fontWeight: "900",
        ...sx,
      }}
      {...other}
    />
  );
}

export function createDeckData(
  deck_name: string,
  deck_id: number,
  date_created: string,
  last_accessed: string,
  total_cards: number,
  cards_due: number
) {
  if (last_accessed == null) {
    last_accessed = "NA";
  }
  if (total_cards == null) {
    total_cards = 0;
  }
  if (cards_due == null) {
    cards_due = 0;
  }
  return {
    deck_name: deck_name,
    deck_id: deck_id,
    date_created: date_created,
    last_accessed: last_accessed,
    total_cards: total_cards,
    cards_due: cards_due,
  } as DeckType;
}

export const EditDeck: React.FC<DeckType> = (props) => {
  const [cardData, setCardData] = React.useState(initialState);
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

        setIsLoading(false);
      })
      .catch((error) => console.log("error", error));
  }

  const updateCardContent = (card_id: number, front: string, back: string) => {
    var formdata = new FormData();
    formdata.append("deck_id", String(deckId));
    formdata.append("card_id", String(card_id));
    formdata.append("user_id", "1");
    formdata.append("front", front);
    formdata.append("back", back);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    fetch("http://127.0.0.1:5000/card/update_card_details", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  };

  React.useEffect(() => {
    getAllCardDetails(deckId);
  }, []);

  return (
    <div>
      <Card sx={{ maxWidth: "100%" }}>
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
            focused
          />
          <Item />
          <Box
            sx={{
              gridColumnEnd: "span 4",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: 36,
            }}
          >
            Flash-cards:
          </Box>
        </CardContent>

        {cardData.result.map((cardInfo, ind) => (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
            }}
          >
            <Item sx={{ textAlign: "right" }}>{cardInfo.card_id}</Item>
            <TextField
              label="Front"
              color="primary"
              value={cardInfo.front}
              onChange={(e) =>
                setCardData((prevState) => ({
                  result: [
                    ...prevState.result.slice(0, ind),
                    createCardData(
                      cardInfo.back,
                      cardInfo.card_id,
                      cardInfo.card_status,
                      cardInfo.date_created,
                      cardInfo.deck_id,
                      cardInfo.ease_factor,
                      e.target.value,
                      cardInfo.interval,
                      cardInfo.learning_status,
                      cardInfo.next_accessed
                    ),
                    ...prevState.result.slice(ind + 1, prevState.result.length),
                  ],
                }))
              }
              focused
            />
            <TextField
              label="Back"
              color="primary"
              value={cardInfo.back}
              onChange={(e) =>
                setCardData((prevState) => ({
                  result: [
                    ...prevState.result.slice(0, ind),
                    createCardData(
                      e.target.value,
                      cardInfo.card_id,
                      cardInfo.card_status,
                      cardInfo.date_created,
                      cardInfo.deck_id,
                      cardInfo.ease_factor,
                      cardInfo.front,
                      cardInfo.interval,
                      cardInfo.learning_status,
                      cardInfo.next_accessed
                    ),
                    ...prevState.result.slice(ind + 1, prevState.result.length),
                  ],
                }))
              }
              focused
            />
            <Button
              sx={{ width: "20%" }}
              variant="contained"
              onClick={() =>
                updateCardContent(
                  cardInfo.card_id,
                  cardInfo.front,
                  cardInfo.back
                )
              }
            >
              Save
            </Button>
          </Box>
        ))}

        <CardActions>
          <Button variant="contained" size="large">
            <Link color="inherit" href={`/deck/review/${props.deck_id}`}>
              Back
            </Link>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
