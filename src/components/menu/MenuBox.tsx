import { Box, CssBaseline, Toolbar } from '@mui/material'
import { Outlet } from 'react-router-dom'
import ClippedDrawer from './ClippedDrawer'
import NavigationBar from './NavigationBar'

export default function MenuBox() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <NavigationBar />
      <ClippedDrawer />

      {/* Used to stop the navigation bar from hiding content bellow*/}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  )
}
