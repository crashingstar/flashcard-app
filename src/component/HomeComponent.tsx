import * as React from "react";
import { Link } from 'react-router-dom';
import NavBar from "./NavBarComponent";
export default class Home extends React.Component <{}> {
  render() {
    return (
      <div>
        <NavBar></NavBar>
        <h3>Total Decks: 3</h3>
        <h3>Favourite Deck: <Link to='/deck'>Korean</Link></h3> 
        <h3>Time Spent on favourite Deck: 234 hours</h3>
        <h3>Rececntly updated deck: Japanese</h3>
        <h3>Deck/s that need review: Korean</h3>
      </div>
    );
  }
}
