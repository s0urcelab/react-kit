import { hot } from 'react-hot-loader/root';
import React from 'react';

import Demo from './Demo'

import './container.css';

class Container extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='container'>
        <Demo/>
      </div>
    );
  }
}

export default hot(Container);
