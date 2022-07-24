import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export default interface DeckType {
  deck_name: string;
  deck_id: number;
  date_created: string;
  last_accessed: string;
  total_cards: number;
}

export function createDeckData(
  deck_name: string,
  deck_id: number,
  date_created: string,
  last_accessed: string,
  total_cards: number
) {
  if (last_accessed == null) {
    last_accessed = "NA";
  }
  if (total_cards == null) {
    total_cards = 0;
  }

  return {
    deck_name: deck_name,
    deck_id: deck_id,
    date_created: date_created,
    last_accessed: last_accessed,
    total_cards: total_cards,
  } as DeckType;
}

export const Deck: React.FC<DeckType> = (props) => {
  return (
    <div>
      <List sx={{ maxWidth: 360 }}>
        <ListItem>
          <ListItemText primary="Deck Name: " />
          <ListItemText primary={props.deck_name} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Total Flash card: " />
          <ListItemText primary={props.total_cards} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Date created: " />
          <ListItemText primary={props.date_created} />
        </ListItem>
      </List>
      <Button variant="contained" size="large">
        <Link color="inherit" href={`/deck/review/${props.deck_id}`}>
          Review
        </Link>
      </Button>
      <Button variant="contained" size="large">
        <Link color="inherit">Edit</Link>
      </Button>
      <Button variant="contained" size="large">
        <Link color="inherit">Delete</Link>
      </Button>{" "}
      {/* <Card sx={{ maxWidth: 360 }}>
        <CardContent>
          <List>
            <ListItem>
              <ListItemText primary="Deck Name: " />
              <ListItemText primary={props.deck_name} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Total Flash card: " />
              <ListItemText primary={props.total_cards} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Date created: " />
              <ListItemText primary={props.date_created} />
            </ListItem>
          </List>
        </CardContent>

        <CardActions>
          <Button variant="contained" size="large">
            <Link color="inherit" href={`/deck/review/${props.deck_id}`}>
              Review
            </Link>
          </Button>
          <Button variant="contained" size="large">
            <Link color="inherit">Edit</Link>
          </Button>
          <Button variant="contained" size="large">
            <Link color="inherit">Delete</Link>
          </Button>{" "}
        </CardActions>
      </Card> */}
    </div>
  );
};
