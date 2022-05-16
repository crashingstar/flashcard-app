import * as React from "react";
import { Link } from 'react-router-dom';
import NavBar from "./NavBarComponent";
export default class Deck extends React.Component <{}> {
  render() {
    return (
      <div>
        <NavBar></NavBar>
        <h3>Total Flash card: 66</h3>
        <h3>Items to review: 23</h3>
        <h3>Time spent on deck: 234 hours</h3>
        <button><Link to='/flashcard'>Click here to review</Link></button>
      </div>
    );
  }
}