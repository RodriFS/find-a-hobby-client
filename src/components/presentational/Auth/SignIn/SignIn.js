import React from 'react';
import './SignIn.css';
import { Link } from 'react-router-dom';
import background from '../../../../assets/login_background2.png';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleClick = e => {
    e.preventDefault();
    if (this.state.username && this.state.password) {
      const encoded = btoa(`${this.state.username}:${this.state.password}`);
      const header = {
        Authorization: 'Basic ' + encoded,
        'Content-Type': 'application/x-www-form-urlencoded'
      };
      this.props.logUserIn(header);
    }
  };

  render() {
    return this.props.token ? (
      <Redirect to={{ pathname: '/' }} />
    ) : (
      <div className="App__signin">
        <div className="App__signin__logo">
          Find a<br />
          hobby!
        </div>
        <img className="App__signin__background" src={background} alt="background" />
        <h3 className="App__signin__title">SIGN IN</h3>
        <form className="App__signin_form">
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
            placeholder="User Name"
            className="App__signin_form__input"
          />
          <input
            type="password"
            autoComplete="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            placeholder="Password"
            className="App__signin_form__input"
          />
          <input
            className="App__signin_form__buttons__button__login"
            value="Sign In"
            type="submit"
            onClick={this.handleClick}
          />
          <a className="App__signin_form__buttons__forgot">Forgot password?</a>

          <div className="App__signin_form__buttons__signup">
            <div className="App__signin_form__buttons__noaccount">Don't have an account?</div>
            <Link to="/signup">
              <input type="submit" className="App__signin_form__buttons__button" value="Create" />
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  logUserIn: header =>
    dispatch({
      type: 'LOG_IN',
      api: {
        endpoint: '/signin',
        headers: header
      }
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
