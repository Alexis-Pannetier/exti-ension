import React from 'react';
import './Popup.css';
import Layout from '../../components/Layout/Layout';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../../theme';
import { Link, SmartToy } from '@mui/icons-material';
import Links from '../../components/Links/Links';
import EChatViewer from '../../components/EChat/EChatViewer';

const Popup = () => {

  return (
    <ThemeProvider theme={theme}>
      <Layout menu={[
        { name: "Liens", icon: <Link />, content: <Links /> },
        { name: "IA", icon: <SmartToy />, content: <EChatViewer /> }
      ]}
        defaultcontent={<EChatViewer />} />
    </ThemeProvider>

  );
};

export default Popup;
