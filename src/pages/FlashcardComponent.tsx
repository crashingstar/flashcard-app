import * as React from "react";
import { Link } from "react-router-dom";
import NavBar from "../component/NavBarComponent";
import Card from "../component/shared/Card";
export default class Flashcard extends React.Component<{}> {
  render() {
    return (
      <div>
        <h3>3Flashcard</h3>
        <Card />
      </div>
    );
  }
}
