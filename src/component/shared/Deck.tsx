import * as React from "react";
import Link from "@mui/material/Link";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Box, { BoxProps } from "@mui/material/Box";

export default interface DeckType {
  deck_name: string;
  deck_id: number;
  user_id: number;
  date_created: string;
  last_accessed: string;
  total_cards: number;
  cards_due: number;
}

export const initialState: DeckType = {
  deck_name: "initial_name",
  deck_id: -1,
  user_id: -1,
  date_created: "NA",
  last_accessed: "NA",
  total_cards: -1,
  cards_due: -1,
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
  user_id: number,
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
    user_id: user_id,
    date_created: date_created,
    last_accessed: last_accessed,
    total_cards: total_cards,
    cards_due: cards_due,
  } as DeckType;
}

export function updateDeckDetails(deckInfo: DeckType) {
  var formdata = new FormData();
  formdata.append("deck_id", String(deckInfo.deck_id));
  formdata.append("user_id", String(deckInfo.user_id));
  formdata.append("deck_name", String(deckInfo.deck_name));

  var requestOptions = {
    method: "POST",
    body: formdata,
  };

  fetch("http://127.0.0.1:5000/deck/update_deck_details", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
    })
    .catch((error) => console.log("error", error));
}

export function GetDeckDetails(deckId: any, setState: any) {
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
      setState(() =>
        createDeckData(
          v.deck_name,
          v.deck_id,
          v.user_id,
          v.date_created,
          v.last_updated,
          v.total_cards,
          v.cards_due
        )
      );
    })
    .catch((error) => console.log("error", error));
}

export const Deck: React.FC<DeckType> = (props) => {
  return (
    <div>
      <Card sx={{ maxWidth: "20%" }}>
        <CardContent
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
          }}
        >
          <Item sx={{ textAlign: "right" }}>Deck Name: </Item>
          <Item>{props.deck_name}</Item>
          <Item sx={{ textAlign: "right" }}>Total Flash card: </Item>
          <Item>{props.total_cards}</Item>
          <Item sx={{ textAlign: "right" }}>Cards Due: </Item>
          <Item>{props.cards_due}</Item>
          <Item sx={{ textAlign: "right" }}>Date created: </Item>
          <Item>{props.date_created}</Item>
        </CardContent>

        <CardActions>
          <Button variant="contained" size="large">
            <Link color="inherit" href={`/deck/review/${props.deck_id}`}>
              Review
            </Link>
          </Button>
          <Button variant="contained" size="large">
            <Link color="inherit" href={`/deck/edit/${props.deck_id}`}>
              Edit
            </Link>
          </Button>
          <Button variant="contained" size="large">
            <Link color="inherit">Delete</Link>
          </Button>{" "}
        </CardActions>
      </Card>
    </div>
  );
};
