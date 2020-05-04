import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Router, Link } from "@reach/router"

import Demo from './Demo'

import './container.css';

const Container = () => (
  <Router>
    <Demo path="demo" />
  </Router>
)

export default hot(Container);
