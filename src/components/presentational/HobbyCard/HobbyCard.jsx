import React from 'react';
import { Link } from 'react-router-dom';


import Navbar from '../Navbar/Navbar';
import SwipeButtons from '../SwipeButtons/SwipeButtons';
import './HobbyCard.css';

export default class HobbyCard extends React.Component {

  render () {
    return (
      this.props.hobby ?
        <div className="App__hobbycard">
          <Navbar title="Discover"></Navbar>
          <div className="App__hobbycard__imagecanvas">
            <img
              className="App__hobbycard__imagecanvas__picture"
              src={this.props.hobby.pictures}
              alt="Hobby">
            </img>
          </div>
          <div className="App__hobycard__card">
            <h1 className="App__hobycard__card__title">{this.props.hobby.name}</h1>
            <p className="App__hobycard__card__description">{this.props.hobby.description}</p>
          </div>
          <SwipeButtons
            tags={this.props.hobby.tags}
            Id={this.props.hobby._id}
            key={this.props.hobby._id}
          ></SwipeButtons>
        </div>
        :
        <div className="App__nohobbies">
          <Navbar title="Discover"></Navbar>
          <Link to='/create'>
            <div className="App__nohobbies__text">No hobbies to show, click here to create one.</div>
          </Link>
        </div>
    );
  }
}
