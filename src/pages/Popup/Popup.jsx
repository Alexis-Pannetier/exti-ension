import React from 'react';
import './Popup.css';
import Layout from '../../components/Layout/Layout';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme';

const Popup = () => {

  return (
    <ThemeProvider theme={theme}>
      <Layout />
    </ThemeProvider>

  );
};

export default Popup;
