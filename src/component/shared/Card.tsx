import * as React from "react";
import './Card.css';

export default interface User{
        "back": string
        "card_id": number
        "card_status": string
        "date_created": string
        "deck_id": number
        "ease_factor": number
        "front": string
        "interval": number
        "learning_status": number
        "next_accessed": string
  } 

export const Card:React.FC<User> = (props) =>  {
    console.log(props)
      return (
        <div className="card-container">
            <div className="card">
                <div className="front">
                <div className="eng">{props.front}</div>
            </div>
            <div className="front back">
                <div className="kor">{props.back}</div>
            </div>
        </div>
    </div>
      );
    
  }