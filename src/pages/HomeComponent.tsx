import React, { useReducer, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import HomepageReducer, { State } from "../reducers/HomepageReducer";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number
) {
  return { name, calories, fat, carbs };
}

const initialState: State = {
  result: "initial test",
};

const GetAllDeck = (state: State) => {
  var formdata = new FormData();
  formdata.append("deck_id", "1");
  // formdata.append("hashed_password", state.password);
  var requestOptions = {
    method: "POST",
    body: formdata,
  };
  fetch("http://127.0.0.1:5000/deck/get_all_deck_details", requestOptions)
    .then((response) => response.text())
    .then((result) => {
      state.result = result;
      // return result;
      // if (result == "Login successfully") {
      //   // dispatch({
      //   //   type: "loginSuccess",
      //   //   payload: "Login Successfully",
      //   // });
      //   // navigate("/home");
      // } else {
      //   // dispatch({
      //   //   type: "loginFailed",
      //   //   payload: "Incorrect username or password",
      //   // });
      // }
    })
    .catch((error) => console.log("error", error));
};

const rows = [
  createData("Introduction to Korean 1", 159, 6.0, 24),
  createData("French", 237, 9.0, 37),
  createData("Chinese", 262, 16.0, 24),
  createData("Introduction to Korean", 305, 3.7, 67),
  createData("Gingerbread", 356, 16.0, 49),
];

export default function BasicTable() {
  const [state, dispatch] = useReducer(HomepageReducer, initialState);
  GetAllDeck(state);
  // console.log("testtest");
  // console.log(state.result["1"]);

  // for (let i = 0; i < state.result.length; i++) {
  //   // console.log(state.result[i]);
  // }
  Object.entries(state.result).forEach(([k, v]) => {
    console.log("The key: ", k);
    console.log("The value: ", v);
  });
  return (
    <div>
      <h2>{state.result}</h2>

      <TableContainer component={Paper}>
        {/* <h3>Total Decks: 3</h3>
      <h3>
        Favourite Deck: <Link to="/deck">Korean</Link>
      </h3>
      <h3>Time Spent on favourite Deck: 234 hours</h3>
      <h3>Rececntly updated deck: Japanese</h3>
      <h3>Deck/s that need review: Korean</h3> */}
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Decks</TableCell>
              <TableCell align="right">Progress(?)</TableCell>
              <TableCell align="right">Next Review</TableCell>
              <TableCell align="right">Last Accessed</TableCell>
              {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
                <TableCell align="right">{row.fat}</TableCell>
                <TableCell align="right">{row.carbs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
