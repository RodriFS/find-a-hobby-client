import React, { Component } from 'react';
import './App.css';
import Logo from './components/presentational/Logo';
import Discover from './components/functional/Discover';
import Search from './components/presentational/Search';
import CreateAHobby from './components/presentational/CreateHobby';
import Favorites from './components/presentational/Favorites';
import SignUp from './components/presentational/Auth/SignUp/SignUp';
import SignIn from './components/presentational/Auth/SignIn/SignIn';

import { Route } from 'react-router-dom';
import PicturesBrowser from './components/presentational/PicturesBrowser/PicturesBrowser';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="App">
        <Route path="/discover" exact component={Discover} />
        <Route path="/search" exact component={Search} />
        <Route path="/create" exact component={CreateAHobby} />
        <Route path="/favorites" exact component={Favorites} />
        <Route path="/" exact component={Logo} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signout" exact component={SignIn} />
        <Route path="/pictures" exact component={PicturesBrowser} />
      </div>
    );
  }
}
export default App;
