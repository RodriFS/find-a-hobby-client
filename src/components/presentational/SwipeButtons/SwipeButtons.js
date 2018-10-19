import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SwipeButtons.css';
const heart_filled = require('../../../assets/heart-filled.svg');
const cross = require('../../../assets/cross.svg');
const weight = require('../../../assets/weight.svg');
const paint_brush = require('../../../assets/paint-palette.svg');
const money_bag = require('../../../assets/money-bag.svg');

export class SwipeButtons extends Component {
  likeThisHobby = () => {
    this.props.likeHobbie(this.props.Id);
  };

  dislikeThisHobby = () => {
    this.props.dislikeHobbie(this.props.Id);
  };

  render() {
    return (
      <div className="App__swipebuttons">
        <div onClick={this.likeThisHobby} className="App__swipebuttons__like">
          <img
            className="App__swipebuttons__like--icon"
            src={heart_filled}
            alt="Like"
          />
        </div>
        <div className="App__swipebuttons__stats">
          <div
            className="App__swipebuttons__stats__exercise"
            style={{ height: this.props.tags[1].average + 10 }}
          >
            <div className="letter">
              <img src={weight} alt="weight" />
            </div>
          </div>
          <div
            className="App__swipebuttons__stats__money"
            style={{ height: this.props.tags[0].average + 10 }}
          >
            <div className="letter">
              <img src={money_bag} alt="money bag" />
            </div>
          </div>
          <div
            className="App__swipebuttons__stats__creativity"
            style={{ height: this.props.tags[2].average + 10 }}
          >
            <div className="letter">
              <img src={paint_brush} alt="paint brush" />
            </div>
          </div>
        </div>
        <div
          onClick={this.dislikeThisHobby}
          className="App__swipebuttons__dislike"
        >
          <img
            className="App__swipebuttons__dislike--icon"
            src={cross}
            alt="Dislike"
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  likeHobbie: id =>
    dispatch({
      type: 'LIKE',
      api: {
        method: 'PUT',
        endpoint: '/discover/like',
        body: { hobbyId: id }
      }
    }),
  dislikeHobbie: id =>
    dispatch({
      type: 'DISLIKE',
      api: {
        method: 'PUT',
        endpoint: '/discover/dislike',
        body: { hobbyId: id }
      }
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwipeButtons);
