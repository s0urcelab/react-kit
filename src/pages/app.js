import { hot } from 'react-hot-loader/root'
import React from 'react';
import { Router } from '@reach/router'
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';

import Home from './Home'
import NotFound from './NotFound'

const Root = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Home path="/" />
      <NotFound default />
    </Router>
  </ChakraProvider>
)

export default hot(Root);
