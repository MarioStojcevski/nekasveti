import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from "react-router-dom";
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";

import headerTitles from "../utils/headerTitles";

const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1}}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu">
            <TipsAndUpdatesIcon />
          </IconButton>
          {pathname !== '/' && (
            <IconButton size="large" edge="start" color="inherit" aria-label="back" onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>
          )}
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            {headerTitles[pathname.replace(/\/$/, '')]}
          </Typography>
          <Typography variant="body1">
            нека свети
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
