import { hot } from 'react-hot-loader/root';
import React from 'react';
import { BrowserRouter, Route, Switch, Redirect, Link } from "react-router-dom";

import * as Utils from '@/utils'

import Login from './Login'

import './container.css';

function Home() {
  return <h1>home</h1>
}

function Page404() {
  return <h1>404</h1>
}

function PrivateRoute({ component: Component, ...rest }) {
  const isLogin = !!Utils.getLS('token')
  return (
    <Route
      {...rest}
      render={props =>
        isLogin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

function UserCenter({ info }) {
  const name = 'xiao ming'
  const age = 99
  return (
    <>
      <p>{name}</p>
      <p>{age}</p>
    </>
  )
}

class Container extends React.Component {

  login = () => {
    !Utils.getLS('token') && Utils.setLS('token', 123)
  }

  logout = () => {
    Utils.delLS('token')
  }

  render() {
    return (
      <BrowserRouter>
        <div className='container'>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/adviser"/>} />
            <Route path="/adviser" component={Home} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/me" component={UserCenter}/>
            <Route component={Page404} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default hot(Container);