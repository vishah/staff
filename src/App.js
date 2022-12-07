import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';


import Logout from './components/Auth/Logout/Logout';
import Auth from './components/Auth/Auth';
import Staff from './components/Staff/Staff';
import LayoutView from './components/DisplayContainers/LayoutView/LayoutView';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount = () => {
    this.props.onTryAutoSignup(this.props.access_token
    );
  }

  render() {


    const authView = (
      <LayoutView current="auth">
        <Auth />
      </LayoutView>
    );
    const staffView = (
      <LayoutView>
        <Staff />
      </LayoutView>
    )

    return (
      <Switch >
        <Route path="/" exact render={renderProps => (staffView)} />
        <Route path="/staff" exact render={renderProps => (staffView)} />
        <Route path="/login" exact render={renderPros => (authView)} />
        <Route path="/logout" exact component={Logout} />
      </Switch>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.access_token !== null,
    authRedirectPath: state.auth.authRedirectPath,
    access_token: state.auth.access_token
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: (accessToken) => dispatch(actions.authCheckState(accessToken))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

/*
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}
export default connect(null, mapDispatchToProps)(App);
*/
