import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import DeckType, { createDeckData } from "../component/shared/Deck";

type State = {
  result: DeckType[];
};

const initialState: State = {
  result: [],
};

export default function BasicTable() {
  const [state, setState] = useState(initialState);

  function GetAllDeck() {
    var requestOptions = {
      method: "POST",
    };
    fetch("http://127.0.0.1:5000/deck/get_all_deck_details", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        Object.entries(JSON.parse(result)).forEach(([k, unknown_v]) => {
          let v = unknown_v as any;
          setState((prevState) => ({
            result: [
              ...prevState.result,
              createDeckData(
                v.deck_name,
                v.deck_id,
                v.user_id,
                v.date_created,
                v.last_updated,
                v.total_cards,
                v.cards_due
              ),
            ],
          }));
        });
      })
      .catch((error) => console.log("error", error));
  }

  useEffect(() => {
    GetAllDeck();
  }, []);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Deck Name</TableCell>
              <TableCell align="right">Deck Id</TableCell>
              <TableCell align="right">Date Created</TableCell>
              <TableCell align="right">Last Accessed</TableCell>
              <TableCell align="right">Total Cards</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.result.map((row) => (
              <TableRow
                key={row.deck_name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Link to={`/deck/${row.deck_id}`}>{row.deck_name}</Link>
                </TableCell>
                <TableCell align="right">{row.deck_id}</TableCell>
                <TableCell align="right">{row.date_created}</TableCell>
                <TableCell align="right">{row.last_accessed}</TableCell>
                <TableCell align="right">{row.total_cards}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
