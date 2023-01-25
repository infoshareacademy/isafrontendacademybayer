import { Link } from 'react-router-dom';
import { useUserContext } from '../services/user-context'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar'

export const Navigation = () => {

 
    const {user, logout} = useUserContext();

    const handleLogout = () => {
        logout();
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                component={Link}
                to="/"
              >
                <Avatar alt="logo" src="https://cdn-icons-png.flaticon.com/512/3075/3075977.png" />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ mr: 2 }}>
                Burgers App
              </Typography>
              <Button color="inherit" component={Link} to="/menu">Menu</Button>
              {user && <Button color="inherit" component={Link} to="/admin">Admin</Button>}
              <Box sx={{ flexGrow: 1 }} />
              {
                user 
                    ? <div>
                        <span>{user.name}</span> 
                        <Button color="inherit" onClick={handleLogout} >Logout</Button>
                      </div>
                    : <div>
                      <Button color="inherit" component={Link} to="/sign-in">Login</Button>
                      <Button color="inherit" component={Link} to="/register">Register</Button>
                      </div>
              }
            </Toolbar>
          </AppBar>
        </Box>
      );
}