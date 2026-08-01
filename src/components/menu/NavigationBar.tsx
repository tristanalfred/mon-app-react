import { AppBar, Button, Stack, Toolbar, Typography } from '@mui/material'

export default function NavigationBar() {
  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" component={'div'} sx={{ flexGrow: 1 }}>
          Scheduler
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button color="inherit">WIP</Button>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
