/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Drawer, ListItem, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useState } from 'react';

import { colors } from 'styles/variables';
import { mainSideMenuItem } from './consts/sideMenuItems';

const SideMenu = (): JSX.Element => {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, index: number) => {
    setSelectedIndex(index);
  };
  const drawer = (
    <Box>
      <List>
        {mainSideMenuItem.map((item, index) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              sx={{
                borderRadius: '44px',
                '&:hover': {
                  bgcolor: 'transparent',
                },
                '&.Mui-selected': {
                  bgcolor: colors.light.selectedBtnMenuBG,
                  color: colors.light.selectedBtnMenuItem,
                  '& .MuiListItemIcon-root': { color: colors.light.selectedBtnMenuItem },
                },
              }}
              selected={selectedIndex === index}
              onClick={(event) => handleListItemClick(event, index)}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      sx={{
        width: 306,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 164,
          position: 'static',
          bgcolor: 'transparent',
          boxSizing: 'border-box',
          border: 'none',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      {drawer}
    </Drawer>
  );
};

export default SideMenu;
