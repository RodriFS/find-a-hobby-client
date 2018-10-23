import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, token, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      console.log('Component', rest);
      return token ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
      );
    }}
  />
);

const mapStateToProps = state => ({
  token: state.token
});

export default connect(
  mapStateToProps,
  null,
  null,
  { pure: false }
)(PrivateRoute);
