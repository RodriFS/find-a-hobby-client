import React, { Component } from 'react';
import './App.css';
import Logo from './components/presentational/Logo';
import Discover from './components/functional/Discover';
import Search from './components/presentational/Search';
import CreateAHobby from './components/presentational/CreateHobby';
import Favorites from './components/presentational/Favorites';
import SignUp from './components/presentational/Auth/SignUp/SignUp';
import SignIn from './components/presentational/Auth/SignIn/SignIn';
import PrivateRoute from './components/presentational/Auth/PrivateRoute';

import { Route } from 'react-router-dom';
import PicturesBrowser from './components/presentational/PicturesBrowser/PicturesBrowser';

class App extends Component {
  render() {
    return (
      <div className="App">
        <PrivateRoute exact path="/discover" component={Discover} />
        <PrivateRoute exact path="/search" component={Search} />
        <PrivateRoute exact path="/create" component={CreateAHobby} />
        <PrivateRoute exact path="/favorites" component={Favorites} />
        <PrivateRoute exact path="/" component={Logo} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/signin" component={SignIn} />
        <PrivateRoute exact path="/signout" component={SignIn} />
        <PrivateRoute exact path="/pictures" component={PicturesBrowser} />
      </div>
    );
  }
}
export default App;
