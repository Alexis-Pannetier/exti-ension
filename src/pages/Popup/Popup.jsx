import React from 'react';
import './Popup.css';
import Layout from '../../components/Layout/Layout';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme';

const Popup = () => {

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <header className="App-header">
          <Layout />
        </header>
      </div>
    </ThemeProvider>

  );
};

export default Popup;
