import React, { Component } from 'react';
import './List.css';
import HobbyMiniCard from '../../presentational/HobbyMiniCard/';

export default class List extends Component {
  render() {
    return (
      <div className="List">
        <h1 className="List__title"> Your liked hobbies </h1>
        {this.props.hobbies && this.props.hobbies.length > 0 ? (
          this.props.hobbies.map(hobby => {
            return <HobbyMiniCard key={'HobbyMiniCard' + hobby._id} hobby={hobby} />;
          })
        ) : (
          <h2>
            <p>Still empty</p> ♪~ ᕕ(ᐛ)ᕗ
          </h2>
        )}
      </div>
    );
  }
}
