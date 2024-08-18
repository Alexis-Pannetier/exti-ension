import React from 'react';
import './Options.css';
import EChat from '../../components/EChat/EChat';
import { Box, Typography } from '@mui/material';

const Options = ({ title }) => {
  return <div className="OptionsContainer">
    <Box sx={{ height: "100%", textAlign: "center" }}>
      <Typography variant="h2" >
        {title} page
      </Typography>
      <EChat isOptions />
    </Box>
  </div>;
};

export default Options;
