import React, { Component } from 'react';
import apiClient from '../../../lib/apiClient';
import './PostHobby.css';
import { connect } from 'react-redux';


export default class PostHobby extends Component {
  constructor (props) {
    super (props);
    this.state = {
      name: '',
      description: '',
      getStarted: '',
      picture: '',
      bars: {
        money: 33,
        fit: 33,
        creative: 34,
      },
      totalValue: 100,
      submitted:false
    }
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleBarsChange = (event) => {
    const target = event.target
    this.setState({
      bars: {
        ...this.state.bars,
        [target.name]: Number(target.value)
      }
    }, () => {
      const bars = Object.keys(this.state.bars)
      const sum = bars.reduce((acc, el) => this.state.bars[el] + acc, 0)
      const remainder = sum - this.state.totalValue
      const division = remainder / (bars.length - 1)
      let flag = bars.every(el => el !== 0)

      const updateBars = bars
        .filter(el => el !== target.name)
        .reduce((acc, el) => {
          if (this.state.bars[el] === 0) acc[el] = 0
          else if (flag) acc[el] = this.state.bars[el] - division
          else acc[el] = this.state.bars[el] - remainder
          return acc
        }, {})
      this.setState({
        bars: {
          ...this.state.bars,
          ...updateBars
        }
      })
    })
  }

  formatBarValues = (barValue) => {
    //taking care of edge cases
    if (barValue < 0) return 0;
    return barValue
  }

  handleSubmit = async (event) => {
    const hobby = this.state;

    const formattedHobby = {
      name: hobby.name,
      description: hobby.description,
      links: {
        getStarted: hobby.getStarted
      },
      pictures: {
      		thumbnail: hobby.picture,
      		big: hobby.picture
      	},
      tags: [
        {name:"money",
    		votes: 1,
    		average: this.formatBarValues(hobby.bars.money)
    		},
    		{name:"fit",
        votes: 1,
    		average: this.formatBarValues(hobby.bars.fit)
    		},
    		{name:"creative",
        votes: 1,
    		average: this.formatBarValues(hobby.bars.creative)
		    },
      ]
    }

    apiClient.postHobby(formattedHobby);

    this.setState({submitted:true});

    event.preventDefault();
  }

  render() {
    return (
      <div className="PostHobby">
        <form onSubmit={this.handleSubmit}>
          <h1>Post a Hobby</h1>
          <br />
          <input
            type="text"
            name="name"
            placeholder="Name"
            maxLength="14"
            minLength="1"
            required
            value={this.state.name}
            onChange={this.handleInputChange} />
          <br />
          <input
            type="text"
            name="description"
            placeholder="Description"
            maxLength="140"
            minLength="1"
            required
            value={this.state.description}
            onChange={this.handleInputChange} />
          <br />
          <input
            type="text"
            name="getStarted"
            placeholder="Tutorial. e.g. https://archery.com/tutorial"
            required
            minLength="1"
            pattern="https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)"
            value={this.state.getStarted}
            onChange={this.handleInputChange} />
          <br />
          <input
            type="text"
            name="picture"
            placeholder="Picture e.g. https://vegan.me/soup.jpg"
            required
            minLength="1"
            pattern="https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)\.(png)?(jpg)?(jpeg)?(gif)?(tiff)?(bmp)?"
            value={this.state.picture}
            onChange={this.handleInputChange} />
          <br />
          <div className="tag-sliders">
            <label className='money-label'>
              <i className="fas fa-dollar-sign"></i>
            </label>
            <input
              name="money"
              type="range"
              className="range-input"
              min="0"
              max="100"
              value={this.state.bars.money}
              onChange={this.handleBarsChange} />
            <br />
            <label className='fit-label'>
              <i className="fas fa-football-ball"></i>
            </label>
            <input
              name="fit"
              type="range"
              className="range-input"
              min="0"
              max="100"
              value={this.state.bars.fit}
              onChange={this.handleBarsChange} />
            <br />
            <label className='creative-label'>
              <i className="fab fa-fly"></i>
            </label>
            <input
              name="creative"
              type="range"
              className="range-input"
              min="0"
              max="100"
              value={this.state.bars.creative}
              onChange={this.handleBarsChange} />
            <br />
          </div>
          <input type="submit" value="Submit" />
          {this.state.submitted
            ? <span role="img" aria-label="Success" className="tick">✅</span>
            : null}
          </form>
      </div>
    )
  }
}
const mapStateToProps = (state) => ({
  hobbies: state.hobbies,
});

const mapDispatchToProps = (dispatch) => ({
  postHobbyInDatabase: () => dispatch({
    type: 'POST_HOBBY',
    api: {
      endpoint: '/postHobby'
    }
  })
});

export default connect(mapStateToProps, mapDispatchToProps)(PostHobby);