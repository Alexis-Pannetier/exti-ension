import React from 'react';
import './Options.css';
import EChatEdit from '../../components/EChat/EChatEdit';
import { Box, Typography } from '@mui/material';

const Options = ({ title }) => {
  return <div className="OptionsContainer">
    <Box sx={{ height: "100%", textAlign: "center" }}>
      <Typography variant="h2" >
        {title} page
      </Typography>
      <EChatEdit />
    </Box>
  </div>;
};

export default Options;
