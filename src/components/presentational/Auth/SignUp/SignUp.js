import React from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      name: '',
      password: '',
      confirmPassword: '',
      email: '',
      error: {
        username: '',
        name: '',
        password: '',
        confirmPassword: '',
        email: ''
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  createUser(event) {
    event.preventDefault();

    if (
      this.state.username &&
      this.state.name &&
      this.state.password &&
      this.state.confirmPassword &&
      this.state.email
    ) {
      if (this.state.password !== this.state.confirmPassword) {
        this.setState({ error: { password: 'Passwords should match' } });
        setTimeout(() => this.setState({ error: { password: '' } }), 5000);
      } else if (this.props.errors === 'User already exist') {
        this.setState({ error: { username: 'User already exist' } });
      } else {
        this.props.createNewUser(this.state);
        this.props.history.push('/signin');
      }
    }
  }

  render() {
    return this.props.token ? (
      <Redirect to={{ pathname: '/' }} />
    ) : (
      <div className="App__signup">
        <h3 className="App__signup__title">SIGN UP</h3>
        <form className="App__signup_form">
          <div className="errors">{this.props.errors}</div>
          <input
            type="text"
            value={this.state.name}
            name="name"
            onChange={this.handleChange}
            placeholder="Full Name"
            className="App__signup_form__input"
          />
          <input
            type="text"
            value={this.state.username}
            name="username"
            onChange={this.handleChange}
            placeholder="User Name"
            className="App__signup_form__input"
            autoComplete="username"
          />
          <input
            type="password"
            value={this.state.password}
            name="password"
            onChange={this.handleChange}
            placeholder="Password"
            className="App__signup_form__input"
            autoComplete="new-password"
          />
          <input
            type="password"
            value={this.state.confirmPassword}
            name="confirmPassword"
            onChange={this.handleChange}
            placeholder="Repeat your Password"
            className="App__signup_form__input"
            autoComplete="new-password"
          />
          <input
            type="email"
            value={this.state.email}
            name="email"
            onChange={this.handleChange}
            placeholder="Email"
            className="App__signup_form__input"
          />
          <input
            type="submit"
            value="Sign Up"
            onClick={this.createUser}
            className="App__signup_form__buttons__button__create"
          />
        </form>
        <div className="App__signup_form__buttons__signin">
          <div className="App__signup_form__buttons__account">Already have an account?</div>
          <Link to="/signin">
            <input type="submit" className="App__signup_form__buttons__button" value="Sign In" />
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  success: state.success.signup,
  errors: state.errors.signup,
  token: state.token
});

const mapDispatchToProps = dispatch => ({
  createNewUser: userData =>
    dispatch({
      type: 'NEW_USER',
      api: {
        endpoint: '/signup',
        method: 'POST',
        body: userData
      }
    })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
