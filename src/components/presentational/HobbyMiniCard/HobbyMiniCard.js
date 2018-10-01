import React, { Component } from 'react';
import './HobbyMiniCard.css'
const heart_filled = require('../../../assets/heart-filled.svg');


export default class HobbyMiniCard extends Component {
  constructor (props) {
    super(props);
    this.state = {
      // money: this.props.hobby.tags[0].average,
      // fit: this.props.hobby.tags[1].average,
      // creative: this.props.hobby.tags[2].average
    }
  }

  render() {
    return (
      <div className="App__hobbyminicard">
        <div className="App__hobbyminicard__image">
          <img src={this.props.hobby.pictures[0].thumbnail}></img>
        </div>
        <div className="App__hobbyminicard__display">
          <div className="App__hobbyminicard__display__info">
            <div className="App__hobbyminicard__display__info__hobby">{this.props.hobby.name}</div>
            <div className="App__hobbyminicard__display__info__description">{this.props.hobby.description}</div>
          </div>
          <div className="App__hobbyminicard__display__stats">
            <div className="App__hobbyminicard__display__stats__letters">
              <div className="App__hobbyminicard__display__stats__letters__e">e</div>
              <div className="App__hobbyminicard__display__stats__letters__m">m</div>
              <div className="App__hobbyminicard__display__stats__letters__c">c</div>
            </div>
            <div className="App__hobbyminicard__display__stats__bars">
              <div
                className="App__hobbyminicard__display__stats__bars__exercise"
                style={{height: this.props.hobby.tags[1].average/2 + 5}}></div>
              <div className="App__hobbyminicard__display__stats__bars__money"
                style={{height: this.props.hobby.tags[0].average/2 + 5}}
                ></div>
              <div className="App__hobbyminicard__display__stats__bars__creativity"
                style={{height: this.props.hobby.tags[2].average/2 + 5}}
                ></div>
            </div>
          </div>
          <div className="App__hobbyminicard__display__unfav">
            <img className="App__hobbyminicard__display__unfav__icon" src={heart_filled} alt="unfav"></img>
          </div>
        </div>

      </div>
    );
  }
}
