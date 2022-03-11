import React from 'react';
import { CardActionArea, Card, Typography, Box } from '@mui/material';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import { useStyles } from './../style';
import { useNavigate } from 'react-router-dom';

function HomeScreen() {
  const history = useNavigate();
  const styles = useStyles();
  return (
    <Card>
      <CardActionArea onClick={() => history('/choose')}>
        <Box className={[styles.root, styles.red]}>
          <Box className={[styles.main, styles.center]}>
            <Typography component="h6" variant="h6">
              Fast & Easy
            </Typography>
            <Typography component="h1" variant="h1">
              Order <br /> & pay <br /> here
            </Typography>
            <TouchAppIcon fontSize="large" />
          </Box>
          <Box className={[styles.center, styles.green]}>
            <Typography component="h5" variant="h5">
              Touch to start
            </Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
}

export default HomeScreen;
