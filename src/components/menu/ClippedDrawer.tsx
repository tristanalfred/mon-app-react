import GroupsIcon from '@mui/icons-material/Groups'
import PersonIcon from '@mui/icons-material/Person'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material'
import { Link } from 'react-router-dom'

const drawerWidth = 240

export default function ClippedDrawer() {
  return (
    <Box
      sx={{
        width: drawerWidth,
        flexShrink: 0,
      }}
    >
      <Drawer
        variant="permanent"
        sx={{
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar />

        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem key="team" disablePadding>
              <ListItemButton component={Link} to="/">
                <ListItemIcon>
                  <GroupsIcon />
                </ListItemIcon>
                <ListItemText primary="Teams" />
              </ListItemButton>
            </ListItem>
            <ListItem key="nothing" disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <QuestionMarkIcon />
                </ListItemIcon>
                <ListItemText primary="WIP" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem key="member" disablePadding>
              <ListItemButton component={Link} to="/members">
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Members" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </Box>
  )
}
