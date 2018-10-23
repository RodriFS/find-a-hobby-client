import React from 'react';
import './CreateAHobby.css';
import Navbar from '../Navbar';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { createHobby } from '../../../redux/actions';

export class CreateAHobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      picture: '',
      getStarted: '',
      bars: {
        money: 33,
        fit: 33,
        creative: 34
      },
      totalValue: 100,
      submitted: false
    };
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleBarsChange = event => {
    const target = event.target;
    this.setState(
      {
        bars: {
          ...this.state.bars,
          [target.name]: Number(target.value)
        }
      },
      () => {
        const bars = Object.keys(this.state.bars);
        const sum = bars.reduce((acc, el) => this.state.bars[el] + acc, 0);
        const remainder = sum - this.state.totalValue;
        const division = remainder / (bars.length - 1);
        let flag = bars.every(el => el !== 0);

        const updateBars = bars.filter(el => el !== target.name).reduce((acc, el) => {
          if (this.state.bars[el] === 0) acc[el] = 0;
          else if (flag) acc[el] = this.state.bars[el] - division;
          else acc[el] = this.state.bars[el] - remainder;
          return acc;
        }, {});
        this.setState({
          bars: {
            ...this.state.bars,
            ...updateBars
          }
        });
      }
    );
  };

  formatBarValues = barValue => {
    //taking care of edge cases
    if (barValue < 0) return 0;
    return barValue;
  };

  addHobby = async event => {
    const hobby = this.state;

    const formattedHobby = {
      name: hobby.name,
      description: hobby.description,
      picture: hobby.picture,
      tags: [
        {
          name: 'money',
          votes: 1,
          average: this.formatBarValues(hobby.bars.money)
        },
        {
          name: 'fit',
          votes: 1,
          average: this.formatBarValues(hobby.bars.fit)
        },
        {
          name: 'creative',
          votes: 1,
          average: this.formatBarValues(hobby.bars.creative)
        }
      ]
    };
    this.setState(formattedHobby);
    this.props.createHobby(formattedHobby);
  };

  render() {
    return (
      <div className="App__createahobby">
        <Navbar title="Post a Hobby" />
        <form className="App__createahobby__form">
          <input
            className="App__createahobby__form__title"
            type="text"
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleInputChange}
          />
          <input
            className="App__createahobby__form__description"
            type="text"
            name="description"
            placeholder="Description"
            value={this.state.description}
            onChange={this.handleInputChange}
          />
          <div className="tag-sliders">
            <label className="money-label">
              <h4>Money</h4>
            </label>
            <input
              name="money"
              type="range"
              className="range-input"
              min="0"
              max="100"
              value={this.state.bars.money}
              onChange={this.handleBarsChange}
            />
            <br />
            <label className="fit-label">
              <h4>Exercise</h4>
            </label>
            <input
              name="fit"
              type="range"
              className="range-input"
              min="0"
              max="100"
              value={this.state.bars.fit}
              onChange={this.handleBarsChange}
            />
            <br />
            <label className="creative-label">
              <h4>Creativity</h4>
            </label>
            <input
              name="creative"
              type="range"
              className="range-input"
              min="0"
              max="100"
              value={this.state.bars.creative}
              onChange={this.handleBarsChange}
            />
            <br />
          </div>
          <Link to="/pictures">
            <input
              className="App__createahobby__form__post"
              type="submit"
              value="Select an image!"
              onClick={this.addHobby}
            />
          </Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createHobby: hobby => dispatch(createHobby(hobby))
});

export default connect(
  null,
  mapDispatchToProps
)(CreateAHobby);
