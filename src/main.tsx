import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, CSSReset, theme } from '@chakra-ui/react';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CSSReset />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
