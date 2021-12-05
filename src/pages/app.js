import { hot } from 'react-hot-loader/root'
import React from 'react';
import { Router } from '@reach/router'
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';

// 页面入口
import Home from './Home'

const Root = () => (
  <ChakraProvider theme={theme}>
    <Router>
      <Home path="/" />
    </Router>
  </ChakraProvider>
)

export default hot(Root);
