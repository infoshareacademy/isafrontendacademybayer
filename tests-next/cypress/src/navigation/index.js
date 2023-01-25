import { Link } from 'react-router-dom';
import { useUserContext } from '../services/user-context'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar'

/* FIREBASE YOU CAN OMIT THIS PART */
import { getAuth, signOut } from 'firebase/auth';
/* END */

export const Navigation = () => {
    const user = useUserContext();

    const handleLogout = () => {
        /* FIREBASE YOU CAN OMIT THIS PART */
        const auth = getAuth();
        signOut(auth);
        /* END */
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
                    ? <Button color="inherit" onClick={handleLogout} >Logout</Button>
                    : <Button color="inherit" component={Link} to="/sign-in">Login</Button>
              }
            </Toolbar>
          </AppBar>
        </Box>
      );
}