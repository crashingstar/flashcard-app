import * as React from "react";
import { Link } from 'react-router-dom';
import NavBar from "./NavBarComponent";
import Card from "./Card";
export default class Flashcard extends React.Component <{}> {
  render() {
    return (
      <div>
        <NavBar></NavBar>
        <h3>3Flashcard</h3>
        <Card/>
      </div>
    );
  }
}