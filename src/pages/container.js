import { hot } from 'react-hot-loader/root';
import React from 'react';

import Login from './Login'

import './container.css';

class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container'>
        <Login/>
      </div>
    );
  }
}

export default hot(Container);