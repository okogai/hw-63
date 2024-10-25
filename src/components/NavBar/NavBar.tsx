import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import RssFeedIcon from '@mui/icons-material/RssFeed';
import {NavLink} from "react-router-dom";

const NavBar = () => {
    return (
        <Box sx={{ flexGrow: 1, mb: 5 }}>
            <AppBar position="static">
                <Toolbar>
                    <RssFeedIcon style={{ fontSize: 32, marginRight: 16 }}/>
                    <Typography variant="h5" color="inherit" component={NavLink} to="/" sx={{ flexGrow: 1, textDecoration: "none" }}>
                        My blog
                    </Typography>
                    <Button color="inherit" component={NavLink} to="/">Home</Button>
                    <Button color="inherit" component={NavLink} to="/add-post">Add post</Button>
                    <Button color="inherit" component={NavLink} to="/about">About</Button>
                    <Button color="inherit" component={NavLink} to="/">Contacts</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default NavBar;