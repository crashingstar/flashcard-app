import * as React from "react";
import './Card.css';

export default interface User{
    eng: string;
    kor: string;
  } 

export default class Card extends React.Component <{}> {
    render() {
      return (
        <div className="card-container">
            <div className="card">
                <div className="front">
                        <div className="eng">English word</div>
                {//<div className="eng">{this.props.eng}</div>
                }
            </div>
            <div className="front back">
                <div className="kor">Korean word</div>
            </div>
        </div>
    </div>
      );
    }
  }