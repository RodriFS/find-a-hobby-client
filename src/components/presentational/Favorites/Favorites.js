import React, { Component } from 'react';
import './Favorites.css';
import Navbar from '../Navbar';
import HobbyMiniCard from '../HobbyMiniCard';
import { connect } from 'react-redux';

export class Favorites extends Component {
  constructor(props) {
    super(props);
    this.postHobbiesToFavorites();
  }

  postHobbiesToFavorites = async () => {
    await this.props.getFavoritesFromDatabase();
  };

  render() {
    let hobbies = this.props.hobbies.map(card => {
      return <HobbyMiniCard hobby={card} key={card._id} />;
    });

    return (
      <div className="App__favorites">
        <Navbar title="Favorites" />
        <div className="App__favorites__list">{hobbies}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  hobbies: state.hobbies
});

const mapDispatchToProps = dispatch => ({
  getFavoritesFromDatabase: () =>
    dispatch({
      type: 'FAVORITES',
      api: {
        endpoint: '/favorites'
      }
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites);
