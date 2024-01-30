// FavoriteSidebar.js
import React from 'react';
import { Drawer, List, ListItem, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const FavoriteSidebar = ({ isOpen, onClose }) => {
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        style: {
          width: '30%',
          background: 'white',
        },
      }}
    >
      <List>
        <ListItem onClick={onClose} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CloseIcon />
        </ListItem>
        {/* Add your favorite-related content here */}
        <ListItem>
          <Typography className="bold-text">Favorite Content</Typography>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default FavoriteSidebar;
