import React from 'react';
import './Options.css';
import EChatEdit from '../../components/EChat/EChatEdit';
import { Box, Typography } from '@mui/material';

const Options = () => {
  return <div className="OptionsContainer">
    <Box sx={{ height: "100%", textAlign: "center" }}>
      <Typography variant="h2" >Configuration</Typography>
      <Typography variant="h3" >IA</Typography>
      <EChatEdit />
    </Box>
  </div>;
};

export default Options;
