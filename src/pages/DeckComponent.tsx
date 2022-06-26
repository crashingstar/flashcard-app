import React from "react";
import { Link } from "react-router-dom";

function DeckComponentTest() {
  return (
    <div>
      <h3>Total Flash card: 66</h3>
      <h3>Items to review: 23</h3>
      <h3>Time spent on deck: 234 hours</h3>
      <button>
        <Link to="/flashcard">Click here to review</Link>
      </button>
    </div>
  );
}

export default DeckComponentTest;
