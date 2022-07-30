import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box, { BoxProps } from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Link from "@mui/material/Link";
import { useParams } from "react-router-dom";
import CardType, {
  createCardData,
  updateCardContent,
  createNewCard,
} from "../shared/Card";
import DeckType from "../shared/Deck";

const initialCardState: { [key: number]: CardType } = {};

export function Item(props: BoxProps) {
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

export const EditDeck: React.FC<DeckType> = (props) => {
  const [cardData, setCardData] = React.useState(initialCardState);
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
          let card = unknown_card as CardType;
          setCardData((prevState) => ({
            ...prevState,
            [card.card_id]: createCardData(
              card.back,
              card.card_id,
              card.card_status,
              card.date_created,
              card.deck_id,
              card.user_id,
              card.ease_factor,
              card.front,
              card.interval,
              card.learning_status,
              card.next_accessed
            ),
          }));
        });

        setIsLoading(false);
      })
      .catch((error) => console.log("error", error));
  }

  function editCardData(e: any, cardInfo: CardType, attribute: string) {
    setCardData((prevState) => ({
      ...prevState,
      [cardInfo.card_id]:
        attribute == "front"
          ? ({ ...cardInfo, front: e.target.value } as CardType)
          : ({ ...cardInfo, back: e.target.value } as CardType),
    }));
  }

  React.useEffect(() => {
    getAllCardDetails(deckId);
  }, []);

  return (
    <div>
      <Card sx={{ maxWidth: "100%" }}>
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
        <CardContent>
          {Object.entries(cardData).map(([card_id, cardInfo]) => (
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
              }}
            >
              <Item sx={{ textAlign: "right" }}>Id:{card_id}</Item>
              <TextField
                label="Front"
                color="primary"
                value={cardInfo.front}
                onChange={(e) => editCardData(e, cardInfo, "front")}
                focused
              />
              <TextField
                label="Back"
                color="primary"
                value={cardInfo.back}
                onChange={(e) => editCardData(e, cardInfo, "back")}
                focused
              />
              <Button
                sx={{ width: "20%" }}
                variant="contained"
                onClick={() => updateCardContent(cardInfo)}
              >
                Save
              </Button>
            </Box>
          ))}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
            }}
          >
            <Button
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gridColumnStart: "2",
                gridColumnEnd: "4",
              }}
              variant="contained"
              size="large"
              onClick={() =>
                createNewCard(deckId!, String(props.user_id), setCardData)
              }
            >
              Add Card
            </Button>
          </Box>
        </CardContent>

        <CardActions>
          <Button variant="contained" size="large">
            <Link color="inherit" href={`/deck/${props.deck_id}`}>
              Back
            </Link>
          </Button>
          <Button variant="contained" size="large">
            <Link color="inherit" href={`/deck/review/${props.deck_id}`}>
              Review
            </Link>
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};
