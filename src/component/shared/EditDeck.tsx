import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box, { BoxProps } from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import Link from "@mui/material/Link";

export default interface DeckType {
  deck_name: string;
  deck_id: number;
  date_created: string;
  last_accessed: string;
  total_cards: number;
  cards_due: number;
}

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
  return (
    <div>
      <Card sx={{ maxWidth: "100%" }}>
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
          <Item sx={{ textAlign: "right" }}>Deck Name: </Item>
          <TextField label="Deck Name" color="secondary" focused />
        </CardContent>
        <CardContent
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
          }}
        >
          <Item sx={{ textAlign: "right" }}>Deck Name: </Item>
          <TextField label="Deck Name" color="secondary" focused />
          <Item />
          <Item />
          <Item sx={{ textAlign: "right" }}>Flash Card: </Item>
          <TextField label="Front" color="secondary" focused />
          <TextField label="Back" color="secondary" focused />
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
