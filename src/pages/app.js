import { hot } from 'react-hot-loader/root'
import React from 'react';
import { Router } from '@reach/router'
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';

import Home from './Home'
import NotFound from './NotFound'

import Demo from './NotFound'

const Root = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Home path="/" />
      <Demo path="/gogogo" />
      <NotFound default />
    </Router>
  </ChakraProvider>
)

export default hot(Root);
