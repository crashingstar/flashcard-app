import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { AnalyticsOutlined } from "@mui/icons-material";
// import HomepageReducer, { State } from "../reducers/HomepageReducer";

type State = {
  result: Data[];
};

type Data = {
  name: string;
  date_created: string;
  deck_id: number;
  last_accessed: number;
};

function createData(
  name: string,
  date_created: string,
  deck_id: number,
  last_accessed: number
) {
  return {
    name,
    date_created: date_created,
    deck_id: deck_id,
    last_accessed: last_accessed,
  } as Data;
}

const initialState: State = {
  result: [],
};

export default function BasicTable() {
  const [state, setState] = useState(initialState);

  function GetAllDeck() {
    var formdata = new FormData();
    formdata.append("deck_id", "1");

    var requestOptions = {
      method: "POST",
      body: formdata,
    };
    fetch("http://127.0.0.1:5000/deck/get_all_deck_details", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        Object.entries(JSON.parse(result)).forEach(([k, unknown_v]) => {
          let v = unknown_v as any;
          console.log("The key: ", k);
          console.log("The value: ", v);
          setState((prevState) => ({
            result: [
              ...prevState.result,
              createData(v.deck_name, v.deck_id, v.date_created, 24),
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
              <TableCell align="right">Deck Created</TableCell>
              <TableCell align="right">Deck Id</TableCell>
              <TableCell align="right">Last Accessed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.result.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.deck_id}</TableCell>
                <TableCell align="right">{row.date_created}</TableCell>
                <TableCell align="right">{row.last_accessed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
